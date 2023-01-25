import Button from "@/components/Button";
import Box from "@mui/material/Box";
import { useSearchParams, useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { convertDate } from "@/utils";
import { useEffect, useState, useCallback } from "react";
import api from "@/services/api";
import { addNotification } from "@/store/actions/notifications";
import { fetchPosts } from "@/store/actions/posts";
import CommentList from "@/components/Comments/CommentList";
import PostList from "@/components/Post/PostList";
import { fetchComments } from "@/store/actions/comments";
import Pagination from "@/components/Pagination";
import LoadingProfilePage from "@/components/Profile/LoadingProfilePage";
import ProfilePageNotFound from "../components/Profile/ProfilePageNotFound";

function Profile() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const isPostsLoading = useSelector(({ posts }) => posts.isLoading);
  const posts = useSelector(({ posts }) => posts.posts);
  const totalPosts = useSelector(({ posts }) => posts.total);
  const comments = useSelector(({ comments }) => comments.comments);
  const isCommentsLoading = useSelector(({ comments }) => comments.isLoading);
  const totalComments = useSelector(({ comments }) => comments.total);
  const { search } = useLocation();
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const act = searchParams.get("act") || "posts";
  const [user, setUser] = useState(null);
  const paramsForFetching = search ? `${search}&userId=${id}` : `?userId=${id}`;

  const changeAct = (act) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      act,
      page: 1
    });
  };

  const fetchUser = useCallback(async () => {
    try {
      setIsUserLoading(true);

      const userData = await api.user.getUser(id);

      setUser(userData);
    } catch (e) {
      dispatch(addNotification(e?.response?.data?.error, "error"));
    } finally {
      setIsUserLoading(false);
    }
  }, [dispatch, id]);

  const onDeleteComment = () => dispatch(fetchComments(paramsForFetching));

  const onDeletePost = () => dispatch(fetchPosts(paramsForFetching));

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (!!user) {
      if (act === "posts") {
        dispatch(fetchPosts(paramsForFetching));
      }
      if (act === "comments") {
        dispatch(fetchComments(paramsForFetching));
      }
    }
  }, [dispatch, paramsForFetching, act, user]);

  if (isUserLoading) {
    return <LoadingProfilePage />;
  }

  if (!user && !isUserLoading) {
    return (
      <div className="profile">
        <ProfilePageNotFound />
      </div>
    );
  }

  return (
    <div className="profile">
      <div className="profile-content">
        <div className="profile-header">
          <h2 className="title">{user.fullName}</h2>
          <p className="date">
            Registration date: {convertDate(user.createdAt)}
          </p>
        </div>
        <Box mt={4}>
          <Button
            className="button-profile"
            active={act === "posts"}
            onClick={() => changeAct("posts")}
          >
            Posts
          </Button>
          <Button
            className="button-profile"
            active={act === "comments"}
            onClick={() => changeAct("comments")}
          >
            Comments
          </Button>
        </Box>
        <div className="profile-items">
          {act === "posts" && (
            <>
              <PostList
                posts={posts}
                isLoading={isPostsLoading}
                onDelete={onDeletePost}
                showActions
              />
              <Pagination items={posts} total={totalPosts} />
            </>
          )}
          {act === "comments" && (
            <>
              <CommentList
                comments={comments}
                isLoading={isCommentsLoading}
                onDelete={onDeleteComment}
              />
              <Pagination items={comments} total={totalComments} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
