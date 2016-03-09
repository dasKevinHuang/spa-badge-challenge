class BootsController < ApplicationController

  def index
    @boots = Boot.all
  end

  def show
    @boot = Boot.find_by(name: params[:id])
    render json: {boot: @boot, badges: @boot.badges}
  end

end
