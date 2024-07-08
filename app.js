const express = require("express")
const APIManager = require("./src/api.manager")
const apiRoutes = require("./src/api.crud")
const models = require("./config/models")

const app = express()
const PORT = process.env.PORT || 3000

const apiManager = new APIManager({
  database: "zahmet",
  username: "postgres",
  password: "admin",
  host: "localhost",
  dialect: "postgres",
})

apiManager.connect()
  .then(() => {
    apiManager.loadModels(models)
    return apiManager.syncModels()
  })
  .then(() => {
    app.use(express.json())
    app.use("/admin/api", apiRoutes(apiManager))

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err)
    throw new Error("Unable to connect to the database:")
  })

module.exports = apiManager