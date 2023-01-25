import { addNotification } from "./notifications";
import api from "@/services/api";

export const setComments = (comments) => ({
  type: "SET_COMMENTS",
  payload: comments,
});

export const fetchCommentsByPost = (id) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));

    const comments = await api.comments.getCommentsByPost(id);

    dispatch(setComments(comments));
  } catch (e) {
    dispatch(addNotification(e?.response?.data?.error, "error"));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const fetchComments = (searchParams) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));

    const { total, items } = await api.comments.getComments(searchParams);

    dispatch(setComments(items));
    dispatch(setTotal(total));
  } catch (e) {
    dispatch(addNotification(e?.response?.data?.error, "error"));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const addComment = (postId, text) => async (dispatch) => {
  try {
    const comment = await api.comments.createComment({ text, postId });

    dispatch({
      type: "ADD_COMMENT",
      payload: comment,
    });
  } catch (e) {
    dispatch(addNotification(e?.response?.data?.error, "error"));
  }
};

export const editComment = (id, text) => async (dispatch) => {
  try {
    dispatch({
      type: "EDIT_COMMENT",
      payload: { id, text },
    });

    await api.comments.editComment(id, text);
  } catch (e) {
    dispatch(addNotification(e?.response?.data?.error, "error"));
  }
};

export const deleteComment = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "DELETE_COMMENT",
      payload: id,
    });

    await api.comments.deleteComment(id);
  } catch (e) {
    dispatch(addNotification(e?.response?.data?.error, "error"));
  }
};

export const clearComments = () => ({
  type: "CLEAR_COMMENTS",
});

export const setTotal = (total) => ({
  type: "SET_TOTAL",
  payload: total,
});

export const setIsLoading = (status) => ({
  type: "SET_COMMENTS_IS_LOADING",
  payload: status,
});
