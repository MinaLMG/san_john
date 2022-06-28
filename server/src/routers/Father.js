const express = require("express");
const Father = require("../models/Father");
const router = new express.Router();

router.post("/Fathers", async (req, res) => {
  try {
    const father = new Father(req.body);
    await father.save();
    res.status(201).send(father);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/Father/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const father = await Father.findById(_id);

    if (!father) {
      return res.status(404).send();
    }

    res.send(father);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/Fathers", async (req, res) => {
  try {
    const fathers = await Father.find({});
    res.send(fathers);
  } catch (e) {
    res.status(400).send();
  }
});

router.patch("/Fathers/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const father = await Father.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!father) {
      return res.status(404).send();
    }

    res.send(father);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/Fathers/:id", async (req, res) => {
  try {
    const father = await Father.findByIdAndDelete(req.params.id);

    if (!father) {
      res.status(404).send();
    }

    res.send(father);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
