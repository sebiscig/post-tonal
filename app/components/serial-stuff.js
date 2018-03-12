import Ember from 'ember';

var make_matrix = function (row_in, isLetterNames) {

	var webernOp25 = ['7436152et098', 't7694852130e', 'e87t59632410', '85472630e1t9', '1t907e854632', '9658374102et', '098e6t743521', '30e291t76854', '4103t2e87965', '2et180965743', '5214e3098t76', '6325041t9e87', '7te819034256', '4785t6901e23', '3674958e0t12', '69t708e23145', '14527369t8e0', '5896e7t12034', '2563847te901', 'e2305147869t', 't12e40367589', '0341625897te', '901t3e256478', '8e092t145367'];

	var rowInRetrograde = row_in.split('').reverse().join('');

	if ((webernOp25.indexOf(row_in) > -1) || (webernOp25.indexOf(rowInRetrograde) > -1)) {
		return 'Please complete the matrix for Assignment #7 on your own.'
	}

	var ret_matrix = "";
	var row_arr = row_arr_maker (row_in);

	if (row_arr.length > 12) {ret_matrix = row_arr;}

	else if (row_arr.length == 12)
		{
			var temp_matrix = matrix_array_maker (row_arr);

			ret_matrix = matrix_table_maker (temp_matrix, isLetterNames);
		}

    return ret_matrix;
};

/*=================================================================*/

var matrix_array_maker = function (row_arr_in) {
	var ret_array = new Array (12);
	var ret_mat = "";

	for (var i = 0; i < 12; i++) {ret_array[i] = new Array (12);}

	for (var i = 0; i < 12; i++)
	{
		for (var j = 0; j < 12; j++) {ret_array[i][j] = (row_arr_in[j] + (row_arr_in[0] - row_arr_in[i] + 12))%12;}
	}

	return ret_array;
};



/*=================================================================*/

var matrix_table_maker = function (matrix_arr_in, isLetterNames) {
	//var spacing = (isLetterNames) ? '150' : '5'
	//console.log(spacing);

	var ret_table = '<table cellspacing="5"><tr><td class="noborder"></td>';

	for (var i = 0; i < 12; i++)
	{
		ret_table += "<td class=" + '"' + "noborder" + '"' + ">I<sub>" + pcint_to_char(matrix_arr_in[0][i], false) + "</sub></td>";
	}

	ret_table += "</tr>";

	for (var i = 0; i < 11; i++)
	{
    var trOpening = i%2 == 0 ? '<tr class="colored">' : '<tr>';
		ret_table += trOpening +"<td class=" + '"' + "noborder" + '"' + ">P<sub>" + pcint_to_char(matrix_arr_in[i][0], false) + "</sub></td>";
		for (var j = 0; j < 12; j++)
		{
			ret_table += '<td class="clickable" row="' +i.toString() + '" column="' + j.toString() + '">' + pcint_to_char(matrix_arr_in[i][j], isLetterNames) + "</td> ";
		}
		ret_table += "</tr>";
	}

	ret_table += "<tr><td class=" + '"' + "noborder" + '"' + ">P<sub>" + pcint_to_char(matrix_arr_in[i][0], false) + "</sub></td>";
	for (var j = 0; j < 12; j++)
	{
		ret_table += '<td row="11" class="clickable" column="' + j.toString()+'">' + pcint_to_char(matrix_arr_in[11][j], isLetterNames) + "</td> ";
	}
	ret_table += "</tr></table>";


	return ret_table;
};


/*=================================================================*/

var pcint_to_char = function(pcint_in, isLetterNames) {
	var pcLetterNames = ['C', 'C<span class="sharp"></span>', 'D', 'D<span class="sharp"></span>', 'E', 'F', 'F<span class="sharp"></span>', 'G', 'G<span class="sharp"></span>', 'A', 'A<span class="sharp"></span>', 'B']
	if (isLetterNames) {
		return pcLetterNames[pcint_in]
	} else {
		if (pcint_in == 10) {return 't';}
		else if (pcint_in == 11) {return 'e';}
		else {return pcint_in;}

	}
};

/*=================================================================*/

var letterToPcInt = function(letterNameIn) {
	var mapping = {
		'C': '0',
		'C<span class="sharp"></span>': '1',
		'D': '2',
		'D<span class="sharp"></span>': '3',
		'E': '4',
		'F': '5',
		'F<span class="sharp"></span>': '6',
		'G': '7',
		'G<span class="sharp"></span>': '8',
		'A': '9',
		'A<span class="sharp"></span>': 't',
		'B': 'e'
	};
	return mapping[letterNameIn];
};

