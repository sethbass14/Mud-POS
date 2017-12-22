Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :orders do
        resources :drinks
      end
      resources :drinks
      resources :drink_orders
    end
  end



end
