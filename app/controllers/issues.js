import Ember from 'ember';

const pollInterval = 60000;
const mapIssues = issues => issues.map(issue => ({
  createdAt: issue.created_at,
  userLogin: issue.user.login,
  userEmail: `${issue.user.login}@users.noreply.github.com`,
  title: issue.title,
  state: issue.state,
  closedAt: issue.closed_at,
  assigneeLogin: issue.assignee ? issue.assignee.login : null
}));

export default Ember.Controller.extend({
  issues: Ember.computed('model', function () {
    const { issues } = this.get('model');
    return mapIssues(issues);
  }),
  issuesSortDef: ['createdAt:desc'],
  filters: {},
  sortedIssues: Ember.computed.sort('filteredIssues', 'issuesSortDef'),
  filteredIssues: Ember.computed('issues', 'filters', function () {
    const issues = this.get('issues');
    const filters = this.get('filters');

    return issues.filter(issue => (
      Object.keys(filters)
        .filter(prop => filters[prop])
        .every(prop => issue[prop].includes(filters[prop]))
    ));
  }),
  actions: {
    sortIssues(sortDef) {
      this.set('issuesSortDef', [sortDef]);
    },
    filterIssues(prop, filterValue) {
      const filters = this.get('filters');
      this.set('filters', Object.assign({}, filters, { [prop]: filterValue }));
    }
  },
  pollUrl() {
    const { url } = this.get('model');
    const poll = () => {
      Ember.$.getJSON(url)
        .then(issues => {
          this.set('model', { url, issues });
          this.pollTimeout = setTimeout(poll, pollInterval);
        });
    };

    this.pollTimeout = setTimeout(poll, pollInterval);
  },
  destroy() {
    clearTimeout(this.pollTimeout);
  }
});
