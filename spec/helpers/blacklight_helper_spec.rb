require 'rails_helper'

describe BlacklightHelper do
  let(:field) { "unittitle_ssm" }
  let(:solr_document) { create(:solr_document) }
  let(:blacklight_config) { create(:blacklight_config) }
  let(:document) { { document: solr_document, field: field } }

  describe "#link_to_document" do
    subject { helper.link_to_document(document[:document], document[:document][:field], opts) }
    let(:opts) { { counter: nil } }
    before { allow(helper).to receive(:blacklight_config).and_return blacklight_config }
    context "when document has title" do
      it { should eql("<a target=\"_blank\" href=\"https://findingaids.library.nyu.edu/fales/testead/all/#123\">The Title</a>") }
    end
    context "when document doesn't have title" do
      let(:solr_document) { create(:solr_document, unittitle: []) }
      it { should eql("<a target=\"_blank\" href=\"https://findingaids.library.nyu.edu/fales/testead/all/#123\">https://findingaids.library.nyu.edu/fales/testead/all/#123</a>") }
    end
  end

  describe '#render_filter_name' do
    let(:name) { 'Title' }
    subject { helper.render_filter_name(name) }
    context 'when name is a simple string' do
      it { should eql '<span class="filterName">Title:</span>' }
    end
    context 'when name is a hash' do
      let(:name) { { default: 'Keyword' } }
      it { should eql '<span class="filterName">Keyword:</span>' }
    end
  end
end
