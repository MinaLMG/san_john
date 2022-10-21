const express = require("express");
const Speaker = require("../models/Speaker");
const router = new express.Router();
const Person = require("../models/Person");

router.post("/Speakers", async (req, res) => {
  try {
    const speaker = new Speaker(req.body);
    await speaker.save();
    res.status(201).send(speaker);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/Speaker/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const speaker = await Speaker.findById(_id);

    if (!speaker) {
      return res.status(404).send();
    }

    res.send(speaker);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/Speakers", async (req, res) => {
  try {
    const speakers = await Speaker.find({});
    res.send(speakers);
  } catch (e) {
    res.status(400).send();
  }
});

router.patch("/Speakers/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const speaker = await Speaker.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!speaker) {
      return res.status(404).send();
    }

    res.send(speaker);
  } catch (e) {
    // console.log(e);
    res.status(400).send(e);
  }
});

router.delete("/Speakers/:id", async (req, res) => {
  try {
    const speaker = await Speaker.findByIdAndDelete(req.params.id);

    if (!speaker) {
      res.status(404).send();
    }

    res.send(speaker);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
