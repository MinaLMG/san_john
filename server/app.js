const express = require("express");
require("./src/db/mongoose");
const Team = require("./src/models/Team");

const app = express();
const port = 5000;

const cors = require("cors");

app.use(express.json());
app.use(cors());

const TeamRouter = require("./src/routers/Team");
app.use(TeamRouter);

const RoleRouter = require("./src/routers/Role");
app.use(RoleRouter);

const StatusRouter = require("./src/routers/Status");
app.use(StatusRouter);

const FatherRouter = require("./src/routers/Father");
app.use(FatherRouter);

const Education_Year_Router = require("./src/routers/Education_Year");
app.use(Education_Year_Router);

const Phone_Number_Router = require("./src/routers/Phone_Number");
app.use(Phone_Number_Router);

const PersonRouter = require("./src/routers/Person");
app.use(PersonRouter);

const MeetingRouter = require("./src/routers/Meeting");
app.use(MeetingRouter);

const Meeting_Attended_Router = require("./src/routers/Meeting_Attended");
app.use(Meeting_Attended_Router);

const SpeakerRouter = require("./src/routers/speaker");
app.use(SpeakerRouter);

const Meeting_Type_Router = require("./src/routers/Meeting_Type");
app.use(Meeting_Type_Router);

const User_Router = require("./src/routers/User");
app.use(User_Router);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
