import Component from '@ember/component';
import $ from 'jquery';

/*================ Helper functions ================*/

var getPcs = function ($pcsOnClock) {
	var pcSet = [];
	$pcsOnClock.each(function(){
		pcSet.push($(this).attr('id').toString().replace('_',''));
	});
	return pcSet;
};

/*================  ================*/

var makePcSet = function(pcsIn) {
	var set = '{';
	for (var i = 0; i < pcsIn.length -1; i++) {
		set += pcsIn[i] + ', ';
	}
	set += pcsIn[pcsIn.length-1] + '}';
	return set
};

/*================  ================*/

var getHighlightedPcs = function() {
	var dotSelector = "g#pc-circles g.dotGroup";
	//var $highlightedPcs =
	return $(dotSelector).filter(function(){
			return $(this).find('circle.pc-dot').css('display') == 'block';
		});

};

/*=========================== Drawing SVG ===========================*/

/*========= Make the numbers on the clockface =========*/
var makePcLabel = function(pcNumber, rotation, index) {
  var theG = document.createElementNS("http://www.w3.org/2000/svg", "g");
  var theText = document.createElementNS("http://www.w3.org/2000/svg", "text");
  theG.appendChild(theText);
  theG.setAttribute('class', 'new');
  var theLabels = $("g#labels");
  theLabels.append(theG);

  theG = $("g#labels").find('g.new');

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
  var theLines = $("g#pc-lines");
  theLines.append(theLine);

  theLine = theLines.find('line.new');
  theLine.attr('id', '_'+pcNumber).attr('x1', '405').attr('x2', '405').attr('y1', '60').attr('y2', '120').attr('stroke', 'black').attr('stroke-width', '6').attr('transform', 'rotate(' +rotation + ' 405 390)').removeClass('new');

};

/*========= Make the dots that represent pcs =========*/

var makePcDot = function(pcNumber, rotation) {

	var theNewGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
  var theDot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	var theErrorCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	theDot.setAttribute('class', 'pc-dot');
	theErrorCircle.setAttribute('class', 'error-circle');
  theNewGroup.setAttribute('class', 'new');
	theNewGroup.appendChild(theDot);
	theNewGroup.appendChild(theErrorCircle);
  var theDots = $("g#pc-circles");
  theDots.append(theNewGroup);
	theNewGroup = theDots.find('g.new');
  theDot = theNewGroup.find('circle.pc-dot');
	theErrorCircle = theNewGroup.find('circle.error-circle');
  theDot.attr('cx', '405').attr('cy', '90').attr('r', '15').attr('fill', 'black').attr('stroke', 'black');
	theErrorCircle.attr('cx', '405').attr('cy', '90').attr('r', '40').attr('fill', 'transparent').attr('stroke', 'black').attr('stroke-width', '3');
	theNewGroup.attr('id', '_'+pcNumber).attr('transform', 'rotate(' +rotation + ' 405 390)').removeClass('new').addClass('dotGroup')
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
export default Component.extend({
  tagName: '',
	pcs: [],
	interaction: '',
	buttonLabels: {'calculator': 'Calculate set class', 'generator': 'Generate a trichord', 'quizzer': 'Check your answer'},
	buttonLabel: '',
	root: false,
	didUpdateAttrs(){

		if (this.interaction=='quizzer') {
			$('g#pc-circles circle').css('display', 'none');
			$("#textline-0").text('');
			$("#textline-1").text('');
		}
	},
  didInsertElement() {

    drawClockFace(parseInt(this.get('cardinality')));
    $("g.dotGroup, g#labels text, g#pc-lines line").on('click', function() {
      var circleSelector = "g#pc-circles g#" + $(this).attr('id') + ' circle.pc-dot';
			var errorSelector = "g#pc-circles g#" + $(this).attr('id') + ' circle.error-circle';
      var $theDot = $(circleSelector);

      var newDisplay = $theDot.css('display') == 'none' ? 'block' : 'none';
      $theDot.css('display', newDisplay);
			$(errorSelector).css('display', 'none')
    });
		this.set('interaction', this.get('theInteraction'));
		this.set('buttonLabel',this.buttonLabels[this.interaction]);
		this.set('root',this.get('root'));
  },
  actions: {
		setPcs() {

			var $highlightedPcs = getHighlightedPcs();

	    var thePcs = getPcs($highlightedPcs);
      var x = makePcSet(thePcs);
			this.set('pcs', thePcs);
		},
    passPcs() {
		  return [this.pcs, this.root];
    },
		showTheSC(setInfo){
			if (setInfo.set == "{undefined}") {
				$("#textline-0").text('No pcs on clock face...');
				$("#textline-1").text('Add some by clicking around');
			} else {
				$("#textline-0").text('set ' + setInfo.set + ',');
				$("#textline-1").text('prime form ' + setInfo.sc);

				if (this.root) {
					var theRoots = '';
					if (setInfo.roots.length > 1) {
						setInfo.roots.forEach(function(item) {
							theRoots += item.replace(' up', '&uarr;').replace(' down', '&darr;') + ' ';
						});
						theRoots = theRoots.substring(0, theRoots.length - 1).split(' ').join (',\n').replace(/#/g, '<tspan class="bravura subscript">&#x266F;</tspan>');

					} else {
						theRoots = setInfo.roots[0].replace(' up', '&uarr;').replace(' down', '&darr;').replace('#', '<tspan class="bravura subscript">&#x266F;</tspan>')
					}
						var theTSpan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
						theTSpan.setAttribute('class', 'new subscript');

						$("#textline-1").append(theTSpan);

						//$("#textline-1 tspan.new").attr('baseline-shift', '-10');
						$("#textline-1 tspan.new").html(theRoots);

						$("#textline-1 tspan.new").removeClass('new');
				}
			}
		},
		showSet(set) {
			var prettySet = 'set {' + set.split('').join(', ') + '}';
			var circlesSelector = "g#pc-circles circle";
			$("g#pc-circles circle").css('display', 'none');
			for (var i=0; i < set.length; i++) {
				var selector = circlesSelector + "#_"+set[i];
				$(selector).css('display', 'block');
			}
			$("#textline-1").text('');
			$("#textline-0").text(prettySet);
		},
    toggleVisibility() {
      this.sendAction('action', 'toggleVisibilities', '');
    },
		clockSubcomponent(action, params) {
			this.send(action, params)
		}, showAnswer(answer){
			var thePromptPcs = this.get('pcs');
			var $highlightedPcs = getHighlightedPcs ()

			var $wrongHighlights = $highlightedPcs.filter(function() {
				return !thePromptPcs.includes($(this).attr('id').replace('_', ''));
			});
			if (this.pcs.length == 0) {
				$("#textline-0").text('Nothing to check: click ');
				$("#textline-1").text('"Trichord" etc. first.');
			} else if (($wrongHighlights.length == 0) && ($highlightedPcs.length == this.pcs.length)) {
				this.send('showTheSC', answer);
			} else if ($highlightedPcs.length < this.pcs.length) {
				$("#textline-0").text('Can\'t check yet: set not fully');
				$("#textline-1").text('notated on the clockface');
			} else if ($wrongHighlights.length > 0){
				$("#textline-0").text('Error(s) in your integer notation');
				$("#textline-1").text('Mistake(s) circled');
				$wrongHighlights.find('circle.error-circle').css('display', 'block');
			}
		}
  }
});
