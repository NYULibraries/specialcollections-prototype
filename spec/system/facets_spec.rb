require "rails_helper"

describe "Facets", js: true do
  it "displays facets in a specific order" do
    add_document('bloch.xml')
    add_document('intelligencer.xml')
    add_document('kopit.xml')
    add_document('oh002.xml')

    visit "/"

    within("div#facet-panel-collapse") do
      facets = page.all(".facet-limit").map(&:text)

      expect(facets).to eq [
                             "Library",
                             "Digital Content",
                             "Creator",
                             "Date Range",
                             "Subject",
                             "Name",
                             "Place",
                             "Language",
                             "Collection",
                             "Level"
                           ]
    end
  end
end
