import Component from '@ember/component';
import jQuery from 'jquery';

/*=============== Helper Function ===============*/
var updateSvg = function (lengthIn) {

  var translate = 0;
  var theTransform = '';
  var id = '';
  var theGroup;
  var $baseGroup = document.getElementById('reference');
  $baseGroup.setAttribute('id', '_0')
  var $noteGroups = document.getElementById('noteGroups')

  for (var i = 1; i < 6; i++) {
    translate = 'translate(' + (parseFloat(20.5*i)).toString() + ',0)';
    id = '_' + i.toString();
    theGroup = $baseGroup.cloneNode(true);
    theGroup.setAttribute('id', id);
    theGroup.setAttribute('transform', translate);
    $noteGroups.appendChild(theGroup);
  }
  var staffLines = jQuery('.staffLines');
  var baseD = staffLines.attr('d').toString();
  var lengthOfLineToReplace = parseFloat(baseD.split(' M')[0].split('h')[1]);
  var newLength =parseFloat(20.5*(i+1)).toString();
  var newD = baseD.split('h'+lengthOfLineToReplace).join('h'+newLength);
  var $theSvg = jQuery('div#notaterWrapper svg');
  var theNewViewBox = $theSvg.attr('viewBox').replace(lengthOfLineToReplace, newLength)
  $theSvg.attr('viewBox', theNewViewBox);

  staffLines.attr('d', newD)


};


export default Component.extend({
  tagName: '',
  didInsertElement() {
    updateSvg(this.length);
  },
  didUpdateAttrs() {
    this.display(this.theSet);
  },
  actions: {
    displaySet(setIn) {
      jQuery("g.note").css('display', 'none')
      for (var i = 0; i < setIn.length; i++){
        var selector = "g#_"+ i.toString() + '.noteGroup g#_' + setIn[i] +'.note';
        jQuery(selector).css('display', 'block')
      }
    }
  }
});
