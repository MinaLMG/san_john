const express = require("express");
const Meeting_Spoken = require("../models/Meeting_Spoken");
const router = new express.Router();
const Person = require("../models/Person");
const Meeting = require("../models/Meeting");

router.post("/Meeting_Spokens", async (req, res) => {
  try {
    const person_to_get = req.body.p_ID;
    // console.log(team_to_get);
    if (!person_to_get) {
      return res.status(400).send({ error: "not enough params" });
    }
    const person = await Person.findById(person_to_get);
    if (!person) {
      return res.status(400).send({ error: "no person exists" });
    }

    //*****/
    const meeting_to_get = req.body.m_ID;
    // console.log(team_to_get);
    if (!meeting_to_get) {
      return res.status(400).send({ error: "not enough params" });
    }
    const meeting = await Meeting.findById(meeting_to_get);
    if (!meeting) {
      return res.status(400).send({ error: "no meeting exists" });
    }
    const meeting_spoken = new Meeting_Spoken(req.body);
    await meeting_spoken.save();
    res.status(201).send(meeting_spoken);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/Meeting_Spoken/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const meeting_spoken = await Meeting_Spoken.findById(_id);

    if (!meeting_spoken) {
      return res.status(404).send();
    }

    res.send(meeting_spoken);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/Meeting_Spokens", async (req, res) => {
  try {
    const meeting_spokens = await Meeting_Spoken.find({});
    res.send(meeting_spokens);
  } catch (e) {
    res.status(400).send();
  }
});

router.patch("/Meeting_Spokens/:id", async (req, res) => {
  const person = req.body.p_ID;
  if (person) {
    try {
      const person = await Person.findById();
      if (!person) res.status(400).send({ error: "no person exists" });
    } catch {
      res.status(400).send({ error: "no person exists" });
    }
  }
  const meeting = req.body.team;
  if (meeting) {
    try {
      const meeting = await Team.findById();
      if (!team) throw Error("no team exists");
    } catch {
      res.status(400).send({ error: "no team exists" });
    }
  }
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const meeting_spoken = await Meeting_Spoken.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!meeting_spoken) {
      return res.status(404).send();
    }

    res.send(meeting_spoken);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/Meeting_Spokens/:id", async (req, res) => {
  try {
    const meeting_spoken = await Meeting_Spoken.findByIdAndDelete(
      req.params.id
    );

    if (!meeting_spoken) {
      res.status(404).send();
    }

    res.send(meeting_spoken);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
