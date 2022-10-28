class FlashcardSerializer < ActiveModel::Serializer
  attributes :id, :question, :answer
end
