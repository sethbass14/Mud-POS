class Api::V1::OrdersController < ApplicationController

  def index
    @orders = Order.all
    render json: @orders, status: 200
  end

  def show
    @order = Order.find(params[:id])
    render json: @order, status: 200
  end

  def create
    @order = Order.new(order_params)
    if @order.save
      render json: @order, status: 201
    else
      render json: {error: "Hey! This screwed up!"}, status: 420
    end
  end

  def update
    @order = Order.find(params[:id])
    if @order.update(order_params)
      render json: @order, status: 200
    else
      render json: {error: "Hey! This screwed up!"}
    end
  end

  def destroy
    @order.destroy
    redner json: {message: "Zap! Order destroye!", id: @order.id}
  end

  private

  def order_params
    params.permit(:client, :date)
  end

end
