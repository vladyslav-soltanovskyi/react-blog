const validator = require("validator");
const { Post } = require("../models/Post");

module.exports.checkUser = (checkIsOwner, Entity) => async (req, res, next) => {
  if (req.userId) {
    if (checkIsOwner) {
      const id = req.params.id;

      if (!id) {
        return res.status(400);
      }

      if (!validator.isMongoId(id)) {
        return res.status(400).json({ error: "Invalid record ID" });
      }

      const userId = req.userId;
      const post = await Entity.findById(id);
      if (post) {
        if (post.user._id.toString() === userId) {
          return next();
        } else {
          return res
            .status(403)
            .json({ error: "You don't have access to this record" });
        }
      }
      return res.status(404).json({ error: "There is no such record in the database" });
    }

    next();
  } else {
    res
      .status(403)
      .json({ error: "You are not authorized to perform this operation" });
  }
};
