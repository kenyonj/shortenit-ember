import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('url', { path: '/urls/:token' });
  this.resource('redirect', { path: '/:token' });
});

export default Router;
