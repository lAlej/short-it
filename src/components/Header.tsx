import { Typography } from "@mui/material";

export const Header = () => {
  return (
    <div>
      <Typography
        style={{
          fontWeight: 700,
          fontSize: 40,
          textAlign: "center",
          letterSpacing: -1,
          marginBottom: 8,
        }}
      >
        Url Shortener
      </Typography>
      <Typography style={{ fontSize: 18, color: "var(--text-secondary)", textAlign: "center", fontWeight: 400 }}>
        Transform long URLs into short, shareable links
      </Typography>
    </div>
  );
};
