class CreateCollectionFlashcards < ActiveRecord::Migration[7.0]
  def change
    create_table :collection_flashcards do |t|
      t.integer :collection_id
      t.integer :flashcard_id
      t.timestamps
    end
  end
end
