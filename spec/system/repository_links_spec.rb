require "rails_helper"

describe "stable repository links" do
  before(:all) do
    add_document("bloch.xml")
    add_document("kopit.xml")
    add_document("oh002.xml")
  end

  context "Fales homepage" do
    it "displays informational text and link" do
      visit "/fales"

      within("div#facet-repository_sim") do
        expect(page).to have_content("The Fales Library & Special Collections")
      end

      within("section#content") do
        expect(page).to have_content("The Fales Library & Special Collections, comprising 350,000 volumes of book and print items, over 11,000 linear feet of archive and manuscript materials, and about 90,000 audiovisual elements, houses the Fales Collection of rare books and manuscripts in English and American literature, the Downtown Collection, the Food and Cookery Collection, the Riot Grrrl Collection, and the general Special Collections of the NYU Libraries.")
        expect(page).to have_link("Website", href: "https://library.nyu.edu/locations/special-collections-center/")
        expect(page).to have_selector('article.document')
      end
    end

    it "hides the remove button next to the repository" do
      visit "/fales"

      within("div.blacklight-repository_sim") do
        expect(page).to have_selector('a.remove', visible: false)
      end
    end
  end

  context "Fales facet" do
    it "shows the remove button next to the repository" do
      visit "/"

      click_button "Library"
      within("div.blacklight-repository_sim") do
        click_link "The Fales Library & Special Collections"
      end

      within("div.blacklight-repository_sim") do
        expect(page).to have_selector('a.remove', visible: true)
      end
    end
  end

  context "Tamiment homepage" do
    it "displays informational text and link" do
      visit "/tamiment"

      within("div#facet-repository_sim") do
        expect(page).to have_content("Tamiment Library & Wagner Labor Archives")
      end

      within("section#content") do
        expect(page).to have_content("The Tamiment Library and Robert F. Wagner Labor Archives collects material in all formats documenting the history of labor, the Left, political radicalism, and social movements in the United States, with particular strengths in communism, anarchism, and socialism. It is also the repository for the Archives of Irish America and the Abraham Lincoln Brigade Archives.")
        expect(page).to have_link("Website", href: "https://library.nyu.edu/locations/special-collections-center/")
        expect(page).to have_selector('article.document')
      end
    end
  end

  context "University Archives homepage" do
    it "displays informational text and link" do
      visit "/universityarchives"

      within("section#content") do
        expect(page).to have_content("The New York University Archives serves as the final repository for the historical records of NYU. Its primary purpose is to document the history of the University and to provide source material for administrators, faculty, students, alumni, and other members of the University community, as well as scholars, authors, and other interested persons who seek to evaluate the impact of the University's activities on the history of American social, cultural, and intellectual development.")
        expect(page).to have_link("Website", href: "https://library.nyu.edu/locations/special-collections-center/")
      end
    end
  end

  context "The New York Historical homepage" do
    it "displays informational text and link" do
      visit "/nyhistory"

      within("section#content") do
        expect(page).to have_link("Website", href: "https://www.nyhistory.org/library")
      end
    end
  end

  context "Center for Brooklyn History homepage" do
    it "displays informational text and link" do
      visit "/brooklynhistory"

      within("section#content") do
        expect(page).to have_content("The Center for Brooklyn History collects, preserves, and provides access to the most expansive collection of Brooklyn history and life in the world. The combined collections that comprise the new Center for Brooklyn History's holdings include over 250,000 photographs, 37,000 books, 1,800 archival collections, 2,500 maps and atlases, 5,700 artifacts, 300 paintings, 1,400 oral history interviews, and more. The collections foster new and cutting-edge scholarship, support public learning and research, and enrich CBH's exhibitions, educational activities, and public programming.")
        expect(page).to have_link("Website", href: "https://www.bklynlibrary.org/center-for-brooklyn-history")
      end
    end
  end

  context "Poly Archives homepage" do
    it "displays informational text and link" do
      visit "/poly"

      within("section#content") do
        expect(page).to have_link("Website", href: "https://library.nyu.edu/locations/poly-archives-special-collections/")
      end
    end
  end

  context "Research Institute for the Study of Man homepage" do
    it "displays informational text and link" do
      visit "/rism"

      within("section#content") do
        expect(page).to have_content("The RISM Research Collections and Archives have been transferred to the New York University Archives.")
        expect(page).to have_link("Website", href: "https://library.nyu.edu/locations/special-collections-center/")
      end
    end
  end
end
