import Ember from 'ember';

const url = 'https://api.github.com/repos/facebook/react/issues';

export default Ember.Route.extend({
  model() {
    return Ember.$.getJSON(url)
      .then(issues => ({ url, issues }));
  },
  setupController(controller, model) {
    this._super(controller, model);
    controller.pollUrl();
  }
});
