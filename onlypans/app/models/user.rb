class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  has_many :pans
  has_many :comments
  
  devise :database_authenticatable, :registerable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self
         #:rememberable?

  def username
    # very simple username generation from email. will probably change later
    email.split('@')[0]
  end
end