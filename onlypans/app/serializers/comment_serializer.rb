class CommentSerializer
  include JSONAPI::Serializer
  attributes :pan_id, :body, :id
end
