require 'rubygems'
require 'spec'
require 'roman_numeral'

# I = 1
# V = 5
# X = 10
# L = 50
# C = 100
# D = 500
# M = 1000
describe RomanNumeral do
  
  context 'given a single character' do
    it 'returns 1, given I' do
      'I'.from_roman.should == 1
    end
  
    it 'returns 5, given V' do
      'V'.from_roman.should == 5
    end
  
    it 'returns 10, given X' do
      'X'.from_roman.should == 10
    end
  
    it 'returns 50, given L' do
      'L'.from_roman.should == 50
    end
  
    it 'returns 100, given C' do
      'C'.from_roman.should == 100
    end
  
    it 'returns 500, given D' do
      'D'.from_roman.should == 500
    end
  
    it 'returns 1000, given M' do
      'M'.from_roman.should == 1000
    end
  end
  
  it 'returns 2, given II' do
    'II'.from_roman.should == 2
  end
  
  it 'returns 3, given III' do
    'III'.from_roman.should == 3
  end
  
  context 'smaller number followed by larger number' do
    
    it 'returns 4, given IV' do
      'IV'.from_roman.should == 4
    end
    
    it 'returns 9, given IX' do
      'IX'.from_roman.should == 9
    end
    
    it 'returns 19, given XIX' do
      'XIX'.from_roman.should == 19
    end
    
    it 'returns 40, given XL' do
      'XL'.from_roman.should == 40
    end
    
    it 'returns 90, given XC' do
      'XC'.from_roman.should == 90
    end
    
  end
  
  context 'larger number followed by smaller number' do
    
    it 'returns 6, given VI' do
      'VI'.from_roman.should == 6
    end
    
    it 'returns 7, given VII' do
      'VI'.from_roman.should == 6
    end
    
    it 'returns 60, given LX' do
      'LX'.from_roman.should == 60
    end
    
    it 'returns 70, given LXX' do
      'LXX'.from_roman.should == 70
    end
    
    it 'returns 80, given LXX' do
      'LXXX'.from_roman.should == 80
    end
    
  end
  
  # Acceptance test for good measure...
  it 'returns 369, given CCCLXIX' do
    'CCCLXIX'.from_roman.should == 369
  end
  
end