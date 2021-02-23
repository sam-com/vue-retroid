import { GamepadOptions, VueGamepad } from '../../src/gamepad';
import { ButtonNames } from '../../src/buttonMappings';

import { App } from 'vue';

export function installVueGamepad(Vue: App, options = {}) {
  // we need basic gamepad api support to work
  if (!('getGamepads' in navigator)) {
    console.error(
      'vue-gamepad: your browser does not support the Gamepad API!',
    );
    return;
  }

  const DefaultOptions: GamepadOptions = {
    analogThreshold: 0.5,
    buttonNames: ButtonNames,
    buttonRepeatTimeout: 500,
    buttonInitialTimeout: 200,
    injectClasses: true,
  };

  const vueGamepad = new VueGamepad({ ...DefaultOptions, ...options });

  Vue.directive('gamepad', {
    mounted: (el, binding, vnode) => {
      if (binding.arg) {
        const callback = binding.value;
        vueGamepad.addEventListener(
          binding.arg,
          binding.modifiers,
          callback,
          vnode,
        );
      } else {
        console.error(`invalid binding. '${binding.arg}' was not bound.`);
      }
    },
    unmounted: (el, binding, vnode) => {
      if (binding.arg) {
        const callback = binding.value;
        vueGamepad.removeEventListener(
          binding.arg,
          binding.modifiers,
          callback,
        );
      } else {
        console.error(`invalid binding. '${binding.arg}' was not unbound.`);
      }
    },
  });
}
