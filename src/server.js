require("dotenv").config();
require("./helpers/loadenv");
// require("./database");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");
const express = require("express");
const databaseHelper = require("./helpers/database");
// const errorFormatter = require("./helpers/errors/formatter");
const loginRoute = require("./routes/login");
const protectRoute = require("./routes/protect");
// const { auth } = require("./middlewares/authentic");

// const database = require("./database");
// const User = database.model("user");

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/oapi", loginRoute);
app.use("/api", protectRoute);

// const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
// const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

// webpush.setVapidDetails(
//   "mailto:teste@test.com",
//   publicVapidKey,
//   privateVapidKey
// );

// app.post("/subscribe", (req, res) => {
//   const subscription = req.body;

//   console.log(subscription);

//   // console.log(req);

//   res.status(201).json({});

//   const payload = JSON.stringify({ title: "Push Test" });

//   webpush
//     .sendNotification(subscription, payload)
//     .catch(err => console.log("sendNotification" + err));
// });

databaseHelper.isDatabaseConnected().then(() => {
  const { PORT } = process.env;

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
});
