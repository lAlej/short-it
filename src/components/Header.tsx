import { Box, Typography } from "@mui/material";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import LaptopIcon from "@mui/icons-material/LaptopMac";

export const Header = () => {
  return (
    <>
      <Box
        component="header"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pt: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: "10px",
              background: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <InsertLinkIcon sx={{ color: "#fff", fontSize: 20, rotate: "-45deg" }} />
          </Box>
          <Typography fontWeight={700} fontSize={18} letterSpacing={-0.3}>
            short.it
          </Typography>
        </Box>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.75,
            fontSize: 13,
            color: "var(--muted)",
          }}
        >
          <LaptopIcon sx={{ fontSize: 16 }} />
          Saved on this device
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1.75,
          textAlign: "center",
          pt: { xs: 1, sm: 3 },
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontWeight: 800,
            fontSize: { xs: 34, sm: 52 },
            lineHeight: 1.08,
            letterSpacing: { xs: -1.2, sm: -1.8 },
          }}
        >
          Make long links short.
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: 15, sm: 18 },
            lineHeight: 1.5,
            color: "var(--muted)",
            maxWidth: 460,
          }}
        >
          Paste a URL and get a clean, shareable link. No sign-up, no clutter.
        </Typography>
      </Box>
    </>
  );
};
