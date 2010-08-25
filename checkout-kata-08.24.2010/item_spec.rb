require 'rubygems'
require 'spec'
require 'item'

describe 'Item' do
  
  before :each do
    @item = Item.new(:sku => 'A', :price => 50)
  end
  
  context 'with no special quantity or special price set' do
    
    it 'is not on special :-(' do
      item = Item.new(:sku => 'A', :price => 50)
      item.on_special?.should be_false
    end
    
  end
  
  context 'with special quantity and special price set' do
    
    it 'is on special!' do
      item = Item.new(:sku => 'A', :price => 50, :special_price => 1, :special_quantity => 2)
      item.on_special?.should be_true
    end
    
  end
  
end