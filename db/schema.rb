# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160427041603) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "friendly_id_slugs", force: :cascade do |t|
    t.string   "slug",                      null: false
    t.integer  "sluggable_id",              null: false
    t.string   "sluggable_type", limit: 50
    t.string   "scope"
    t.datetime "created_at"
  end

  add_index "friendly_id_slugs", ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true, using: :btree
  add_index "friendly_id_slugs", ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type", using: :btree
  add_index "friendly_id_slugs", ["sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_id", using: :btree
  add_index "friendly_id_slugs", ["sluggable_type"], name: "index_friendly_id_slugs_on_sluggable_type", using: :btree

  create_table "locations", force: :cascade do |t|
    t.string   "address"
    t.float    "lat"
    t.float    "lng"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "search_locations", force: :cascade do |t|
    t.integer  "search_id"
    t.integer  "location_id"
    t.integer  "order"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "search_locations", ["location_id"], name: "index_search_locations_on_location_id", using: :btree
  add_index "search_locations", ["search_id"], name: "index_search_locations_on_search_id", using: :btree

  create_table "searches", force: :cascade do |t|
    t.float    "distance_traveled"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.string   "slug"
    t.boolean  "optimize"
  end

  add_index "searches", ["slug"], name: "index_searches_on_slug", unique: true, using: :btree

  add_foreign_key "search_locations", "locations"
end
