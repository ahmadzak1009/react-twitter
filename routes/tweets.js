const router = require("express").Router();
const Tweet = require("../models/Tweet");

router.get("/", async (req, res) => {
  try {
    const tweet = await Tweet.find();
    res.json(tweet);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/", async (req, res) => {
  const newTweet = new Tweet(req.body);

  try {
    const response = await newTweet.save();
    res.json(response);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/like", async (req, res) => {
  const idTweet = req.body.idTweet;
  const idUser = req.body.idUser;

  try {
    const tweet = await Tweet.findById(idTweet);
    const response = await Tweet.findOneAndUpdate(
      { _id: idTweet },
      {
        likes: [...tweet.likes, id.body.idUser]
      }
    );
    res.send(`User with id ${idUser} like tweet with id ${idTweet}`);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/comment", async (req, res) => {
  const idTweet = req.body.idTweet;
  const idUser = req.body.idUser;
  const comment = req.body.comment;

  try {
    const tweet = await Tweet.findById(idTweet);
    const response = await Tweet.findOneAndUpdate(
      { _id: idTweet },
      {
        comments: [...tweet.comments, { idUser, comment }]
      }
    );
    res.send(`User ${idUser} commented on tweet with id ${idTweet}`);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
