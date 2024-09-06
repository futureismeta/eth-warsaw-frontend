// import { Networked3dWebExperienceClient } from '@mml-io/3d-web-experience-client';
// import { UserInterface } from '../UserInterface';
//
// const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
//
// const host = 'localhost:8080';
//
// const userNetworkAddress = `${protocol}//${host}/network`;
// const chatNetworkAddress = `${protocol}//${host}/chat-network`;
//
// console.log('connecting to', userNetworkAddress, chatNetworkAddress);
// const holder = Networked3dWebExperienceClient.createFullscreenHolder();
//
// const wrapper = document.createElement('div');
// wrapper.style.position = 'absolute';
// wrapper.style.width = '100%';
// wrapper.style.height = '100%';
//
// const userInterface = new UserInterface(holder, 'networked3d');
// userInterface.init();
//
// holder.appendChild(wrapper);
//
// export const app = new Networked3dWebExperienceClient(holder, {
//   sessionToken: (window as any).SESSION_TOKEN,
//   userNetworkAddress,
//   chatNetworkAddress,
//   animationConfig: {
//     airAnimationFileUrl: '127.0.0.1:3000/assets/models/anim_air.glb',
//     idleAnimationFileUrl: 'http://127.0.0.1:3000/assets/models/anim_idle.glb',
//     jogAnimationFileUrl: '127.0.0.1:3000/assets/models/anim_jog.glb',
//     sprintAnimationFileUrl: '127.0.0.1:3000/assets/models/anim_run.glb',
//     doubleJumpAnimationFileUrl:
//       '127.0.0.1:3000/assets/models/anim_double_jump.glb',
//   },
//   skyboxHdrJpgUrl: '/assets/hdr/autumn_field_puresky.jpg',
//   mmlDocuments: [{ url: `${protocol}//${host}/mml-document` }],
//   enableTweakPane: true,
//   uiNetworkAddress: `${protocol}//${host}/ui-networking`,
//   environmentConfiguration: {
//     sun: {
//       intensity: 1,
//       polarAngle: 0.25,
//       azimuthalAngle: 180,
//     },
//     ambientLight: {
//       intensity: 5,
//     },
//     groundPlane: true,
//   },
// });
