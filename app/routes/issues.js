import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.$
      .getJSON('https://api.github.com/repos/facebook/react/issues')
      .then(issues => issues.map(issue => ({
        createdAt: issue.created_at,
        userLogin: issue.user.login,
        userEmail: `${issue.user.login}@users.noreply.github.com`,
        title: issue.title,
        state: issue.state,
        closedAt: issue.closed_at,
        assigneeLogin: issue.assignee ? issue.assignee.login : null
      })));
  }
});
