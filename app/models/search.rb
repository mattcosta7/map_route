class Search < ActiveRecord::Base
  has_many :search_locations, dependent: :destroy
  has_many :locations, through: :search_locations
  belongs_to :origin, class_name: :Location
  belongs_to :destination, class_name: :Location
  accepts_nested_attributes_for :locations

  # extend FriendlyId
  # friendly_id :generate_custom_slug, use: :slugged
  # before_save :save_slug

  scope :search_locations, ->(location){select{|search| search if search.locations.search(location).length>0}}

  def distance_traveled_miles_neat
    (distance_traveled * 0.000621371192).round(5)
  end

  def distance_traveled_neat
    distance_traveled.round(5)
  end

  # def origin
  #   self.locations.first
  # end
  #
  # def destination
  #   self.locations.last
  # end

  # def generate_custom_slug
  #   "#{origin.address}#{locations.collect{|x| x.address}.join('-')}#{destination.address}#{ '-'+distance_traveled.to_s if distance_traveled}-#{id}".parameterize
  # end
  #
  # def save_slug
  #   self.slug = self.generate_custom_slug
  # end
end
