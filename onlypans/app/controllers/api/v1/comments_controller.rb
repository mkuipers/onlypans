class Api::V1::CommentsController < ApplicationController
  before_action :authenticate_user!

  def create
    @pan = Pan.find(params[:pan_id])
    @comment = @pan.comments.create(comment_params.merge(user: current_user))
    if @comment.valid?
      render json: CommentSerializer.new(@comment).serializable_hash[:data][:attributes], status: :created
    else
      render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    if @comment.user == current_user
      @comment.destroy
      head :no_content
    else
      render json: { errors: ['You are not authorized to delete this comment'] }, status: :unauthorized
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:body)
  end
end
