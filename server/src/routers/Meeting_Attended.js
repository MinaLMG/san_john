const express = require("express");
const Meeting_Attended = require("../models/Meeting_Attended");
const router = new express.Router();
const Person = require("../models/Person");
const Meeting = require("../models/Meeting");

router.post("/Meeting_Attendeds", async (req, res) => {
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
    const meeting_attended = new Meeting_Attended(req.body);
    await meeting_attended.save();

    return res.status(201).send({
      m: meeting_attended,
      attendance: {
        date: meeting_attended.time_attended,
        person: person,
        _id: meeting_attended._id,
      },
    });
  } catch (e) {
    return res.status(400).send(e);
  }
});

router.get("/Meeting_Attended/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const meeting_attended = await Meeting_Attended.findById(_id);

    if (!meeting_attended) {
      return res.status(404).send();
    }

    return res.send(meeting_attended);
  } catch (e) {
    return res.status(500).send();
  }
});

router.get("/Meeting_Attendeds/Meeting/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const meeting_attendeds = await Meeting_Attended.find({ m_ID: _id }).sort({
      time_attended: -1,
    });
    if (!meeting_attendeds) {
      return res.status(404).send();
    }
    let meeting_attendees = await Promise.all(
      meeting_attendeds.map(async (x) => {
        let p = await Person.findById(x.p_ID);
        let d = new Date(x.time_attended);
        let i = x._id;
        return { person: p, date: d, _id: i };
      })
    );

    console.log(meeting_attendees);
    return res.send(meeting_attendees);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.get("/Meeting_Attendeds", async (req, res) => {
  try {
    const meeting_attendeds = await Meeting_Attended.find({});
    return res.send(meeting_attendeds);
  } catch (e) {
    return res.status(400).send();
  }
});

router.patch("/Meeting_Attendeds/:id", async (req, res) => {
  const person = req.body.p_ID;
  if (person) {
    try {
      const person = await Person.findById();
      if (!person) return res.status(400).send({ error: "no person exists" });
    } catch {
      return res.status(400).send({ error: "no person exists" });
    }
  }
  const meeting = req.body.m_ID;
  if (meeting) {
    try {
      const meeting = await Meeting.findById(meeting);
      if (!team) throw Error("no meeting exists");
    } catch {
      return res.status(400).send({ error: "no team exists" });
    }
  }
  const updates = Object.keys(req.body);
  const allowedUpdates = ["m_ID", "p_ID", "time_attended  "];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const meeting_attended = await Meeting_Attended.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    console.log(meeting_attended);

    if (!meeting_attended) {
      return res.status(404).send();
    }

    return res.send(meeting_attended);
  } catch (e) {
    return res.status(400).send(e);
  }
});

router.delete("/Meeting_Attendeds/:id", async (req, res) => {
  try {
    const meeting_attended = await Meeting_Attended.findByIdAndDelete(
      req.params.id
    );

    if (!meeting_attended) {
      return res.status(404).send();
    }

    return res.send(meeting_attended);
  } catch (e) {
    return res.status(500).send();
  }
});

module.exports = router;
