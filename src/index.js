require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./database");
const route = require("./routes");
const corsOptions = require("./config");
const cookieParser = require("cookie-parser");
const credentials = require("./middlewares/credentials");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/", route);

const startApp = () => {
  db.on("error", (err) => {
    console.error(err);
  });
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`Database connected on ${db.name}`);
      console.log(`Running on port ${PORT}`);
    });
  });
};

module.exports = startApp;
