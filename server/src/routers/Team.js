const express = require("express");
const Team = require("../models/Team");
const router = new express.Router();

router.post("/Teams", async (req, res) => {
  try {
    const team = new Team(req.body);
    await team.save();
    res.status(201).send(team);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/Team/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const team = await Team.findById(_id);

    if (!team) {
      return res.status(404).send();
    }

    res.send(team);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/Teams", async (req, res) => {
  try {
    const teams = await Team.find({});
    res.send(teams);
  } catch (e) {
    res.status(400).send();
  }
});

router.patch("/Teams/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!team) {
      return res.status(404).send();
    }

    res.send(team);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/Teams/:id", async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);

    if (!team) {
      res.status(404).send();
    }

    res.send(team);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
