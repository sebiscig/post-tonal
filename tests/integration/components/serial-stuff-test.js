import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('serial-stuff', 'Integration | Component | serial stuff', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{serial-stuff}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#serial-stuff}}
      template block text
    {{/serial-stuff}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
