const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  },
  err => {
    if (err) return console.log(err);
    console.log("Connected to MongoDB");
  }
);

app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));
app.use("/tweets", require("./routes/tweets"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`Listen on Port ${PORT}`));