/*=================================================================*/

var row_arr_maker = function (row_in, isPcInts) {

	var ret_row = "";
	var row_arr = new Array (12);
	var agg_arr = new Array (12);
	for (var i = 0; i < 12; i++) {agg_arr[i] = 0;}

	if (row_in.length < 12) {ret_row = "You entered fewer than twelve pitch classes.";}
	else if (row_in.length > 12) {ret_row = "You entered more than twelve pitch classes.";}
	else if (row_in.length == 12)
	{
		for (var i = 0; i < row_in.length; i++)
		{
			if (agg_arr[pc_to_int(row_in[i])] == 0)
			{
				row_arr[i] = pc_to_int(row_in[i]);
				agg_arr[pc_to_int(row_in[i])] = 1;
				//				ret_matrix += row_arr[i] + ", ";
			}
			else if (agg_arr[pc_to_int(row_in[i])] == 1) {ret_row = "You duplicated one or more pitch classes"; break;}
		}
	}

	if (ret_row.length == 0) {return row_arr;}
	else {return ret_row;}
};

/*=================================================================*/

var pc_to_int = function (pc_in) {
    if (pc_in == 't') {return 10;}
    else if (pc_in == 'e') {return 11;}
    else {return Number(pc_in);}

};

/*=================================================================*/

var IH_combo_test = function (row_in)


{
	//var row_in = document.getElementById("row").value;
	var hex_combo_answer = "";

	var row_arr = row_arr_maker (row_in);

	if (row_arr.length > 12) {ans = row_arr;}
	else if (row_arr.length == 12)
	{
		var ans = IH_combo_process (row_arr);

	}

	return ans;
};

/*=================================================================*/


var IH_combo_process = function (row_arr_in) {
	var hex_A_as_int = 0;
	var hex_A_inv_as_int = 0;
	for (var i = 0; i < 6; i++) {hex_A_as_int += 1<<row_arr_in[i];}
	for (var i = 0; i < 6; i++) {hex_A_inv_as_int += 1<<((12 - row_arr_in[i])%12);}

	var hex_A_complement_as_int = 4095 - hex_A_as_int;

	var temp_reg = 0;
	var temp_inv = 0;
	var ret_ans = 3;

	var string = "";
  //  alert (hex_A_inv_as_int);

	for (var i = 0; i <= 11; i++)
	{
		//temp_reg = (hex_A_as_int<<i)%4095;
		temp_inv = (hex_A_inv_as_int<<i)%4095;

		if ((temp_inv == hex_A_complement_as_int) || (temp_inv == hex_A_as_int) )/*checks whether hexachord TnIs onto complement or self; if yes, it's IH-combinatorial or RIH-combinatorial*/
	{ret_ans = 1; break;}
		else {ret_ans = 0;}
	}
 //   alert (hex_A_inv_as_int);
	if (ret_ans == 0) {
    for (var i = 0; i <= 11; i++)
    {

    temp_inv = (hex_A_as_int<<i)%4095;

		if ( ( (temp_inv == hex_A_as_int) && (i > 0)) ||(temp_inv == hex_A_complement_as_int)) /*checks whether hexachord Tns onto self or complement; if yes, it's PH-combinatorial or RH-Combinatorial*/
	{ret_ans = 1; break;}
		else {ret_ans = 0;}


    }
    }
    if (ret_ans == 0) { return "Sorry, this row does not possess any hexachordal combinatoriality.";}
	if (ret_ans == 1)
	{
		var ret_areas = make_areas_process (row_arr_in);


		return ret_areas;
	}
};

/*=================================================================*/

