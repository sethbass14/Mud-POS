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

    # byebug
    drink_response = []
    params[:drink_orders].each do |drink_order|
      drink = DrinkOrder.where(drink_id: drink_order[:drink_id], order_id: drink_order[:order_id]).first
      # byebug
      if drink
        if drink_order[:quantity] == 0
          drink.destroy
          # byebug
        elsif drink_order[:quantity] != drink.quantity
          drink.quantity = drink_order[:quantity]
          drink.save
          # byebug
        end
      end

      if !drink && drink_order[:quantity] > 0
        newDrinkOrder = DrinkOrder.create(drink_id: drink_order[:drink_id], order_id: drink_order[:order_id], quantity: drink_order[:quantity])
        drink_response.push(newDrinkOrder)
      end
    end
    # @drink_order = DrinkOrder.new(drink_order_params)
    # if @drink_order.save
    #   render json: @drink_order, status: 200
    # else
    #   render json: {error: 'This screwed up!'}, status: 420
    # end
    if !drink_response.empty?
      render json: { drink_orders: drink_response }, status: 200
    else
      render json: { message: 'everything worked' }, status: 200
    end

  end

  # def update
  #   # @drink_order = DrinkOrder.find(params[:id])
  #   # # byebug
  #   # if @drink_order.update(drink_order_params)
  #   #   render json: @drink_order, status: 200
  #   # else
  #   #   render json: {error: "This screwed up!"}, status: 420
  #   # end
  # end

  # def destroy
  #   @drink_order = DrinkOrder.find(params[:id])
  #   # byebug
  #   @drink_order.destroy
  #   render json: {message: "destroyed!", id: @drink_order.id}, status: 200
  # end

  # private

  # def drink_order_params
  #   params.permit(:order_id, :drink_id, :quantity)
  # end

end
