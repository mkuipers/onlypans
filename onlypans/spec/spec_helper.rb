require 'database_cleaner'
require 'devise/jwt/test_helpers'

# Configure DatabaseCleaner
DatabaseCleaner.strategy = :transaction

RSpec.configure do |config|
  # Include Devise test helpers
  config.include Devise::Test::ControllerHelpers, type: :controller

  # Clean database between tests
  config.before(:suite) do
    DatabaseCleaner.clean_with(:truncation)
  end

  config.around(:each) do |example|
    DatabaseCleaner.cleaning do
      example.run
    end
  end

  # Use FactoryBot for fixtures
  config.include FactoryBot::Syntax::Methods

  # Use Capybara for system tests
  # config.include Capybara::DSL, type: :system

  # Raise exceptions for deprecation warnings
  config.raise_errors_for_deprecations!
end

def set_jwt_sign_in(user, request)
  headers = { 'Accept' => 'application/json', 'Content-Type' => 'application/json' }
  # This will add a valid token for `user` in the `Authorization` header
  auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, user)
  request.headers.merge!(auth_headers)
end