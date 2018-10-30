import Component from '@ember/component';
import $ from 'jquery';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

/*================================ Functions for creating list ================================*/
var TnI_SCs = function () {
	var TnI_sets_arr = new Array (4095);
	var ret_str02 = "";
	var counter = 0;
    var counter02 = 0;
    var temp = "";
    var inversion_int = 0;
    var TnI_sets_by_card_array = new Array (12);

	for (var i = 0; i < 4095; i++) {TnI_sets_arr[i] = ""; TnI_sets_by_card_array[i] = "";}

	for (var i = 1; i < 4096; i++) {
		if (TnI_sets_arr[(i-1)] == "") {
			counter++;

			TnI_sets_arr[i-1] = binary_to_SC_set (i.toString(2));
			inversion_int = inverted_binary_to_integer(i.toString(2));
			var invertedSet = binary_to_SC_set(inversion_int.toString(2));
			var subtraction = pcint_to_int(invertedSet[1]);
			var temp = '[';
			for (var j = 1; j < invertedSet.length-1; j++) {
				temp += int_to_pc_int(pcint_to_int(invertedSet[j]) - subtraction);
			}
			invertedSet = temp +']';
			var setSum = setIntervalSum(TnI_sets_arr[i-1])
			var invertedSum = setIntervalSum(invertedSet);
			var count = (TnI_sets_by_card_array [(TnI_sets_arr[i-1].length - 3)].match(/class="primeForm"/g) || []).length;

			if (count == 0){
					TnI_sets_by_card_array [(TnI_sets_arr[i-1].length - 3)] += '<div class="aRow">';
			}
			if ((count%3 == 0) && (count > 0)) {
				TnI_sets_by_card_array [(TnI_sets_arr[i-1].length - 3)] += '</div><div class="aRow">';
			}
			TnI_sets_by_card_array [(TnI_sets_arr[i-1].length - 3)] += '<span class="primeForm"><span class="scRep">' + TnI_sets_arr[i-1] + "</span>";

			var theOtherSets = '<br><span class="members"><span class="theMembers">';
			var otherSets = [i];

      if (TnI_sets_arr[( (inversion_int%4095)-1)] == "") {
				TnI_sets_arr[( (inversion_int%4095)-1)] = "<br>";

				otherSets.push(inversion_int%4095);

		}


      for (var j = 1; j < 12; j++) {
        if (TnI_sets_arr[( ((i * Math.pow(2,j))%4095)-1)] == "") {
					var y = ( ((i * Math.pow(2,j))%4095));
					TnI_sets_arr[y-1] = "<br>";
						otherSets.push(y);
				}
        if (TnI_sets_arr[( ((inversion_int*Math.pow(2,j))%4095)-1)] == "") {
					var x = ( ((inversion_int*Math.pow(2,j))%4095));
					TnI_sets_arr[x-1] = "<br>";
					otherSets.push(x);
				}
      }
			otherSets.sort(function (a, b) {  return a - b;  });
			for (var q = 0; q < otherSets.length; q++) {
				if ((q%3 == 0) && (q > 0)) {
					theOtherSets += '<br />';
				}

				theOtherSets += binary_to_pc_set(otherSets[q].toString(2)).replace(/[\s]/g , '')+ ', ';

			}
			theOtherSets = theOtherSets.substring(0, theOtherSets.length -2 ) + '</span></span></span>';
			TnI_sets_by_card_array [(TnI_sets_arr[i-1].length - 3)] += theOtherSets;
		}

	}
	var dictionary = {
		0: 'Singletons',
		1: 'Dyads',
		2: 'Trichords',
		3: 'Tetrachords',
		4: 'Pentachords',
		5: 'Hexachords',
		6: 'Heptachords',
		7: 'Octachords',
		8: 'Nonachords',
		9: '10-note chords',
		10: '11-note chords',
		11: 'Aggregate'
	}
	var idBase='card-'
	var plusWidth = parseFloat(faPlus.icon[0]*0.035).toString() + 'px';
	var minusWidth = parseFloat(faMinus.icon[0]*0.035).toString() + 'px';
	var plusSvg = '<svg style="width: '+ plusWidth +'" viewbox="0 0 '+faPlus.icon[0]+ ' ' + faPlus.icon[1]+'"><path d="'+faPlus.icon[4]+'"></path></svg>';
	var minusSvg = '<svg style="width: '+ minusWidth +'" viewbox="0 0 '+faMinus.icon[0]+ ' ' + faMinus.icon[1]+'"><path d="'+faMinus.icon[4]+'"></path></svg>';
    for (var i = 2; i < 9; i++) {
			var numberOfScs = ((TnI_sets_by_card_array[i].match(/class="primeForm"/g)).length).toString()+ ' ';

			ret_str02 += '<h3>' + numberOfScs + dictionary[i] + ' <a class="expand" card="'+(i+1).toString()+'"><span class="plusSvg">'+ plusSvg+'</span><span class="minusSvg">'+ minusSvg+'</span></a></h3>';
			ret_str02 +='<div id="' +idBase+((i+1).toString()) + '">';
			ret_str02 +=  TnI_sets_by_card_array[i] + '</div></div>';
		}

		return ret_str02;

};

