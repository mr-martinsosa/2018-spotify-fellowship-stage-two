# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Event.create(
    start: DateTime.new(2018, 6, 4, 8),
    end: DateTime.new(2018,6,4,23),
    description: "Not Fourth of July" 
)

Event.create(
    start: DateTime.new(2018, 6, 1, 5),
    end: DateTime.new(2018,6,1,10),
    description: "First Day of June" 
)

Event.create(
    start: DateTime.new(2018, 6, 2, 5),
    end: DateTime.new(2018,6,2,10),
    description: "Second Day of June" 
)

Event.create(
    start: DateTime.new(2018, 6, 3, 5),
    end: DateTime.new(2018,6,3,10),
    description: "Third Day of June" 
)

Event.create(
    start: DateTime.new(2018, 6, 5, 5),
    end: DateTime.new(2018,6,5,10),
    description: "Fifth Day of June" 
)

Event.create(
    start: DateTime.new(2018, 6, 6, 5),
    end: DateTime.new(2018,6,6,10),
    description: "Sixth Day of June" 
)

Event.create(
    start: DateTime.new(2018, 6, 7, 5),
    end: DateTime.new(2018,6,7,10),
    description: "Seventh Day of June" 
)
