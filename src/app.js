const express = require("express");
require("dotenv").config();
const {Op, where}=require("sequelize")
const { connectDb, sequelize, db } = require("./config/db");
require("./models/user/model/User");

const app = express();

app.use(express.json());


connectDb();

const userRoutes=require("./routes/user.routes")(db)
const meetingRoutes=require("./routes/meeting.routes")(db)

app.use("/users",userRoutes)
app.use("/meetings",meetingRoutes)

sequelize
  .sync()
  .then(() => console.log("Database synced successfully"))
  .catch((err) => console.log("Sync failed:", err.message));

module.exports = app;
