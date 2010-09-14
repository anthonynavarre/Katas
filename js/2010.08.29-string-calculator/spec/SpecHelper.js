beforeEach(function() {
  this.addMatchers({
	toBeAFunction: function(expectedFunction) {
		var f = this.actual;
		return typeof(f)==='function';
	}
  })
});
