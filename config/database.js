const { Sequelize } = require("sequelize")

module.exports = new Sequelize(
    "zahmet",
    "postgres",
    "admin",
    {
        dialect: "postgres",
        host: "localhost",
        port: 5432,
        dialectOptions: {
            useUTC: false
        },
        logging: false
    }
)