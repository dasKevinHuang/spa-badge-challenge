# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Boot.delete_all
Badge.delete_all

boots = Boot.create([{name: "Anne"}, {name: "Derek"}, {name: "Hunter"}, {name: "Jen"}, {name: "Julian"}, {name: "Sarah"}, {name: "Shambhavi"}, {name: "Walker"}])

Boot.all.each do |boot|
  10.times do
    boot.badges << Badge.create({name: Faker::Superhero.name, points: rand(1..100)})
  end
end
