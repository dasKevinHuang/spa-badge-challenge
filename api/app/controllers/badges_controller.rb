class BadgesController < ApplicationController

  def create
    p params
    @boot = Boot.find_by(name: params[:boot_id])
    @badge = Badge.create(name: params[:name])
    @boot.badges << @badge
    render json: {badge: @badge, badge_count: @boot.badges.count}
  end

end
