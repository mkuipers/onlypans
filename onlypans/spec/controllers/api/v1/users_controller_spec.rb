require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :controller do
  let(:user) { create(:user) }
  let(:serialized_user) { UserSerializer.new(user).serializable_hash[:data][:attributes] }

  before { sign_in user }

  describe 'GET #index' do
    let!(:users) { create_list(:user, 3) }

    it 'returns a list of users' do
      get :index      
      id_and_names = JSON.parse(response.body).map { |user| [user['id'], user['username']] }
      expect(id_and_names).to match_array(users.map { |user| [user.id, user.username] })
    end
  end

  describe 'GET #show' do
    it 'returns a serialized user' do
      get :show, params: { id: user.id }
      expect(response.body).to eq(serialized_user.to_json)
    end
  end

  describe 'PATCH #update' do
    let(:user_params) { { email: "new@email.com", username: "newname", first_name: "new first name", last_name: "new last name", bio: "new bio" } }

    before do
      patch :update, params: { id: user.id, user: user_params }
    end
    
    context 'when the user updates their own record' do
      it 'is successful' do
        expect(response).to be_successful
      end

      it 'updates the user and returns a serialized user' do
        user.reload
        expect(user.email).to eq(user_params[:email])
        expect(user.username).to eq(user_params[:username])
        expect(user.first_name).to eq(user_params[:first_name])
        expect(user.last_name).to eq(user_params[:last_name])
        expect(user.bio).to eq(user_params[:bio])
      end
    end

    context 'when another user tries to update the record' do
      let(:other_user) { create(:user) }

      before { sign_in other_user }

      it 'does not update the user and returns unauthorized' do
        patch :update, params: { id: user.id, user: user_params }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
