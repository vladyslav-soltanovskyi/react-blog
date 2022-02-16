import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import useModal from "@/hooks/useModal";

export default function ModalConfirm({ title, onConfirm = () => {}, visible }) {
  const { closeModal } = useModal();

  const handleClose = () => {
    closeModal({ type: "confirm" });
  };

  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  return (
    <Dialog
      open={visible}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Отмена
        </Button>
        <Button onClick={handleConfirm} autoFocus>
          да
        </Button>
      </DialogActions>
    </Dialog>
  );
}
