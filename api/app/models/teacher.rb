class Teacher < ActiveRecord::Base
  has_many :badges, ->{ order 'points DESC'}
end
