const express = require("express");
const Role = require("../models/Role");
const router = new express.Router();

router.post("/Roles", async (req, res) => {
  try {
    const role = new Role(req.body);
    await role.save();
    res.status(201).send(role);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/Role/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const role = await Role.findById(_id);

    if (!role) {
      return res.status(404).send();
    }

    res.send(role);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/Roles", async (req, res) => {
  try {
    const roles = await Role.find({});
    res.send(roles);
  } catch (e) {
    res.status(400).send();
  }
});

router.patch("/Roles/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!role) {
      return res.status(404).send();
    }

    res.send(role);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/Roles/:id", async (req, res) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);

    if (!role) {
      res.status(404).send();
    }

    res.send(role);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
