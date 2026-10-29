import { Snackbar } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

interface Props {
  message: string;
  open: boolean;
  handleClose: () => void;
}

export const Toast = ({ message, open, handleClose }: Props) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
      message={
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <CheckIcon sx={{ fontSize: 16, color: "var(--success-solid)" }} />
          {message}
        </span>
      }
      ContentProps={{
        role: "status",
        sx: {
          background: "var(--text)",
          color: "var(--bg)",
          fontWeight: 600,
          fontSize: 14,
          borderRadius: "12px",
          boxShadow: "0 12px 32px rgba(0, 0, 0, 0.45)",
        },
      }}
    />
  );
};
