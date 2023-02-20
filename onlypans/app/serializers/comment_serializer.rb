class CommentSerializer
  include JSONAPI::Serializer
  attributes :pan_id, :body, :id
  attribute :author do |object|
    object.user.username
  end
end
