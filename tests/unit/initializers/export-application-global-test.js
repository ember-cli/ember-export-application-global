import Ember from 'ember';
import config from '../../../config/environment';
import { initialize } from '../../../initializers/export-application-global';

var container, application, originalModulePrefix, originalExportApplicationGlobal;

module('ExportApplicationGlobalInitializer', {
  setup: function() {
    originalModulePrefix = config.modulePrefix;
    originalExportApplicationGlobal = config.exportApplicationGlobal;

    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  },

  teardown: function() {
    delete window[config.modulePrefix];
    config.modulePrefix = originalModulePrefix;
    config.exportApplicationGlobal = originalExportApplicationGlobal;
  }
});

test('it sets the application on window with the classified modulePrefix', function() {
  config.modulePrefix = 'foo';
  initialize(null, 'blazorz');

  equal(window.Foo, 'blazorz');
});

test('it does not set the global unless exportApplicationGlobal is true', function() {
  config.modulePrefix = 'foo';
  config.exportApplicationGlobal = false;
  initialize(null, 'blazorz');

  ok(window.Foo !== 'blazorz');
});

