class Location < ActiveRecord::Base
  has_many :search_locations, dependent: :destroy
  has_many :searches, through: :search_locations

  validates :address, presence: true, on: [:create,:update]
  validates :lat, presence: true, on: [:create,:update]
  validates :lng, presence: true, on: [:create,:update]
  validates_numericality_of :lat, on: [:create,:update]
  validates_numericality_of :lng, on: [:create,:update]
end
