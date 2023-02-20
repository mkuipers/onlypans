class Api::V1::PansController < ApplicationController
  before_action :authenticate_user!
  before_action :set_pan, only: [:show, :update, :destroy]
  before_action :set_pans, only: [:index]

  # GET /pans
  def index
    render json: @pans.map { |pan| PanSerializer.new(pan).serializable_hash[:data][:attributes] }
  end

  # GET /pans/1
  def show
    render json: PanSerializer.new(@pan).serializable_hash[:data][:attributes]
  end

  # POST /pans
  def create
    @pan = current_user.pans.build(pan_params)

    if @pan.save
      render json: PanSerializer.new(@pan).serializable_hash[:data][:attributes], status: :created
    else
      render json: @pan.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /pans/1
  def update
    if @pan.update(pan_params)
      render json: PanSerializer.new(@pan).serializable_hash[:data][:attributes]
    else
      render json: @pan.errors, status: :unprocessable_entity
    end
  end

  # DELETE /pans/1
  def destroy
    @pan.destroy
  end

  private

  def set_pans
    if params[:user_id].present? 
      @pans = User.find(params[:user_id]).pans
    else
      @pans = current_user.pans
    end

  end

  # Use callbacks to share common setup or constraints between actions.
  def set_pan
    @pan = current_user.pans.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def pan_params
    params.require(:pan).permit(:name, :description, :rating, :image)
  end
end
