#!/bin/ruby
require 'erb'

testmap = {
  "devel" => "Chienomi is best one.",
  "prog0" => 'if unless else do done end for foreach in true false null String Array Hash Map Set Integer Fixnum Float Boolean object call and or while until each push shift chomp return break == read open new write',
  "ruby" => 'require each do end {|foo, bar| } to_s succ strip map open new puts next def initialize rescue ensure yield',
  "zsh" => 'typeset for i in do done function zmodload while do done case x in a) ;; esac if then else fi continue',
  "js" => 'function var let const return if else while for async await Promise try cacthe throw console.log export import addEventListener getElementById className appendChild nextSibling createTextNode innerHTML',
  "html" => 'html head body p div section nav aside article h1 h2 h3 ul h4 li h5 table thead h6 tr th dd dt tl a link rel img href src title value name id class ol span meta lang DOCTYPE legend fieldset caption figure target',
  "css" => '#Container {} width height color max-width margin border padding unset inherit initial calc min max @media prefers-color-scheme display flex grid position overflow position absolute fixed relative',
  "css2" => %q!grid-template-columns repeat(auto-fill, minmax(100px, 1fr)) transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1); box-shadow: inset 0 0 10px rgba(0,0,0,0.5); backdrop-filter: blur(10px); @keyframes slide-in-blurred-top pointer-events: none; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;!,
  "css3" => 'background-attachment border-collapse box-sizing text-decoration grid-template-areas overscroll-behavior scroll-snap-type will-change backface-visibility transform-origin ::before ::after nth-child -webkit-overflow-scrolling optimizeLegibility mix-blend-mode !important',
  "elixir" => 'defmodule import spawn GenServer IO.puts send |> call cast start_link defp mix',
  "chienomi" => 'Harukamy Chienomi pieces uchu-teien jlsocial void main web Fediverse ActivityPub',
  "en_words" => 'start go wait book coffee door today next exit ticket phone camera help next slow now night sunday welcome information station top park window school hello free store entrance drink day finish',
  "en_sentence" => '',
  "prog_complicated" => 'ellipsis appearance perspective coefficient maintenance arithmetic anonymous privilege deprecated threshold asynchronous precedence hierarchy occurrence instantiate concatenate bezier complicated'
}

erb = ERB.new(File.read "template.html.erb")

testmap.each do |fn, test_string|
  File.open("#{fn}.html", "w") do |f|
    f.puts erb.result binding
  end
end