<?

class StringCalculator {
	
	public function __construct($string) {
		$this -> string = $string;
		$this -> raise_if_negatives();
	}
	
	public function raise_if_negatives() {
		if(count($this -> negatives()) > 0) {
			throw new InvalidArgumentException('Negatives not allowed: '.join(',', $this -> negatives()));
		}
	}
	
	public function negatives() {
		return array_filter($this -> elements(), 'StringCalculator::is_negative');
	}
	
	public function elements() {
		return preg_split($this -> delimiters(), $this -> string);
	}
	
	public function numbers() {
		return array_filter($this -> elements(), 'StringCalculator::is_valid');
	}
	
	public function sum() {
		return array_sum( $this -> numbers() );
	}
	
	public function delimiters() {
		if(strpos($this -> string, '//') !== 0) {
			return $this -> default_delimiters();
		}
		
		preg_match_all("/((?:\[)?([^\]]+)(?:\])?)/", substr($this -> string, 2, strpos($this -> string, "\n")-2), $matches, PREG_PATTERN_ORDER);
		return "/".join('|', array_map('preg_quote', $matches[2]))."|\n/";
	}
	
	// STATIC METHODS
	
	public static function is_negative($input) {
		return (intval($input) < 0);
	}
	
	public static function is_valid($input) {
		return (intval($input) > 0 && intval($input) <= 1000);
	}
	
	// PRIVATE METHODS
	
	private function default_delimiters() {
		return '/,|\n/';
	}
	
}