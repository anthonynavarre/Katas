module RomanNumeral
  
  NUMERALS = {
    :I => 1,
    :V => 5,
    :X => 10,
    :L => 50,
    :C => 100,
    :D => 500,
    :M => 1000
  }
  
  def from_roman
    sum = 0
    characters = split('')
    
    characters.each_index do |index|
      char = characters[index]
      integer = NUMERALS[char.to_sym]
      
      if(index < characters.length-1 && integer < NUMERALS[ characters[index + 1].to_sym ])
        sum -= integer
      else
        sum += integer
      end
    end
    sum
  end
  
end

class String
  include RomanNumeral
end