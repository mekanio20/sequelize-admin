const { Sequelize, DataTypes } = require('sequelize')
const database = require('./database')

const Users = database.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false, unique: true },
    img: { type: DataTypes.STRING, allowNull: false },
    fullname: { type: DataTypes.STRING, allowNull: false },
    birthday: { type: DataTypes.DATE, allowNull: false },
    place: { type: DataTypes.STRING, allowNull: false },
    start_work: { type: DataTypes.DATE, allowNull: false },
    end_work: { type: DataTypes.DATE, allowNull: true },
    start_nomer: { type: DataTypes.STRING, allowNull: false },
    end_nomer: { type: DataTypes.STRING, allowNull: true },
    rank: { type: DataTypes.STRING, allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW }
})

const Sections = database.define('sections', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false, unique: true },
    name: { type: DataTypes.STRING, allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW }
})

Sections.hasMany(Users)
Users.belongsTo(Sections)

module.exports = {
    Users, Sections
}