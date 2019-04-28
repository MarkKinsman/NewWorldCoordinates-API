const sqlutils = require("../../lib/sqlutils");
const _ = require("lodash");

module.exports = {
  async index(req, res) {
    try {
      const results = await sqlutils.execute(
        "SELECT * FROM markup WHERE version_id = $1 ORDER BY version_id, type ASC",
        [req.body.version_id]
      );
      return res.send(results);
    } catch (err) {
      console.log(err);
      res.status(400).send({
        error: "An error has occured trying to fetch all markups"
      });
    }
  },

  async add(req, res) {
    try {
      const results = await sqlutils.execute(
        "INSERT INTO markup(markup_id, version_id, type, data, location, status, creator, assigned, created_at, updated_at) " +
          "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, now(), now()) RETURNING *",
        [
          req.body.markup_id,
          req.body.version_id,
          req.body.type,
          req.body.data,
          req.body.location,
          req.body.status,
          req.body.creator,
          req.body.assigned
        ]
      );
      return res.send(results[0]);
    } catch (err) {
      console.log(err);
      res.status(400).send({
        error: "An error has occured trying to add the new markup"
      });
    }
  },

  async show(req, res) {
    try {
      const results = await sqlutils.execute(
        "SELECT * FROM markup WHERE markup_id = $1",
        [req.params.markup_id]
      );
      return res.send(results[0]);
    } catch (err) {
      console.log(err);
      res.status(400).send({
        error: "An error has occured trying to fetch the markup"
      });
    }
  },

  async delete(req, res) {
    try {
      const results = await sqlutils.execute(
        "DELETE FROM markup WHERE markup_id = $1",
        [req.params.markup_id]
      );
      return res.send({ Deleted: req.params.markup_id });
    } catch (err) {
      console.log(err);
      res.status(400).send({
        error: "An error has occured trying to delete the markup"
      });
    }
  },

  async update(req, res) {
    try {
      const results = await sqlutils.execute(
        "UPDATE markup SET data = $1, creator = $2, assigned =$3, location = $4, status = $5, updated_at = now() " +
          "WHERE markup_id = $5 RETURNING *",
        [
          req.body.data,
          req.body.creator,
          req.body.assigned,
          req.body.location,
          req.body.status,
          req.params.markup_id
        ]
      );
      return res.send(results[0]);
    } catch (err) {
      console.log(err);
      res.status(400).send({
        error: "An error has occured trying to update the markup"
      });
    }
  }
};
