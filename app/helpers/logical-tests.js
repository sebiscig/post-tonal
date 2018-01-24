import Ember from 'ember';

export function logicalTests(params, namedEls) {
  //console.log(namedEls.value, namedEls.comparison)
  if (namedEls.test == '===') {
    return (namedEls.value === namedEls.comparison);
  } else if (namedEls.test == '==') {
    return (namedEls.value == namedEls.comparison);
  } else if (namedEls.test == '>') {
    return (namedEls.value > namedEls.comparison);
  } else if (namedEls.test == '>=') {
    return (namedEls.value >= namedEls.comparison);
  } else if (namedEls.test == '<') {
    return (namedEls.value < namedEls.comparison);
  } else if (namedEls.test == '<=') {
    return (namedEls.value <= namedEls.comparison);
  } else if (namedEls.test == '!=') {
    return (namedEls.value != namedEls.comparison);
  }
}

export default Ember.Helper.helper(logicalTests);
