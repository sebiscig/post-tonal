import Component from '@ember/component';

/*=================================================================*/
var generateCardinality = function () {

  return Math.floor(Math.random() * (6 - 3 + 1)) + 3;
};

/*=================================================================*/

export default Component.extend({
  tagName: '',
  theSet: [],
  actions: {
    generatePcSet(cardinality) {
      cardinality = (cardinality == 'all') ? generateCardinality() : cardinality;
      var aggregate = ['0','1','2','3','4','5','6','7','8','9','t','e'];
      var shuffled = aggregate.slice(0), setSize = aggregate.length, min = setSize - cardinality, temp, index;
      while (setSize-- > min) {
        index = Math.floor((setSize + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[setSize];
        shuffled[setSize] = temp;
      }
        this.set('theSet',shuffled.slice(min));
        this.sendAction('action', 'setPcSet', this.theSet);
    }
  }
});
