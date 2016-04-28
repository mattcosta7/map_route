class AddOriginDestinationToSearches < ActiveRecord::Migration
  def change
    add_reference :searches, :origin, references: :locations
    add_reference :searches, :destination, references: :locations
  end
end
