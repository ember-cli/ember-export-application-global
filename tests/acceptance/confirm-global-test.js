import { module, test } from 'qunit';
import { run } from '@ember/runloop';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';


module('Acceptance | ConfirmGlobal', function(hooks) {
  setupApplicationTest(hooks);

  test('Set global', async function(assert) {
    assert.expect(1);

    const { application } = this.owner;

    application.someProp = 'foo-bar';

    await visit('/');

    assert.equal(window.Dummy.someProp, application.someProp, 'App is exported to window.Dummy');
  });

  test('Don\'t clobber', async function(assert) {
    assert.expect(1);

    window.Dummy = 'test';

    const { application } = this.owner;

    application.someProp = 'foo-bar';

    await visit('/');

    assert.equal(window.Dummy, 'test', 'App is not exported to window.Dummy');
  });

  test('unsets global', async function(assert) {
    assert.expect(2);

    const { application } = this.owner;

    application.someProp = 'foo-bar';

    await visit('/');

    assert.ok('Dummy' in window, 'global should be present');
    run(application, 'destroy');
    assert.ok(!('Dummy' in window), 'global should NOT leak after it has been destroyed');
  });
});


