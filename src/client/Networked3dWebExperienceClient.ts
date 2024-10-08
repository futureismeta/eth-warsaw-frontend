import {
  AnimationConfig,
  CameraManager,
  CharacterDescription,
  CharacterManager,
  CharacterModelLoader,
  CharacterState,
  CollisionsManager,
  Composer,
  decodeCharacterAndCamera,
  EnvironmentConfiguration,
  getSpawnPositionInsideCircle,
  GroundPlane,
  KeyInputManager,
  LoadingScreen,
  MMLCompositionScene,
  TimeManager,
  TweakPane,
  VirtualJoystick,
} from '@mml-io/3d-web-client-core';
import {
  UserData,
  UserNetworkingClient,
  UserNetworkingClientUpdate,
  WebsocketStatus,
} from '@mml-io/3d-web-user-networking';
import {
  IMMLScene,
  LoadingProgressManager,
  registerCustomElementsToWindow,
  setGlobalMMLScene,
} from 'mml-web';
import { AudioListener, Euler, Scene, Vector3 } from 'three';

type MMLDocumentConfiguration = {
  url: string;
  position?: {
    x: number;
    y: number;
    z: number;
  };
  rotation?: {
    x: number;
    y: number;
    z: number;
  };
  scale?: {
    x: number;
    y: number;
    z: number;
  };
};

export type Networked3dWebExperienceClientConfig = {
  sessionToken: string;
  chatNetworkAddress?: string;
  uiNetworkAddress?: string;
  voiceChatAddress?: string;
  userNetworkAddress: string;
  mmlDocuments?: Array<MMLDocumentConfiguration>;
  animationConfig: AnimationConfig;
  environmentConfiguration?: EnvironmentConfiguration;
  skyboxHdrJpgUrl: string;
  enableTweakPane?: boolean;
  updateURLLocation?: boolean;
  loadingProgressManager: LoadingProgressManager;
};

export class Networked3dWebExperienceClient {
  private element: HTMLDivElement;

  private scene = new Scene();
  private composer: Composer;
  private tweakPane?: TweakPane;
  private audioListener = new AudioListener();

  private cameraManager: CameraManager;

  private collisionsManager = new CollisionsManager(this.scene);

  private characterModelLoader = new CharacterModelLoader();
  private characterManager: CharacterManager;

  private timeManager = new TimeManager();

  private keyInputManager = new KeyInputManager();
  private virtualJoystick: VirtualJoystick;

  private mmlCompositionScene: MMLCompositionScene;
  private loadingProgressManager: LoadingProgressManager;

  private clientId: number | null = null;
  private networkClient: UserNetworkingClient;
  private remoteUserStates = new Map<number, CharacterState>();
  private userProfiles = new Map<number, UserData>();

  private readonly latestCharacterObject = {
    characterState: null as null | CharacterState,
  };
  private characterControllerPaneSet: boolean = false;

  private initialLoadCompleted = false;
  private loadingScreen: LoadingScreen;

