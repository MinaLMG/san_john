const express = require("express");
const Status = require("../models/Status");
const Person = require("../models/Person");

const router = new express.Router();

router.post("/Status", async (req, res) => {
  try {
    // console.log(req)
    const status = new Status(req.body);
    await status.save();
    res.status(201).send(status);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/Status/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const status = await Status.findById(_id);

    if (!status) {
      return res.status(404).send();
    }

    res.send(status);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/Status", async (req, res) => {
  try {
    const status = await Status.find({});
    res.send(status);
  } catch (e) {
    res.status(400).send();
  }
});

router.patch("/Status/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const status = await Status.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!status) {
      return res.status(404).send();
    }

    res.send(status);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/Status/:id", async (req, res) => {
  try {
    const persons = await Person.updateMany(
      { status: req.params.id },
      { $unset: { status: "" } }
    );
    const status = await Status.findByIdAndDelete(req.params.id);

    if (!status) {
      res.status(404).send();
    }

    res.send(status);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
