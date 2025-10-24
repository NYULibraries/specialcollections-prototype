# Special Collections Prototype

NYU Libraries Special Collections Discovery Application recreated with Blacklight 8.x

## Getting Started

To check out the project and stand up a local instance:

```bash
git clone git@github.com:NYULibraries/specialcollections-prototype.git
cd specialcollections-prototype
bundle install
bin/rake sc:server
```

Then visit <http://localhost:3000>

## Loading Data in Dev

There is a growing number of fixture files in `spec/fixtures/files`, pulled from [dlfa-188_v1-indexer-http-requests-xml](https://github.com/NYULibraries/dlfa-188_v1-indexer-http-requests-xml).

While the dev server is running (`sc:server` above) you can load these fixtures by running:

```bash
bin/rake sc:load
```

## Playwright End-to-End Tests

The Playwright service automatically runs `bin/rake sc:load` in a short-lived helper container before executing the browser tests. This seeds the development Solr core with the full fixture set and leaves the index populated for ad-hoc browsing afterward.

To launch the suite (and its prerequisite containers) in one step:

```bash
docker compose up playwright
```

Add `--build` if you need to rebuild the Docker images first. The command will:

- Start Solr and the Rails app
- Run `solr-fixtures` (which executes `bin/rake sc:load` against the Solr container)
- Execute the Playwright suite

Playwright test files share a Prettier + ESLint configuration scoped to the e2e workspace. Run the formatter:

```bash
yarn --cwd e2e format
```

Use `yarn --cwd e2e lint` to verify formatting and linting without modifying files.

To exercise the suite without Docker, start `bin/rake sc:server` in another terminal. With the app running locally, use the helper script to run the Playwright suite without reloading fixtures on every invocation:

```bash
bin/playwright-local
```

Important: create an `.env.test` file in the `e2e` directory with the following content so the helper points Playwright at your local app:

```bash
PLAYWRIGHT_BASE_URL=http://localhost:3000
```

Fixtures remain in Solr between runs. When you do need a fresh load, either set `PLAYWRIGHT_LOAD_FIXTURES=1 bin/playwright-local` or pass `--load-fixtures` as the first argument before any Playwright flags.

To run Playwright in headed mode, run from root:

```bash
yarn --cwd e2e test:e2e --headed
```

## Test Suite

To run the test suite:

```bash
bin/rake sc:test
```

To autofix any Rubocop issues, run the following:

```bash
bundle exec rubocop -a
```

## Running Against Another Solr

To stand up dev against an existing instance of Solr:

```bash
SOLR_URL=http://ip-address:port/solr/findingaids bin/rails server
```
