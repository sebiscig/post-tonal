import Component from '@ember/component';


/*=========================== Calculator functions ===========================*/
/*=================================================================*/
 var SC_calculate = function (thePcsAndRootFlag)
{

  var thePcs = thePcsAndRootFlag[0]
  var getRoot = thePcsAndRootFlag[1];

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

     var scInfo = {};
     scInfo = getScInfo (set_integer, inverted_set_integer);

     SC_representative = create_SC (scInfo.sc_integer);

  	 var pcSet = '{' + pc_set_in.split('').join(', ') + '}';
     var primeForm = "[" + SC_representative + "]";
     var IC_vector = "";
     IC_vector = '[' + IC_vec_create (SC_representative) + ']';
     var roots = [];
     if (getRoot) {
       roots = findRoots(pc_set_in, SC_representative, scInfo);
     }

     var returnObject =  {
       'set': pcSet,
       'sc': primeForm,
       "icv": IC_vector,
       "roots": (roots.length > 0) ? roots : ''
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

var tnClassIntAndDofS = function (integerIn) {
  var smallest = integerIn;
  var DofS = 1;
  var temp00;
  for (var i = 1; i < 12; i++)
  {
      temp00 = integerIn*Math.pow(2,i)%4095;
      if ( (temp00 <= smallest) ) {
        if (temp00 == smallest) {DofS++;}
        smallest = temp00;
      }
  }
  return [smallest, DofS]
};


/*=================================================================*/

var getScInfo = function(set_integer, inverted_set_integer)

{
    var tnClassInfo = [];
    var tnClassInfoInvertedSet = [];
    var smallest = 0;
    var inversionIsPrime = false;
    tnClassInfo = tnClassIntAndDofS(set_integer);
    tnClassInfoInvertedSet = tnClassIntAndDofS(inverted_set_integer);
    var smallestSetInteger = tnClassInfo[0];
    var smallestInversionInteger = tnClassInfoInvertedSet[0];

    if (smallestSetInteger <= smallestInversionInteger) {
      smallest = smallestSetInteger;
      inversionIsPrime = false;
    } else {
      smallest = smallestInversionInteger;
      inversionIsPrime = true
    };

    var returnObject = {
      'sc_integer': smallest,
      'inversionIsPrime': inversionIsPrime,
      'inversionallySymmetric': (smallestSetInteger == smallestInversionInteger),
      'setDofS': tnClassInfo[1],
      'inversionDofS': tnClassInfoInvertedSet[1]
    }
    return returnObject
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

var findRoots = function(setIn, scIn, scInfoIn) {

    var pcsToLetters = ['C','C#','D','D#','E','F','F#','G','G#','A', 'A#', 'B'];

    var setArr = setIn.split('').map(function(item, index) {
      return pc_to_int(item);
    });
    setArr.sort(function(a,b) {
      return a-b;
    });

    var scArr = scIn.split('').map(function(item, index) {
      return pc_to_int(item);
    });

    var primeFormINT = getInt(scArr, false);
    var startingPoints = [];

    if (setArr.length == scInfoIn.setDofS ) {
      setArr.forEach(function(item) {
        startingPoints.push(pcsToLetters[item] + 'up');
        startingPoints.push(pcsToLetters[item] + 'down');
      });
    }

    if ((scInfoIn.inversionIsPrime) && !(scInfoIn.inversionallySymmetric)) {
      setArr = setArr.reverse();
    }
    startingPoints = getStartingPoints (setArr, primeFormINT, scInfoIn.setDofS, scInfoIn.inversionIsPrime)
    if (scInfoIn.inversionallySymmetric) {
      setArr = setArr.reverse();
      startingPoints = startingPoints.concat(getStartingPoints (setArr, primeFormINT, scInfoIn.inversionDofS, true))
    }

    return startingPoints;

};

/*=================================================================*/
var getInt = function(pcSetIn, down) {
  var theINT = '';
  for (var i = 0; i < pcSetIn.length -1; i++) {
    if (down) {
      theINT += int_to_pc( ((pcSetIn[i] - pcSetIn[i+1] + 12)%12));
    } else {
      theINT += int_to_pc(((pcSetIn[i+1]+12) - pcSetIn[i])%12);
    }
  }
  return theINT;
};

/*=================================================================*/
var getStartingPoints = function (setArrIn, primeFormINTIn, setDofS, isDown) {
  var startingPointsOut = [];
  var pcsToLetters = ['C','C#','D','D#','E','F','F#','G','G#','A', 'A#', 'B'];

  for (var i = 0; i < setArrIn.length; i++) {
    var tempInt = getInt(setArrIn, isDown);

    if (tempInt == primeFormINTIn) {
      startingPointsOut.push(pcsToLetters[setArrIn[0]] + ' ' + ((isDown) ? 'down' : 'up'))
    }
    if (startingPointsOut.length == setDofS) {
      break;
    } else {
      setArrIn.push(setArrIn.shift());
    }
  }
  return startingPointsOut;
};

/*=================================================================*/
var pc_to_int = function (pc_in)
{
    if (pc_in == 't') {return 10;}
    else if (pc_in == 'e') {return 11;}
    else {return Number(pc_in);}

};

/*=================================================================*/

var int_to_pc = function (int_in)
{
    if (int_in == 10) {return 't';}
    else if (int_in == 11) {return 'e';}
    else {return int_in.toString();}

};

/*=================================================================*/

export default Component.extend({
  tagName:  '',
  pcsEntered: [],
  didUpdateAttrs(){
    this.set('pcsEntered', this.get('thePcs'));
  },
  actions: {
    main(feature) {
      this.send(feature)
    }, calculator () {
      this.sendAction('action', 'setPcs');

      var theSC =  SC_calculate(this.get('thePcs')());
      this.sendAction('action', 'showTheSC', theSC)

    }, quizzer() {
      var theSC =  SC_calculate(this.get('thePcs')());
      this.sendAction('action', 'showAnswer', theSC)
    }
  }
});
