class CreateSearches < ActiveRecord::Migration
  def change
    create_table :searches do |t|
      t.string :address_1
      t.string :address_2
      t.float :lat1
      t.float :lng1
      t.float :lat2
      t.float :lng2
      t.float :distance_traveled

      t.timestamps null: false
    end
  end
end
