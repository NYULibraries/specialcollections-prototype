Rails.application.routes.draw do
  mount Blacklight::Engine => "/"
  mount BlacklightAdvancedSearch::Engine => "/"

  root to: "catalog#index"
  concern :searchable, Blacklight::Routes::Searchable.new

  resource :catalog, only: [], as: "catalog", path: "/catalog", controller: "catalog" do
    concerns :searchable
  end

  concern :exportable, Blacklight::Routes::Exportable.new

  resources :solr_documents, only: [ :show ], path: "/catalog", controller: "catalog" do
    concerns :exportable
  end

  resources :bookmarks, only: [ :index, :update, :create, :destroy ] do
    concerns :exportable

    collection do
      delete "clear"
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Create named routes for each collection specified in the Repositories Class
  Findingaids::Repositories.repositories.each do |coll|
    get "#{coll[1]['url']}" => "catalog#index", :search_field => "#{coll[1]['url_safe_display']}", :repository => "#{coll[1]['display']}", :f => { repository_sim: [ "#{coll[1]['admin_code']}" ] }
  end

  get "/404", to: "errors#not_found"

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"
end
