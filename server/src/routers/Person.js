const express = require("express");
const mongoose = require("mongoose");
const Person = require("../models/Person");
const router = new express.Router();

const Team = require("../models/Team");
router.post("/Persons", async (req, res) => {
  try {
    const team_to_get = req.body.team;
    console.log(team_to_get);
    if (team_to_get) {
      // return res.status(400).send({ error: "not enough params" });
      const team = await Team.findById(team_to_get);
      if (!team) {
        return res.status(400).send({ error: "no team exists" });
      }
    }
    const person = new Person(req.body);
    await person.save();
    res.status(201).send(person);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/Person/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const person = await Person.findById(_id);

    if (!person) {
      return res.status(404).send();
    }

    res.send(person);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/Persons", async (req, res) => {
  try {
    const persons = await Person.find({});
    res.send(persons);
  } catch (e) {
    res.status(400).send();
  }
});

router.patch("/Persons/:id", async (req, res) => {
  const team_to_get = req.body.team;
  if (team_to_get) {
    try {
      const team = await Team.findById(team_to_get);
      if (!team) return res.status(400).send({ error: "no team exists" });
    } catch (e) {
      return res.status(400).send({ error: "Invalid updates!" });
    }
  }
  const updates = Object.keys(req.body);
  // TODO:detrmine what to update
  const allowedUpdates = ["team"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const person = await Person.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!person) {
      return res.status(404).send();
    }

    res.send(person);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/Persons/:id", async (req, res) => {
  try {
    const person = await Person.findByIdAndDelete(req.params.id);

    if (!person) {
      res.status(404).send();
    }

    res.send(person);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
