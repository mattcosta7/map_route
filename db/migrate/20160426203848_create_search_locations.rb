class CreateSearchLocations < ActiveRecord::Migration
  def change
    create_table :search_locations do |t|
      t.references :search, index: true, foreign_key: true
      t.references :location, index: true, foreign_key: true
      t.integer :order

      t.timestamps null: false
    end
  end
end
