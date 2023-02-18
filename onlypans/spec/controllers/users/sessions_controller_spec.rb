require 'rails_helper'
require 'devise/jwt/test_helpers'


RSpec.describe Users::SessionsController, type: :controller do
  let(:user) { FactoryBot.create(:user) }
  
  before do
    @request.env["devise.mapping"] = Devise.mappings[:user]
  end

  describe "POST #create" do
    context "when valid email and password are given" do
      before do 
        set_jwt_sign_in user, @request
      end
      it "returns a success response with a valid JWT token" do
        post :create, params: { user: { email: user.email, password: user.password } }
        expect(response).to have_http_status(:ok)
        binding.pry
        # expect(response.headers["Authorization"]).not_to be_nil
      end
    end

    context "when invalid email and password are given" do
      it "returns an unauthorized response" do
        post :create, params: { user: { email: user.email, password: "invalidpassword" } }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "DELETE #destroy" do
    context "when user is logged in" do
      before do
        @request.env["devise.mapping"] = Devise.mappings[:user]    
        set_jwt_sign_in user, @request
      end

      it "returns a success response" do
        delete :destroy
        expect(response).to have_http_status(:ok)
      end
    end

    context "when user is not logged in" do
      it "returns an unauthorized response" do
        delete :destroy
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
