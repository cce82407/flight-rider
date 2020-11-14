const express = require("express")
const chalk = require ("chalk")
const app = express()
const db = require("./db")
const City = require('./models/City')
const User = require('./models/User')
const volleyball = require("volleyball")
const path = require("path")

app.use(express.json())
app.use(volleyball)
app.use("/dist", express.static(path.join(__dirname, "../dist")))

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../index.html"))
})


app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send({ message: err.message })
})

app.get("/api/cities", async (req, res, next) => {
 try {
   const cities = await City.findAll()
    res.send(cities)
 } catch (e) {
   (e) => console.error(e)
 }
})


// app.get("/api/cities/:arrivalState", async (req, res, next) => {
//   try {
//     const cities = await City.findAll({
//       where: {
//         cityState: req.params.arrivalState,
//       }
//     })
//      res.send(cities)
//   } catch (e) {
//     (e) => console.error(e)
//   }
//  })

app.get("/api/users", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(users)
  } catch (e) {
    (e) => console.error(e)
  }
})





async function startServer(){
  try {
    console.log(chalk.green(`Database is Syncing`))
    await db.sync()
    const PORT = process.env.PORT || 4000
    await app.listen(PORT, () => {
      console.log(chalk.green(`Listening on port: ${PORT}`))
    })
  } catch (e) {
    console.log(chalk.red("Failed to start server"))
    console.error(e)
  }
}

startServer()

