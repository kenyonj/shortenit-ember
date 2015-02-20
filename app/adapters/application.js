import DS from 'ember-data';

export default DS.FirebaseAdapter.extend({
  firebase: new window.Firebase("https://crackling-inferno-9996.firebaseio.com")
});
