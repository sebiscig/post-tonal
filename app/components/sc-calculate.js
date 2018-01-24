import Ember from 'ember';

/*=========================== Calculator functions ===========================*/
/*=================================================================*/
 var SC_calculate = function (thePcs)
{

    var pc_set_in = ''
    for (var i = 0; i < thePcs.length; i++) {
      pc_set_in += thePcs[i];
    }


    var SC_representative = "";
    var ret_output = "";

    var bin_set_rep = "";

   bin_set_rep = make_bin_rep_pc_set (pc_set_in);

   var sum = 0;
   for (var i = 0; i < bin_set_rep.length; i++) {sum += Number (bin_set_rep[i]);}


     var set_integer = binary_to_integer (bin_set_rep);
     var inverted_set_integer = inverted_binary_to_integer (bin_set_rep);

     var SC_integer = 0;
     SC_integer = smallest_integer (set_integer, inverted_set_integer);

     SC_representative = create_SC (SC_integer);
     //ret_output = "set {";
	 var pcSet = '{';
   for (var i = 0; i < pc_set_in.length - 1; i++) { pcSet += pc_set_in[i] + ", ";}
	 pcSet += pc_set_in[(pc_set_in.length - 1)] + "}";
   var primeForm = "[" + SC_representative + "]";
     var IC_vector = "";
     IC_vector = '[' + IC_vec_create (SC_representative) + ']';
     //ret_output += "<br>Interval-class vector: [" + IC_vector + "]";

   var returnObject =  {
     'set': pcSet,
     'sc': primeForm,
     "icv": IC_vector
   };
   return returnObject;

};

/*=================================================================*/

var make_bin_rep_pc_set  = function (pc_set_string_in)

{
    var pc_set_arr = new Array(12);
    var temp = 0;


    for (var i = 0; i < 12; i++) {pc_set_arr[i] = 0;}

    for (var i = 0; i < pc_set_string_in.length; i++)
    {
        temp = pc_to_int (pc_set_string_in[i]);
        if ( (temp >= 0) && (temp <= 11)) {pc_set_arr[temp] = 1;}
    }

    var ret_bin_set = "";
    for (var i = 0; i < 12; i++)
    {
        ret_bin_set += pc_set_arr[i];
    }
    return ret_bin_set;

};

/*=================================================================*/

var binary_to_integer = function (binary_in)

{

    var integer = 0;
    for (var i = 0; i < binary_in.length; i++)
    {
        if (binary_in[i] == 1) {integer += Math.pow(2,i);}

    }

    return integer;

};

/*=================================================================*/

var inverted_binary_to_integer = function (binary_in)

{
    var integer = 0;
    for (var i = 0; i < binary_in.length; i++)
    {
        if (binary_in[i] == 1) {integer += Math.pow(2,(11-i));}
    }

    return integer;
};

/*=================================================================*/

var smallest_integer = function(binary_in00, binary_in01)

{
    var temp00 = 0; var temp01 = 0; var smallest = 0;
    temp00 = binary_in00; temp01 = binary_in01;

    if (temp00 <= temp01) {smallest = temp00;}
    else {smallest = temp01;}

    for (var i = 1; i < 12; i++)
    {
        temp00 = binary_in00*Math.pow(2,i)%4095;
        temp01 = binary_in01*Math.pow(2,i)%4095;

        if ( (temp00 <= temp01) && (temp00 <= smallest) ) {smallest = temp00;}
        else if ( (temp00 >= temp01) && (temp01 <= smallest) ) {smallest = temp01;}
    }
    return smallest;
};

/*=================================================================*/

var create_SC = function (integer_in)

{
    var SC_bin_rep = "";
    var SC_class = "";
    var temp = 0;

    SC_bin_rep = integer_in.toString(2);

    for (var i = SC_bin_rep.length - 1; i >= 0; i--)
    {
        if (SC_bin_rep[i] == 1)
        {
        temp = SC_bin_rep.length - 1 - i;
        if (temp == 11) {SC_class += 'e';}
        else if (temp == 10) {SC_class += 't';}
        else {SC_class += temp;}
        }
    }

    return SC_class;

};


/*=================================================================*/

var IC_vec_create  = function (set_in)

{

	var IC_vec = new Array (6);
	var temp = 0;
	var ret_IC_vec = "";
	for (var i = 0; i < 6; i++) {IC_vec[i] = 0;}

	for (var i = 0; i < set_in.length-1; i++)
	{
		for (var j = i+1; j < set_in.length; j++)
		{
			temp = (12 + pc_to_int(set_in[j]) - pc_to_int(set_in[i]))%12;
			if (temp < 7) {IC_vec[(temp-1)]++;}
			else {IC_vec[(11-temp)]++;}
		}
	}


for (var i = 0; i < 6; i++) {ret_IC_vec += IC_vec[i];}

return ret_IC_vec;

};


/*=================================================================*/

var pc_to_int = function (pc_in)
{
    if (pc_in == 't') {return 10;}
    else if (pc_in == 'e') {return 11;}
    else {return Number(pc_in);}

};

/*=================================================================*/

var generatePcSet = function (cardinality) {

  var aggregate = ['0','1','2','3','4','5','6','7','8','9','t','e'];
  var shuffled = aggregate.slice(0), setSize = aggregate.length, min = setSize - cardinality, temp, index;
  while (setSize-- > min) {
    index = Math.floor((setSize + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[setSize];
    shuffled[setSize] = temp;
  }
  return shuffled.slice(min);
};

/*=================================================================*/

export default Ember.Component.extend({
  tagName:  '',
  actions: {
    main(feature) {
      //console.log(feature)
      this.send(feature)
    }, calculator () {
      //console.log(pcs)
      this.sendAction('action', 'setPcs');
      var thePcs = this.get('thePcs')();
      //var thePcs = this.sendAction('action', 'sendPcs');
      var theSC = SC_calculate(thePcs);
      //this.get('showSC')(theSC);
      this.sendAction('action', 'showTheSC', theSC)

    }, generator() {
      var card = parseInt(this.get('cardinality'));
      //console.log(card)
      var pcSet = generatePcSet(card);
      //console.log(pcSet)
      this.sendAction('action', 'showSet', pcSet)

    }
  }
});
