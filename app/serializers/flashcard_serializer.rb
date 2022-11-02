class FlashcardSerializer < ActiveModel::Serializer
  attributes :id, :question, :answer

  has_many :collections
end
