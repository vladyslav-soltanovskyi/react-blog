const { User } = require("../models/User");
const { Post } = require("../models/Post");
const { Comment } = require("../models/Comment");
const validator = require("validator");
const { entityPaginate } = require("../utils/entityPaginate");

module.exports.all = async (req, res) => {
  try {
    const result = await entityPaginate(User, req);
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred on the server" });
  }
};

module.exports.show = async (req, res) => {
  const id = req.params.id;
  if (!validator.isMongoId(id)) {
    res.status(400).json({ error: "Invalid User ID" });
  } else {
    try {
      const user = await User.findById(id);
      if (user) {
        const comments = await Comment.find({ user: id });
        const posts = await Post.find({ user: id });
        return res.status(200).json({
          ...user.toJSON(),
          comments,
          posts,
        });
      }
      return res.status(404).json({ error: "There is no such record in the database" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "An error occurred on the server" });
    }
  }
};
