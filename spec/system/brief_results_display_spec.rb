require "rails_helper"

describe "Brief Results Display" do
  it "displays appropriate fields at the collection level" do
    add_document('bloch.xml')

    visit "/"

    fill_in "q", with: "bloch"
    click_button "Search"

    within("span.filter-value") { expect(page).to have_content("bloch") }

    click_button "Level"
    click_link "Archival Collection"

    within("span.filter-format_sim") do
      within("span.filter-value") { expect(page).to have_content("Archival Collection") }
    end

    click_button "Collection"
    within("div.blacklight-collection_sim") do
      click_link "Mark Bloch Postal Art Network (PAN) Archive"
    end

    within("article.document-position-1") do
      within("dl.document-metadata") do
        within("dd.blacklight-format_ssm") { expect(page).to have_content("Archival Collection") }
        within("dd.blacklight-unitdate_ssm") { expect(page).to have_content("Inclusive, 1978-2009") }
        within("dd.blacklight-abstract_ssm") { expect(page).to have_content("Mark Bloch (born 1956) is an American artist and writer who uses visuals and text to explore ideas of long-distance communication.") }
        within("dd.blacklight-repository_ssi") { expect(page).to have_content("The Fales Library & Special Collections") }
        within("dd.blacklight-unitid_ssm") { expect(page).to have_content("MSS.170") }

        abstract = find("dd.blacklight-abstract_ssm")
        expect(abstract.text.length).to be <= 450
      end
    end
  end

  # it "display at the component level" do
  #   add_document('oh002.xml')
  #
  #   visit "/"
  #
  #   fill_in "q", with: "Minka"
  #   click_button "Search"
  #
  #   within("span.filter-value") { expect(page).to have_content("Minka") }
  #
  #   within("article.document-position-1") do
  #     within("dl.document-metadata") do
  #       within("dd.blacklight-format_ssm") { expect(page).to have_content("Archival Object") }
  #       within("dd.blacklight-unitdate_ssm") { expect(page).to have_content("Oct 26, 1982") }
  #       within("dd.blacklight-heading_ssm") { expect(page).to have_content("Oral History of the American Left: Radical Histories >> Minka Alesh") }
  #       within("dd.blacklight-repository_ssi") { expect(page).to have_content("Tamiment Library & Wagner Labor Archives") }
  #       within("dd.blacklight-unitid_ssm") { expect(page).to have_content("OH.002") }
  #     end
  #   end
  # end

  # Given I search on the phrase "Minka"
  # Then the first result should have a field "Format" with value "Archival Object"
  # Then the first result should have a field "Date range" with value "Oct 26, 1982"
  # Then the first result should have a field "Contained in" with value "Oral History of the American Left: Radical Histories >> Minka Alesh"
  # Then the first result should have a field "Library" with value "Tamiment Library & Wagner Labor Archives"
  # Then the first result should have a field "Collection call no" with value "OH.002"
  # Then the first result should have a field "Location" with value "CD: Access OH-02-159, Box: 1, CD: Alesh 1, Cassette: 1, CD: ohaloh020146p1 / /ohaloh020146p2, Box: 1, Cassette: 1"

  # it "links to low level results for the series level components" do
  #   pending("Not yet")
  # end
  #
  # it "links to search all materials within collection launches faceted search" do
  #   pending("Not yet")
  # end
  #
  # it "links to search all materials within series launches faceted search" do
  #   pending("Not yet")
  # end
  #
  # it "links to collection in component result launches faceted search" do
  #   pending("Not yet")
  # end
  #
  # context "if series doesn't have title" do
  #   it "does not provide a link to lower level materials" do
  #     pending("Not yet")
  #   end
  # end
  #
  # context "if document doesn't have title" do
  #   it "displays 'No Title'" do
  #     pending("Not yet")
  #   end
  # end
end
