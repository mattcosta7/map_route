class Search < ActiveRecord::Base
  has_many :search_locations, dependent: :destroy
  has_many :locations, through: :search_locations
  belongs_to :origin, class_name: :Location
  belongs_to :destination, class_name: :Location
  validates :origin, presence: true
  validates :destination, presence: true
  accepts_nested_attributes_for :origin
  accepts_nested_attributes_for :destination
  accepts_nested_attributes_for :locations

  extend FriendlyId
  friendly_id :generate_custom_slug, use: :slugged
  before_save :create_slug

  scope :search_locations, ->(location){select{|search| search if search.locations.search(location).length>0 || search.origin.address.include?(location) || search.destination.address.include?(location)}}

  def distance_traveled_miles_neat
    (distance_traveled * 0.000621371192).round(5)
  end

  def distance_traveled_neat
    distance_traveled.round(5)
  end

  def autosave_associated_records_for_origin
    if new_origin = Location.find_by_address(origin.address)
      self.origin = new_origin
    else
      self.origin.save!
    end
  end

  def autosave_associated_records_for_destination
    if new_destination = Location.find_by_address(destination.address)
      self.destination = new_destination
    else
      self.destination.save!
    end
  end

  def generate_custom_slug
    "#{origin.address}-#{destination.address}-#{locations.count}waypoints-#{id}".parameterize
  end

  def create_slug
    self.slug = self.generate_custom_slug
  end

end
