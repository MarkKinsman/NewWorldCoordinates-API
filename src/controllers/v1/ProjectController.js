const sqlutils = require('../../lib/sqlutils')
const _ = require('lodash')

module.exports = {
  async index(req, res) {
    try {
      const results = await sqlutils.execute(
        'SELECT * FROM project ORDER BY project_id ASC'
        , [])
      return res.send(results)
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'An error has occured trying to fetch the projects'
      })
    }
  },

  async add(req, res) {
    try {
      const results = await sqlutils.execute(
        'INSERT INTO project(name) VALUES ($1) RETURNING *'
        , [req.body.name])
      return res.send(results[0])
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'An error has occured trying to add the new project'
      })
    }
  }
}