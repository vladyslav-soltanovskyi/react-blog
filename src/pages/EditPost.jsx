import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNotification } from "@/store/actions/notifications";
import LoadingPostPage from "@/components/Post/LoadingPostPage";
import PostForm from "@/components/PostForm";
import api from "@/services/api";

export default function EditPost() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPost = useCallback(
    async (id) => {
      try {
        setIsLoading(true);
        const post = await api.posts.getPost(id);
        setPost(post);
      } catch (e) {
        dispatch(addNotification(e?.response?.data?.error, "error"));
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    fetchPost(id);
  }, [fetchPost, id]);

  if (isLoading) {
    return <LoadingPostPage />;
  }

  const onEditPost = async (data) => {
    try {
      await api.posts.editPost(id, data);
      dispatch(addNotification("Статья успешно изменена", "success"));
    } catch (e) {
      dispatch(addNotification(e?.response?.data?.error, "error"));
    }
  };

  return <PostForm onSubmit={onEditPost} defaultValues={post} />;
}
