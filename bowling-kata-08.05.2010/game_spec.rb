require 'rubygems'
require 'spec'
require 'game'

describe Game, "of Bowling," do
  
  before :each do
    @game = Game.new
  end
  
  context "Gutter Game" do
    
    before :each do
      20.times { @game.gutterball }
    end
    
    it "has 10 frames" do
      @game.frames.length.should == 10
    end
    
    it "has a score of 0" do
      @game.score.should == 0
    end
    
  end
  
  context "One pin down in each roll" do
    
    before :each do
      20.times { @game.roll 1 }
    end
    
    it "has 10 frames" do
      @game.frames.length.should == 10
    end
    
    it "has a score of 20" do
      @game.score.should == 20
    end
    
  end
  
  context "Initial spare, one pin down in each subsequent roll" do
    
    before :each do
      @game.roll 9
      @game.spare
      18.times { @game.roll 1 }
    end
    
    it "has 10 frames" do
      @game.frames.length.should == 10
    end
    
    it "has a score of 29" do
      @game.score.should == 29
    end
    
  end
  
  context "One pin down in each roll, final spare" do
    
    before :each do
      19.times { @game.roll 1 }
      @game.spare
      @game.roll 1
    end
    
    it "has 11 frames" do
      @game.frames.length.should == 11
    end
    
    it "has a score of 29" do
      @game.score.should == 29
    end
    
  end
  
  context "Initial strike, one pin down in each subsequent roll" do
    
    before :each do
      @game.strike
      18.times { @game.roll 1 }
    end
    
    it "has 10 frames" do
      @game.frames.length.should == 10
    end
    
    it "has a score of 30" do
      @game.score.should == 30
    end
    
  end
  
  context "One pin down in each roll, strike in 10th frame" do
    
    before :each do
      18.times { @game.roll 1 }
      @game.strike
      2.times { @game.roll 1 }
    end
    
    it "has 11 frames" do
      @game.frames.length.should == 11
    end
    
    it "has a score of 30" do
      @game.score.should == 30
    end
    
  end
  
  context "Golden Game (perfect score)" do
    
    before :each do
      12.times { @game.strike }
    end
    
    it "has 12 frames" do
      @game.frames.length.should == 12
    end
    
    it "has a score of 300" do
      @game.score.should == 300
    end
    
  end
  
  context "Nearly Perfect Game (Gutterballs on last frame)" do
    
    before :each do
      10.times { @game.strike }
      2.times { @game.gutterball }
    end
    
    it "has 11 frames" do
      @game.frames.length.should == 11
    end
    
    it "has a score of " do
      @game.score.should == 270
    end
  end
  
end