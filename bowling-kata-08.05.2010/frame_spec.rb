require 'rubygems'
require 'spec'
require 'frame'

describe Frame, '' do
  
  before :each do
    @f = Frame.new
  end
  
  it "starts with no score" do
    @f.score.should be_nil
  end
  
  it "has a score of 1 after a 1-pin roll" do
    @f.roll 1
    @f.score.should == 1
  end
  
  it "has a score of 9 after 2 rolls, 4 and 5" do
    @f.roll 4
    @f.roll 5
    @f.score.should == 9
  end
  
  context "on a Spare..." do
    
    it "initially has no score" do
      @f.roll 5
      @f.roll 5
      @f.score.should be_nil
    end
    
    it "has a score of 15 after a 5/5 spare followed by a 5-pin roll in the next frame" do
      @f.roll 5
      @f.roll 5
      @f.next_frame = Frame.new
      @f.next_frame.roll 5
      @f.score.should == 15
    end
    
    it "has a score of 15 after a 5/5 spare followed by a 9-pin frame" do
      @f.roll 5
      @f.roll 5
      @f.next_frame = Frame.new
      @f.next_frame.roll 5
      @f.next_frame.roll 9
      @f.score.should == 15
    end
    
  end
  
  context "on a Strike..." do
    
    it "initially has no score" do
      @f.roll 10
      @f.score.should be_nil
    end
    
    it "still has no score after the following roll" do
      @f.roll 10
      @f.next_frame = Frame.new
      @f.next_frame.roll 5
      @f.score.should be_nil
    end
    
    it "has a score of 18 after the following 5/3 frame" do
      @f.roll 10
      @f.next_frame = Frame.new
      @f.next_frame.roll 5
      @f.next_frame.roll 3
      @f.score.should == 18
    end
    
    it "has no score if followed by a strike" do
      @f.roll 10
      @f.next_frame = Frame.new
      @f.next_frame.roll 10
      @f.score.should be_nil
    end
    
    it "has a score of 28 when followed by a strike and then an 8/1 frame" do
      @f.roll 10
      @f.next_frame = Frame.new
      @f.next_frame.roll 10
      @f.next_frame.next_frame = Frame.new
      @f.next_frame.next_frame.roll 8
      @f.next_frame.next_frame.roll 1
      @f.score.should == 28
    end
    
  end
  
  it "returns itself when roll method is accessed" do
    @f.roll(1).should be_kind_of( Frame )
  end
  
end