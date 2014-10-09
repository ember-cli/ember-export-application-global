import Ember from 'ember';
import startApp from '../helpers/start-app';
import config from '../../config/environment';

var App;

module('Acceptance: ConfirmGlobal', {
  setup: function() {
    App = startApp();
  },

  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('', function() {
  App.someProp = 'foo-bar';
  visit('/');

  andThen(function() {
    equal(window.Dummy.someProp, App.someProp, 'App is exported to window.Dummy');
  });
});