var make_areas_process = function (row_in) {

	var counter = 0;

	var hex_A_inv_as_int = 0;
	var hex_A_as_int = 0;
	var j = 0;
	var k = 0;
	var l = 0;
	var m = 0;

	var Tns_of_I = new Array();
	var Tns_of_P = new Array();
	var Tns_of_R = new Array();
	var Tns_of_RI = new Array();
	//var H_combo_vals = new Array();
	var ret_array = new Array();

	for (var i = 0; i < 6; i++) {hex_A_inv_as_int += 1<<((12 - row_in[i])%12); hex_A_as_int += 1<<row_in[i];}

	var hex_A_complement_as_int = 4095 - hex_A_as_int;

	var temp_inv = 0;
	var temp_reg = 0;

	for (var i = 0; i <= 11; i++)
	{
		temp_reg = (hex_A_as_int<<i)%4095;
		temp_inv = (hex_A_inv_as_int<<i)%4095;

		if (temp_inv == hex_A_complement_as_int) {Tns_of_I[j] = i; j++;}
		if (temp_reg == hex_A_complement_as_int) {Tns_of_P[k] = i; k++;}
		if ( (temp_reg == hex_A_as_int) && (i != 0)) {Tns_of_R[l] = i; l++;}
		if (temp_inv == hex_A_as_int) {Tns_of_RI[m] = i; m++;}
	}

//	H_combo_vals[0] = Tns_of_I; H_combo_vals[1] = Tns_of_P;

	ret_array = make_areas (row_in, Tns_of_I, Tns_of_P, Tns_of_R, Tns_of_RI);


	return ret_array;
};

/*=================================================================*/

var make_areas = function (row_in, Tns_of_I, Tns_of_P, Tns_of_R, Tns_of_RI) {
	var P_forms = new Array();
	var I_forms = new Array();
	var R_forms = new Array();
	var RI_forms = new Array();

	var temp_arr = new Array(12);

	var I_form_array = new Array(12);
	var R_form_array = new Array(12);
	var RI_form_array = new Array(12);

	for (var i = 0; i < 12; i++)
	{
		I_form_array[i] = (12 - row_in[i])%12;
		R_form_array[(11-i)] = row_in[i];
		RI_form_array[(11-i)] = I_form_array[i];
	}

    var lengths_of_Tns = [Tns_of_I.length, Tns_of_P.length, Tns_of_R.length, Tns_of_RI.length];
    lengths_of_Tns.sort();
 //   alert (lengths_of_Tns[3]);

	for (var i = 0; i < lengths_of_Tns[3]; i++)
	{

        if (i < Tns_of_I.length)
		{
        temp_arr = transpose_row (I_form_array, Tns_of_I[i]);
		I_forms[i] = temp_arr;
        }

		if (i < Tns_of_P.length)
		{
			temp_arr = transpose_row (row_in, Tns_of_P[i]);
			P_forms[i] = temp_arr;
		}

		if (i < Tns_of_R.length)
		{
			temp_arr = transpose_row (R_form_array, Tns_of_R[i]);
			R_forms[i] = temp_arr;

		}

		if (i < Tns_of_RI.length)
		{
			temp_arr = transpose_row (RI_form_array, Tns_of_RI[i]);
			RI_forms[i] = temp_arr;
		}
	}


	var ret_table = make_areas_table (row_in, I_forms, P_forms, R_forms, RI_forms);

	return ret_table;
};

/*=================================================================*/

var transpose_row = function (row_in, Tn_in) {
	var Tn_arr = new Array();


	for (var i = 0; i < 12; i++) {Tn_arr[i] = (row_in[i] + Tn_in)%12;}
	return Tn_arr;
};

/*=================================================================*/

var make_areas_table = function (row_in, I_forms, P_forms, R_forms, RI_forms) {

	var lengths_of_Tns = [I_forms.length, P_forms.length, R_forms.length, RI_forms.length];
    lengths_of_Tns.sort();
//    alert (lengths_of_Tns[3]);
    var x = 12 / (lengths_of_Tns[3] + P_forms.length);
	var temp_str = "";

	var ret_table = "<table cellspacing = "+'"'+"5"+'"'+ ">";

	for (var i = 0; i < x; i++)
	{
		ret_table += "<tr class=" + '"' + "topborder" + '"' + "><td class=" + '"' + "noborder" + '"' + ">Hexachordal Area " + i + "</td></tr>";
		ret_table += "<tr class=" + '"' + "noborder" + '"' + "><td class=" + '"' + "noborder" + '"' + ">P<sub>" + pcint_to_char(((row_in[0] + i))%12) + "</sub>: <<span class='bold'> ";
		var temp_arr = transpose_row (row_in, i);
		for (var j = 0; j < 11; j++) {
        ret_table += pcint_to_char(temp_arr[j]) + ", ";
        if (j == 5) {ret_table += "</span>";}
        }
		ret_table += pcint_to_char(temp_arr[11]) + " ></td></tr>";

		for (var j = 0; j < lengths_of_Tns[3]; j++)
		{


			if ( (I_forms.length > 0) && (j < I_forms.length))
            {

            temp_arr = transpose_row (I_forms[j], i);
			temp_str = make_table_row ("I", temp_arr);
			ret_table += temp_str;
            }


			if ( (P_forms.length > 0) && (j < P_forms.length))
			{

				temp_arr = transpose_row (P_forms[j], i);
				temp_str = make_table_row ("P", temp_arr);
				ret_table += temp_str;

			}

			if ( (R_forms.length > 0) && (j < R_forms.length) )
			{

				temp_arr = transpose_row (R_forms[j], i);
				temp_str = make_table_row ("R(P", temp_arr);
				ret_table += temp_str;

			}

			if ( (RI_forms.length > 0) && (j < RI_forms.length))
			{

				temp_arr = transpose_row (RI_forms[j], i);
				temp_str = make_table_row ("R(I", temp_arr);
				ret_table += temp_str;
			}

		}

	}

	return ret_table;
};

