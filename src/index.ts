import {Networked3dWebExperienceClient} from './client/Networked3dWebExperienceClient';
import {UserInterface} from './UserInterface';

import {LoadingProgressManager} from 'mml-web';

const websocketProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
const protocol = window.location.protocol;

const host = window.location.;

const loadingProgressManager = new LoadingProgressManager();

const userNetworkAddress = `${websocketProtocol}//${host}/network`;

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
    airAnimationFileUrl: `${protocol}//${host}/assets/avatar/anim_air.glb`,
    idleAnimationFileUrl: `${protocol}//${host}/assets/avatar/anim_idle.glb`,
    jogAnimationFileUrl: `${protocol}//${host}/assets/avatar/anim_jog.glb`,
    sprintAnimationFileUrl: `${protocol}//${host}/assets/avatar/anim_run.glb`,
    doubleJumpAnimationFileUrl: `${protocol}//${host}/assets/avatar/anim_double_jump.glb`,
  },
  skyboxHdrJpgUrl: `web-client/assets/hdr/autumn_field_puresky.jpg`,
  mmlDocuments: [{url: `${websocketProtocol}//${host}/mml-document`}],
  enableTweakPane: true,
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


let uiLoaded = false;

loadingProgressManager.addProgressCallback(() => {
  const [, completed] = loadingProgressManager.toRatio();
  if (completed && !uiLoaded) {
    const userInterface = new UserInterface(holder, 'networked3d');
    userInterface.init();
    uiLoaded = true;
  }
});

app.update();
