import CommentItem from "./CommentItem";
import LoadingCommentItem from "./LoadingCommentItem";
import NotFoundComments from "./NotFoundComments";

function CommentList({ comments = [], isLoading, onDelete = () => {} }) {
  if (isLoading) {
    return Array(3)
      .fill(0)
      .map((_, index) => <LoadingCommentItem key={index} />);
  }

  if (!comments.length) {
    return <NotFoundComments />;
  }

  return comments.map((comment) => (
    <CommentItem key={comment._id} {...comment} onDelete={onDelete} />
  ));
}

export default CommentList;
