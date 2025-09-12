# Special Collections Prototype

NYU Libraries Special Collections Discovery Application recreated with Blacklight 8.x

## Getting Started

To check out the project and stand up a local instance:

```bash
$ git clone git@github.com:NYULibraries/specialcollections-prototype.git
$ cd specialcollections-prototype
$ bundle install
$ bin/rake sc:server
```

Then visit <http://localhost:3000>

## Loading Data in Dev

There is a growing number of fixture files in `spec/fixtures/files`, pulled from [dlfa-188_v1-indexer-http-requests-xml](https://github.com/NYULibraries/dlfa-188_v1-indexer-http-requests-xml).

While the dev server is running (`sc:server` above) you can load these fixtures by running:

```bash
$ bin/rake sc:load
```

## Test Suite

To run the test suite:

```bash
$ bin/rake sc:test
```

To autofix any Rubocop issues, run the following:

```bash
$ bundle exec rubocop -a
```

## Running Against Another Solr

To stand up dev against an existing instance of Solr:

```bash
$ SOLR_URL=http://ip-address:port/solr/findingaids bin/rails server
```

