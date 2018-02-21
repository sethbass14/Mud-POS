class Drink < ApplicationRecord
  has_many :drink_orders, dependent: :destroy
  has_many :orders, through: :drink_orders

  validates :name, presence: true
  validates :description, presence: true
end
