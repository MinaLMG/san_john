const express = require("express");
const mongoose = require("mongoose");
const Person = require("../models/Person");
const router = new express.Router();

const Team = require("../models/Team");
const Status = require("../models/Status");
const Education_Year = require("../models/Education_Year");
const Role = require("../models/Role");

router.post("/Persons", async (req, res) => {
  try {
    const team_to_get = req.body.team;
    console.log(team_to_get);
    if (team_to_get) {
      // return res.status(400).send({ error: "not enough params" });
      const team = await Team.findById(team_to_get);
      if (!team) {
        return res.status(400).send({ error: "no team exists" });
      }
    }
    const status_to_get = req.body.status;
    console.log(status_to_get);
    if (status_to_get) {
      // return res.status(400).send({ error: "not enough params" });
      const status = await Status.findById(status_to_get);
      if (!status) {
        return res.status(400).send({ error: "no status exists" });
      }
    }
    const education_year_to_get = req.body.education_year;
    console.log(education_year_to_get);
    if (education_year_to_get) {
      // return res.status(400).send({ error: "not enough params" });
      const education_year = await Education_Year.findById(
        education_year_to_get
      );
      if (!education_year) {
        return res.status(400).send({ error: "no education_year exists" });
      }
    }
    const role_to_get = req.body.role;
    console.log(role_to_get);
    if (role_to_get) {
      // return res.status(400).send({ error: "not enough params" });
      const role = await Role.findById(role_to_get);
      if (!role) {
        return res.status(400).send({ error: "no role exists" });
      }
    }
    const person = new Person(req.body);
    await person.save();
    return res.status(201).send(person);
  } catch (e) {
    console.log(e);
    return res.status(400).send({ error: e });
  }
});

router.get("/Person/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const person = await Person.findById(_id);

    if (!person) {
      return res.status(404).send();
    }

    // if (person.team) {
    //   const team = Team.findById(person.team);
    //   person.team = team;
    // }
    // if (person.role) {
    //   const role = Role.findById(person.role);
    //   person.role = role;
    // }
    // if (person.status) {
    //   const status = Status.findById(person.status);
    //   person.status = status;
    // }
    // if (person.education_year) {
    //   const edu_y = Education_Year.findById(person.edu_y);
    //   person.edu_y = edu_y;
    // }

    return res.send(person);
  } catch (e) {
    return res.status(500).send();
  }
});

router.get("/Persons", async (req, res) => {
  try {
    const persons = await Person.find({}).sort({ name: 1 });
    // persons = persons.map((person) => {
    //   if (person.team) {
    //     const team = Team.findById(person.team);
    //     person.team = team;
    //   }
    //   console.log(person);
    //   if (person.role) {
    //     const role = Role.findById(person.role);
    //     person.role = role;
    //   }
    //   console.log(person);

    //   if (person.status) {
    //     const status = Status.findById(person.status);
    //     person.status = status;
    //   }
    //   console.log(person);

    //   if (person.education_year) {
    //     const edu_y = Education_Year.findById(person.edu_y);
    //     person.edu_y = edu_y;
    //   }
    //   console.log(person);
    //   return person;
    // });
    return res.send(persons);
  } catch (e) {
    return res.status(400).send();
  }
});

router.patch("/Persons/:id", async (req, res) => {
  const team_to_get = req.body.team;
  const status_to_get = req.body.status;
  const role_to_get = req.body.role;
  const education_year_to_get = req.body.education_year;
  // console.log("starting");
  if (team_to_get) {
    try {
      const team = await Team.findById(team_to_get);
      if (!team) return res.status(400).send({ error: "no team exists" });
    } catch (e) {
      return res.status(400).send({ error: "Invalid id for team!" });
    }
  }

  if (status_to_get) {
    try {
      const status = await Status.findById(status_to_get);
      if (!status) return res.status(400).send({ error: "no status exists" });
    } catch (e) {
      return res.status(400).send({ error: "Invalid  id for status!" });
    }
  }

  if (role_to_get) {
    try {
      const role = await Role.findById(role_to_get);
      if (!role) return res.status(400).send({ error: "no role exists" });
    } catch (e) {
      return res.status(400).send({ error: "Invalid  id for role!" });
    }
  }
  if (education_year_to_get) {
    try {
      const e_y = await Education_Year.findById(education_year_to_get);
      if (!e_y)
        return res.status(400).send({ error: "no education year exists" });
    } catch (e) {
      return res.status(400).send({ error: "Invalid  id for education year!" });
    }
  }

  // if (person.team) {
  //   const team = Team.findById(person.team);
  //   person.team = team;
  // }
  // if (person.role) {
  //   const role = Role.findById(person.role);
  //   person.role = role;
  // }
  // if (person.status) {
  //   const status = Status.findById(person.status);
  //   person.status = status;
  // }
  // if (person.education_year) {
  //   const edu_y = Education_Year.findById(person.edu_y);
  //   person.edu_y = edu_y;
  // }
  const updates = Object.keys(req.body);
  // TODO:detrmine what to update
  const allowedUpdates = [
    "team",
    "name",
    "education_year",
    "birth_date",
    "role",
    "status",
    "father",
    "bapitization_father",
    "bapitization_date",
    "bapitization_church",
    "address",
    "email",
    "facebook",
    "father_job",
    "father_phone_number",
    "phone_number",
    "mother_job",
    "mother_phone_number",
    "prep_date_entered",
    "prep_date_graduated",
    "serv_date_entered",
    "serv_date_graduated",
    "ID",
    "gender",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  console.log(req.params);
  try {
    const person = await Person.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!person) {
      return res.status(404).send();
    }

    return res.send(person);
  } catch (e) {
    return res.status(400).send(e);
  }
});

router.delete("/Persons/:id", async (req, res) => {
  try {
    const person = await Person.findByIdAndDelete(req.params.id);

    if (!person) {
      return res.status(404).send();
    }

    return res.send(person);
  } catch (e) {
    return res.status(500).send();
  }
});

module.exports = router;
