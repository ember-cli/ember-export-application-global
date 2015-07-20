import Ember from 'ember';
import config from '../config/environment';

export function initialize(container, application) {
  if (config.exportApplicationGlobal !== false) {
    var globalName = typeof config.exportApplicationGlobal === 'string' ?
      config.exportApplicationGlobal :
      Ember.String.classify(config.modulePrefix);

    if (!window[globalName]) {
      window[globalName] = application;

      application.reopen({
        willDestroy: function(){
          this._super.apply(this, arguments);
          delete window[globalName];
        }
      });
    }
  }
};

export default {
  name: 'export-application-global',

  initialize: initialize
};
