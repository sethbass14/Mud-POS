class Api::V1::DrinkOrdersController < ApplicationController

  def index
    @drink_orders = DrinkOrder.all
    render json: @drink_orders, status: 200
  end

end
