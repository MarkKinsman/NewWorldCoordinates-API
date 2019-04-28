const ProjectControllerV1 = require("./controllers/v1/ProjectController");
const VersionControllerV1 = require("./controllers/v1/VersionController");
const MarkupControllerV1 = require("./controllers/v1/MarkupController");

module.exports = app => {
  // Health Check
  app.get("/", function(req, res) {
    res.status(200).send("We are running!");
  });

  // #region v1
  // Projects
  app.get("/v1/projects", ProjectControllerV1.index);
  app.post("/v1/project", ProjectControllerV1.add);

  // Versions
  app.post("/v1/versions", VersionControllerV1.index);
  app.post("/v1/version", VersionControllerV1.add);

  // Markups
  app.post("/v1/markups", MarkupControllerV1.index);
  app.post("/v1/markup", MarkupControllerV1.add);
  app.get("/v1/markup/:markupId", MarkupControllerV1.show);
  app.delete("/v1/markup/:markupId", MarkupControllerV1.delete);
  app.put("/v1/markup/:markupId", MarkupControllerV1.update);
  // #endregion
};
