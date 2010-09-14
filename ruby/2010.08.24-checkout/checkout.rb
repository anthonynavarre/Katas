class Checkout
  
  attr_reader :pricings, :scanlog, :total
  
  def initialize(pricings=[])
    @total = 0
    @pricings = pricings
    @scanlog = []
  end
  
  def scan(sku)
    item = lookup(sku)
    @scanlog.push item
    
    if item.on_special? && (quantity(item) % item.special_quantity)==0
      @total = (@total - item.price*(item.special_quantity-1) + item.special_price)
    else
      @total += item.price
    end
    
  end
  
  def quantity(item)
    @scanlog.inject(0){|count,elem| elem == item ? count+1 : count}
  end
  
  def lookup(sku)
    if sku.respond_to? :price
      sku
    else
      @pricings.detect {|p| sku==p.sku }
    end
  end
  
end