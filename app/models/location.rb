class Location < ActiveRecord::Base
  has_many :search_locations, dependent: :destroy
  has_many :searches, through: :search_locations

  validates :address, presence: true
  validates :lat, presence: true
  validates :lng, presence: true
  validates_numericality_of :lat, on: [:create,:update]
  validates_numericality_of :lng, on: [:create,:update]
end
