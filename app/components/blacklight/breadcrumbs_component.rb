module Blacklight
  class BreadcrumbsComponent < Blacklight::Component
    def initialize(request:, repository:)
      @request = request
      @repository = repository

      @items = [
        { text: "NYU Libraries", href: "https://library.nyu.edu" },
        { text: "Library Catalog", href: "http://bobcat.library.nyu.edu/nyu" }
      ]

      if @request.query_string.present?
        @items << { text: "Archival Collections", href: "/" }
        @items << { text: "Search" }
      elsif @repository.present?
        @items << { text: "Archival Collections", href: "/" }
        @items << { text: @repository, href: @request.path }
        @items << { text: "Search" }
      else
        @items << { text: "Archival Collections" }
      end
    end
  end
end
