import LoadingPostItem from "./LoadingPostItem";
import PostItem from "./PostItem";
import NotFoundPosts from "./NotFoundPosts";

function PostList({ posts = [], isLoading, showActions, onDelete = () => {} }) {
  if (isLoading) {
    return Array(5)
      .fill(0)
      .map((_, index) => <LoadingPostItem key={index} />);
  }

  if (!posts.length) {
    return <NotFoundPosts />;
  }

  return posts.map((post) => (
    <PostItem
      key={post._id}
      {...post}
      showActions={showActions}
      onDelete={onDelete}
    />
  ))
}

export default PostList;
