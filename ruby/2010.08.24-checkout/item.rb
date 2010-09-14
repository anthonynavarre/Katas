class Item
  
  attr_reader :sku, :price, :special_quantity, :special_price
  def initialize(args)
    @sku, @price, @special_quantity, @special_price = args[:sku], args[:price], args[:special_quantity], args[:special_price]
  end
  
  def on_special?
    @special_price.to_i > 0 && @special_quantity.to_i > 1
  end
   
end