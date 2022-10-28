class Collection < ApplicationRecord
  belongs_to :user
  has_many :collection_flashcards, dependent: :destroy
  has_many :flashcards, through: :collection_flashcards

  validates :name, presence: true
end