/*=================================================================*/

var make_table_row = function (form_in, row_in) {
	var ret_string = "";
	var temp_arr;

	if ( (form_in == "P") || (form_in == "I") )
	{
		ret_string += "<tr class=" + '"' + "noborder" + '"' + "><td class=" + '"' + "noborder" + '"' + ">" + form_in + "<sub>" + pcint_to_char(row_in[0]) + "</sub>: < ";
		for (var i = 0; i < 11; i++)
        {
        ret_string += pcint_to_char(row_in[i]) + ", ";
        if (i == 5) {ret_string += "<span class='bold'>";}
        }
		ret_string += pcint_to_char(row_in[11]) + " </span>></td></tr>";
		return ret_string;
	}

	else if ((form_in == "R(P") || (form_in == "R(I") )
	{
		ret_string += "<tr class=" + '"' + "noborder" + '"' + "><td class=" + '"' + "noborder" + '"' + ">" + form_in + "<sub>" + pcint_to_char(row_in[11]) + "</sub>): < ";
		for (var i = 0; i < 11; i++)
        {
        ret_string += pcint_to_char(row_in[i]) + ", ";
        if (i == 5) {ret_string += "<span class='bold'>";}
        }
		ret_string += pcint_to_char(row_in[11]) + " </span>></td></tr>";
		return ret_string;
	}
}

/*=================================================================*/
var getAttribute = function (boldedCellsIn) {
	var theColumn = boldedCellsIn.first().attr('column');
	var theRow = boldedCellsIn.first().attr('row');
	var colCount = boldedCellsIn.filter(function () {
		return $(this).attr('column') == theColumn;
	}).length;
	var rowCount = boldedCellsIn.filter(function () {
		return $(this).attr('row') == theRow;
	}).length;
	return colCount > rowCount ? 'column' : 'row';
};

/*=================================================================*/

var getLocationsOfSegment = function (rowIn, nowBoldedIn, indexIn, sortedStringIn, isLetterNames) {
	var ops = [];
	var tempString = '';
	rowIn.each(function () {
		tempString += isLetterNames ? letterToPcInt($(this).text()): $(this).text();
	});
	for (var i = 0; i < 13 - nowBoldedIn.length; i++) {
		var segment = '';
		for (var j = 0; j < nowBoldedIn.length; j++) {
			segment +=  tempString[i+j];
			segment = segment.split('').sort().join('');
			if (segment == sortedStringIn) {
				ops.push([indexIn.toString(), i.toString()]);
			}
		}
	}
	return ops;
};

/*=================================================================*/

var addTheClass = function (opsArrayIn, nowBoldedIn, attributeIn, otherAttributeIn, classToAdd) {
	for (var j = 0; j < opsArrayIn.length; j++) {
		var array = opsArrayIn[j];
		for (var i = parseInt(array[1]); i < parseInt(array[1]) + nowBoldedIn.length; i++) {
			var entry = $("td").filter(function() {
				return (($(this).attr(attributeIn) == array[0]) && ($(this).attr(otherAttributeIn) == i.toString()));
			});
			entry.addClass(classToAdd);
		}
	}
};

/*=================================================================*/

