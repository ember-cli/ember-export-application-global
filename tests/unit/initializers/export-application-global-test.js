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
  var app = { reopen: function(){} };
  initialize(null, app);

  assert.equal(window.Foo, app);
});

test('it sets the application on window with the classified modulePrefix when exportApplicationGlobal is true', function(assert) {
  config.modulePrefix = 'foo';
  config.exportApplicationGlobal = true;
  var app = { reopen: function(){} };
  initialize(null, app);

  assert.equal(window.Foo, app);
});

test('it does not set the global unless exportApplicationGlobal is true', function(assert) {
  config.modulePrefix = 'foo';
  config.exportApplicationGlobal = false;
  var app = { reopen: function(){} };
  initialize(null, app);

  assert.ok(window.Foo !== app);
});

test('it does not set the global if it already exists falsy', function(assert) {
  window.Foo = 'hello';
  config.modulePrefix = 'foo';
  var app = { reopen: function(){} };

  assert.ok(window.Foo !== app);
});

test('it sets a custom global name if specified', function(assert) {
  config.modulePrefix = 'foo';
  config.exportApplicationGlobal = 'Catz';
  var app = { reopen: function(){} };
  initialize(null,  app);

  assert.ok(window.Foo !== app);
  assert.ok(window.Catz === app);
});

test('it sets a custom global name if specified', function(assert) {
  config.modulePrefix = 'foo';
  config.exportApplicationGlobal = 'Catz';
  initialize(null, 'blazorz');

  assert.ok(window.Foo !== 'blazorz');
  assert.ok(window.Catz === 'blazorz');
});