  constructor(
      private holderElement: HTMLElement,
      private config: Networked3dWebExperienceClientConfig
  ) {
    this.element = document.createElement('div');
    this.element.style.position = 'absolute';
    this.element.style.width = '100%';
    this.element.style.height = '100%';
    this.holderElement.appendChild(this.element);

    document.addEventListener('mousedown', () => {
      if (this.audioListener.context.state === 'suspended') {
        this.audioListener.context.resume();
      }
    });

    this.loadingProgressManager = config.loadingProgressManager;
    this.cameraManager = new CameraManager(
        this.element,
        this.collisionsManager
    );
    this.cameraManager.camera.add(this.audioListener);

    this.virtualJoystick = new VirtualJoystick(this.element, {
      radius: 70,
      inner_radius: 20,
      x: 70,
      y: 0,
      mouse_support: false,
    });

    this.composer = new Composer({
      scene: this.scene,
      camera: this.cameraManager.camera,
      spawnSun: true,
      environmentConfiguration: this.config.environmentConfiguration,
    });

    this.composer.useHDRJPG(this.config.skyboxHdrJpgUrl);
    this.element.appendChild(this.composer.renderer.domElement);

    if (this.config.enableTweakPane !== false) {
      this.tweakPane = new TweakPane(
          this.element,
          this.composer.renderer,
          this.scene,
          this.composer.effectComposer
      );
      this.cameraManager.setupTweakPane(this.tweakPane);
      this.composer.setupTweakPane(this.tweakPane);
    }

    const resizeObserver = new ResizeObserver(() => {
      this.composer.fitContainer();
    });
    resizeObserver.observe(this.element);

    const initialNetworkLoadRef = {};
    this.loadingProgressManager.addLoadingAsset(
        initialNetworkLoadRef,
        'network',
        'network'
    );
    this.networkClient = new UserNetworkingClient({
      url: this.config.userNetworkAddress,
      sessionToken: this.config.sessionToken,
      websocketFactory: (url: string) => new WebSocket(url),
      statusUpdateCallback: (status: WebsocketStatus) => {
        if (
            status === WebsocketStatus.Disconnected ||
            status === WebsocketStatus.Reconnecting
        ) {
          // The connection was lost after being established - the connection may be re-established with a different client ID
          this.characterManager.clear();
          this.remoteUserStates.clear();
          this.clientId = null;
        }
      },
      assignedIdentity: (clientId: number) => {
        console.log(`Assigned ID: ${clientId}`);
        this.clientId = clientId;
        if (this.initialLoadCompleted) {
          // Already loaded - respawn the character
          this.spawnCharacter();
        } else {
          this.loadingProgressManager.completedLoadingAsset(
              initialNetworkLoadRef
          );
        }
      },
      clientUpdate: (
          remoteClientId: number,
          userNetworkingClientUpdate: null | UserNetworkingClientUpdate
      ) => {
        if (userNetworkingClientUpdate === null) {
          this.remoteUserStates.delete(remoteClientId);
        } else {
          this.remoteUserStates.set(remoteClientId, userNetworkingClientUpdate);
        }
      },
      clientProfileUpdated: (
          clientId: number,
          username: string,
          characterDescription: CharacterDescription
      ): void => {
        this.updateUserProfile(clientId, {
          username,
          characterDescription,
        });
      },
    });

    this.characterManager = new CharacterManager({
      composer: this.composer,
      characterModelLoader: this.characterModelLoader,
      collisionsManager: this.collisionsManager,
      cameraManager: this.cameraManager,
      timeManager: this.timeManager,
      keyInputManager: this.keyInputManager,
      virtualJoystick: this.virtualJoystick,
      remoteUserStates: this.remoteUserStates,
      sendUpdate: (characterState: CharacterState) => {
        this.latestCharacterObject.characterState = characterState;
        this.networkClient.sendUpdate(characterState);
      },
      animationConfig: this.config.animationConfig,
      characterResolve: (characterId: number) => {
        return this.resolveCharacterData(characterId);
      },
      updateURLLocation: this.config.updateURLLocation !== false,
    });
    this.scene.add(this.characterManager.group);

    if (this.config.environmentConfiguration?.groundPlane !== false) {
      const groundPlane = new GroundPlane();
      this.collisionsManager.addMeshesGroup(groundPlane);
      this.scene.add(groundPlane);
    }

    this.setupMMLScene();

    this.loadingScreen = new LoadingScreen(this.loadingProgressManager);
    document.body.append(this.loadingScreen.element);

    this.loadingProgressManager.addProgressCallback(() => {
      const [, completed] = this.loadingProgressManager.toRatio();
      if (completed && !this.initialLoadCompleted) {
        this.initialLoadCompleted = true;
        /*
                 When all content (in particular MML) has loaded, spawn the character (this is to avoid the character falling
                 through as-yet-unloaded geometry)
                */
        this.spawnCharacter();
      }
    });
    this.loadingProgressManager.setInitialLoad(true);
  }

  static createFullscreenHolder(): HTMLDivElement {
    document.body.style.margin = '0';
    document.body.style.overflow = 'hidden';

    const holder = document.createElement('div');
    holder.style.position = 'absolute';
    holder.style.width = '100%';
    holder.style.height = '100%';
    holder.style.overflow = 'hidden';
    document.body.appendChild(holder);
    return holder;
  }

  private resolveCharacterData(clientId: number): {
    username: string;
    characterDescription: CharacterDescription;
  } {
    const user = this.userProfiles.get(clientId)!;
    if (!user) {
      throw new Error(`Failed to resolve user for clientId ${clientId}`);
    }

    return {
      username: user.username,
      characterDescription: user.characterDescription,
    };
  }

  private updateUserProfile(id: number, userData: UserData) {
    console.log(
        `Update user_profile for id=${id} (username=${userData.username})`
    );

    this.userProfiles.set(id, userData);

    this.characterManager.respawnIfPresent(id);
  }

