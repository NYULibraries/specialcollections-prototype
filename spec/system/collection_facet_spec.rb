require "rails_helper"

describe "Collection Facets", js: true do
  context "limiting search by a collection facet" do
    it "shows search results" do
      add_document('berol.xml')

      visit "/"

      click_button "Collection"
      within("div.blacklight-collection_sim") do
        click_link "Alfred C. Berol Collection of Lewis Carroll"
      end

      documents = page.find("#documents").all(".document")

      expect(documents.size).to be >= 1
    end
  end

  context "filtering search results by a collection facet" do
    it "shows search results" do
      add_document('berol.xml')

      visit "/"

      fill_in "q", with: "berol"
      click_button "Search"

      within("span.filter-value") { expect(page).to have_content("berol") }

      click_button "Collection"
      within("div.blacklight-collection_sim") do
        click_link "Alfred C. Berol Collection of Lewis Carroll"
      end

      documents = page.find("#documents").all(".document")

      expect(documents.size).to be >= 1
    end
  end
end
