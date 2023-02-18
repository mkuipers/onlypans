class CreateAllTables < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :username, null: false
      t.string :password_digest, null: false
      t.string :provider, null: false
      t.string :uid, null: false
      t.string :name
      t.string :image
      t.string :token
      t.string :refresh_token
      t.datetime :token_expires_at
      t.timestamps
    end
    add_index :users, :email, unique: true
    add_index :users, [:uid, :provider], unique: true

    create_table :pans do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name
      t.text :description
      t.integer :rating
      t.timestamps
    end

    create_table :comments do |t|
      t.references :user, null: false, foreign_key: true
      t.references :pan, null: false, foreign_key: true
      t.text :body
      t.timestamps
    end
  end
end
