class Badge < ActiveRecord::Base
  belongs_to :teacher
  after_initialize :set_default_values
	validates :title, length: {minimum: 5, maximum: 32}

  def set_default_values
    self.points ||= 0
  end
end
