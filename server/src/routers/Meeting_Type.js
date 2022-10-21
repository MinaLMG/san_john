const express = require("express");
const Meeting_Type = require("../models/Meeting_Type");
const router = new express.Router();
const Meeting = require("../models/Meeting");

router.post("/Meeting_Types", async (req, res) => {
  try {
    console.log("here");
    const meeing_type = new Meeting_Type(req.body);
    await meeing_type.save();
    return res.status(201).send(meeing_type);
  } catch (e) {
    return res.status(400).send(e);
  }
});

router.get("/Meeting_Type/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const meeing_type = await Meeting_Type.findById(_id);

    if (!meeing_type) {
      return res.status(404).send();
    }

    return res.send(meeing_type);
  } catch (e) {
    return res.status(500).send();
  }
});

router.get("/Meeting_Types", async (req, res) => {
  try {
    const meeing_types = await Meeting_Type.find({});
    return res.send(meeing_types);
  } catch (e) {
    return res.status(400).send();
  }
});

router.patch("/Meeting_Types/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  console.log(updates);
  const allowedUpdates = ["name"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  console.log(isValidOperation);

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    console.log(req.body);
    const meeting_type = await Meeting_Type.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    console.log(meeting_type);
    if (!meeting_type) {
      return res.status(404).send();
    }

    return res.send(meeting_type);
  } catch (e) {
    console.log(e);
    return res.status(400).send(e);
  }
});

router.delete("/Meeting_Types/:id", async (req, res) => {
  try {
    const meetings = await Meeting.deleteMany({ meeing_type: req.params.id });
    const meeing_type = await Meeting_Type.findByIdAndDelete(req.params.id);

    if (!meeing_type) {
      return res.status(404).send();
    }

    return res.send(meeing_type);
  } catch (e) {
    return res.status(500).send();
  }
});

module.exports = router;
