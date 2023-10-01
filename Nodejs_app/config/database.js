require("dotenv").config();
const mongoose = require("mongoose");
const connect = () => {
  // database connection
  mongoose.connect(process.env.MONGO_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("connected", () => {
    console.log("Connected to the database");
  });
  mongoose.connection.on("error", (err) => {
    console.error("Database connection error: " + err);
  });
};

module.exports = { connect };
