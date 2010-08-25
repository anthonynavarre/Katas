require 'rubygems'
require 'spec'
require 'checkout'
require 'item'

describe 'Checkout' do
  
  RULES = [
    Item.new(:sku => 'A', :price => 50, :special_quantity => 3, :special_price => 130),
    Item.new(:sku => 'B', :price => 30, :special_quantity => 2, :special_price => 45),
    Item.new(:sku => 'C', :price => 20),
    Item.new(:sku => 'D', :price => 15)
  ]
  
  # hat tip to Dave Thomas for price method:
  # http://codekata.pragprog.com/2007/01/kata_nine_back_.html
  def price(goods)
    co = Checkout.new(RULES)
    goods.split(//).each { |item| co.scan(item) }
    co.total
  end
  
  before :each do
    @co = Checkout.new
  end
  
  it 'costs nothing to buy nothing' do
    price('').should == 0
  end
  
  it 'looks up the price of each item' do
    item = mock('item')
    item.should_receive(:price).and_return(1)
    item.should_receive(:on_special?)
    @co.scan(item)
  end
  
  it 'adds the price of 2 items' do
    item_a = mock('item')
    item_b = mock('item')
    
    item_a.should_receive(:price).and_return(50)
    item_a.should_receive(:on_special?)
    
    item_b.should_receive(:price).and_return(50)
    item_b.should_receive(:on_special?)
    
    @co.scan(item_a)
    @co.scan(item_b)
    @co.total.should == 100
  end
  
  it 'honors the unit price for the given rules' do
    # wonder if a test double of some sort makes more sense here...
    pricings = [ Item.new(:sku => 'A', :price => 1234) ]
    
    co = Checkout.new(pricings)
    co.scan('A')
    co.total.should == 1234
  end
  
  context 'with 1 item' do
    
    it 'totals 50 for "A"' do
      price('A').should == 50
    end
    
  end
  
  context 'with 2 items' do
    
    it 'totals 100 for "AA"' do
      price('AA').should == 100
    end
    
    it 'totals 80 for "AB"' do
      price('AB').should == 80
    end
    
    it 'totals 70 for "AC"' do
      price('AC').should == 70
    end
    
    it 'totals 65 for "AD"' do
      price('AD').should == 65
    end
    
    it 'totals 45 for on-special "BB"' do
      price('BB').should == 45
    end
    
  end
  
  context 'with 3 items' do
    
    it 'totals 100 for "ABC"' do
      price('ABC').should == 100
    end
    
    it 'totals 65 for "BCD"' do
      price('BCD').should == 65
    end
    
    it 'totals 60 for "CCC"' do
      price('CCC').should == 60
    end
    
    it 'totals 130 for on-special "AAA"' do
      price('AAA').should == 130
    end
    
    it 'totals 65 for on-special "BB" plus "C"' do
      price('BBC').should == 65
    end
    
    it 'doesn\'t matter what order the on-special items are scanned (BCB still totals 65)' do
      price('BCB').should == 65
    end
    
  end
  
  context 'with 4 items' do
    
    it 'totals 115 for "CDBA"' do
      price("CDBA").should == 115
    end
    
    it 'totals 180 for "AAAA"' do
      price("AAAA").should == 180
    end
    
    it 'totals 145 for "BABA"' do
      price("BABA").should == 145
    end
    
  end
  
  context 'with more than one "set" of on-special items' do
    
    it 'totals 90 for "BBBB"' do
      price("BBBB").should == 90
    end
    
    it 'totals 260 for "AAAAAA"' do
      price("AAAAAA").should == 260
    end
    
  end
  
  it 'has an up-to-date total at any time during scanning' do
    co = Checkout.new(RULES)
    co.total.should == 0
    co.scan('A'); co.total.should == 50
    co.scan('B'); co.total.should == 80
    co.scan('A'); co.total.should == 130
    co.scan('A'); co.total.should == 160
    co.scan('B'); co.total.should == 175
  end
  
end