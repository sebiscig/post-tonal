import Component from '@ember/component';

export default Component.extend({
  tagName: '',
  currentSet: [],
  actions: {
    plotSet(setIn) {
      jQuery("div#set g.note").css('display', 'none');
      for (var i = 0; i < setIn.length; i++) {
        var selector = "g#_"+ i.toString() + '.noteGroup g#_' + setIn[i] +'.note';
        jQuery(selector).css('display', 'block')
      }
    },
    fetchSet(setIn){
      this.set('currentSet', setIn);
    },
     passPcs() {
      return this.currentSet;
    },
    quizzerSubcomponent(action, params) {
      this.send(action, params)
    },
    setPcSet(setIn){
      this.set('currentSet', setIn);
    }
  }
});
