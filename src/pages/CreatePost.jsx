import PostForm from "@/components/PostForm";
import { addNotification } from "@/store/actions/notifications";
import { useDispatch } from "react-redux";
import api from "@/services/api";

export default function CreatePost() {
  const dispatch = useDispatch();

  const createPost = async (data) => {
    try {
      await api.posts.createPost(data);
      dispatch(addNotification("The post was successfully created", "success"));
    } catch (e) {
      dispatch(addNotification(e?.response?.data?.error, "error"));
    }
  };

  return <PostForm onSubmit={createPost} withReset />;
}
