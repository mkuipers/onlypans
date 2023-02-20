class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  has_many :pans
  has_many :comments
  has_one_attached :image
  validates :email, presence: true
  validates :email, uniqueness: true

  validates :image, content_type: ['image/png', 'image/jpg', 'image/jpeg']
  
  devise :database_authenticatable, :registerable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self
         #:rememberable?

  def username
    # very simple username generation from email. will probably change later
    if attributes['username'].nil?
      email.split('@')[0]
    else
      attributes['username']
    end
  end
end