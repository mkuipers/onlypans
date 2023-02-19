require 'rails_helper'

RSpec.describe Api::V1::CommentsController, type: :controller do
  let(:user) { create(:user) }
  let(:pan) { create(:pan) }

  before do
    sign_in user
  end

  describe "POST #create" do
    it "creates a new comment" do
      expect {
        post :create, params: { pan_id: pan.id, comment: { body: "Great pan!" } }, format: :json
      }.to change { pan.comments.count }.by(1)
    end

    it "associates the comment with the current user" do
      post :create, params: { pan_id: pan.id, comment: { body: "Great pan!" } }, format: :json
      expect(assigns(:comment).user).to eq(user)
    end

    it "returns a successful response" do
      post :create, params: { pan_id: pan.id, comment: { body: "Great pan!" } }, format: :json
      expect(response).to have_http_status(:created)
    end

    it "returns the comment in the response" do
      post :create, params: { pan_id: pan.id, comment: { body: "Great pan!" } }, format: :json
      expect(JSON.parse(response.body)['comment']['body']).to eq("Great pan!")
    end

    it "returns an error for invalid parameters" do
      post :create, params: { pan_id: pan.id, comment: { body: "" } }, format: :json
      expect(response).to have_http_status(:unprocessable_entity)
      expect(JSON.parse(response.body)['errors']).to include("Body can't be blank")
    end
  end

  describe "DELETE #destroy" do
    let!(:comment) { create(:comment, pan: pan, user: user) }

    it "deletes the comment" do
      expect {
        delete :destroy, params: { id: comment.id }, format: :json
      }.to change { pan.comments.count }.by(-1)
    end

    it "returns a no content response" do
      delete :destroy, params: { id: comment.id }, format: :json
      expect(response).to have_http_status(:no_content)
    end

    it "returns an error for unauthorized users" do
      other_user = create(:user)
      sign_in other_user
      delete :destroy, params: { id: comment.id }, format: :json
      expect(response).to have_http_status(:unauthorized)
      expect(JSON.parse(response.body)['errors']).to include('You are not authorized to delete this comment')
    end
  end
end
