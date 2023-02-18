class RemoveUidAndProviderFromUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :uid
    remove_column :users, :provider
  end
end
