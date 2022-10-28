class CollectionsController < ApplicationController
  before_action :authorize
  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  rescue_from ActiveRecord::RecordInvalid, with: :invalid

  def index
    user = find_user
    render json: user.collections, status: :ok
  end

  def show
    collection = find_collection
    if is_logged_in_user? collection
      render json: collection, status: :ok, serializer: CollectionFlashcardSerializer
    else
      render json: { errors: ['Unauthorized'] }, status: :unauthorized
    end
  end

  def create
    user = find_user
    collection = Collection.new(collection_params)
    user.collections << collection
    collection.save!
    render json: collection, status: :created
  end

  def update
    collection = find_collection
    if is_logged_in_user? collection
      collection.update!(collection_params)
      render json: collection, status: :ok, serializer: CollectionFlashcardSerializer
    else
      render json: { errors: ['Unauthorized'] }, status: :unauthorized
    end
  end
  
  def destroy
    collection = find_collection
    if is_logged_in_user? collection
      collection.destroy
      render json: collection
    else
      render json: { errors: ['Unauthorized'] }, status: :unauthorized
    end
  end

  def share
    user = User.find_by(username: params[:username])
    if !user
      render json: { errors: ["Username '#{params[:username]}' not found"] }, status: :not_found
    else
      new_collection = Collection.new(collection_params)
      user.collections << new_collection
      original_collection = find_collection
      new_collection.flashcards << original_collection.flashcards
      new_collection.save!
      render json: { message: ["Collection shared successfully"] }, status: :ok
    end
  end

  private

  def authorize
    render json: { errors: ['Unauthorized'] }, status: :unauthorized unless session.include? :user_id
  end

  def is_logged_in_user?(collection)
    collection.user_id == session[:user_id]
  end

  def invalid(invalid)
    render json: { errors: [invalid.record.errors.full_messages] }, status: :unprocessable_entity
  end

  def not_found
    render json: { errors: ['Collection Not Found'] }, status: :not_found
  end

  def find_user
    User.find(session[:user_id])
  end

  def find_collection
    Collection.find(params[:id])
  end

  def collection_params
    params.permit(:name, :subject, :short_description)
  end

end
