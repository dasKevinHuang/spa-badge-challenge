class V1::Api::TeachersController < ApplicationController

  def index
    render json: Teacher.all
  end

  def show
    render json: Teacher.find(params[:id]).to_json(include: :badges)
  end

end
