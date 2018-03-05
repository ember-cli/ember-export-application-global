/* global global */
import { classify } from '@ember/string';
import config from '../config/environment';

export function initialize() {
  const application = arguments[1] || arguments[0];
  if (config.exportApplicationGlobal !== false) {
    let theGlobal;
    if (typeof window !== 'undefined') {
        theGlobal = window;
    } else if (typeof global !== 'undefined') {
        theGlobal = global
    } else if (typeof self !== 'undefined') {
        theGlobal = self;
    } else {
       // no reasonable global, just bail
       return;
    }

    const value = config.exportApplicationGlobal;
    let globalName;

    if (typeof value === 'string') {
      globalName = value;
    } else {
      globalName = classify(config.modulePrefix);
    }

    if (!theGlobal[globalName]) {
      theGlobal[globalName] = application;

      application.reopen({
        willDestroy: function() {
          this._super.apply(this, arguments);
          delete theGlobal[globalName];
        }
      });
    }
  }
}

export default {
  name: 'export-application-global',

  initialize: initialize
};
