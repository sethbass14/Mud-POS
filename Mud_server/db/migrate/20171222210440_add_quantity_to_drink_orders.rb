class AddQuantityToDrinkOrders < ActiveRecord::Migration[5.1]
  def change
    add_column :drink_orders, :quantity, :integer
  end
end
