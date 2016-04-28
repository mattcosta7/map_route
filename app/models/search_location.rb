class SearchLocation < ActiveRecord::Base
  belongs_to :search
  belongs_to :location

  validates :search, presence: true
  validates :location, presence: true
end
