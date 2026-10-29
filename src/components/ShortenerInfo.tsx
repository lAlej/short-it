import { Box, Button, IconButton, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { domainOf, shortLink, stripProtocol, timeAgo } from "@/app/util/format";
import type { SavedUrl } from "@/app/util/types";

interface ShortenerInfoProps {
  link: SavedUrl;
  copied: boolean;
  onCopy: (urlCode: string) => void;
  onRemove: (urlCode: string) => void;
}

export const ShortenerInfo = ({
  link,
  copied,
  onCopy,
  onRemove,
}: ShortenerInfoProps) => {
  const href = shortLink(link.urlCode);
  const when = timeAgo(link.createdAt);

  return (
    <Box
      component="li"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 1.5,
        p: 1.5,
        borderRadius: "12px",
        transition: "background 0.15s",
        "&:hover": { background: "var(--row-hover)" },
      }}
    >
      <Box
        aria-hidden
        sx={{
          width: 44,
          height: 44,
          flexShrink: 0,
          borderRadius: "12px",
          background: "var(--tile)",
          color: "var(--accent-soft)",
          fontWeight: 700,
          fontSize: 18,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {domainOf(link.url).charAt(0).toUpperCase()}
      </Box>

      <Box sx={{ flex: "1 1 200px", minWidth: 0 }}>
        <Box
          component="a"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: "block",
            fontSize: 16,
            fontWeight: 600,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {stripProtocol(href)}
        </Box>
        <Typography
          noWrap
          title={link.url}
          sx={{ mt: 0.25, fontSize: 13, color: "var(--muted)" }}
        >
          {link.url}
        </Typography>
      </Box>

      {when && (
        <Typography sx={{ fontSize: 12, color: "var(--subtle)", flexShrink: 0 }}>
          {when}
        </Typography>
      )}

      <Box sx={{ display: "flex", gap: 0.5, flexShrink: 0 }}>
        <Button
          onClick={() => onCopy(link.urlCode)}
          startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
          sx={{
            height: 44,
            px: 1.75,
            borderRadius: "10px",
            background: "var(--soft)",
            color: copied ? "var(--success)" : "var(--accent-soft)",
            fontWeight: 600,
            fontSize: 14,
            textTransform: "none",
            "&:hover": { background: "var(--tile)", color: "var(--text)" },
          }}
        >
          {copied ? "Copied" : "Copy"}
        </Button>
        <IconButton
          aria-label="Delete link"
          onClick={() => onRemove(link.urlCode)}
          sx={{
            width: 44,
            height: 44,
            borderRadius: "10px",
            color: "var(--muted)",
            "&:hover": { background: "var(--tile)", color: "var(--danger)" },
          }}
        >
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};
