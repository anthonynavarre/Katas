require 'benchmark'
module CodeBreaker
  class Guess

    attr_reader :hits, :matches

    def initialize(secret)
      @guess = secret.guess_pattern
      @secret = secret.pattern
      @hits = 0
      @matches = 0
      analyze_guess
    end

    protected

    def analyze_guess
      @guess.each_with_index do |token, index|
        if(token == @secret[index])
          @hits += 1
        elsif(@secret.include? token)
          @matches += 1
        end
      end
    end

  end
end
