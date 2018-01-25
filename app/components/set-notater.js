import Ember from 'ember';
/*=============== Helper Function ===============*/

var createNoteGroups = function () {

  var translate = 0;
  var theTransform = '';
  var id = '';
  var theGroup;
  var $baseGroup = document.getElementById('reference');
  $baseGroup.setAttribute('id', '_0')
  var $noteGroups = document.getElementById('noteGroups')

  for (var i = 1; i < 12; i++) {
    translate = 'translate(' + (parseFloat(20.5*i)).toString() + ',0)';
    id = '_' + i.toString();
    theGroup = $baseGroup.cloneNode(true);
    theGroup.setAttribute('id', id);
    theGroup.setAttribute('transform', translate);
    $noteGroups.appendChild(theGroup);
  }

};


export default Ember.Component.extend({
  tagName: '',
  didInsertElement() {
    createNoteGroups();
  },
  didUpdateAttrs() {
    this.send('displaySet', this.get('theSet'));
  },
  actions: {
    displaySet(setIn) {
      Ember.$("g.note").css('display', 'none')
      for (var i = 0; i < setIn.length; i++){
        var selector = "g#_"+ i.toString() + '.noteGroup g#_' + setIn[i] +'.note';
        Ember.$(selector).css('display', 'block')
      }
    }
  }
});
