module CodeBreaker
  class Secret

    attr_reader :pattern, :guess_pattern

    def initialize(pattern)
      @pattern = pattern
    end

    def guess(pattern)
      @guess_pattern = pattern
      CodeBreaker::Guess.new(self)
    end

  end
end
