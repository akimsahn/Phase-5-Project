Rails.application.routes.draw do
  resources :collections
  resources :flashcards, only: [:index, :show, :create, :update]

  post '/share_collection/:username', to: 'collections#share'

  delete '/flashcards/:id/:collection_id', to: 'flashcards#destroy'

  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
