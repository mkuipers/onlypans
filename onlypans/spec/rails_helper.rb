# Load Rails
ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../config/environment', __dir__)
abort('The Rails environment is running in production mode!') if Rails.env.production?

# Load RSpec
require 'rspec/rails'
require 'spec_helper'



# Configure RSpec
RSpec.configure do |config|
  config.infer_spec_type_from_file_location!
  config.filter_rails_from_backtrace!
  config.include FactoryBot::Syntax::Methods
end

# Load FactoryBot factories
# Dir[Rails.root.join('spec', 'factories', '**', '*.rb')].each { |file| require file }

# Load support files
Dir[Rails.root.join('spec', 'support', '**', '*.rb')].each { |file| require file }
