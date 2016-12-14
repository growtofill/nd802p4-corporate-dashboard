import Ember from 'ember';

const headers = [
  { title: 'Submission Timestamp', path: 'created.at' },
  { title: 'Customer Name', path: 'user.login' },
  { title: 'Customer Email Address', path: 'user.login' },
  { title: 'Description', path: 'title' },
  { title: 'Open/Closed Status', path: 'state' },
  { title: 'Closed Timestamp', path: 'closed_at' },
  { title: 'Employee Name', path: 'assignee.login' },
];

export default Ember.Controller.extend({
  headers,
  issuesSortDef: ['created_at:desc'],
  sortedIssues: Ember.computed.sort('model', 'issuesSortDef'),
  actions: {
    sortIssues(sortDef) {
      this.set('issuesSortDef', [sortDef]);
    }
  }
});
