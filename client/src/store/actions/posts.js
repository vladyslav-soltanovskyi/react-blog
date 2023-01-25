import { addNotification } from "./notifications";
import api from "@/services/api";

export const fetchPosts = (searchParams) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));

    const { items, total } = await api.posts.getPosts(searchParams);

    dispatch(setPosts(items));
    dispatch(setTotal(total));
  } catch (e) {
    dispatch(addNotification(e?.response?.data?.error, "error"));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const setPosts = (posts) => ({
  type: "SET_POSTS",
  payload: posts,
});

export const setTotal = (total) => ({
  type: "SET_TOTAL",
  payload: total,
});

export const setIsLoading = (status) => ({
  type: "SET_POSTS_IS_LOADING",
  payload: status,
});
