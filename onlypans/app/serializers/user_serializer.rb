class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :email, :created_at, :username, :first_name, :last_name, :bio
  
  attribute :image_url do |object|
    Rails.application.routes.url_helpers.rails_blob_url(object.image, only_path: true) if object.image.attached?
  end
end