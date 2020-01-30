const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(200).send("username not found");

    const cekPassword = await bcrypt.compare(req.body.password, user.password);
    if (!cekPassword) return res.send("password incorrect");

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "5h" });
    res.header("Authorization", `Bearer ${token}`).json({ id: user._id, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const newUser = new User(req.body);

    const response = await newUser.save();
    res.json(response);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
