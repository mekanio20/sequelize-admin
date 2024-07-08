const { Sequelize } = require('sequelize')

class APIManager {
  constructor({ database, username, password, host, dialect }) {
    this.sequelize = new Sequelize(database, username, password, {
      host: host,
      dialect: dialect,
      logging: false
    })
    this.models = {}
  }

  async connect() {
    try {
      await this.sequelize.authenticate()
      console.log("Connection has been established successfully.")
    } catch (error) {
      console.error("Unable to connect to the database:", error)
      throw new Error("Unable to connect to the database:")
    }
  }

  loadModels(models) {
    for (let key in models) {
      this.models[key] = models[key]
      console.log(`Model loaded: ${models[key]}`)
    }
  }

  syncModels(type) {
    return this.sequelize.sync(type)
  }

  getModel(name) {
    return this.models[name]
  }

  getModelNames() {
    return Object.keys(this.models)
  }
}

module.exports = APIManager