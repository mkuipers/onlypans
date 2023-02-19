class PanSerializer
  include JSONAPI::Serializer
  attributes :name, :description, :rating
end
