# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

teachers = %w[Anne Derek Hunter Jen Julian Sarah Shambhavi Walker]


Teacher.delete_all

teachers.each do |t|
  teacher_obj = Teacher.create!({ name: t })

  3.times do |x|
    Badge.create!( 
      teacher_id: teacher_obj.id,
      points: x,
      title: "Title #{x}"
      )
  end

end

