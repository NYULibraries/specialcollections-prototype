require "rails_helper"

describe "homepage" do
  it "displays a welcome message" do
    visit "/"

    expect(page).to have_content "What Are Special Collections?"
  end
end
