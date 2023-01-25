import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { AuthProvider } from "./contexts";
import store from "./store";
import "./assets/scss/app.scss";
import { ModalProvider } from "./contexts";

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <AuthProvider>
        <ModalProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ModalProvider>
      </AuthProvider>
    </SnackbarProvider>
  </Provider>,
  document.getElementById("root")
);
