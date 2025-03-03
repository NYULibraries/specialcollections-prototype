# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require_relative "config/application"
require 'rubocop/rake_task'

Rails.application.load_tasks
RuboCop::RakeTask.new

require 'solr_wrapper/rake_task' unless Rails.env.production?

task default: %i[
  spec
  rubocop
]
