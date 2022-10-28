class CreateCollections < ActiveRecord::Migration[7.0]
  def change
    create_table :collections do |t|
      t.string :name
      t.string :subject
      t.string :short_description
      t.integer :user_id
      t.timestamps
    end
  end
end
