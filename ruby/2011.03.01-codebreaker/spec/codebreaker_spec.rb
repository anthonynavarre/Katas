require 'rspec'
require 'codebreaker'

describe CodeBreaker::Secret do

  let(:secret) { CodeBreaker::Secret.new( %w(r y g b) ) }

  context 'with an incorrect guess' do
    subject { secret.guess %w(c c m o) }

    its(:matches) { should == 0 }
    its(:hits) { should == 0 }
  end

  context 'with 1 correct guess out of place' do
    subject { secret.guess %w(y c m o) }

    its(:matches) { should == 1 }
    its(:hits) { should == 0 }
  end

  context 'with 2 correct guesses' do

    context 'when both are out of place' do
      subject { secret.guess %w(y r m o) }

      its(:matches) { should == 2 }
      its(:hits) { should == 0 }
    end

    context 'when 1 is in the correct place' do
      subject { secret.guess %w(r m y o) }

      its(:matches) { should == 1 }
      its(:hits) { should == 1 }
    end

    context 'when both are in the correct place' do
      subject { secret.guess %w(r y m o) }

      its(:matches) { should == 0 }
      its(:hits) { should == 2 }
    end

  end

  context 'with 3 correct guesses' do

    context 'when none are in the correct place' do
      subject { secret.guess %w(y g b o) }

      its(:matches) { should == 3 }
      its(:hits) { should == 0 }
    end

    context 'when 1 is in the correct place' do
      subject { secret.guess %w(y g o b) }

      its(:matches) { should == 2 }
      its(:hits) { should == 1 }
    end

    context 'when 2 are in the correct place' do
      subject { secret.guess %w(g y o b) }

      its(:matches) { should == 1 }
      its(:hits) { should == 2 }
    end

    context 'when all are in the correct place' do
      subject { secret.guess %w(o y g b) }

      its(:matches) { should == 0 }
      its(:hits) { should == 3 }
    end

  end

  context 'with 4 correct guesses' do

    context 'when none are in the correct place' do
      subject { secret.guess %w(y g b r) }

      its(:matches) { should == 4 }
      its(:hits) { should == 0 }
    end

    context 'when 1 is in the correct place' do
      subject { secret.guess %w(y g r b) }

      its(:matches) { should == 3 }
      its(:hits) { should == 1 }
    end

    context 'when 2 are in the correct place' do
      subject { secret.guess %w(g y r b) }

      its(:matches) { should == 2 }
      its(:hits) { should == 2 }
    end

    context 'when all are in the correct place' do
      subject { secret.guess %w(r y g b) }

      its(:matches) { should == 0 }
      its(:hits) { should == 4 }
    end

  end

end

