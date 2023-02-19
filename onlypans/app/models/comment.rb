class Comment < ApplicationRecord
  belongs_to :pan
  belongs_to :user

  validates :body, presence: true
end