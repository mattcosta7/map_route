class Search < ActiveRecord::Base
  extend FriendlyId
  friendly_id :generate_custom_slug, use: :slugged
  validates :address_1, presence: true
  validates :address_2, presence: true
  validates :lat1, presence: true
  validates :lat2, presence: true
  validates :lng1, presence: true
  validates :lng2, presence: true


  def distance_traveled_miles_neat
    (distance_traveled * 0.000621371192).round(5)
  end

  def distance_traveled_neat
    distance_traveled.round(5)
  end

  def generate_custom_slug
    "#{id}---#{address_1}-#{address_2}-#{(distance_traveled ? distance_traveled : '')}".gsub(' ','').gsub(',','')
  end
end
