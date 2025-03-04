require "rails_helper"

describe "homepage", type: :system do
  it "displays a welcome message" do
    visit "/"

    expect(page).to have_content "Welcome!"
  end
end
