class CollectionFlashcardSerializer < ActiveModel::Serializer
  attributes :id, :name, :subject, :short_description, :count

  has_many :flashcards

  def count
    self.object.flashcards.count
  end
end
