namespace :sc do
  SHARED_SOLR_OPTIONS = { managed: true, verbose: true, persist: false, download_dir: "tmp", version: "9.6.1" }

  def add_document(filename)
    solr = RSolr.connect(url: ENV["SOLR_URL"])

    response = solr.update(
      data: File.read("spec/fixtures/files/#{filename}"),
      headers: { "Content-Type" => "text/xml" }
    )

    raise "Failed to load data into Solr: #{response['responseHeader']['status']}" if response["responseHeader"]["status"] != 0

    solr.commit
  end

  desc "Run Solr and Blacklight for interactive development"
  task server: [:environment, "assets:precompile"]  do
    FileUtils.rm_rf "tmp/development-core"

    SolrWrapper.wrap(SHARED_SOLR_OPTIONS.merge(port: 8983, instance_dir: "tmp/development-core")) do |solr|
      solr.with_collection(name: "development-core", dir: Rails.root.join("solr/conf").to_s) do
        puts "Solr running, ^C to exit"
        begin
          ENV["SOLR_URL"] = "http://localhost:8983/solr/development-core"
          system "bundle exec rails s -b 0.0.0.0"
          sleep
        rescue Interrupt
          puts "\nShutting down..."
        end
      end
    end
  end

  desc "Run Solr and the test suite"
  task test: :environment do
    FileUtils.rm_rf "tmp/test-core"

    SolrWrapper.wrap(SHARED_SOLR_OPTIONS.merge(port: 8984, instance_dir: "tmp/test-core")) do |solr|
      solr.with_collection(name: "test-core", dir: Rails.root.join("solr/conf").to_s) do
        ENV["SOLR_URL"] = "http://localhost:8984/solr/test-core"
        Rake::Task["default"].invoke
      end
    end
  end

  desc "Load data into development environment"
  task load: :environment do
    ENV["SOLR_URL"] = "http://localhost:8983/solr/development-core"

    add_document("bloch.xml")
    add_document("oh002.xml")
    add_document("kopit.xml")
  end
end
