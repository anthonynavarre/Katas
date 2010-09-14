require 'rubygems'
require 'spec'
require 'fizzbuzz'

describe FizzBuzz, 'fizzly' do
  
  def fb(times)
    times.times { @call = @f.run }
    @call
  end
  
  before :each do
    @f = FizzBuzz.new
    @call
  end
  
  it 'returns 1 on first call' do
    @f.run.should == 1
  end
  
  it 'returns 2 on 2nd call' do
    fb(2).should == 2
  end
  
  it 'returns fizz on 3rd call' do
    fb(3).should == 'fizz'
  end
  
  it 'returns 4 on 4th call' do
    fb(4).should == 4
  end
  
  it 'returns buzz on 5th call' do
    fb(5).should == 'buzz'
  end
  
  it 'returns fizz on 6th call' do
    fb(6).should == 'fizz'
  end
  
  it 'returns 7 on 7th call' do
    fb(7).should == 7
  end
  
  it 'returns 8 on 8th call' do
    fb(8).should == 8
  end
  
  it 'returns fizz on 9th call' do
    fb(9).should == 'fizz'
  end
  
  it 'returns fizzbuzz on 15th call' do
    fb(15).should == 'fizzbuzz'
  end
  
end