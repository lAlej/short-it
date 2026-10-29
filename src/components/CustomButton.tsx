import { Button, CircularProgress } from "@mui/material";

interface Props {
  loading: boolean;
}

export const CustomButton = ({ loading }: Props) => {
  return (
    <Button
      type="submit"
      variant="contained"
      disabled={loading}
      startIcon={
        loading ? <CircularProgress size={18} color="inherit" /> : undefined
      }
      sx={{
        height: 56,
        minWidth: 150,
        flex: { xs: "1 1 100%", sm: "0 0 auto" },
        px: 3.5,
        borderRadius: "var(--radius-control)",
        fontWeight: 700,
        fontSize: 16,
        textTransform: "none",
        background: "var(--accent)",
        color: "#fff",
        boxShadow: "none",
        transition: "filter 0.15s, transform 0.15s",
        "&:hover": {
          background: "var(--accent)",
          boxShadow: "none",
          filter: "brightness(1.12)",
        },
        "&:active": { transform: "scale(0.98)" },
        "&.Mui-disabled": {
          background: "var(--accent)",
          color: "#fff",
          opacity: 0.75,
        },
      }}
    >
      {loading ? "Shortening…" : "Shorten URL"}
    </Button>
  );
};
