require "rails_helper"

describe "Brief Results Display", type: :system do
  it "displays appropriate fields at the collection level" do
    visit "/"

    fill_in "q", with: "bloch"
    click_button "Search"

    within("span.filter-value") do
      expect(page).to have_content("bloch")
    end

    click_button "Level"
    click_link "Archival Collection"

    within("span.filter-format_sim") do
      within("span.filter-value") do
        expect(page).to have_content("Archival Collection")
      end
    end

    click_button "Collection"
    within("div.blacklight-collection_sim") do
      click_link "Mark Bloch Postal Art Network (PAN) Archive"
    end

    within("article.document-position-1") do
      within("dl.document-metadata") do
        within("dd.blacklight-format_ssm") do
          expect(page).to have_content("Archival Collection")
        end
        within("dd.blacklight-unitdate_ssm") do
          expect(page).to have_content("Inclusive, 1978-2009")
        end
        within("dd.blacklight-abstract_ssm") do
          expect(page).to have_content("Mark Bloch (born 1956) is an American artist and writer who uses visuals and text to explore ideas of long-distance communication.")
        end
        within("dd.blacklight-repository_ssi") do
          expect(page).to have_content("The Fales Library & Special Collections")
        end
        within("dd.blacklight-unitid_ssm") do
          expect(page).to have_content("MSS.170")
        end
      end
    end
  end

  it "display at the component level" do
    pending
  end

  it "links to low level results for the series level components" do
    pending
  end

  it "links to search all materials within collection launches faceted search" do
    pending
  end

  it "links to search all materials within series launches faceted search" do
    pending
  end

  it "links to collection in component result launches faceted search" do
    pending
  end

  context "if series doesn't have title" do
    it "does not provide a link to lower level materials" do
      pending
    end
  end

  context "if document doesn't have title" do
    it "displays 'No Title'" do
      pending
    end
  end
end
