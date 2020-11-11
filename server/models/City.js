const Sequelize = require('sequelize')
const db = require("../db")

const { STRING, FLOAT } = Sequelize

const City = db.define( 'city', {
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
  }

})

module.exports = City