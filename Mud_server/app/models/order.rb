class Order < ApplicationRecord
  has_many :drink_orders, dependent: :destroy
  has_many :drinks, through: :drink_orders

  validates  :client, presence: true
end
