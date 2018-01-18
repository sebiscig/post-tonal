import Ember from 'ember';


/*================ Helper functions ================*/

var getPcs = function ($pcsOnClock) {
	var pcSet = [];
	$pcsOnClock.each(function(){
		pcSet.push($(this).attr('id').toString().replace('_',''));
	});
	return pcSet;
};
var makePcSet = function(pcsIn) {
	var set = '{';
	for (var i = 0; i < pcsIn.length -1; i++) {
		set += pcsIn[i] + ', ';
	}
	set += pcsIn[pcsIn.length-1] + '}';
	return set
};


/*=========================== Drawing SVG ===========================*/

/*========= Make the numbers on the clockface =========*/
var makePcLabel = function(pcNumber, rotation, index) {
  var theG = document.createElementNS("http://www.w3.org/2000/svg", "g");
  var theText = document.createElementNS("http://www.w3.org/2000/svg", "text");
  theG.appendChild(theText);
  theG.setAttribute('class', 'new');
  var theLabels = Ember.$("g#labels");
  theLabels.append(theG);

  theG = Ember.$("g#labels").find('g.new');

  var antiRotation = 360 - rotation;
  theG.attr('transform', "rotate(" + rotation + " 405 390)");
  theText = theG.find('text');

  theText.text(pcNumber);
  theText.attr('x', '405').attr('y', '30').attr('font-family', "Verdana").attr('font-size', '30').attr('text-anchor', 'middle').attr('transform', "rotate(" + antiRotation.toString() + " 405 20)");
  theText.attr('id', '_'+pcNumber)
  theG.removeClass('new');

};

/*========= Make the lines on the clockface =========*/

var makePcLine = function(pcNumber, rotation) {

  var theLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
  theLine.setAttribute('class', 'new');
  var theLines = Ember.$("g#pc-lines");
  theLines.append(theLine);

  theLine = theLines.find('line.new');
  theLine.attr('id', '_'+pcNumber).attr('x1', '405').attr('x2', '405').attr('y1', '60').attr('y2', '120').attr('stroke', 'black').attr('stroke-width', '6').attr('transform', 'rotate(' +rotation + ' 405 390)').removeClass('new');

};

/*========= Make the dots that represent pcs =========*/

var makePcDot = function(pcNumber, rotation) {
  //<circle id="_0" cx="405" cy="90" r='15' fill="black" stroke="black" transform="rotate (0 405 390)"/>

  var theDot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  theDot.setAttribute('class', 'new');
  var theDots = Ember.$("g#pc-circles");
  theDots.append(theDot);
  theDot = theDots.find('circle.new');
  theDot.attr('id', '_'+pcNumber).attr('cx', '405').attr('cy', '90').attr('r', '15').attr('fill', 'black').attr('stroke', 'black').attr('transform', 'rotate(' +rotation + ' 405 390)').removeClass('new');
};

/*========= Main function for drawing the clockface =========*/
var drawClockFace = function(cardinality) {

  var rotation = 360/cardinality;

  for (var i = 0; i < cardinality; i++) {

    var pcNumber = cardinality == 12 ? ( i < 10 ? i.toString()
                                        : i == 10 ? 't'
                                        : 'e' )
                                      : i.toString();
    var theRotation = rotation*i;
    makePcLabel(pcNumber, theRotation);

    makePcLine(pcNumber,theRotation);
    makePcDot(pcNumber,theRotation);
  }
};
/*========= Ember Component definition =========*/
export default Ember.Component.extend({
  tagName: '',
	pcs: [],
  didInsertElement() {

    drawClockFace(parseInt(this.get('cardinality')));
    Ember.$("g#pc-circles circle, g#labels text, g#pc-lines line").on('click', function() {
      var circleSelector = "g#pc-circles circle#" + Ember.$(this).attr('id');
      var $theDot = Ember.$(circleSelector);
      var newDisplay = $theDot.css('display') == 'none' ? 'block' : 'none';
      $theDot.css('display', newDisplay);
    });
  },

  actions: {
    sendPcs() {
			//console.log('sending pcs');
			//console.log(action, params)
      var $highlightedPcs =
      Ember.$("g#pc-circles circle").filter(function(){
        return $(this).css('display') == 'block';
      });
	    var thePcs = getPcs($highlightedPcs);
      var x = makePcSet(thePcs);
			this.set('pcs', thePcs);
			//console.log(x)
			return thePcs;
			//console.log('clockface', x, this.pcs);
			//this.send(action, params)

			//console.log(thePcSet)
			//return thePcSet;
			/*
      var info = this.sendAction('action', 'scCalculate', thePcs);
      if (info.indexOf('undefined') > -1) {
          $("#textline-0").text('No pcs on clock face...')
          $("#textline-1").text('Add some by clicking around');
      } else {
        var parsed = info.split('<br>');
        $("#textline-0").text(parsed[0]);
        $("#textline-1").text(parsed[1]);
      }*/

    },
		getPcs(scIn){
			console.log(action, params);
		},
    toggleVisibility() {
      this.sendAction('action', 'toggleThisProperty', 'clockVisible');
    }/*,
		handleSubcomponents(action, params) {
			//console.log('handling clockface subcomponents')
			this.send(action, params)
		}*/
  }
});
