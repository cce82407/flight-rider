const db = require("./server/db")
const chalk = require("chalk")
const { City, User } = require("./server/models")


const startingCities = [
  {
    markerDisplay: "Charlotte, NC",
    cityName: "Charlotte",
    cityState: "NC",
    latitude: 35.2271,
    longitude: -80.8431,
    driverInfo: "Brian",
    driverEmail: "Brian123@yahoo.com"
  },

  {
    markerDisplay: "Columbia, SC",
    cityName: "Columbia",
    cityState: "NC",
    latitude: 34.0007,
    longitude: -81.0348,
    driverInfo: "Crystal",
    driverEmail: "Crystal129@me.com"
  },

  {
    markerDisplay: "Asheville, NC",
    cityName: "Asheville",
    cityState: "NC",
    latitude: 35.596588,
    longitude: -82.554901,
    driverInfo: "Anson",
    driverEmail: "Anson@gmail.com"
  },

  {
    markerDisplay: "Rockhill, SC",
    cityName: "Rockhill",
    cityState: "NC",
    latitude: 34.9249,
    longitude: -81.0251,
    driverInfo: "Anthony",
    driverEmail: "MyNy@gmail.com"
  },

  {
    markerDisplay: "Spartanburg, SC",
    cityName: "Spartanburg",
    cityState: "NC",
    latitude: 34.9496,
    longitude: -81.9320,
    driverInfo: "Anthony",
    driverEmail: "MyNy@gmail.com"
  },

  {
    markerDisplay: "Denver, CO",
    cityName: "Denver",
    cityState: "CO",
    latitude: 39.742043,
    longitude: -104.991531,
    driverInfo: "Jennifer",
    driverEmail: "Jennifer@hotmail.com"
  },
  {
    markerDisplay: "Boulder, CO",
    cityName: "Boulder",
    cityState: "CO",
    latitude: 40.0150,
    longitude: -105.2705,
    driverInfo: "Danny",
    driverEmail: "Danny@aol.com",
  },
  {
    markerDisplay: "Aurora, CO",
    cityName: "Aurora",
    cityState: "CO",
    latitude: 39.7294,
    longitude: -104.8319,
    driverInfo: "John",
    driverEmail: "JSmith@mymail.com", 
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