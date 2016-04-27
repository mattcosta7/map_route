class AddOptimizeToSearch < ActiveRecord::Migration
  def change
    add_column :searches, :optimize, :boolean
  end
end
