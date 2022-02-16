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
import useAuth from "@/hooks/useAuth";
import useModal from "@/hooks/useModal";
import Dialog from "@mui/material/Dialog";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Не валидный email")
      .required("Email обязателен!"),
    password: yup
      .string()
      .required("Пароль обязателен!")
      .min(8, "Введите более 8 символов")
      .max(64, "Введите менее 64 символов"),
  })
  .required();

function ModalLogin({ visible }) {
  const auth = useAuth();
  const { closeModal, openModal } = useModal();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    closeModal({ type: "login" });
  };

  const toggleModal = () => {
    closeModal({ type: "login" });
    openModal({ type: "registration" });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const login = async (data) => {
    try {
      setIsLoading(true);

      const { _id, fullName, email, createdAt, token } = await api.auth.login(
        data
      );

      auth.setToken(token);
      auth.setUser({ _id, fullName, email, createdAt });

      dispatch(addNotification("Успешно авторизировались", "success"));
      reset({
        email: "",
        password: "",
      });
      handleClose();
    } catch (e) {
      console.log(e);
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
          <div className="modal-title">Вход в аккаунт</div>
          <div className="btn-close">
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>
        <form className="form" onSubmit={handleSubmit(login)}>
          <Box mt={2}>
            <Typography
              component="p"
              sx={{ fontSize: 13, fontWeight: 600, marginBottom: "8px" }}
            >
              Email
            </Typography>
            <TextField
              id="email"
              fullWidth
              size="small"
              sx={{ borderRadius: "12px" }}
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
              Пароль
            </Typography>
            <OutlinedInput
              id="password"
              fullWidth
              className="form-text-field"
              type={showPassword ? "text" : "password"}
              size="small"
              aria-describedby="password-text"
              sx={{ borderRadius: "12px" }}
              error={!!errors.password}
              {...register("password")}
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
            Вы уже зарегистрированы?
          </p>
          <Box mt={4}>
            <Button type="submit" fullWidth disabled={isLoading}>
              Войти
            </Button>
          </Box>
        </form>
      </div>
    </Dialog>
  );
}

export default ModalLogin;
