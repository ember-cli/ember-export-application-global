import { classify } from '@ember/string';
import { module, test } from 'qunit';
import config from '../../../config/environment';
import { initialize } from '../../../initializers/export-application-global';

module('ExportApplicationGlobalInitializer', function(hooks) {
  let originalModulePrefix, originalExportApplicationGlobal;
  hooks.beforeEach(function() {
    originalModulePrefix = config.modulePrefix;
    originalExportApplicationGlobal = config.exportApplicationGlobal;
  });

  hooks.afterEach(function() {
    const classifiedName = classify(config.modulePrefix);
    delete window[classifiedName];
    delete window.Foo;
    delete window.Catz;
    config.modulePrefix = originalModulePrefix;
    config.exportApplicationGlobal = originalExportApplicationGlobal;
    originalModulePrefix = originalExportApplicationGlobal = null;
  });

  test('it sets the application on window with the classified modulePrefix', function(assert) {
    config.modulePrefix = 'foo';
    const app = { reopen: function(){} };
    initialize(null, app);

    assert.equal(window.Foo, app);
  });

  test('it sets the application on window with the classified modulePrefix when exportApplicationGlobal is true', function(assert) {
    config.modulePrefix = 'foo';
    config.exportApplicationGlobal = true;
    const app = { reopen: function(){} };
    initialize(null, app);

    assert.equal(window.Foo, app);
  });

  test('it does not set the global unless exportApplicationGlobal is true', function(assert) {
    config.modulePrefix = 'foo';
    config.exportApplicationGlobal = false;
    const app = { reopen: function(){} };
    initialize(null, app);

    assert.ok(window.Foo !== app);
  });

  test('it does not set the global if it already exists falsy', function(assert) {
    window.Foo = 'hello';
    config.modulePrefix = 'foo';
    const app = { reopen: function(){} };

    assert.ok(window.Foo !== app);
  });

  test('it sets a custom global name if specified', function(assert) {
    config.modulePrefix = 'foo';
    config.exportApplicationGlobal = 'Catz';
    const app = { reopen: function(){} };
    initialize(null,  app);

    assert.ok(window.Foo !== app);
    assert.ok(window.Catz === app);
  });
});