/*=================================================================*/

var binary_to_pc_set = function (bin_in) {
	var temp = 0;
	var pc_set = "";
	for (var i = bin_in.length - 1; i >= 0; i--)
	{
		if (bin_in[i] == "1") {pc_set +=  int_to_pc_int((bin_in.length - i - 1));}
	}


return pc_set_pretty (pc_set);

};

/*=================================================================*/

var pc_set_pretty = function (set_in) {

var ret_set = "{";
	for (var i = 0; i < set_in.length - 1; i++)
	{ ret_set += set_in[i] + "," ;}
ret_set += set_in[(set_in.length-1)] + "}";
return ret_set;

};

/*=================================================================*/

var binary_to_SC_set  = function (bin_in) {
	var temp = 0;
	var pc_set = "[";
	for (var i = bin_in.length - 1; i >= 0; i--)
	{
		if (bin_in[i] == "1") {pc_set +=  int_to_pc_int((bin_in.length - i - 1));}
	}


return pc_set + "]";

};

/*=================================================================*/
var SC_pretty = function (SC_in) {

var ret_set = "[";
	for (var i = 0; i < SC_in.length - 1; i++)
	{ ret_set += SC_in[i];}
ret_set += SC_in[(SC_in.length-1)] + "]";
return ret_set;

};

/*=================================================================*/

var int_to_pc_int  = function (int_in) {
	if (int_in < 10) {return int_in;}
	else if (int_in == 10) {return 't';}
	else if (int_in == 11) {return 'e';}
};

/*=================================================================*/

var pcint_to_int  = function (pcint_in) {
    if (pcint_in == 't') {return 10;}
	else if (pcint_in == 'e') {return 11;}
    else {return parseInt(pcint_in);}
};

/*=================================================================*/

var inverted_binary_to_integer = function (binary_in) {
    var integer = 0;
		for (var i = binary_in.length - 1; i >= 0; i--)
		{
				if (binary_in[i] == 1) {integer += Math.pow(2,(11-(binary_in.length - i - 1)));}
		}
		return integer%4095;
	};

/*=================================================================*/

var setIntervalSum  = function (setIn) {

	var pcsOnly = /[0-9te]+/

	if (setIn.length > 2) {
		var pcs = pcsOnly.exec(setIn).toString();

		var sum = 0;
		for (var i =0; i < pcs.length; i++){
			sum+= pcint_to_int(pcs[i]);
		}
	}
	return sum;
};



/*=================================================================*/
var primeFormHandlers = function (){
	$('span.scRep').on('click', function() {
		var $member = $(this).parent().find('span.members');

		if ($member.css('display') == 'none') {
			$member.css('display', 'inline');
			$(this).addClass('focus');
		} else {
			$member.css('display', 'none');
			$(this).removeClass('focus');
		}
	});
	$('a.expand').on('click', function() {
		var active = $(this).hasClass('activated');
		var selector = 'div#card-' + $(this).attr('card').toString();
		var $members = $(selector).find('span.members');
		var $primeForms = $(selector).find('span.scRep');
		if (active) {
			$(this).removeClass('activated');
			$members.css('display', 'none');
			$primeForms.removeClass('focus');
			$(this).find('span.minusSvg').css('display', 'none');
			$(this).find('span.plusSvg').css('display', 'inline-block');
		} else {
			$(this).addClass('activated');
			$members.css('display', 'inline-block');
			$primeForms.addClass('focus');
			$(this).find('span.minusSvg').css('display', 'inline-block');
			$(this).find('span.plusSvg').css('display', 'none	');
		}
	});
};

/*================================ Ember Component ================================*/
export default Component.extend({
  tagName: '',
  didInsertElement() {
		var answer = TnI_SCs();
		var infoWidth = parseFloat(faInfoCircle.icon[0]*0.04).toString() + 'px';
		var display = '<p>List of prime forms<sup><a class="tool-tip small" data-toggle="modal" data-target="#prime-form-list-tip"><svg style="width: '+ infoWidth +'" viewbox="0 0 '+ faInfoCircle.icon[0] + ' ' + faInfoCircle.icon[1] +'"><path class="institution-fill" d="' + faInfoCircle.icon[4]+'"></path</svg></a></sup> for trichords through nonachords.</p>',
    display = display + answer;
    $("#prime-form-list-target").html(display);
    primeFormHandlers();
  },
  actions: {
    toggleVisibility() {
      this.sendAction('action', 'toggleVisibility', '')
    }
  }
});
