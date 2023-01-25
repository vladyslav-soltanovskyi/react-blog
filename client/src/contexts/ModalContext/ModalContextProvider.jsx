import React, { useState } from "react";

import { ModalContext } from "./ModalContext";
import ModalLogin from "@/components/Modal/ModalLogin";
import ModalRegistration from "@/components/Modal/ModalRegistration";
import ModalConfirm from "@/components/Modal/ModalConfirm";

export const ModalProvider = ({ children }) => {
  const [modalOpened, setModalOpened] = useState({
    login: false,
    registration: false,
    confirm: false,
  });

  const [modalOptions, setModalOptions] = useState(null);

  const openModal = ({ type, options }) => {
    setModalOptions(options);
    setModalOpened((prev) => ({
      ...prev,
      [type]: true,
    }));
  };

  const closeModal = ({ type }) => {
    setModalOpened((prev) => ({
      ...prev,
      [type]: false,
    }));
  };

  const valueModalProvider = {
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={valueModalProvider}>
      <ModalLogin visible={modalOpened.login} {...modalOptions} />
      <ModalRegistration visible={modalOpened.registration} {...modalOptions} />
      <ModalConfirm visible={modalOpened.confirm} {...modalOptions} />
      {children}
    </ModalContext.Provider>
  );
};
