const express = require("express");
require("./db/mongoose");
const User = require("./models/Team");

const app = express();
const port = 5000;

const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/Teams", (req, res) => {
  console.log("running");
});

app.post("/Teams", (req, res) => {
  const team = new User(req.body);

  team
    .save()
    .then(() => {
      res.send(team);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
