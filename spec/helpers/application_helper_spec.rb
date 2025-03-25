require 'rails_helper'

describe ApplicationHelper do
  describe "#repositories" do
    subject(:repositories) { Findingaids::Repositories.repositories }

    context "when repository is 'brooklynhistory', admin_code should have changed" do
      subject(:repository) { repositories['brooklynhistory'] }
      it { expect(repository['display']).to eql("Center for Brooklyn History") }
      it { expect(repository['url_safe_display']).to eql("Center for Brooklyn History") }
      it { expect(repository['url']).to eql("brooklynhistory") }
      it { expect(repository['admin_code']).to eql("cbh") }
    end

    context "when repository is Fales" do
      subject(:repository) { repositories['fales'] }
      it { expect(repository['display']).to eql("The Fales Library & Special Collections") }
      it { expect(repository['url_safe_display']).to eql("The Fales Library %26 Special Collections") }
      it { expect(repository['url']).to eql("fales") }
      it { expect(repository['admin_code']).to eql("fales") }
    end

    context "when repository is Tamiment " do
      subject(:repository) { repositories['tamiment'] }
      it { expect(repository['display']).to eql("Tamiment Library & Wagner Labor Archives") }
      it { expect(repository['url_safe_display']).to eql("Tamiment Library %26 Wagner Labor Archives") }
      it { expect(repository['url']).to eql("tamiment") }
      it { expect(repository['admin_code']).to eql("tamwag") }
    end

    context "when repository is NYU Archives " do
      subject(:repository) { repositories['universityarchives'] }
      it { expect(repository['display']).to eql("New York University Archives") }
      it { expect(repository['url_safe_display']).to eql("New York University Archives") }
      it { expect(repository['url']).to eql("universityarchives") }
      it { expect(repository['admin_code']).to eql("archives") }
    end

    context "when repository is NYHS" do
      subject(:repository) { repositories['nyhistory'] }
      it { expect(repository['display']).to eql("The New York Historical") }
      it { expect(repository['url_safe_display']).to eql("The New York Historical") }
      it { expect(repository['url']).to eql("nyhistory") }
      it { expect(repository['admin_code']).to eql("nyhs") }
    end

    context "when repository is Poly Archives" do
      subject(:repository) { repositories['poly'] }
      it { expect(repository['display']).to eql("Poly Archives") }
      it { expect(repository['url_safe_display']).to eql("Poly Archives") }
      it { expect(repository['url']).to eql("poly") }
      it { expect(repository['admin_code']).to eql("poly") }
    end

    context "when repository is RISM" do
      subject(:repository) { repositories['rism'] }
      it { expect(repository['display']).to eql("Research Institute for the Study of Man") }
      it { expect(repository['url_safe_display']).to eql("Research Institute for the Study of Man") }
      it { expect(repository['url']).to eql("rism") }
      it { expect(repository['admin_code']).to eql("rism") }
    end

    context "when repository is NYUAD" do
      subject(:repository) { repositories['nyuad'] }
      it { expect(repository['display']).to eql("NYU Abu Dhabi Archives and Special Collections") }
      it { expect(repository['url_safe_display']).to eql("NYU Abu Dhabi Archives and Special Collections") }
      it { expect(repository['url']).to eql("nyuad") }
      it { expect(repository['admin_code']).to eql("nyuad") }
    end

    context "when repository is VLP" do
      subject(:repository) { repositories['vlp'] }
      it { expect(repository['display']).to eql("Villa La Pietra") }
      it { expect(repository['url_safe_display']).to eql("Villa La Pietra") }
      it { expect(repository['url']).to eql("vlp") }
      it { expect(repository['admin_code']).to eql("vlp") }
    end

    context "when repository is arabartarchive" do
      subject(:repository) { repositories['arabartarchive'] }
      it { expect(repository['display']).to eql("Arab Art Archive, al Mawrid, NYU Abu Dhabi") }
      it { expect(repository['url_safe_display']).to eql("Arab Art Archive%2C al Mawrid%2C NYU Abu Dhabi") }
      it { expect(repository['url']).to eql("arabartarchive") }
      it { expect(repository['admin_code']).to eql("arabartarchive") }
    end
  end
end
