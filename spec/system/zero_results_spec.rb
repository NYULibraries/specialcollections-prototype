require "rails_helper"

describe "Zero Search Results", js: true do
  it "provides helpful feedback on improving my search" do
    visit "/"

    fill_in "q", with: "foobar"
    click_button "Search"

    within("span.filter-value") { expect(page).to have_content("foobar") }

    within("section#content") do
      expect(page).to have_content("Sorry, no results matched your search.")
      expect(page).to have_content(%Q(Consider searching with different terms - for example, a search for ' "NYU clubs" ' will produce different results than ' "NYU society" ' or ' "New York University clubs" '))
      expect(page).to have_content("Double check spelling.")
      expect(page).to have_content("Consider using the facets on the left to browse for related terms.")
    end
  end

  it "links to search all materials within collection launches faceted search" do
    add_document('bloch.xml')

    visit "/"

    click_button "Level"
    within("div.blacklight-format_sim") do
      click_link "Archival Collection"
    end

    within("span.filter-format_sim") do
      within("span.filter-value") { expect(page).to have_content("Archival Collection") }
    end

    click_button "Collection"
    within("div.blacklight-collection_sim") do
      click_link "Mark Bloch Postal Art Network (PAN) Archive"
    end

    click_link "Search all archival materials within this collection"

    within("div.blacklight-format_sim") do
      expect(page).not_to have_content("Archival Collection")
    end

    within("div.blacklight-collection_sim") do
      expect(page).to have_content("Mark Bloch Postal Art Network (PAN) Archive")
    end

    within("article.document-position-1") do
      within("dl.document-metadata") do
        within("dd.blacklight-format_ssm") { expect(page).to have_content("Archival Collection") }
      end
    end
  end

  it "displays 'No Title' when a document doesn't have a title" do
    add_document('kopit.xml')

    visit "/"

    fill_in "q", with: "kopit"
    click_button "Search"

    within("span.filter-value") { expect(page).to have_content("kopit") }

    within("article.document-position-1") do
      expect(page).to have_content "No Title"
    end
  end
end
