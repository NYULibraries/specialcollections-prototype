Feature: Homepage test
  As a developer
  I want to test the homepage
  So I know that feature tests work

  Scenario: Homepage shows a message
    Given I am on the homepage
    Then I should see the following text:
      """
      Welcome!
      """
