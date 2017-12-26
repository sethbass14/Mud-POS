class OrderSerializer < ActiveModel::Serializer
  attributes :id, :client, :date
  has_many :drinks
end
