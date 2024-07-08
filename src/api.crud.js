const express = require('express')
const Sequelize = require('sequelize')

module.exports = (apiManager) => {
  const router = express.Router()

  Object.keys(apiManager.models).forEach(async (modelName) => {
    const Model = await apiManager.getModel(modelName)

    // Create
    router.post(`/${modelName}`, async (req, res) => {
      try {
        const instance = await Model.create(req.body)
        res.status(201).json(instance)
      } catch (error) {
        res.status(400).json({ error: error.message })
      }
    })

    // Read All
    router.get(`/${modelName}`, async (req, res) => {
      try {
        const instances = await Model.findAll()
        res.status(200).json(instances)
      } catch (error) {
        res.status(400).json({ error: error.message })
      }
    })

    // Read One
    router.get(`/${modelName}/:id`, async (req, res) => {
      try {
        const instance = await Model.findByPk(req.params.id)
        if (!instance) {
          return res.status(404).json({ error: 'Not Found' })
        }
        res.status(200).json(instance)
      } catch (error) {
        res.status(400).json({ error: error.message })
      }
    })

    // Update
    router.put(`/${modelName}/:id`, async (req, res) => {
      try {
        const instance = await Model.findByPk(req.params.id)
        if (!instance) {
          return res.status(404).json({ error: 'Not Found' })
        }
        await instance.update(req.body)
        res.status(200).json(instance)
      } catch (error) {
        res.status(400).json({ error: error.message })
      }
    })

    // Delete
    router.delete(`/${modelName}/:id`, async (req, res) => {
      try {
        const instance = await Model.findByPk(req.params.id)
        if (!instance) {
          return res.status(404).json({ error: 'Not Found' })
        }
        await instance.destroy()
        res.status(204).end()
      } catch (error) {
        res.status(400).json({ error: error.message })
      }
    })
  })

  return router
}