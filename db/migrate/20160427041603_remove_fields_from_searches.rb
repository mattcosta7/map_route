class RemoveFieldsFromSearches < ActiveRecord::Migration
  def change
    remove_column :searches, :address_1, :string
    remove_column :searches, :address_2, :string
    remove_column :searches, :lat1, :float
    remove_column :searches, :lat2, :float
    remove_column :searches, :lng2, :float
    remove_column :searches, :lng1, :float
  end
end
