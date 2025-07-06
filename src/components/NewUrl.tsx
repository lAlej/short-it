import { Grid, Typography, Button } from "@mui/material";

export const NewUrl = ({
  newUrl,
  handleClipboard,
}: {
  newUrl: string;
  handleClipboard: () => void;
}) => {
  return (
    <Grid
      container
      sx={{
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        display: newUrl !== "" ? "flex" : "none",
      }}
    >
      <Typography
        style={{
          fontWeight: 600,
          fontSize: 22,
          color: "#222",
          transition: "all 1s",
        }}
      >
        New Url:
      </Typography>
      <Button
        style={{ height: 40, borderRadius: "var(--radius)", fontWeight: 500 }}
        variant="contained"
        onClick={() => handleClipboard()}
        sx={{
          background: "var(--accent)",
          color: "#fff",
          boxShadow: "var(--shadow)",
          px: 3,
          "&:hover": {
            background: "var(--accent-dark)",
            color: "#fff",
          },
          transition: "all 0.2s",
        }}
      >
        Copy to Clipboard
      </Button>
    </Grid>
  );
};
