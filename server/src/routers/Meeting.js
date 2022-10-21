const express = require("express");
const Meeting = require("../models/Meeting");
const Meeting_Type = require("../models/Meeting_Type");
const router = new express.Router();

router.post("/Meetings", async (req, res) => {
  try {
    const meeting_type_to_get = req.body.meeting_type;
    if (meeting_type_to_get) {
      // return res.status(400).send({ error: "not enough params" });
      const type = await Meeting_Type.findById(meeting_type_to_get);
      if (!type) {
        return res.status(400).send({ error: "no meeting type exists" });
      }
    }
    const meeting = new Meeting(req.body);
    await meeting.save();
    return res.status(201).send(meeting);
  } catch (e) {
    return res.status(400).send(e);
  }
});

router.get("/Meeting/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const meeting = await Meeting.findById(_id);

    if (!meeting) {
      return res.status(404).send();
    }

    return res.send(meeting);
  } catch (e) {
    return res.status(500).send();
  }
});

router.get("/Meetings", async (req, res) => {
  try {
    const meetings = await Meeting.find({}).sort({ date: -1 });

    // console.log(meetings);
    return res.send(meetings);
  } catch (e) {
    return res.status(400).send();
  }
});

router.patch("/Meetings/:id", async (req, res) => {
  const meeting_type_to_get = req.body.meeting_type;
  if (meeting_type_to_get) {
    try {
      const type = await Meeting_Type.findById(meeting_type_to_get);
      if (!type)
        return res.status(400).send({ error: "no meeting type exists" });
    } catch (e) {
      return res.status(400).send({ error: "Invalid id for meeting type!" });
    }
  }
  const updates = Object.keys(req.body);
  const allowedUpdates = ["date", "description", "meeting_type", "speaker"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const meeting = await Meeting.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!meeting) {
      return res.status(404).send();
    }

    return res.send(meeting);
  } catch (e) {
    return res.status(400).send(e);
  }
});

router.delete("/Meetings/:id", async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndDelete(req.params.id);

    if (!meeting) {
      return res.status(404).send();
    }

    return res.send(meeting);
  } catch (e) {
    return res.status(500).send();
  }
});

module.exports = router;
