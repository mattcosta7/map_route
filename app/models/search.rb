class Search < ActiveRecord::Base
  has_many :search_locations, dependent: :destroy
  has_many :locations, through: :search_locations
  accepts_nested_attributes_for :locations

  def distance_traveled_miles_neat
    (distance_traveled * 0.000621371192).round(5)
  end

  def distance_traveled_neat
    distance_traveled.round(5)
  end

end
