import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | pc sets', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:pc-sets');
    assert.ok(route);
  });
});
