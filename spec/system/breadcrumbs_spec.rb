require "rails_helper"

describe "breadcrumbs" do
  context "on the landing page" do
    it "links to NYU Libraries and the Library Catalog" do
      visit "/"

      within("ol.breadcrumb") do
        expect(page).to have_link("NYU Libraries", href: "https://library.nyu.edu")
        expect(page).to have_link("Library Catalog", href: "http://bobcat.library.nyu.edu/nyu")
        expect(page).to have_text("Archival Collections")
      end
    end
  end

  context "on brief results page" do
    it "links to Archival Collections and appends Search" do
      visit "/"

      fill_in "q", with: "foo"
      click_button "Search"

      within("ol.breadcrumb") do
        expect(page).to have_link("NYU Libraries", href: "https://library.nyu.edu")
        expect(page).to have_link("Library Catalog", href: "http://bobcat.library.nyu.edu/nyu")
        expect(page).to have_link("Archival Collections", href: "/")
        expect(page).to have_text("Search")
      end
    end
  end

  context "on repository/library pages" do
    it "links to repository/library" do
      visit "/fales"

      within("ol.breadcrumb") do
        expect(page).to have_link("NYU Libraries", href: "https://library.nyu.edu")
        expect(page).to have_link("Library Catalog", href: "http://bobcat.library.nyu.edu/nyu")
        expect(page).to have_link("Archival Collections", href: "/")
        expect(page).to have_link("The Fales Library & Special Collections", href: "/fales")
        expect(page).to have_text("Search")
      end
    end
  end
end
