class DropUsersTable < ActiveRecord::Migration[7.0]
  def change
    remove_foreign_key "comments", "users"
    remove_foreign_key "pans", "users"
    drop_table :users
  end
end
