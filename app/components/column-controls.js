import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'th',
  actions: {
    sort(sortDef) {
      this.get('onSort')(sortDef);
    }
  }
});
