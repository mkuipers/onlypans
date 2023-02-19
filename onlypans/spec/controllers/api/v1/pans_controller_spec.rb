require 'rails_helper'

RSpec.describe Api::V1::PansController, type: :controller do
  let(:user) { create(:user) }
  let(:pan) { create(:pan, user: user) }
  let(:serialized_pan) { PanSerializer.new(pan).serializable_hash[:data][:attributes] }

  before do
    set_jwt_sign_in user, @request
  end

  describe 'GET index' do
    before do
      pan # create the pan before the request
    end
    it 'returns a successful response' do
      get :index, format: :json
      expect(response).to be_successful
    end

    it 'returns the user\'s pans' do
      get :index, format: :json
      expect(response.body).to eq([serialized_pan].to_json)
    end
  end

  describe 'GET show' do
    it 'returns a successful response' do
      get :show, params: { id: pan.id }, format: :json
      expect(response).to be_successful
    end

    it 'returns the correct pan' do
      get :show, params: { id: pan.id }, format: :json
      expect(response.body).to eq(serialized_pan.to_json)
    end
  end

  describe 'POST create' do
    context 'with valid attributes' do
      it 'creates a new pan' do
        expect {
          post :create, params: { pan: attributes_for(:pan) }, format: :json
        }.to change(user.pans, :count).by(1)
      end

      it 'returns the created pan' do
        post :create, params: { pan: attributes_for(:pan) }, format: :json
        # expect(assigns(:pan)).to be_persisted
        expect(response).to have_http_status(:created)
      end
    end

    context 'with invalid attributes' do
      it 'does not create a new pan' do
        expect {
          post :create, params: { pan: attributes_for(:pan, name: nil) }, format: :json
        }.not_to change(user.pans, :count)
      end

      it 'returns an error message' do
        post :create, params: { pan: attributes_for(:pan, name: nil) }, format: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'PATCH update' do
    context 'with valid attributes' do
      it 'updates the pan' do
        patch :update, params: { id: pan.id, pan: { name: 'New Name' } }, format: :json
        expect(pan.reload.name).to eq('New Name')
      end

      it 'returns the updated pan' do
        patch :update, params: { id: pan.id, pan: { name: 'New Name' } }, format: :json
        pan.reload
        expect(response.body).to eq(serialized_pan.to_json)
        expect(response).to be_successful
      end
    end

    context 'with invalid attributes' do
      it 'does not update the pan' do
        patch :update, params: { id: pan.id, pan: { name: nil } }, format: :json
        expect(pan.reload.name).not_to be_nil
      end

      it 'returns an error message' do
        patch :update, params: { id: pan.id, pan: { name: nil } }, format: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'DELETE destroy' do
    it 'deletes the pan' do
      delete :destroy, params: { id: pan.id }, format: :json
      expect(Pan.exists?(pan.id)).to be_falsey
    end

    it 'returns a no content response' do
      delete :destroy, params: { id: pan.id }, format: :json
      expect(response).to have_http_status(:no_content)
    end
  end
end
