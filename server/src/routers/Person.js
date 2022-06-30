const express = require("express");
const mongoose = require("mongoose");
const Person = require("../models/Person");
const router = new express.Router();

const Team = require("../models/Team");
const Status = require("../models/Status");
const Education_Year = require("../models/Education_Year");
const Role = require("../models/Role");

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
    const status_to_get = req.body.status;
    console.log(status_to_get);
    if (status_to_get) {
      // return res.status(400).send({ error: "not enough params" });
      const status = await Status.findById(status_to_get);
      if (!status) {
        return res.status(400).send({ error: "no status exists" });
      }
    }
    const education_year_to_get = req.body.education_year;
    console.log(education_year_to_get);
    if (education_year_to_get) {
      // return res.status(400).send({ error: "not enough params" });
      const education_year = await Education_Year.findById(
        education_year_to_get
      );
      if (!education_year) {
        return res.status(400).send({ error: "no education_year exists" });
      }
    }
    const role_to_get = req.body.role;
    console.log(role_to_get);
    if (role_to_get) {
      // return res.status(400).send({ error: "not enough params" });
      const role = await Role.findById(role_to_get);
      if (!role) {
        return res.status(400).send({ error: "no role exists" });
      }
    }
    const person = new Person(req.body);
    await person.save();
    return res.status(201).send(person);
  } catch (e) {
    console.log(e);
    return res.status(400).send({ error: e });
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
    const persons = await Person.find({}).sort({ name: 1 });
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
  const allowedUpdates = ["team", "name"];
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
