const mongoose = require("mongoose");

const TweetSchema = new mongoose.Schema(
  {
    owner: { type: String, required: true },
    content: { type: String, required: true },
    likes: [],
    comments: [
      {
        idUser: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        username: String,
        comment: String
      },
      {
        timestamps: true
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Tweet", TweetSchema);
