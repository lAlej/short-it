import { Button, CircularProgress, Grid, Typography } from "@mui/material";

interface Props {
  loading: boolean;
  handleSaveUrl: () => void;
}

export const CustomButton = ({ loading, handleSaveUrl }: Props) => {
  return (
    <Button
      variant="contained"
      disabled={loading}
      onClick={() => !loading && handleSaveUrl()}
      sx={{
        height: 55,
        width: "100%",
        borderRadius: "var(--radius)",
        fontWeight: 600,
        fontSize: 15,
        textTransform: "none",
        background:
          "linear-gradient(to bottom right, var(--blue),var(--purple-secondary),var(--purple))",
        color: "#fff",
        boxShadow: "var(--shadow)",
        px: 4,
        "&:hover": {
          background:
            "linear-gradient(to bottom right, var(--blue-dark), var(--purple-secondary), var(--purple-dark))",
          color: "#fff",
          scale: 1.02,
        },
        "&:disabled": {
          background: "var(--blue-dark)",
          color: "var(--text-secondary)",
          boxShadow: "none",
          scale: 1,
        },
        transition: "all 0.2s",
      }}
    >
      {loading ? (
        <Grid container alignItems="center" gap={1} justifyContent="center">
          <CircularProgress size={20} color="inherit" />
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            Shortening...
          </Typography>
        </Grid>
      ) : (
        "Shorten URL"
      )}
    </Button>
  );
};
