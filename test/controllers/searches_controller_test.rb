require 'test_helper'

class SearchesControllerTest < ActionController::TestCase
  setup do
    @search = searches(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:searches)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create search" do
    assert_difference('Search.count') do
      post :create, search: { address_1: @search.address_1, address_2: @search.address_2, distance_traveled: @search.distance_traveled, lat1: @search.lat1, lat2: @search.lat2, lng1: @search.lng1, lng2: @search.lng2 }
    end

    assert_redirected_to search_path(assigns(:search))
  end

  test "should show search" do
    get :show, id: @search
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @search
    assert_response :success
  end

  test "should update search" do
    patch :update, id: @search, search: { address_1: @search.address_1, address_2: @search.address_2, distance_traveled: @search.distance_traveled, lat1: @search.lat1, lat2: @search.lat2, lng1: @search.lng1, lng2: @search.lng2 }
    assert_redirected_to search_path(assigns(:search))
  end

  test "should destroy search" do
    assert_difference('Search.count', -1) do
      delete :destroy, id: @search
    end

    assert_redirected_to searches_path
  end
end
