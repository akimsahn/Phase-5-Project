class FlashcardsController < ApplicationController
  before_action :authorize

  def index
    user = User.find(session[:user_id])
    if user.username == 'akim'
      render json: Flashcard.all, status: :ok
    end
  end

  def create
    collection = find_collection
    if collection.user_id == session[:user_id]
      params[:flashcards].each { |info|
        flashcard = Flashcard.create(question: info['question'], answer: info['answer'])
        collection.flashcards << flashcard
      }
      head :ok
    else
      render json: { errors: ['Unauthorized'] }, status: :unauthorized
    end
  end

  def update
    flashcard = find_flashcard
    flashcard.update(flashcard_params)
    render json: flashcard, status: :ok
  end
  
  def destroy
    # One-time only
    Flashcard.all.each { |flashcard|
      if flashcard.collections.count == 0
        flashcard.destroy
      end
    }
    head :ok
    # flashcard = find_flashcard
    # if flashcard.only_collection_user_id == session[:user_id]
    #   flashcard.destroy
    #   render json: flashcard
    # elsif find_collection.user.id == session[:user_id]
    #   flashcard.collection_flashcards.where(collection_id: params[:collection_id]).destroy_all
    #   render json: flashcard
    # else
    #   render json: { errors: ['Unauthorized'] }, status: :unauthorized
    # end
  end

  private

  def authorize
    render json: { errors: ['Unauthorized'] }, status: :unauthorized unless session.include? :user_id
  end

  def flashcard_params
    params.permit(:question, :answer)
  end

  def find_flashcard
    Flashcard.find(params[:id])
  end

  def find_collection
    Collection.find(params[:collection_id])
  end
end
