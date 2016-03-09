class V1::Api::BadgesController < ApplicationController

  def index
    puts '*' * 100
    p params
    puts '*' * 100
    render json: Teacher.find(params[:teacher_id]).badges
  end

  def create
    teacher = Teacher.find(params[:teacher_id])
    badge = Badge.create!( title: params[:title] )
    if badge.errors.empty?
      teacher.badges << badge
      render json: badge
    else
      render text: "Error"
    end
  end

  def update
    badge = Badge.find(params[:id])
    if params[:value] == "1" || params[:value] == "-1"
      # Only up votes & down votes of 1 count are accepted
      badge.points += params[:value].to_i
      badge.save!
    end
    render json: badge
  end


end
