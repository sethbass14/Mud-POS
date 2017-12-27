class Api::V1::DrinksController < ApplicationController

  def index
    @drinks = Drink.all
    render json: @drinks, status: 200
  end

  def show
    @drink = Drink.find(params[:id])
    render json: @drink, status: 200
  end

  def create
    @drink = Drink.new(drink_params)
    byebug
    if @drink.save
      render json: @drink, status: 200
    else
      render json: {error: "This screwed up!"}, status: 420
    end
  end

  def update
    @drink = Drink.find(params[:id])
    if @drink.update(drink_params)
      render json: @drink, status: 200
    else
      render json: {error: "This screw up!"}, status: 420
    end
  end

  def destroy
    @drink.destroy
    render json: {message: "Zap!, drink deleted!", id: @drink.id}
  end

  private

  def drinks_params
    params.permit(:name, :description, :price)
  end
end
