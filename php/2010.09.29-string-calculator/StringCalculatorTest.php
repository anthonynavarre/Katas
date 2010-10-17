<?

require_once('StringCalculator.php');

class StringCalculatorTest extends PHPUnit_Framework_TestCase {
	
	public function testEmptyString() {
		$calc = new StringCalculator('');
		$this -> assertEquals(0, $calc -> sum());
	}
	
	public function testSingleNumber() {
		$calc = new StringCalculator('1');
		$this -> assertEquals(1, $calc -> sum());
	}
	
	public function testTwoNumbers() {
		$calc = new StringCalculator('1,1');
		$this -> assertEquals(2, $calc -> sum());
	}
	
	public function testThreeNumbers() {
		$calc = new StringCalculator('1,2,3');
		$this -> assertEquals(6, $calc -> sum());
	}
	
	public function testNewlineHandling() {
		$calc = new StringCalculator("1\n2,3");
		$this -> assertEquals(6, $calc -> sum());
	}
	
	public function testCustomDelimiter() {
		$calc = new StringCalculator("//;\n1;2");
		$this -> assertEquals(3, $calc -> sum());
	}
	
	public function testNegativeInputExceptionHandling() {
		$this -> setExpectedException('InvalidArgumentException');
		$calc = new StringCalculator("-1");
	}
		
	public function testNegativeInputExceptionMessage() {
		try {
			$calc = new StringCalculator("-1");
		} catch(InvalidArgumentException $actual) {
			$this -> assertEquals('Negatives not allowed: -1', $actual -> getMessage());
		}
	}
		
	public function testMultipleNegativeInputsExceptionMessage() {
		try {
			$calc = new StringCalculator("-1,2,-3");
		} catch(InvalidArgumentException $actual) {
			$this -> assertEquals('Negatives not allowed: -1,-3', $actual -> getMessage());
		}
	}
	
	public function testIgnoringNumbersLargerThan1000() {
		$calc = new StringCalculator('2,1001');
		$this -> assertEquals(2, $calc -> sum());
	}
	
	public function testVariableLengthCustomDelimiters() {
		$calc = new StringCalculator("//[***]\n1***2***3");
		$this -> assertEquals(6, $calc -> sum());
	}
	
	public function testMultipleCustomDelimiters() {
		$calc = new StringCalculator("//[*][%]\n1*2%3");
		$this -> assertEquals(6, $calc -> sum());
	}
	
	public function testMultipleVariableLengthCustomDelimiters() {
		$calc = new StringCalculator("//[abc][def]\n1def2abc3");
		$this -> assertEquals(6, $calc -> sum());
	}
	
}