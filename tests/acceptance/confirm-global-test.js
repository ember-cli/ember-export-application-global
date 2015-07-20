import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var App;

module('Acceptance: ConfirmGlobal', {
  beforeEach: function() {
    App = startApp();
  },

  afterEach: function() {
    Ember.run(App, 'destroy');
    delete window.Dummy;
    App = null;
  }
});

test('Set global', function(assert) {
  App.someProp = 'foo-bar';
  visit('/');

  andThen(function() {
    assert.equal(window.Dummy.someProp, App.someProp, 'App is exported to window.Dummy');
  });
});

test('Don\'t clobber', function(assert) {
  window.Dummy = 'test';
  App.someProp = 'foo-bar';
  visit('/');

  andThen(function() {
    assert.equal(window.Dummy, 'test', 'App is not exported to window.Dummy');
  });
});


test('unsets global', function(assert) {
  App.someProp = 'foo-bar';
  visit('/');

  andThen(function() {
    assert.ok('Dummy' in window, 'global should be present');
    Ember.run(App, 'destroy');
    assert.ok(!('Dummy' in window), 'global should NOT leak after it has been destroyed');
  });
});

