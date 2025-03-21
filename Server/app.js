require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);

mongoose
  .connect(process.env.DBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log("listening on port " + process.env.PORT || 3000);
    });
  })
  .catch((error) => {
    console.log("Error while connecting to DB: ", error.message);
  });

app.use(express.static("./uploads"));
/*
  --> Registering routes
*/
app.use("/auth", require("./routes/AuthRoutes"));

app.use("/user", require("./routes/UserRoutes"));

app.use("/blogs", require("./routes/BlogRoutes"));

// Not found Urls
app.use("*", (req, res) => {
  res.status(404).json({ message: "Requested url is not found" });
});
