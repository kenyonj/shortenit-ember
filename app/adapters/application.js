import DS from 'ember-data';
import Ember from 'ember';

export default DS.FirebaseAdapter.extend({
  firebase: new window.Firebase('https://crackling-inferno-9996.firebaseio.com'),

  findQuery: function(store, type, query) {
    var adapter = this;
    var ref = this._getRef(type);
    var attribute = Object.keys(query)[0];
    var value = query[attribute];

    ref = ref.orderByChild(attribute).startAt(value).endAt(value);
    return new Ember.RSVP.Promise(function(resolve, reject) {
      ref.once('value', function(snapshot) {
        if (!adapter._findAllHasEventsForType(type)) {
          adapter._findAllAddEventListeners(store, type, ref);
        }
        var results = [];
        snapshot.forEach(function(childSnapshot) {
          var payload = adapter._assignIdToPayload(childSnapshot);
          adapter._updateRecordCacheForType(type, payload);
          results.push(payload);
        });
        resolve(results);
      }, function(error) {
        reject(error);
      });
    }, Ember.String.fmt('DS: FirebaseAdapter#findQuery %@ to %@', [type, ref.toString()]));
  }
});
