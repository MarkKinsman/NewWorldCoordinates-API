const sqlutils = require("../../lib/sqlutils");
const _ = require("lodash");

module.exports = {
  async index(req, res) {
    try {
      const results = await sqlutils.execute(
        "SELECT * FROM version WHERE project_id = $1 ORDER BY project_id, version ASC",
        [req.body.project_id]
      );
      return res.send(results);
    } catch (err) {
      console.log(err);
      res.status(400).send({
        error: "An error has occured trying to fetch the versions"
      });
    }
  },

  async add(req, res) {
    try {
      const results = await sqlutils.execute(
        "INSERT INTO version(project_id, version_number) VALUES ($1, $2) RETURNING *",
        [req.body.project_id, req.body.version_number]
      );
      return res.send(results[0]);
    } catch (err) {
      console.log(err);
      res.status(400).send({
        error: "An error has occured trying to add the new version"
      });
    }
  }
};
