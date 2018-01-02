class DrinkSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :price, :url
  has_many :orders
end
