class SearchLocation < ActiveRecord::Base
  belongs_to :search
  belongs_to :location
end