function tableHandler(isLetterNames)  {
	$("#twelve-by-matrix td.clickable").on('click', function() {

		var boldedCells = $("td").filter(function (){
			return $(this).hasClass('bold');
		});

		var that = $(this);
		if (boldedCells.length == 0) {
			$(this).addClass('bold');
		} else if (boldedCells.length == 1) {
			var currentColumn = parseInt($(this).attr('column'));
			var firstColumn = parseInt(boldedCells.first().attr('column'));
			var currentRow =  parseInt($(this).attr('row'));
			var firstRow = parseInt(boldedCells.first().attr('row'));
			if ( ((currentColumn == firstColumn) && (Math.abs(currentRow - firstRow) == 1)) || ((currentRow == firstRow) && (Math.abs(currentColumn - firstColumn) == 1))) {
				$(this).addClass('bold');
			}
		}	else {

			var attribute = getAttribute (boldedCells);
			var otherAttribute = attribute == 'column' ? 'row' : 'column';
			var clickedAttr = parseInt($(this).attr(attribute));
			var clickedOtherAttr = parseInt($(this).attr(otherAttribute));
			if ($(this).attr(attribute) != boldedCells.first().attr(attribute)) {
				return;
			} else {
				boldedCells.each(function() {
					var tempAttr = parseInt($(this).attr(attribute));
					var tempOtherAttr = parseInt($(this).attr(otherAttribute));
					if ((clickedAttr == tempAttr) && (Math.abs(tempOtherAttr - clickedOtherAttr) == 1)) {
						that.addClass('bold');
					}
				});
			}
		}
		var nowBolded = $("td").filter(function() {
			return $(this).hasClass('bold');
		});
		var string = '';
		nowBolded.each(function() {

			string += isLetterNames ? letterToPcInt($(this).text()): $(this).text();
		});
		var sortedString = string.split('').sort().join('');
		//console.log(sortedString);

		if (nowBolded.length > 1) {
			var attribute = getAttribute (nowBolded);
			var otherAttribute = attribute == 'column' ? 'row' : 'column';
			var attributeValue = nowBolded.first().attr(attribute);
			var attributeOps = [];
			var otherAttributeOps = [];
			for (var i = 0; i < 12; i++) {
				var temp = $("td").filter(function() {
					return $(this).attr(attribute) == i.toString();
				});
				//console.log(temp);

				var theArray = getLocationsOfSegment (temp, nowBolded, i, sortedString, isLetterNames);
				if (theArray.length > 0) {
					attributeOps = attributeOps.concat(theArray);
				}

				var tempOther = $("td").filter(function() {
					return $(this).attr(otherAttribute) == i.toString();
				});

				var theOtherArray = getLocationsOfSegment (tempOther, nowBolded, i, sortedString, isLetterNames);
				if (theOtherArray.length > 0) {
					otherAttributeOps = otherAttributeOps.concat(theOtherArray);
				}
			}
			$("td.highlight").removeClass('highlight');
			$('td.other').removeClass('other');
			addTheClass(attributeOps, nowBolded, attribute, otherAttribute, 'highlight');
			addTheClass(otherAttributeOps, nowBolded, otherAttribute, attribute, 'other');
		}
	});
};

/*=================================================================*/

export default Ember.Component.extend({
  serialStuffIsVisible: false,
	twelveByMatrixIsVisible: false,
	hexAreasIsVisible: false,
	isLetterNames: false,
  actions: {
    twelveByMatrix() {
			//console.log(Ember.$('input[name="isPcInts"]:checked').val());
			this.set('isLetterNames', (Ember.$('input[name="isLetterNames"]:checked').val()) == 'true');
      var row = this.$("#row").val();
      var matrix = make_matrix(row, this.isLetterNames);
			if (!this.serialStuffIsVisible) {
				this.toggleProperty('serialStuffIsVisible');
				this.$("#serial-stuff").css('display', 'inline-block');
			}
			this.set('twelveByMatrixIsVisible', true);
			this.$("#twelve-by-matrix").css('display', 'inline-block')
			this.$("#twelve-by-target").html(matrix);
			//radioButtonHandler();
			tableHandler(this.isLetterNames);
    },
		hexAreas() {
			var row = this.$("#row").val();
			var hexachordalAreas = IH_combo_test(row);
			if (!this.serialStuffIsVisible) {
				this.toggleProperty('serialStuffIsVisible');
				this.$("#hex-areas").css('display', 'inline-block')
				this.$("#serial-stuff").css('display', 'inline-block')
			}
			this.set('hexAreasIsVisible', true);
			this.$("#hex-areas").css('display', 'inline-block')
			this.$("#hex-target").html(hexachordalAreas);
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
