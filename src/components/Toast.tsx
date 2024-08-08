import { IconButton, Snackbar } from "@mui/material";
import React from "react";

interface Props {
  message: string;
  open: boolean;
  handleClose: () => void;
}
export const Toast = ({ message, open, handleClose }: Props) => {
  const [handleOpen, setHandleOpen] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setHandleOpen(open);
      setTimeout(() => {
        setHandleOpen(false);
        handleClose();
      }, 3000);
    }
  }, [open]);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={handleOpen}
      autoHideDuration={3000}
      message={message}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
        ></IconButton>
      }
    />
  );
};
