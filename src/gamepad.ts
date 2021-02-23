import { getAxisNameFromValue, getAxisNames } from './buttonMappings';

const gamepads: Map<number, Gamepad> = new Map();

export type GamepadOptions = {
  buttonInitialTimeout: number;
  buttonRepeatTimeout: number;
  buttonNames: Array<string>;
  analogThreshold: number;
  injectClasses: boolean;
};

type GamepadEvent = {
  vnode: any;
  callback: Function;
  repeat: boolean;
};

type GamepadRegisteredEvents = {
  pressed: Map<string, Array<GamepadEvent>>;
  released: Map<string, Array<GamepadEvent>>;
};

export class VueGamepad {
  private holdings: Map<string, number>;
  private events: GamepadRegisteredEvents;
  private animationFrame: number;
  private options: GamepadOptions;

  constructor(options: GamepadOptions) {
    this.holdings = new Map();
    this.events = { pressed: new Map(), released: new Map() };
    this.options = options;

    window.addEventListener('gamepadconnected', this.padConnected.bind(this));
    window.addEventListener(
      'gamepaddisconnected',
      this.padDisconnected.bind(this),
    );

    this.animationFrame = requestAnimationFrame(this.run.bind(this));
  }

  private getGamepads(): (Gamepad | null)[] {
    return Array.from(navigator.getGamepads()).filter((pad) => pad !== null);
  }

  private padConnected() {
    console.log('gamepad connected!');
    document.body.classList.add('gamepad-connected');
  }

  private padDisconnected() {
    console.log('gamepad disconnected!');
    if (this.getGamepads().length === 0) {
      document.body.classList.remove('gamepad-connected');
    }
  }

  /**
   * add an event handler
   * @param {string} event name of the button event
   * @param {object} modifiers vue binding modifiers
   * @param {function} callback function to trigger
   * @param {object} vnode vue directive vnode
   */
  public addEventListener(
    eventName: string,
    modifiers: { repeat?: boolean; released?: boolean },
    callback: Function,
    vnode: any,
  ) {
    const action = modifiers.released ? 'released' : 'pressed';
    const repeat = !!modifiers.repeat;

    // if we don't already have an array initialised for the current event
    // do it now
    const events = this.events[action].get(eventName);
    if (!events) {
      this.events[action].set(eventName, [{ vnode, repeat, callback }]);
    } else {
      this.events[action].set(eventName, [
        ...events,
        { vnode, repeat, callback },
      ]);
    }

    // inject classes
    if (this.options.injectClasses && vnode && vnode.el) {
      vnode.el.classList.add('v-gamepad', `v-gamepad--${eventName}`);
    }
  }

  public removeEventListener(
    eventName: string,
    modifiers: { repeat?: boolean; released?: boolean },
    callback: Function,
  ) {
    const action = modifiers.released ? 'released' : 'pressed';

    let events = this.events[action].get(eventName);

    if (events && events.length > 0) {
      events = events.filter((e) => e.callback !== callback);

      // if we have any remaining events after the filter, update the array
      // otherwise delete the object
      if (events.length > 0) {
        this.events[action].set(eventName, events);
      } else {
        this.events[action].delete(eventName);
      }
    }
  }

  private updatePressedEvent(name: string) {
    const events = this.events['pressed'].get(name);

    if (events && events.length > 0) {
      const event = events[events.length - 1];

      const now = Date.now();
      const holding = this.holdings.get(name);

      // button or axis was just pressed, or is repeating
      if (
        !holding ||
        (event.repeat && now - holding >= this.options.buttonRepeatTimeout)
      ) {
        this.holdings.set(name, now);
        if (holding) {
          this.holdings.set(name, now);
        }
        this.options.injectClasses && event.vnode.el.classList.add('active');
        event.callback();
      }
    }
  }

  private updateReleasedEvent(name: string) {
    this.holdings.delete(name);

    const events = this.events['released'].get(name);
    if (events && events.length > 0) {
      const event = events[events.length - 1];
      this.options.injectClasses && event.vnode.el.classList.remove('active');
      event.callback();
    }
  }

  private checkGamepadButtons(pad: Gamepad) {
    pad.buttons.forEach((button, index) => {
      const name = this.options.buttonNames[index];

      // button is pressed
      if (button.pressed) {
        this.updatePressedEvent(name);

        // button was released
      } else if (!button.pressed && this.holdings.get(name)) {
        this.updateReleasedEvent(name);
      }
    });
  }

  private checkGamepadAxis(pad: Gamepad) {
    pad.axes.forEach((value, index) => {
      if (
        value >= this.options.analogThreshold ||
        value <= -this.options.analogThreshold
      ) {
        const name = getAxisNameFromValue(index, value);
        this.updatePressedEvent(name);
      } else {
        // trigger the release event if this axis was previously pressed
        getAxisNames(index)
          .filter((name) => this.holdings.has(name))
          .forEach((name) => {
            this.updateReleasedEvent(name);
          });
      }
    });
  }

  // main loop
  private run() {
    this.getGamepads().forEach((pad) => {
      // check gamepad buttons
      pad && this.checkGamepadButtons(pad);

      // check gamepad axis
      pad && this.checkGamepadAxis(pad);
    });

    this.animationFrame = requestAnimationFrame(this.run.bind(this));
  }
}