  public update(): void {
    this.timeManager.update();
    this.characterManager.update();
    this.cameraManager.update();
    this.composer.sun?.updateCharacterPosition(
        this.characterManager.localCharacter?.position
    );
    this.composer.render(this.timeManager);
    if (this.tweakPane?.guiVisible) {
      this.tweakPane.updateStats(this.timeManager);
      this.tweakPane.updateCameraData(this.cameraManager);
      if (
          this.characterManager.localCharacter &&
          this.characterManager.localController
      ) {
        if (!this.characterControllerPaneSet) {
          this.characterControllerPaneSet = true;
          this.characterManager.setupTweakPane(this.tweakPane);
        } else {
          this.tweakPane.updateCharacterData(
              this.characterManager.localController
          );
        }
      }
    }
    requestAnimationFrame(() => {
      this.update();
    });
  }

  private spawnCharacter() {
    if (this.clientId === null) {
      throw new Error('Client ID not set');
    }
    const spawnPosition = getSpawnPositionInsideCircle(
        3,
        30,
        this.clientId!,
        0.4
    );
    const spawnRotation = new Euler(0, 0, 0);
    let cameraPosition: Vector3 | null = null;
    if (window.location.hash && window.location.hash.length > 1) {
      const urlParams = decodeCharacterAndCamera(
          window.location.hash.substring(1)
      );
      spawnPosition.copy(urlParams.character.position);
      spawnRotation.setFromQuaternion(urlParams.character.quaternion);
      cameraPosition = urlParams.camera.position;
    }
    const ownIdentity = this.userProfiles.get(this.clientId);
    if (!ownIdentity) {
      throw new Error('Own identity not found');
    }

    this.characterManager.spawnLocalCharacter(
        this.clientId!,
        ownIdentity.username,
        ownIdentity.characterDescription,
        spawnPosition,
        spawnRotation
    );
    if (cameraPosition !== null) {
      this.cameraManager.camera.position.copy(cameraPosition);
      this.cameraManager.setTarget(
          new Vector3()
              .add(spawnPosition)
              .add(this.characterManager.headTargetOffset)
      );
      this.cameraManager.reverseUpdateFromPositions();
    }
  }

  private setupMMLScene() {
    registerCustomElementsToWindow(window);
    this.mmlCompositionScene = new MMLCompositionScene({
      targetElement: this.element,
      renderer: this.composer.renderer,
      scene: this.scene,
      camera: this.cameraManager.camera,
      audioListener: this.audioListener,
      collisionsManager: this.collisionsManager,
      getUserPositionAndRotation: () => {
        return this.characterManager.getLocalCharacterPositionAndRotation();
      },
    });
    this.scene.add(this.mmlCompositionScene.group);
    setGlobalMMLScene(this.mmlCompositionScene.mmlScene as IMMLScene);

    if (this.config.mmlDocuments) {
      for (const mmlDocument of this.config.mmlDocuments) {
        const frameElement = document.createElement('m-frame');
        frameElement.setAttribute('src', mmlDocument.url);
        if (mmlDocument.position) {
          frameElement.setAttribute('x', mmlDocument.position.x.toString());
          frameElement.setAttribute('y', mmlDocument.position.y.toString());
          frameElement.setAttribute('z', mmlDocument.position.z.toString());
        }
        if (mmlDocument.rotation) {
          frameElement.setAttribute('rx', mmlDocument.rotation.x.toString());
          frameElement.setAttribute('ry', mmlDocument.rotation.y.toString());
          frameElement.setAttribute('rz', mmlDocument.rotation.z.toString());
        }
        if (mmlDocument.scale) {
          if (mmlDocument.scale.x !== undefined) {
            frameElement.setAttribute('sx', mmlDocument.scale.x.toString());
          }
          if (mmlDocument.scale.y !== undefined) {
            frameElement.setAttribute('sy', mmlDocument.scale.y.toString());
          }
          if (mmlDocument.scale.z !== undefined) {
            frameElement.setAttribute('sz', mmlDocument.scale.z.toString());
          }
        }
        document.body.appendChild(frameElement);
      }
    }

    const mmlProgressManager =
        this.mmlCompositionScene.mmlScene.getLoadingProgressManager!()!;
    this.loadingProgressManager.addLoadingDocument(
        mmlProgressManager,
        'mml',
        mmlProgressManager
    );
    mmlProgressManager.addProgressCallback(() => {
      this.loadingProgressManager.updateDocumentProgress(mmlProgressManager);
    });
    mmlProgressManager.setInitialLoad(true);
  }
}
