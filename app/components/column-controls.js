import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'th',
  actions: {
    sort(sortDef) {
      this.get('onSort')(sortDef);
    },
    filter(event) {
      const sortDef = this.get('sortDef');
      this.get('onFilter')(sortDef, event.target.value);
    }
  }
});
