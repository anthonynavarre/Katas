class FizzBuzz
  
  def initialize
    @calls = 0
  end
  
  def run
    @calls += 1
    if(@calls % 3 == 0 && @calls % 5 == 0)
      'fizzbuzz'
    elsif(@calls % 3 == 0)
      'fizz'
    elsif(@calls % 5 == 0)
      'buzz'
    else
      @calls
    end
  end
  
end