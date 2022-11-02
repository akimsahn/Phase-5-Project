class Collection < ApplicationRecord
  before_destroy :cleanup_flashcards
  belongs_to :user
  has_many :collection_flashcards, dependent: :destroy
  has_many :flashcards, through: :collection_flashcards

  validates :name, presence: true

  private

  def cleanup_flashcards
    self.flashcards.each { |flashcard|
      if flashcard.collections.count == 1
        flashcard.destroy
      end
    }
  end
end
