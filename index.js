const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const usersRoutes = require("./Routes/User-routes");
const affiliateRoutes = require("./Routes/Affiliate-routes");
const apikeyRoutes = require("./Routes/Apikey-routes");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json());

const MongoUri =
  "mongodb+srv://user1:dbuser99$@cluster0.2bgbv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(MongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
});

mongoose.connection.on("error", (err) => {
  console.error("error connecting mongoose", err);
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requseted-With, Content-Type, Accept , Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");

  next();
});

app.use("/api/users", usersRoutes);
app.use("/api/affiliate", affiliateRoutes);
app.use("/api/apikey", apikeyRoutes);

// app.post("/api/users", (req, res) => {
//   console.log(req.body);
// });

app.listen(PORT, () => {
  console.log("listening on " + PORT);
});
