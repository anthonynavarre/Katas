class Frame
  
  # Add a roll to this frame instance.
  # Return self since this is the primary means
  # of interacting with a Frame instance.
  def roll(i)
    rolls.push i
    self
  end
  
  # Frame#score calculates the score of this frame.
  # Intentionally returns nil for strikes and spares
  # unless the needed subsequent roll(s) 
  def score
    if strike?
      pins + next_two_rolls rescue nil
    elsif spare?
      pins + next_roll rescue nil
    else
      pins
    end
  end
  
  def finished?
    strike? || rolls.length==2
  end
  
  def next_frame=(frame)
    @next_frame = frame
  end
  
  def next_frame
    @next_frame
  end
  
  def rolls
    @rolls ||= []
  end
  
  def pins
    rolls.inject { |sum,n| sum+=n }
  end
  
  def has_next_frame?
    !next_frame.nil?
  end
  
  def next_frame_finished?
    has_next_frame? && next_frame.finished?
  end
  
  def strike?
    rolls.first == 10
  end
  
  def spare?
    pins == 10
  end
  
  def next_roll
    (has_next_frame?) ? next_frame.rolls.first : nil
  end
  
  def next_two_rolls
    if(next_frame_finished?)
      if(next_frame.strike?)
        10 + next_frame.next_roll rescue nil
      else
        next_frame.pins
      end
    else
      nil
    end
  end
  
end