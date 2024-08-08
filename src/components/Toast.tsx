import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  message: string;
  open: boolean;
  handleClose: () => void;
}
export const Toast = ({ message, open, handleClose }: Props) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      message={message}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  );
};
