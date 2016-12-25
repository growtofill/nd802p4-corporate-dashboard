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
  issuesSortDef: ['created_at:desc'],
  sortedIssues: Ember.computed.sort('issues', 'issuesSortDef'),
  actions: {
    sortIssues(sortDef) {
      this.set('issuesSortDef', [sortDef]);
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
