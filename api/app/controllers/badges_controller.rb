class BadgesController < ApplicationController

  def create
    @boot = Boot.find_by(name: params[:boot_id])
    @badge = Badge.create(name: params[:name])
    @boot.badges << @badge
    render json: {badge: @badge, badge_count: @boot.badges.count}
  end

  def update
    @badge = Badge.find(params[:id]);
    if params["upDown"] == "up"
      @badge.points += 1
    else
      @badge.points -= 1
    end
    @badge.save
    render json: {badge_points: @badge.points, badge_id: @badge.id}
  end

end
