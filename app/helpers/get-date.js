import Ember from 'ember';


export function getDate(params/*, hash*/) {
  if (params[0] === 'year') {
    return new Date().getFullYear();
  }
}

export default Ember.Helper.helper(getDate);
