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

## Test Suite

To run the test suite:

```bash
$ bin/rake sc:test
```

To autofix any Rubocop issues run the following:

```bash
$ bundle exec rubocop -a
```

## Running Against Another Solr

```bash
$ SOLR_URL=http://ip-address:port/solr/findingaids bin/rails server
```
