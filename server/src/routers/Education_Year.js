const express = require("express");
const Education_Year = require("../models/Education_Year");
const router = new express.Router();

router.post("/Education_Years", async (req, res) => {
  try {
    const education_year = new Education_Year(req.body);
    await education_year.save();
    return res.status(201).send(education_year);
  } catch (e) {
    return res.status(400).send(e);
  }
});

router.get("/Education_Year/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const education_year = await Education_Year.findById(_id);

    if (!education_year) {
      return res.status(404).send();
    }

    return res.send(education_year);
  } catch (e) {
    return res.status(500).send();
  }
});

router.get("/Education_Years", async (req, res) => {
  try {
    const education_years = await Education_Year.find({});
    return res.send(education_years);
  } catch (e) {
    return res.status(400).send();
  }
});

router.patch("/Education_Years/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const education_year = await Education_Year.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!education_year) {
      return res.status(404).send();
    }

    return res.send(education_year);
  } catch (e) {
    return res.status(400).send(e);
  }
});

router.delete("/Education_Years/:id", async (req, res) => {
  try {
    const education_year = await Education_Year.findByIdAndDelete(
      req.params.id
    );

    if (!education_year) {
      return res.status(404).send();
    }

    return res.send(education_year);
  } catch (e) {
    return res.status(500).send();
  }
});

module.exports = router;
