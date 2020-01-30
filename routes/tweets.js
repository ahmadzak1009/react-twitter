const router = require("express").Router();
const Tweet = require("../models/Tweet");

router.get("/", async (req, res) => {
  try {
    const tweet = await Tweet.find().sort("-createdAt");
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
    let likes = [];
    if (tweet.likes.find(like => like === idUser)) {
      likes = tweet.likes.filter(like => like !== idUser);
    } else {
      likes = [...tweet.likes, idUser];
    }
    const response = await Tweet.findOneAndUpdate({ _id: idTweet }, { likes });
    const updatedTweets = await Tweet.find().sort("-createdAt");
    res.json(updatedTweets);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/comment", async (req, res) => {
  const idTweet = req.body.idTweet;
  const idUser = req.body.idUser;
  const username = req.body.username;
  const comment = req.body.comment;

  try {
    const tweet = await Tweet.findById(idTweet);
    const response = await Tweet.findOneAndUpdate(
      { _id: idTweet },
      {
        comments: [...tweet.comments, { idUser, username, comment }]
      }
    );
    const updatedTweets = await Tweet.find().sort("-createdAt");
    res.json(updatedTweets);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
