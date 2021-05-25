const express = require("express");
const webpush = require("web-push");
require("dotenv").config({ path: "variables.env" });

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;



// Replace with your email
webpush.setVapidDetails(
  "mailto:murugesan.fts@gmail.com",
  publicVapidKey,
  privateVapidKey
);

const app = express();

app.use(require("body-parser").json());


app.post("/subscribe", (req, res) => {
  const subscription = req.body;
  res.status(201).json({});
  const payload = JSON.stringify({ title: "test" });
// tn 85 p 0833
  console.log(req.body);

  webpush.sendNotification(subscription, payload).catch((error) => {
    console.error(error.stack);
  });
});

// app.use(require("express-static")("./"));
// app.use(express.static(__dirname + "/"));
app.use(express.static(__dirname + "/"));
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});
app.listen(4000);
