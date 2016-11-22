import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.$.getJSON('https://api.github.com/repos/facebook/react/issues');
  }
});
