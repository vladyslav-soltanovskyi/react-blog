import { convertDate } from "@/utils";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import useModal from "@/hooks/useModal";
import { useDispatch } from "react-redux";
import { editComment, deleteComment } from "@/store/actions/comments";
import useAuth from "@/hooks/useAuth";

function CommentList({ text, user, createdAt, _id, onDelete }) {
  const dispatch = useDispatch();
  const auth = useAuth();
  const { openModal } = useModal();
  const [value, setValue] = useState(text);
  const [isEdit, setIsEdit] = useState(false);

  const showConfirm = () => {
    const options = {
      title: "Вы действительно хотите удалить эту статью?",
      onConfirm: async () => {
        await dispatch(deleteComment(_id));
        onDelete();
      },
    };

    openModal({ type: "confirm", options });
  };

  const handleChange = (e) => setValue(e.target.value);

  const handleKeyDown = (e) => {
    if (!value) {
      toggleIsEdit();
      return;
    }

    if (e.key === "Enter") {
      if (value === text) {
        toggleIsEdit();
        return;
      }

      toggleIsEdit();
      dispatch(editComment(_id, value));
    }
  };

  const handleClick = () => {
    if (!value || value === text) {
      toggleIsEdit();
      return;
    }

    toggleIsEdit();
    dispatch(editComment(_id, value));
  };

  const toggleIsEdit = () => setIsEdit(!isEdit);

  const showActions = auth.user && auth.user._id === user._id && !isEdit;

  return (
    <div className="comment">
      <div className="comment-header">
        <h4 className="comment-header-title">{user.fullName}</h4>
        <span className="comment-header-date">{convertDate(createdAt)}</span>
      </div>
      {!isEdit ? (
        <p className="comment-content">{text}</p>
      ) : (
        <>
          <TextField
            multiline
            fullWidth
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            value={value}
          />
          <span className="comment-helper-info">
            Нажмите на enter чтобы&nbsp;
            <span className="comment-helper-link" onClick={handleClick}>
              сохранить
            </span>
          </span>
        </>
      )}
      {showActions && (
        <div className="comment-actions">
          <div className="comment-action">
            <Tooltip title="Изменить" placement="top">
              <IconButton onClick={toggleIsEdit}>
                <ModeEditOutlineIcon />
              </IconButton>
            </Tooltip>
          </div>
          <div className="comment-action">
            <Tooltip title="удалить" placement="top">
              <IconButton onClick={showConfirm}>
                <DeleteOutlineIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommentList;
