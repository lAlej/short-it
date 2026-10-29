import { Box, Button, IconButton, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { shortLink, stripProtocol } from "@/app/util/format";
import type { SavedUrl } from "@/app/util/types";

interface Props {
  link: SavedUrl;
  copied: boolean;
  onCopy: (urlCode: string) => void;
}

export const ResultCard = ({ link, copied, onCopy }: Props) => {
  const href = shortLink(link.urlCode);

  return (
    <Box
      component="section"
      aria-label="Your new link"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 3,
        borderRadius: "var(--radius-card)",
        background: "var(--surface)",
        border: "1px solid var(--border-card)",
        animation: "pop 0.35s ease-out",
      }}
    >
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          fontSize: 14,
          fontWeight: 600,
          color: "var(--success)",
        }}
      >
        <CheckCircleOutlineIcon sx={{ fontSize: 18 }} />
        Your link is ready
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 2 }}>
        <Box sx={{ flex: "1 1 260px", minWidth: 0 }}>
          <Box
            component="a"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "block",
              fontSize: { xs: 20, sm: 28 },
              fontWeight: 700,
              letterSpacing: -0.6,
              color: "var(--accent-soft)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {stripProtocol(href)}
          </Box>
          <Typography
            noWrap
            sx={{ mt: 0.5, fontSize: 14, color: "var(--muted)" }}
          >
            {link.url}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1, width: { xs: "100%", sm: "auto" } }}>
          <Button
            onClick={() => onCopy(link.urlCode)}
            startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
            sx={{
              flex: { xs: 1, sm: "0 0 auto" },
              height: 48,
              px: 2.5,
              borderRadius: "12px",
              background: copied ? "var(--success-solid)" : "var(--accent)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 15,
              textTransform: "none",
              transition: "filter 0.15s, background 0.15s",
              "&:hover": {
                background: copied ? "var(--success-solid)" : "var(--accent)",
                filter: "brightness(1.12)",
              },
            }}
          >
            {copied ? "Copied" : "Copy link"}
          </Button>
          <IconButton
            component="a"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open link in a new tab"
            sx={{
              width: 48,
              height: 48,
              borderRadius: "12px",
              border: "1px solid var(--border-card)",
              color: "var(--accent-soft)",
              "&:hover": { background: "var(--tile)" },
            }}
          >
            <OpenInNewIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
