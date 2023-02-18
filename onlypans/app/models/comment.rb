class Comment < ApplicationRecord
  belongs_to :pan

  validates :body, presence: true
end