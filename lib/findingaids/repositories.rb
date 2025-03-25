module Findingaids
  class Repositories
    include Enumerable

    def self.repositories
      @repositories ||= begin
                          repositories_yaml_file = "repositories.yml"
                          YAML.load_file(File.join(Rails.root, "config", repositories_yaml_file))["Catalog"]["repositories"]
                        end
    end

    extend Forwardable
    def_delegator self, :each
  end
end
