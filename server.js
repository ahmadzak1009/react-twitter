const express = require("express");
const mongoose = require("mongoose");
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

app.listen(PORT, () => console.log(`Listen on Port ${PORT}`));
