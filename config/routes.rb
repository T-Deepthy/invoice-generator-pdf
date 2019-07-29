Rails.application.routes.draw do
  root 'home#welcome'
    get '/invoice/:filename', to: 'home#print_invoice'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end