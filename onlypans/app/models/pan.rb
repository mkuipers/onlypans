class Pan < ApplicationRecord
  belongs_to :user
  has_many :comments
  has_one_attached :image
  validates :name, presence: true
  validates :image, presence: true

  validates :image, content_type: ['image/png', 'image/jpg', 'image/jpeg']
end
