import Ember from 'ember';

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
	//for (var i = 1; i < 2; i++) {
		if (TnI_sets_arr[(i-1)] == "") {
			counter++;

			TnI_sets_arr[i-1] = binary_to_SC_set (i.toString(2));
			inversion_int = inverted_binary_to_integer(i.toString(2));
			var invertedSet = binary_to_SC_set(inversion_int.toString(2));
			var subtraction = pcint_to_int(invertedSet[1]);
			//console.log(subtraction);
			var temp = '[';
			for (var j = 1; j < invertedSet.length-1; j++) {
				temp += int_to_pc_int(pcint_to_int(invertedSet[j]) - subtraction);
			}
			invertedSet = temp +']';
			var setSum = setIntervalSum(TnI_sets_arr[i-1])
			var invertedSum = setIntervalSum(invertedSet);
			var count = (TnI_sets_by_card_array [(TnI_sets_arr[i-1].length - 3)].match(/class="primeForm"/g) || []).length;
			//if (count != 0) {console.log(count)};
			//console.log(count);
			if (count == 0){
					TnI_sets_by_card_array [(TnI_sets_arr[i-1].length - 3)] += '<div class="aRow">';
			}
			if ((count%3 == 0) && (count > 0)) {
				TnI_sets_by_card_array [(TnI_sets_arr[i-1].length - 3)] += '</div><div class="aRow">';
			}
			TnI_sets_by_card_array [(TnI_sets_arr[i-1].length - 3)] += '<span class="primeForm"><span class="scRep">' + TnI_sets_arr[i-1] + "</span>";

			var theOtherSets = '<br><span class="members"><span class="theMembers">';
			var otherSets = [i];
      //inversion_int = inverted_binary_to_integer(i.toString(2));

            //ret_str += int_of_an_inversion + "<br>";
      if (TnI_sets_arr[( (inversion_int%4095)-1)] == "") {
				TnI_sets_arr[( (inversion_int%4095)-1)] = "<br>";
				//otherSets.push(binary_to_SC_set((inversion_int%4095).toString(2)));
				otherSets.push(inversion_int%4095);
				//theOtherSets += binary_to_SC_set((inversion_int%4095).toString(2)) + '<br>';
		}


      for (var j = 1; j < 12; j++) {
        if (TnI_sets_arr[( ((i * Math.pow(2,j))%4095)-1)] == "") {
					var y = ( ((i * Math.pow(2,j))%4095));
					TnI_sets_arr[y-1] = "<br>";
					//otherSets.push(binary_to_SC_set(y.toString(2)));
					otherSets.push(y);
					//theOtherSets += binary_to_SC_set(y.toString(2)) + '<br>';


				}
        if (TnI_sets_arr[( ((inversion_int*Math.pow(2,j))%4095)-1)] == "") {
					var x = ( ((inversion_int*Math.pow(2,j))%4095));
					TnI_sets_arr[x-1] = "<br>";
					//otherSets.push(binary_to_SC_set(x.toString(2)));
					otherSets.push(x);
					//theOtherSets += binary_to_SC_set(x.toString(2)) + '<br>';
				}
      }
			//console.log(otherSets, otherSets.sort(function (a, b) {  return a - b;  }))
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
		3: 'Tetrachhords',
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
    for (var i = 2; i < 9; i++) {
			var numberOfScs = ((TnI_sets_by_card_array[i].match(/class="primeForm"/g)).length).toString()+ ' ';
			ret_str02 += '<h3>' + numberOfScs + dictionary[i] + '<sup> <a class="expand" card="'+(i+1).toString()+'"><i class="fa fa-plus"></i></a></sup></h3>';
			ret_str02 +='<div id="' +idBase+((i+1).toString()) + '">';
			ret_str02 +=  TnI_sets_by_card_array[i] + '</div></div>';
		}

		return ret_str02;
  //  ret_str02 += "<br>There are " + counter + " (nonempty) T<sub>n</sub>I set classes.";

	//all_TnI_SCs.innerHTML = "The " + counter + " (nonempty) T<sub>n</sub>/T<sub>n</sub>I set classes<br><br>" + ret_str02;

};

/*=================================================================*/

var binary_to_pc_set = function (bin_in) {
	var temp = 0;
	var pc_set = "";
	for (var i = bin_in.length - 1; i >= 0; i--)
	{
		if (bin_in[i] == "1") {pc_set +=  int_to_pc_int((bin_in.length - i - 1));}
	}

//return pc_set;
return pc_set_pretty (pc_set);
//return ret_pc_set;
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

//return pc_set;
return pc_set + "]";
//return ret_pc_set;
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
		//console.log(setIn)
		var pcs = pcsOnly.exec(setIn).toString();

		var sum = 0;
		for (var i =0; i < pcs.length; i++){
			sum+= pcint_to_int(pcs[i]);
		}
	}
	return sum;
	//console.log(pcs);
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
			$(this).find('i.fa').removeClass('fa-minus').addClass('fa-plus');
		} else {
			$(this).addClass('activated');
			$members.css('display', 'inline-block');
			$primeForms.addClass('focus');
			$(this).find('i.fa').removeClass('fa-plus').addClass('fa-minus');
		}

	});
};

/*=================================================================*/

export default Ember.Component.extend({
  tniSetClass: TnI_SCs(),
  actions: {
    primeFormList() {
      var answer = this.tniSetClass;
    	var counter = (answer.match(/class="primeForm"/g) || []).length;
    	var display = '<p>List of prime forms<sup><a class="tool-tip" data-toggle="modal" data-target="#prime-form-list-tip"><i class="fa fa-info-circle"></i></a></sup> for trichords through nonachords.</p>';

    	display += answer;
    	this.$("#prime-form-list-target").html(display);
      this.$('#prime-form-list').css('display', 'inline-block');
			primeFormHandlers();
    },
    hide(id) {
			this.$("#"+id).css('display', 'none');
			var target = '#' + id.substr(0, id.lastIndexOf('-')+1) + 'target';
			this.$(target).html('');
			id == 'twelve-by-matrix' ? this.set('twelveByMatrixIsVisible', false) : this.set('hexAreasIsVisible', false);
			if ((!this.twelveByMatrixIsVisible) && (!this.hexAreasIsVisible)) {
				this.set('serialStuffIsVisible', false);
				this.$("#serial-stuff").css('display', 'none');
			}
    }
  }
});
