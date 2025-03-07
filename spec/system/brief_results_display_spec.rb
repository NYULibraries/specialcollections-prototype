require "rails_helper"

describe "homepage", type: :system do
  it "displays a welcome message" do
    indexer = EadIndexer::Indexer.new
    indexer.index('spec/fixtures/fales/bloch.xml')

    visit "/"

    fill_in "q", with: "bloch"
    click_button "Search"

    expect(page).to have_content "No results found for your search"

    # Scenario: Brief results display appropriate fields at the collection level
    # Given I am on the brief results page
    # When I limit my search to "Archival Collection" under the "Level" category
    # And I limit my search to "Mark Bloch Postal Art Network (PAN) Archive" under the "Collection" category
    # Then the first result should have a field "Format" with value "Archival Collection"
    # Then the first result should have a field "Date range" with value "Inclusive, 1978-2012"
    # Then the first result should have a field "Abstract" with value "Mark Bloch is an American fine artist and writer whose work utilizes both visuals and text to explore ideas of long distance communication. This collection contains thousands of examples of original “mail art” sent to and collected by Mark Bloch in New York City from all fifty states and dozens of countries in the form of objects, envelopes, artwork, and enclosures as well as publications, postcards and announcements documenting avant garde cu..."
    # Then the first result should have a field "Library" with value "The Fales Library & Special Collections"
    # Then the first result should have a field "Call no" with value "MSS 170"
    # And the "Abstract" field should be "450" characters or less
  end
end
