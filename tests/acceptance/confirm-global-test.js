import Ember from 'ember';
import startApp from '../helpers/start-app';
import config from '../../config/environment';

var App;

module('Acceptance: ConfirmGlobal', {
  beforeEach: function() {
    App = startApp();
  },

  afterEach: function() {
    Ember.run(App, 'destroy');
  }
});

test('Set global', function(assert) {
  App.someProp = 'foo-bar';
  visit('/');

  andThen(function() {
    assert.equal(window.Dummy.someProp, App.someProp, 'App is exported to window.Dummy');
  });
});
