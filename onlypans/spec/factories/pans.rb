FactoryBot.define do
  factory :pan do
    sequence(:name) { |n| "Pan #{n}" }
    description { 'A great pan' }
    image { Rack::Test::UploadedFile.new(Rails.root.join('spec', 'support', 'pan.jpg'), 'image/jpeg') }
    user
  end
end