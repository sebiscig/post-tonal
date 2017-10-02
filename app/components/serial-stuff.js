import Ember from 'ember';

var make_matrix = function () {
	var row_in = document.getElementById("row").value;
	var ret_matrix = "";
	var row_arr = row_arr_maker (row_in);

	if (row_arr.length > 12) {ret_matrix = row_arr;}

	else if (row_arr.length == 12)
		{
			var temp_matrix = matrix_array_maker (row_arr);

			ret_matrix = matrix_table_maker (temp_matrix);
		}

    return ret_matrix;

	//matrix.innerHTML = ret_matrix;
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

var matrix_table_maker = function (matrix_arr_in) {

	var ret_table = "<table cellspacing = "+'"'+"5"+'"'+"><tr><td class=" + '"' + "noborder" + '"' + "></td>";

	for (var i = 0; i < 12; i++)
	{
		ret_table += "<td class=" + '"' + "noborder" + '"' + ">I<sub>" + pcint_to_char(matrix_arr_in[0][i]) + "</sub></td>";
	}

	ret_table += "</tr>";

	for (var i = 0; i < 11; i++)
	{
    var trOpening = i%2 == 0 ? '<tr class="colored">' : '<tr>';
		ret_table += trOpening +"<td class=" + '"' + "noborder" + '"' + ">P<sub>" + pcint_to_char(matrix_arr_in[i][0]) + "</sub></td>";
		for (var j = 0; j < 12; j++)
		{
			ret_table += "<td>" + pcint_to_char(matrix_arr_in[i][j]) + "</td> ";
		}
		ret_table += "</tr>";
	}

	ret_table += "<tr><td class=" + '"' + "noborder" + '"' + ">P<sub>" + pcint_to_char(matrix_arr_in[i][0]) + "</sub></td>";
	for (var j = 0; j < 12; j++)
	{
		ret_table += "<td>" + pcint_to_char(matrix_arr_in[11][j]) + "</td> ";
	}
	ret_table += "</tr>";


	return ret_table;
};


/*=================================================================*/

var pcint_to_char = function(pcint_in) {

	if (pcint_in == 10) {return 't';}
	else if (pcint_in == 11) {return 'e';}
	else {return pcint_in;}
};

/*=================================================================*/

var row_arr_maker = function (row_in) {

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

export default Ember.Component.extend({
  serialStuffIsVisible: false,
  actions: {
    twelveByMatrix() {
      var row = this.$("#row").val();
      var matrix = make_matrix(row);
      this.$("#twelve-by-matrix").html(matrix);
      if (!this.serialStuffIsVisible) {
        this.$("#serial-stuff").css('display', 'inline-block');
        this.set('serialStuffIsVisible', true);
      }
    }
  }
});
