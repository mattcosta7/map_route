json.array!(@searches) do |search|
  json.extract! search, :id, :address_1, :address_2, :lat1, :lng1, :lat2, :lng2, :distance_traveled
  json.url search_url(search, format: :json)
end
