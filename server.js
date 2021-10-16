const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

//pulling in the packages to be able to use 

var PORT = process.env.PORT || 3000;

// process.env if for heroku to be able to set its own port.  if not, it falls to 3000 for

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/budget",
  { useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
);

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});