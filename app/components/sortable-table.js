import Ember from 'ember';

export default Ember.Component.extend({
  filters: {},
  filteredItems: Ember.computed('sortedItems', 'filters', function () {
    const items = this.get('sortedItems');
    const filters = this.get('filters');

    return items.filter(issue => (
      Object.keys(filters)
        .filter(prop => filters[prop])
        .every(prop => issue[prop].includes(filters[prop]))
    ));
  }),
  sortDef: [],
  sortedItems: Ember.computed.sort('items', 'sortDef'),
  actions: {
    sort(sortDef) {
      this.set('sortDef', [sortDef]);
    },
    filter(prop, event) {
      const filters = this.get('filters');
      const val = event.target.value;

      this.set('filters', Object.assign({}, filters, { [prop]: val }));
    }
  }
});
