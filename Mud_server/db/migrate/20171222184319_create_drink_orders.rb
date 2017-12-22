class CreateDrinkOrders < ActiveRecord::Migration[5.1]
  def change
    create_table :drink_orders do |t|
      t.belongs_to :order, foreign_key: true
      t.belongs_to :drink, foreign_key: true

      t.timestamps
    end
  end
end
