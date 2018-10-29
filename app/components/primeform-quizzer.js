import Component from '@ember/component';

export default Component.extend({
  tagName: '',
  currentSet: [],
  actions: {
    quizzerSubcomponent(action, params) {
      this.send(action, params)
    },
    setPcSet(setIn){
      this.set('currentSet', setIn);
    }, passPcs() {
      return this.currentSet;
    }
  }
});
