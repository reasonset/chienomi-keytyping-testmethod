#!/bin/ruby
require 'erb'
require 'yaml'

testmap = YAML.load File.read "sentence.yaml"

erb = ERB.new(File.read "template.html.erb")

testmap.each do |fn, test_string|
  File.open("#{fn}.html", "w") do |f|
    f.puts erb.result binding
  end
end