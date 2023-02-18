require 'rails_helper'

RSpec.describe CurrentUserController, type: :controller do
  let(:user) { FactoryBot.create(:user) }

  before do
    set_jwt_sign_in user, @request
  end

  describe "GET #index" do
    it "returns a success response" do
      get :index
      expect(response).to have_http_status(:ok)
    end

    it "returns the current user" do
      get :index
      expect(response.body).to eq(UserSerializer.new(user).serializable_hash[:data][:attributes].to_json)
    end
  end
end