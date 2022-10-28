class CollectionSerializer < ActiveModel::Serializer
  attributes :id, :name, :subject, :short_description, :count

  def count
    self.object.flashcards.count
  end
end
