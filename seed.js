const db = require("./server/db")
const chalk = require("chalk")
const { City, User } = require("./server/models")


const startingCities = [
  {
    cityName: "Charlotte",
    cityState: "North Carolina",
    latitude: 35.2271,
    longitude: -80.8431
  },

  {
    cityName: "Columbia",
    cityState: "South Carolina",
    latitude: 34.0007,
    longitude: -81.0348,
  },

  {
    cityName: "Asheville",
    cityState: "North Carolina",
    latitude: 35.596588,
    longitude: -82.554901,
  },

  {
    cityName: "Denver",
    cityState: "Colorado",
    latitude: 39.742043,
    longitude: -104.991531
  },
  {
    cityName: "Boulder",
    cityState: "Colorado",
    latitude: 40.0150,
    longitude: -105.2705
  },
  {
    cityName: "Aurora",
    cityState: "Colorado",
    latitude: 39.7294,
    longitude: -104.8319
  },
]


const startingUsers = [
  {firstName: "John",
  lastName: "Harris",
  age: 42,
  departureCity: "Seattle",
  cityId: 1,
  },

  {firstName: "Angela",
  lastName: "Perez",
  age: 29,
  departureCity: "Seattle",
  cityId: 1,
  },

  {firstName: "Alex",
  lastName: "Cantor",
  age: 33,
  departureCity: "Charlotte",
  cityId: 4, 
  },

  {firstName: "Jennifer",
  lastName: "Brown",
  age: 25,
  departureCity: "Charlotte",
  cityId: 1,
  }

]


const seed = async (force = true) => {
  try {
    await db.sync ({force})
    await Promise.all(startingCities.map((city)=> City.create(city)))
    await Promise.all(startingUsers.map((user)=> User.create(user)))
    console.log(chalk.green(`DB successfully connected and synced. Force = ${force}`))
  } catch (e) {
    console.log(chalk.red("Error while connecting to the database"))
    throw e
  }
}

seed()