FORMAT_JSON = ->(r) {r.format == 'json' }

Rails.application.routes.draw do
  namespace :v1, constraints: FORMAT_JSON do
    namespace :api do
      resources :teachers do
        resources :badges
      end
    end
  end
end
