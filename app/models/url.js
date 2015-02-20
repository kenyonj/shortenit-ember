import DS from 'ember-data';

export default DS.Model.extend({
  originalUrl: DS.attr(),
  token: DS.attr(),
  createdAt: DS.attr(),
  hitCount: DS.attr(),
});
