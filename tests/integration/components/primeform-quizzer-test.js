import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('primeform-quizzer', 'Integration | Component | primeform quizzer', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{primeform-quizzer}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#primeform-quizzer}}
      template block text
    {{/primeform-quizzer}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
