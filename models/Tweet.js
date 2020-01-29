const mongoose = require("mongoose");

const TweetSchema = new mongoose.Schema({
  owner: { type: String, required: true },
  content: { type: String, required: true },
  likes: [],
  comments: [
    {
      idUser: String,
      comment: String
    }
  ]
});

module.exports = mongoose.model("Tweet", TweetSchema);
