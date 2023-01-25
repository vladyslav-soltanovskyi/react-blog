import React from "react";
import Button from "../Button";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "@/store/actions/comments";

function CommentsForm() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isSending, setIsSending] = useState(false);
  const [text, setText] = useState("");

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      return;
    }
    setIsSending(true);

    dispatch(addComment(id, text)).finally(() => setIsSending(false));

    setText("");
  };

  return (
    <div className="comments-form">
      <div className="comments-form-title">Add a comment</div>
      <form onSubmit={handleSubmit}>
        <TextField
          multiline
          fullWidth
          className="form-text-field"
          rows={4}
          onChange={handleChange}
          value={text}
        />
        <div className="comments-form-group">
          <Button type="submit" disabled={isSending}>
            {isSending ? "Sending" : "Send"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CommentsForm;
