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
  issueHeaders: [
    { title: "Submission Timestamp", prop: "createdAt" },
    { title: "Customer Name", prop: "userLogin" },
    { title: "Customer Email Address", prop: "userEmail" },
    { title: "Description", prop: "title" },
    { title: "Open/Closed Status", prop: "state" },
    { title: "Closed Timestamp", prop: "closedAt" },
    { title: "Employee Name", prop: "assigneeLogin" },
  ],
  issues: Ember.computed('model', function () {
    const { issues } = this.get('model');
    return mapIssues(issues);
  }),
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
