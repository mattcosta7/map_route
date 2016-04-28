class SearchesController < ApplicationController
  before_action :set_search, only: [:show, :edit, :update, :destroy]
  require 'will_paginate/array'
  # GET /searches
  # GET /searches.json
  def index
    if params[:location]
      @searches = Search.includes(:origin,:destination, :locations).search_locations(params[:location].downcase).paginate(page: params[:page], per_page: 6)
      @subtitle = "Queries Through #{params[:location]}"
    else
      @searches = Search.includes(:origin,:destination, :locations).paginate(page: params[:page], per_page: 6)
    end
  end

  # GET /searches/1
  # GET /searches/1.json
  def show
  end

  # GET /searches/new
  def new
    @search = Search.new
    @search.origin = Location.new
    @search.destination = Location.new
    @locations = []
    8.times do
      @locations << @search.locations.new
    end
  end

  # GET /searches/1/edit
  def edit
    @locations = []
    @search.locations.each do |location|
      @locations << location
    end
    if @locations.length < 8
      (8 - @locations.length).times do
        @locations << @search.locations.new
      end
    end
  end

  # POST /searches
  # POST /searches.json
  def create
    @search = Search.new
    @search.build_origin
    @search.build_destination
    @search.update(search_params)
    if @search.save
      params[:search][:locations_attributes].each do |location|
        @search.locations << Location.where(
          address: location[1][:address],
          lat: location[1][:lat],
          lng: location[1][:lng]
        ).first_or_create unless !location[1][:address].present? || !location[1][:lat].present? || !location[1][:lng].present?
      end
    end
    redirect_to @search, notice: 'Search was successfully created.'
  end

  # PATCH/PUT /searches/1
  # PATCH/PUT /searches/1.json
  def update
    respond_to do |format|
      if @search.update(search_params)
        @search.locations.destroy_all
        params[:search][:locations_attributes].each do |location|
          @search.locations.create(
            address: location[1][:address],
            lat: location[1][:lat],
            lng: location[1][:lng]
          ) unless !location[1][:address].present?
        end
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
      @search = Search.friendly.includes(:origin,:destination, :locations).find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def search_params
      params.require(:search).permit(:distance_traveled, :optimize, {origin_attributes: [:id,:address,:lat,:lng]}, {destination_attributes: [:id,:address,:lat,:lng]} )
    end
end
