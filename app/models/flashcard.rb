class Flashcard < ApplicationRecord
  has_many :collection_flashcards, dependent: :destroy
  has_many :collections, through: :collection_flashcards

  def only_collection_user_id
    if self.collections.count == 1
      return self.collections.last.user.id
    else
      return nil
    end
  end
end
