module SolrSpecHelpers
  def add_document(filename)
    @solr = RSolr.connect(url: ENV['SOLR_URL'])

    response = @solr.update(
      data: file_fixture(filename).read,
      headers: { 'Content-Type' => 'text/xml' }
    )

    raise "Failed to load data into Solr: #{response['responseHeader']['status']}" if response['responseHeader']['status'] != 0

    @solr.commit
  end
end
