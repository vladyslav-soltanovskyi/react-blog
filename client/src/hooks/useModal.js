import { useContext } from "react";
import { ModalContext } from "../contexts";

function useModal() {
  return useContext(ModalContext);
}

export default useModal;
