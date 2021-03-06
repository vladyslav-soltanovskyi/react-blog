import Button from "../Button";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import {
  TextField,
  OutlinedInput,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import api from "@/services/api";
import { addNotification } from "@/store/actions/notifications";
import useModal from "@/hooks/useModal";
import Dialog from "@mui/material/Dialog";

const schema = yup
  .object({
    fullName: yup
      .string()
      .min(3, "Enter more than 3 characters")
      .max(64, "Enter less than 64 characters"),
    email: yup
      .string()
      .email("Invalid email")
      .required("Email is required!"),
    password: yup
      .string()
      .min(8, "Enter more than 8 characters")
      .max(64, "Enter less than 64 characters"),
  })
  .required();

function ModalRegistration({ visible }) {
  const { closeModal, openModal } = useModal();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    closeModal({ type: "registration" });
  };

  const toggleModal = () => {
    closeModal({ type: "registration" });
    openModal({ type: "login" });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const registerHandler = async (data) => {
    try {
      setIsLoading(true);

      await api.auth.register(data);

      dispatch(addNotification("Successfully registered", "success"));
      reset({
        fullName: "",
        email: "",
        password: "",
      });
      handleClose();
    } catch (e) {
      dispatch(addNotification(e?.response?.data?.error, "error"));
    } finally {
      setIsLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Dialog
      sx={{ cursor: "pointer" }}
      open={visible}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">Registration</div>
          <div className="btn-close">
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>
        <form className="form" onSubmit={handleSubmit(registerHandler)}>
          <Box mt={2}>
            <Typography
              component="p"
              sx={{ fontSize: 13, fontWeight: 600, marginBottom: "8px" }}
            >
              Name and surname
            </Typography>
            <TextField
              fullWidth
              size="small"
              className="form-text-field"
              error={!!errors.fullName}
              {...register("fullName")}
              aria-describedby="fullName-text"
            />
            <FormHelperText sx={{ color: "red" }} id="fullName-text">
              {errors.fullName?.message}
            </FormHelperText>
          </Box>
          <Box mt={2}>
            <Typography
              component="p"
              sx={{ fontSize: 13, fontWeight: 600, marginBottom: "8px" }}
            >
              Email
            </Typography>
            <TextField
              fullWidth
              size="small"
              className="form-text-field"
              error={!!errors.email}
              {...register("email")}
              aria-describedby="email-text"
            />
            <FormHelperText sx={{ color: "red" }} id="email-text">
              {errors.email?.message}
            </FormHelperText>
          </Box>
          <Box mt={2}>
            <Typography
              component="p"
              sx={{ fontSize: 13, fontWeight: 600, marginBottom: "8px" }}
            >
              Password
            </Typography>
            <OutlinedInput
              fullWidth
              className="form-text-field"
              type={showPassword ? "text" : "password"}
              size="small"
              sx={{ borderRadius: "12px" }}
              error={!!errors.password}
              {...register("password")}
              aria-describedby="password-text"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText sx={{ color: "red" }} id="password-text">
              {errors.password?.message}
            </FormHelperText>
          </Box>
          <p onClick={toggleModal} className="modal-link">
            Don't you have an account yet?
          </p>
          <Box mt={4}>
            <Button type="submit" fullWidth disabled={isLoading}>
              Register
            </Button>
          </Box>
        </form>
      </div>
    </Dialog>
  );
}

export default ModalRegistration;
