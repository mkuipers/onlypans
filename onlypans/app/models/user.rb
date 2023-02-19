class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  has_many :pans
  has_many :comments
  
  devise :database_authenticatable, :registerable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self
         #:rememberable?
end