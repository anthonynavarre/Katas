require 'frame'

class Game
  
  def initialize
    @current_frame = Frame.new
    frames.push @current_frame
  end
  
  def gutterball
    roll 0
  end
  
  def strike
    roll 10
  end
  
  def spare
    roll(10 - @current_frame.rolls.first)
  end
  
  def frames
    @frames ||= []
  end
  
  def score
    10.times.inject(0) { |sum, i| sum + (frames[i].score || 0) }
  end
  
  def roll(i)
    if(@current_frame.finished?)
      frames.push @current_frame.next_frame = @current_frame = Frame.new
    end
    @current_frame.roll(i)
  end
  
end