class Location < ActiveRecord::Base
  has_many :search_locations, dependent: :destroy
  has_many :searches, through: :search_locations
end
