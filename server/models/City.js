const Sequelize = require('sequelize')
const db = require("../db")

const { STRING, FLOAT } = Sequelize

const City = db.define( 'city', {

  markerDisplay : {
    type: STRING,
    allowNull: false,
    unique: true,
  },

  cityName : {
    type: STRING,
    allowNull: false,
    unique: true,
  },

  cityState: {
    type: STRING,
    allowNull: false,
    unique: false,
    },

  latitude: {
    type: FLOAT,
    allowNull: false,
    unique: false,
  },

  longitude: {
    type: FLOAT,
    allowNull: false,
    unique: false,
  },

  driverInfo: {
    type: STRING,
    allowNull: false,
    unique: false,
    },
    
    driverEmail: {
      type: STRING,
      allowNull: false,
      unique: false,
      },

})

module.exports = City