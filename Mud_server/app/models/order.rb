class Order < ApplicationRecord
  has_many :drink_orders
  has_many :drinks, through: :drink_orders

  validates  :name, presence: true
end
