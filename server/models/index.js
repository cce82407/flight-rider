const User = require("./User")
const City = require("./City")

User.belongsTo(City)
City.hasMany(User)

module.exports = {
  User,
  City
}