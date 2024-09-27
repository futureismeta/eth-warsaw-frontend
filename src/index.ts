import { Networked3dWebExperienceClient } from './client/Networked3dWebExperienceClient';
import { UserInterface } from './UserInterface';
import { LoadingProgressManager } from 'mml-web';

const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
// const host = 'localhost:8080';
const host = window.location.host;

const loadingProgressManager = new LoadingProgressManager();

const userNetworkAddress = `${protocol}//${host}/network`;

console.log('connecting to', userNetworkAddress);
const holder = Networked3dWebExperienceClient.createFullscreenHolder();

const wrapper = document.createElement('div');
wrapper.style.position = 'absolute';
wrapper.style.width = '100%';
wrapper.style.height = '100%';

holder.appendChild(wrapper);

export const app = new Networked3dWebExperienceClient(holder, {
  sessionToken: (window as any).SESSION_TOKEN,
  userNetworkAddress,
  animationConfig: {
    airAnimationFileUrl: 'http://localhost:8080/assets/avatar/anim_air.glb',
    idleAnimationFileUrl: 'http://localhost:8080/assets/avatar/anim_idle.glb',
    jogAnimationFileUrl: 'http://localhost:8080/assets/avatar/anim_jog.glb',
    sprintAnimationFileUrl: 'http://localhost:8080/assets/avatar/anim_run.glb',
    doubleJumpAnimationFileUrl: 'http://localhost:8080/assets/avatar/anim_double_jump.glb',
  },
  skyboxHdrJpgUrl: '/assets/hdr/autumn_field_puresky.jpg',
  mmlDocuments: [{ url: `${protocol}//${host}/mml-document` }],
  enableTweakPane: true,
  uiNetworkAddress: `${protocol}//${host}/ui-networking`,
  environmentConfiguration: {
    sun: {
      intensity: 1,
      polarAngle: 0.25,
      azimuthalAngle: 180,

    },
    ambientLight: {
      intensity: 3.5,
    },
    groundPlane: false,
  },
  loadingProgressManager: loadingProgressManager,
});

loadingProgressManager.addProgressCallback(() => {
  const [, completed] = loadingProgressManager.toRatio();
  if (completed) {
    const userInterface = new UserInterface(holder, 'networked3d');
    userInterface.init();
  }
});

app.update();
