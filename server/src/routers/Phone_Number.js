const express = require("express");
const Phone_Number = require("../models/Phone_Number");
const router = new express.Router();
const Person = require("../models/Person");

router.post("/Phone_Numbers", async (req, res) => {
  try {
    // console.log(req);
    const person_to_get = req.body.p_ID;
    if (!person_to_get) res.status(400).send({ error: "not enough params" });
    const person = await Person.findById(req.body.p_ID);
    if (!person) {
      res.status(400).send({ error: "no person exists" });
    }
    const phone_number = new Phone_Number(req.body);
    await phone_number.save();
    res.status(201).send(phone_number);
  } catch (e) {
    // console.log(e);
    res.status(400).send(e);
  }
});

router.get("/Phone_Number/number/:number", async (req, res) => {
  try {
    const number = req.params.number;

    const phone_number = await Phone_Number.find({ number });

    if (!phone_number) {
      return res.status(404).send();
    }

    res.send(phone_number);
  } catch (e) {
    res.status(500).send();
  }
});
router.get("/Phone_Number/pid/:p_ID", async (req, res) => {
  try {
    const p_ID = req.params.p_ID;

    const phone_number = await Phone_Number.find({ p_ID }).toArray();

    if (!phone_number) {
      return res.status(404).send();
    }

    res.send(phone_number);
  } catch (e) {
    res.status(500).send();
  }
});
router.get("/Phone_Number/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const phone_number = await Phone_Number.findById(_id);

    if (!phone_number) {
      return res.status(404).send();
    }

    res.send(phone_number);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/Phone_Numbers", async (req, res) => {
  try {
    const phone_numbers = await Phone_Number.find({});
    res.send(phone_numbers);
  } catch (e) {
    res.status(400).send();
  }
});

router.patch("/Phone_Numbers/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["number"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const phone_number = await Phone_Number.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!phone_number) {
      return res.status(404).send();
    }

    res.send(phone_number);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/Phone_Numbers/:id", async (req, res) => {
  try {
    const phone_number = await Phone_Number.findByIdAndDelete(req.params.id);

    if (!phone_number) {
      res.status(404).send();
    }

    res.send(phone_number);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
