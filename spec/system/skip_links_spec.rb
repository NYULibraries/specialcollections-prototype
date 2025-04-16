require "rails_helper"

describe "skip links" do
  context "on the home page" do
    it "has 3 skip links" do
      visit "/"

      within("nav#skip-link") do
        expect(page).to have_link("", href: "#main-container", visible: false)
        expect(page).to have_link("", href: "#search_field", visible: false)
        expect(page).to have_link("", href: "#facets", visible: false)
      end
    end
  end

  context "on brief results page" do
    it "has 4 skip links" do
      visit "/"

      fill_in "q", with: "foo"
      click_button "Search"

      within("nav#skip-link") do
        expect(page).to have_link("", href: "#main-container", visible: false)
        expect(page).to have_link("", href: "#search_field", visible: false)
        expect(page).to have_link("", href: "#facets", visible: false)
        expect(page).to have_link("", href: "#documents", visible: false)
      end
    end
  end
end
