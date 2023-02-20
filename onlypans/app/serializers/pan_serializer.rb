class PanSerializer
  include JSONAPI::Serializer
  attributes :name, :description, :rating, :id

  attribute :comments do |object|
    object.comments.map { |comment| CommentSerializer.new(comment).serializable_hash[:data][:attributes] }
  end
  # has_many :comments, serializer: CommentSerializer

  attribute :image_url do |object|
    Rails.application.routes.url_helpers.rails_blob_url(object.image, only_path: true) if object.image.attached?
  end
end
