import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('url', {token: params.token}).then(function(urls) {
      return urls.get("firstObject");
    });
  },

  afterModel: function(model) {
    window.location = model.get('originalUrl');
  }
});
