class AddImageUrlToDrinks < ActiveRecord::Migration[5.1]
  def change
    add_column :drinks, :url, :string
  end
end
