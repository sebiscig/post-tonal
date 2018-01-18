import Ember from 'ember';

/*=================================================================*/

export default Ember.Component.extend({
	clockVisible: false,
	primeformsVisible: false,

  actions: {
    hide(id) {
			this.$("#"+id).css('display', 'none');
			var target = '#' + id.substr(0, id.lastIndexOf('-')+1) + 'target';
			this.$(target).html('');
			id == 'twelve-by-matrix' ? this.set('twelveByMatrixIsVisible', false) : this.set('hexAreasIsVisible', false);
			if ((!this.twelveByMatrixIsVisible) && (!this.hexAreasIsVisible)) {
				this.set('serialStuffIsVisible', false);
				this.$("#serial-stuff").css('display', 'none');
			}
		},
		handleSubcomponents(action, params) {
			//console.log('handling set theor subcomps')
			this.send(action, params)
		},
		toggleThisProperty(property) {
			this.toggleProperty(property);
	  }, scCalculate(pcIn) {
			console.log(pcIn);
		}
  }
});
