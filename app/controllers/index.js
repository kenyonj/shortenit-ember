import Ember from 'ember';

export default Ember.Controller.extend({
  error: '',

  saveUrl: function(url) {
    url.save().then(function() {
      this.set('model', this.store.createRecord('url'));
      this.set('error', '');
    }.bind(this), function() {
      this.set('error', 'invalid url');
    }.bind(this));
  },

  generateHexToken: function() {
    var result = '';
    var n = 4;
    while (n--){
      result += Math.floor(Math.random()*36).toString(36);
    }
    return result;
  },

  ensureUniqueToken: function() {
    var token = this.generateHexToken();
    return this.store.find('url', {token: token}).then(function(models){
      if (models.get('length') > 0){
        this.ensureUniqueToken();
      }else{
        return token;
      }
    }.bind(this));
  },

  actions: {
    saveUrl: function() {
      var newUrl = this.get('model');
      this.store.find('url', {originalUrl: newUrl.get('originalUrl')}).then(function(models){
        if (models.get('length') > 0){
          this.set('model.originalUrl', "");
          this.set('error', 'url already exists');
        }else{
          this.ensureUniqueToken().then(function(token){
            newUrl.setProperties({
              token: token,
              createdAt: new Date(),
              hitCount: 0
            });
            this.saveUrl(newUrl);
          }.bind(this));
        }
      }.bind(this));
    }
  }
});
