class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: [:show, :update]

  def index
    @users = User.where("id != ?", current_user.id)
    render json: @users.map { |user| UserSerializer.new(user).serializable_hash[:data][:attributes] }
  end

  def show
    render json: UserSerializer.new(@user).serializable_hash[:data][:attributes]
  end

  def update
    @user = User.find(params[:id])
    params[:user].delete(:password) if params[:user][:password].blank?
    if @user.id == current_user.id # Only allow updates to current user's record
      if @user.update(user_params)
        render json: UserSerializer.new(@user).serializable_hash[:data][:attributes]
      else
        render json: { errors: @user.errors }, status: :unprocessable_entity
      end
    else
      render json: { errors: "Unauthorized" }, status: :unauthorized
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:email, :username, :first_name, :last_name, :profile_picture, :bio)
  end
end
