require_relative 'boot'

require 'rails/all'
# Bundler.require(*Rails.groups)
Bundler.require(:default, :assets, Rails.env)
module InvoiceGenerator
  class Application < Rails::Application
    config.load_defaults 5.2
    config.assets.enabled = true
    config.assets.version = '1.0'
  end
end
