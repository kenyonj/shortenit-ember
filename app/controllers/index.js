import Ember from 'ember';

export default Ember.Controller.extend({
  error: "",
  actions: {
    saveUrl: function() {
      var newUrl = this.get("model");
      newUrl.set("token", "token");
      newUrl.set("createdAt", "createdAt");
      newUrl.set("hitCount", "hitCount");
      newUrl.save().then(function() {
        this.set("model", this.store.createRecord("url"));
        this.set("error", "");
      }.bind(this), function(error) {
        this.set("error", "invalid url");
      }.bind(this));
    }
  }
});
