# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


flatiron = Order.create(client: 'Flatiron School', date: Time.now)
ikoku = Order.create(client: 'Ikoku and Associates', date: Time.now)
barden = Order.create(client: 'Barden and Barden', date: Time.now)

espresso = Drink.create(name:"espresso", description:"Triple ristretto shot", price: 2.75, url: "https://i.imgur.com/5uZKbRB.jpg")
macchiato = Drink.create(name:"macchiato", description:"Triple ristretto shot with a dollup of steamed milk", price: 3.00)
cortado = Drink.create(name:"coratdo", description: "Triple ristretto shot with 3oz of steamed milk", price: 4.75)
latte = Drink.create(name:"latte", description:"Triple ristretto shot with 8oz of steamed milk", price: 4.75)
