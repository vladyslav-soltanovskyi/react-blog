import React from "react";
import CommentList from "./CommentList";
import CommentsForm from "./CommentsForm";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommentsByPost } from "@/store/actions/comments";

function CommentsBlock() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const comments = useSelector(({ comments }) => comments.comments);
  const isLoading = useSelector(({ comments }) => comments.isLoading);

  React.useEffect(() => {
    dispatch(fetchCommentsByPost(id));
  }, [dispatch, id]);

  return (
    <div className="comments-body">
      <div className="comments">
        <div className="title">
          Comments {!!comments.length && `(${comments.length})`}
        </div>
        <div className="comments-content">
          <CommentList comments={comments} isLoading={isLoading} />
        </div>
      </div>
      <CommentsForm />
    </div>
  );
}

export default CommentsBlock;
