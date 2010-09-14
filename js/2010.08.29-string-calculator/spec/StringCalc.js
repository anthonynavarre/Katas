describe("String Calculator", function() {
	
	it('has a method, add', function(){
		expect("".add).toBeAFunction();
	});
	
	it('returns 0 when given an empty string', function(){
		expect("".add()).toBe(0);
	});
	
	describe('context: 1 number', function(){
		
		it('returns 1 when given "1"', function(){
			expect("1".add()).toBe(1);
		});
	
		it('returns 2 when given "2"', function(){
			expect("2".add()).toBe(2);
		});
		
		it('returns 23 when given "23"', function(){
			expect("23".add()).toBe(23);
		});
		
	});
	
	describe('context: 2 numbers', function(){
		
		it('returns 3 when given "1,2"', function(){
			expect('1,2'.add()).toBe(3);
		});
		
		it('returns 18 when given "9,9"', function(){
			expect("9,9".add()).toBe(18);
		});
		
		it('returns 50 when given "20,30"', function(){
			expect("20,30".add()).toBe(50);
		});
		
		it('returns 50 when given "//[&&&]\\n10&&&40"', function(){
			expect("//[&&&]\n10&&&40".add()).toBe(50	);
		});
		
	});
	
	// This one feels a bit verbose, and perhaps a little obscure about what's
	// going on, but I think it does the trick.
	it('can handle an unknown amount of numbers', function(){
		var rand = function(){
			return Math.floor(Math.random()*10) + 1; // some number between 1 and 10
		}
		var r = s = expected_sum = rand();
		var next_random;
		for(var i=0; i<r; i++) {
			next_random = rand();
			expected_sum += next_random;
			s = s + ',' + next_random;
		}
		expect(s.add()).toBe(expected_sum);
	});
	
	it('treats new-line characters the same as commas', function(){
		expect("1\n2".add()).toBe(3);
	});
	
	it('has a configurable delimiter, using the format: "//[delimiter]\\n[numbers...]"', function(){
		expect("//;\n1;2".add()).toBe(3);
	});
	
	describe('when given negatives...', function(){
		it('throws an error', function(){
			expect(function(){ "-1".add(); }).toThrow('negatives not allowed: -1');
		});

		it('shows the culprit negative number', function(){
			expect(function(){ "1,-2".add(); }).toThrow('negatives not allowed: -2');
		});
		
		it('shows all negative numbers', function(){
			expect(function(){ "-1,-2".add(); }).toThrow('negatives not allowed: -1,-2');
		});
	});
	
	it('ignores numbers larger than 1000', function(){
		expect("2,1001".add()).toBe(2);
	});
	
	it('allows a delimiter of any length, given the format: "//[delimiter]\\n"', function(){
		expect("//[***]\n1***2***3".add()).toBe(6);
	});
	
	it('allows multiple delimiters, given the format: "//[delim1][delim2]\\n"', function(){
		expect("//[*][%]\n1*2%3".add()).toBe(6);
	});
	
	it('allows multiple delimiters of varying length', function(){
		expect("//[**][%]\n1**2%3".add()).toBe(6);
	});
	
	// For good measure...
	it('returns 1015 for "300,600,115"', function(){
		expect("300,600,115".add()).toBe(1015);
	});
	
	it('returns 1015 for "//[aba][cdc]\\n300aba600cdc115"', function(){
		expect("//[aba][cdc]\n300aba600cdc115".add()).toBe(1015);
	});
	
});