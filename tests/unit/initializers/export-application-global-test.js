import Ember from 'ember';
import { module, test } from 'qunit';
import config from '../../../config/environment';
import { initialize } from '../../../initializers/export-application-global';

var application, originalModulePrefix, originalExportApplicationGlobal;

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
    var classifiedName = Ember.String.classify(config.modulePrefix);
    delete window[classifiedName];
    config.modulePrefix = originalModulePrefix;
    config.exportApplicationGlobal = originalExportApplicationGlobal;
    application = originalModulePrefix = originalExportApplicationGlobal = null;
  }
});

test('it sets the application on window with the classified modulePrefix', function(assert) {
  config.modulePrefix = 'foo';
  initialize(null, 'blazorz');

  assert.equal(window.Foo, 'blazorz');
});

test('it does not set the global unless exportApplicationGlobal is true', function(assert) {
  config.modulePrefix = 'foo';
  config.exportApplicationGlobal = false;
  initialize(null, 'blazorz');

  assert.ok(window.Foo !== 'blazorz');
});

test('it does not set the global if it already exists falsy', function(assert) {
  window.Foo = 'hello';
  config.modulePrefix = 'foo';
  initialize(null, 'blazorz');

  assert.ok(window.Foo !== 'blazorz');
});
