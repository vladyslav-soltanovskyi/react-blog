import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchPosts } from "@/store/actions/posts";
import { useDispatch, useSelector } from "react-redux";
import PostList from "./PostList";
import Pagination from "../Pagination";

function PostBlock() {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const posts = useSelector(({ posts }) => posts.posts);
  const isLoading = useSelector(({ posts }) => posts.isLoading);
  const total = useSelector(({ posts }) => posts.total);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch, search]);

  return (
    <>
      <div className="posts">
        <PostList posts={posts} isLoading={isLoading} />
        <Pagination items={posts} total={total} />
      </div>
    </>
  );
}

export default PostBlock;
