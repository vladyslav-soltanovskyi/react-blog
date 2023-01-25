import comments from "./endpoints/comments.service";
import posts from "./endpoints/posts.service";
import user from "./endpoints/user.service";
import auth from "./endpoints/auth.service";

const allEndpoints = {
  posts,
  comments,
  user,
  auth,
};

export default allEndpoints;
