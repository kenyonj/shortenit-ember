import Ember from 'ember';

export default Ember.Controller.extend({
  error: '',

  generateHexToken: function() {
    var result = '';
    var n = 4;
    while (n--){
      result += Math.floor(Math.random()*36).toString(36);
    }
    return result;
  },

  findBy: function(attribute, value) {
    var result;
    new window.Firebase("https://crackling-inferno-9996.firebaseio.com/urls")
      .orderByChild(attribute)
      .startAt(value)
      .endAt(value)
      .once('value', function(snap) {
        result = snap.val();
      });
    return result;
  },

  ensureUniqueToken: function() {
    var tokenNotUniq = true;
    var token = '';
    while (tokenNotUniq){
      token = this.generateHexToken();
      tokenNotUniq = this.findBy("token", token);
    }
    return token;
  },

  actions: {
    saveUrl: function() {
      var newUrl = this.get('model');
      var check = this.findBy("originalUrl", newUrl.get("originalUrl"));
      if (check){
        this.set('model.originalUrl', "");
        this.set('error', 'url already exists');
      }else{
        newUrl.set('token', this.ensureUniqueToken());
        newUrl.set('createdAt', 'createdAt');
        newUrl.set('hitCount', 'hitCount');
        newUrl.save().then(function() {
          this.set('model', this.store.createRecord('url'));
          this.set('error', '');
        }.bind(this), function() {
          this.set('error', 'invalid url');
        }.bind(this));
      }
    }
  }
});
