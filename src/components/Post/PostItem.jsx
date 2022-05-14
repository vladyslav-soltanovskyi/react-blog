import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Box from "@mui/material/Box";
import Button from "@/components/Button";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { addNotification } from "@/store/actions/notifications";
import api from "@/services/api";
import { NavLink, useParams, useLocation } from "react-router-dom";
import { convertDate } from "@/utils";
import useAuth from "@/hooks/useAuth";
import useModal from "@/hooks/useModal";

function Post({
  _id,
  title = "",
  description = "",
  views = "",
  photoUrl,
  user,
  createdAt = "",
  showActions,
  onDelete,
}) {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const { id } = useParams();
  const auth = useAuth();
  const { openModal } = useModal();

  const removePost = async (id) => {
    try {
      await api.posts.deletePost(id);
      dispatch(addNotification("The post was successfully deleted", "success"));
    } catch (e) {
      dispatch(addNotification(e?.response?.data?.error, "error"));
    }
  };

  const showConfirm = () => {
    const options = {
      title: "Do you really want to delete this post?",
      onConfirm: async () => {
        await removePost(_id);
        onDelete();
      },
    };

    openModal({ type: "confirm", options });
  };

  return (
    <div
      className={classNames("post-item", {
        active: id === _id,
      })}
    >
      <div className="content">
        <NavLink to={`/post/${_id}${search}`} className="title">
          {title}
        </NavLink>
        <p className="description">
          {description.length > 160
            ? `${description.slice(0, 160)}...`
            : description}
        </p>
        <div className="post-date">
          {convertDate(createdAt)}{" "}
          <div className="post-views">
            <RemoveRedEyeIcon /> <span>{views}</span>
          </div>
        </div>
        <div className="author">
          Author:{" "}
          <NavLink to={`/profile/${user._id}`} className="link">
            {user.fullName}
          </NavLink>
        </div>
      </div>
      {photoUrl && (
        <div className="post-item-img">
          <img src={photoUrl} alt="title" />
        </div>
      )}
      {showActions
        ? user._id === auth.user?._id && (
            <Box
              mt={3}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Button className="button-gray" onClick={showConfirm}>
                Delete
              </Button>
              <NavLink to={`/post/${_id}/edit`} className="button">
                Edit
              </NavLink>
            </Box>
          )
        : null}
    </div>
  );
}

export default Post;
