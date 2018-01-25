import Ember from 'ember';

/*=================================================================*/

export default Ember.Component.extend({
	clockVisible: false,
	primeformsVisible: false,
	quizzerVisible: false,
	interaction: '',

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
		setUp(property, feature) {
			//this.send('toggleThisProperty', property);
			

			this.set('interaction', feature);
			this.send('toggleThisProperty', property);
		},
		toggleThisProperty(property) {

			this.toggleProperty(property);
	  },
		passInteraction() {

			return this.interaction;
		},
		scCalculate(pcIn) {
			console.log(pcIn);
		}
  }
});
