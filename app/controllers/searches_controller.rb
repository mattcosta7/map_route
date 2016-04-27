class SearchesController < ApplicationController
  before_action :set_search, only: [:show, :edit, :update, :destroy]

  # GET /searches
  # GET /searches.json
  def index
    @searches = Search.includes(:locations).paginate(page: params[:page])
  end

  # GET /searches/1
  # GET /searches/1.json
  def show
  end

  # GET /searches/new
  def new
    @search = Search.new
    @locations = []
    8.times do
      @locations << @search.locations.build
    end
  end

  # GET /searches/1/edit
  def edit
  end

  # POST /searches
  # POST /searches.json
  def create
    @search = Search.new(distance_traveled: params[:search][:distance_traveled])
    if @search.save
      params[:search][:locations_attributes].each do |location|
        puts location
        @search.locations.create(
          address: location[1][:address],
          lat: location[1][:lat],
          lng: location[1][:lng]
        ) unless !location[1][:address].present?
      end
    end
    redirect_to @search, notice: 'Search was successfully created.'
  end

  # PATCH/PUT /searches/1
  # PATCH/PUT /searches/1.json
  def update
    respond_to do |format|
      if @search.update(search_params)
        format.html { redirect_to @search, notice: 'Search was successfully updated.' }
        format.json { render :show, status: :ok, location: @search }
      else
        format.html { render :edit }
        format.json { render json: @search.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /searches/1
  # DELETE /searches/1.json
  def destroy
    @search.destroy
    respond_to do |format|
      format.html { redirect_to searches_url, notice: 'Search was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_search
      @search = Search.includes(:locations).find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    # def search_params
    #   params.require(:search).permit(:distance, :waypoint)
    # end
end
