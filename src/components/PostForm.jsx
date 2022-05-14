import { useState, useMemo } from "react";
import { TextField, Typography, Box, FormHelperText } from "@mui/material";
import Button from "./Button";
import ReactMarkdown from "react-markdown";
import ReactDOMServer from "react-dom/server";
import { SimpleMdeReact } from "react-simplemde-editor";
import remarkGfm from "remark-gfm";
import "easymde/dist/easymde.min.css";
import FileUploader from "./FileUploader";
import api from "@/services/api/axios";
import { useDispatch } from "react-redux";
import { fetchPosts } from "@/store/actions/posts";
import { addNotification } from "@/store/actions/notifications";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    title: yup
      .string()
      .required("This is a required field")
      .min(3, "Enter more than 3 characters")
      .max(256, "Enter less than 256 characters"),
    text: yup
      .string()
      .required("This is a required field")
      .min(3, "Enter more than 3 characters")
      .max(65536, "Enter less than 65536 characters"),
    description: yup
      .string()
      .required("This is a required field")
      .min(3, "Enter more than 3 characters")
      .max(400, "Enter less than 400 characters"),
    photoUrl: yup
      .string()
      .min(3, "Enter more than 3 characters")
      .max(200, "Enter less than 200 characters"),
  })
  .required();

export default function CreatePost({
  onSubmit,
  defaultValues = {},
  withReset,
}) {
  const dispatch = useDispatch();
  const [isSending, setIsSending] = useState(false);
  const [isUploading, setisUploading] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const {
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSend = async (data) => {
    setIsSending(true);

    onSubmit(data)
      .then(() => {
        if (withReset) {
          reset({
            title: "",
            text: "",
            description: "",
            photoUrl: "",
          });
        }

        dispatch(fetchPosts());
      })
      .finally(() => setIsSending(false));
  };

  const uploadFile = (file) => {
    let formData = new FormData();

    if (!file) {
      return;
    }
    const acceptTypes = ["image/png", "image/jpeg", "image/gif"];

    if (!acceptTypes.includes(file.type)) {
      dispatch(
        addNotification(
          "You can only send jpg, png and gif photos",
          "error"
        )
      );
      return;
    }

    formData.append("photo", file);

    setisUploading(true);

    api
      .post("/posts/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: function (e) {
          setUploadPercentage(parseInt(Math.round((e.loaded / e.total) * 100)));
        },
      })
      .then((data) => {
        setValue("photoUrl", data.data.url);
      })
      .catch((e) => {
        dispatch(addNotification(e?.response?.data?.error, "error"));
      })
      .finally(() => setisUploading(false));
  };

  const options = useMemo(
    () => ({
      spellChecker: false,
      autofocus: true,
      status: false,
      maxHeight: "546px",
      previewRender(text) {
        return ReactDOMServer.renderToString(
          <ReactMarkdown children={text} remarkPlugins={[remarkGfm]} />
        );
      },
    }),
    []
  );

  return (
    <div className="post-create">
      <form className="form" onSubmit={handleSubmit(onSend)}>
        <input
          className="title"
          placeholder="Enter the title..."
          {...register("title")}
        />
        <FormHelperText className="form-field-error">
          {errors.title?.message}
        </FormHelperText>
        <Box mt={3}>
          <Typography
            component="p"
            className="caption"
            sx={{ fontSize: 13, fontWeight: 600, marginBottom: "7px" }}
          >
            Short description
          </Typography>
          <TextField
            multiline
            fullWidth
            className="form-text-field"
            rows={2.5}
            error={!!errors.description}
            {...register("description")}
          />
          <FormHelperText className="form-field-error">
            {errors.description?.message}
          </FormHelperText>
        </Box>
        <Box mt={3}>
          <Typography
            component="p"
            className="caption"
            sx={{ fontSize: 13, fontWeight: 600, marginBottom: "7px" }}
          >
            Link to the image:
          </Typography>
          <div className="post-create-group">
            <TextField
              fullWidth
              className="form-text-field"
              size="medium"
              error={!!errors.photoUrl}
              {...register("photoUrl")}
            />
            <div className="post-btn-container">
              <FileUploader
                handleFile={uploadFile}
                isLoading={isUploading}
                progress={uploadPercentage}
              />
            </div>
          </div>
          <FormHelperText className="form-field-error">
            {errors.photoUrl?.message}
          </FormHelperText>
        </Box>
        <Box mt={3}>
          <Typography
            component="p"
            className="caption"
            sx={{ fontSize: 13, fontWeight: 600, marginBottom: "7px" }}
          >
            Full description
          </Typography>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <SimpleMdeReact
                options={options}
                value={value}
                onChange={onChange}
              />
            )}
            name="text"
          />
          <FormHelperText className="form-field-error">
            {errors.text?.message}
          </FormHelperText>
        </Box>
        <Box mt={3}>
          <div className="comments-form-group">
            <Button type="submit" disabled={isSending}>
              {isSending ? "Sending" : "Send"}
            </Button>
          </div>
        </Box>
      </form>
    </div>
  );
}
