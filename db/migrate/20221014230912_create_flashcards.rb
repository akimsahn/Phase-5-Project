class CreateFlashcards < ActiveRecord::Migration[7.0]
  def change
    create_table :flashcards do |t|
      t.text :question
      t.text :answer
      t.timestamps
    end
  end
end
