const express = require("express");
const Meeting = require("../models/Meeting");
const router = new express.Router();

router.post("/Meetings", async (req, res) => {
  try {
    const meeting = new Meeting(req.body);
    await meeting.save();
    res.status(201).send(meeting);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/Meeting/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const meeting = await Meeting.findById(_id);

    if (!meeting) {
      return res.status(404).send();
    }

    res.send(meeting);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/Meetings", async (req, res) => {
  try {
    const meetings = await Meeting.find({});
    res.send(meetings);
  } catch (e) {
    res.status(400).send();
  }
});

router.patch("/Meetings/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["date", "description"];
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

    res.send(meeting);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/Meetings/:id", async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndDelete(req.params.id);

    if (!meeting) {
      res.status(404).send();
    }

    res.send(meeting);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
