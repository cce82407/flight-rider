const Sequelize = require("sequelize")
const { STRING, INTEGER, DATE, TIME } = Sequelize
const db = require("../db")

const User = db.define("user", {
  firstName: {
    type: STRING,
    allowNull: false,
    unique: false,
  },

  lastName :{
    type: STRING,
    allowNull: false,
    unique: false,
  },

  age: {
    type: INTEGER,
    allowNull: false,
    unique: false, 
  },

  departureCity : {
    type: STRING,
    unique: false,
    allowNull: false,
   },

  // departureDate : {
  //   type: DATE,
  //   unique: false,
  //   allowNull: false,
  // },

  // departureTime: {
  //   type: TIME,
  //   unique: false,
  //   allowNull: false,
  // }

})

module.exports = User