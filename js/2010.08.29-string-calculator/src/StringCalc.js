// @return RegExp delimiters
String.prototype.delimiters = function(){
	if(typeof(this.delimiter_set) === 'undefined') {
		this.delimiter_set = /,|\n/;
		
		var matches;
		if(matches = this.valueOf().match(/^\/\/(.)\n/)) { return matches[1]; }
		
		if(matches = this.valueOf().match(/(?:\[)([^\]]+)(?:\])/g)) {
			var match_set = [];
			for(var m in matches) {
				match_set.push( matches[m].replace(/\[|\]/g, '').replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") );
			}
			
			this.delimiter_set = new RegExp( match_set.join('|') );
		}
	}
	return this.delimiter_set
};
String.prototype.negatives = function(){
	return this.valueOf().match(/\-./g);
};
String.prototype.numbers = function(){
	if(typeof(this.number_set) === 'undefined') {
		this.number_set = [];
		var n;
		var parts = this.split( this.delimiters() );
		for(var i in parts) {
			n = parseInt( parts[i].match(/\d+/), 10 );
			if(isNaN(n) || n > 1000) { continue; }
			this.number_set.push(n);
		}
	}
	return this.number_set;
};
String.prototype.raiseIfNegatives = function() {
	if(this.negatives()!==null) { throw new TypeError('negatives not allowed: ' + this.negatives().join(',')); }
};
String.prototype.add = function(){
	this.raiseIfNegatives();
	
	var ret = 0;
	for(var i in this.numbers()) { ret += this.numbers()[i]; }
	return ret;
};