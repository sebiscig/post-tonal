import Ember from 'ember';

/*=================================================================*/

export default Ember.Component.extend({
	isVisible: {
		clock: false,
		primeForms: false,
		quizzer: false,
	},
	interaction: '',
	startingPointDirection: false,
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

			this.send(action, params)
		},
		setUp(property, feature, startPoint) {
			this.set('interaction', feature);
			this.set('startingPointDirection', startPoint);
			this.send('toggleVisibilities', property);
		},
		toggleVisibilities(property) {

			let that = this;
			Object.keys(this.isVisible).forEach(function(key) {
				that.set('isVisible.'+key, (key == property));
			});
	  },
		passInteraction() {
			return this.interaction;
		}
  }
});
