class Api::V1::DrinkOrdersController < ApplicationController

  def index
    if params[:order_id]
      @drink_orders = Order.find(params[:order_id]).drink_orders
    else
      @drink_orders = DrinkOrder.all
    end
    render json: @drink_orders, status: 200

  end


  def show
    @drink_order = DrinkOrder.find(params[:id])
    render json: @drink_order, status: 200
  end

  def create
    @drink_order = DrinkOrder.new(drink_order_params)
    if @drink_order.save
      render json: @drink_order, status: 200
    else
      render json: {error: 'This screwed up!'}, status: 420
    end
  end

  def update
    @drink_order = DrinkOrder.find(params[:id])
    # byebug
    if @drink_order.update(drink_order_params)
      render json: @drink_order, status: 200
    else
      render json: {error: "This screwed up!"}, status: 420
    end
  end

  def destroy
    @drink_order = DrinkOrder.find(params[:id])
    # byebug
    @drink_order.destroy
    render json: {message: "destroyed!", id: @drink_order.id}, status: 200
  end

  private

  def drink_order_params
    params.permit(:order_id, :drink_id, :quantity)
  end

end
