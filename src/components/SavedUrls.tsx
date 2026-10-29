"use client";

import React from "react";
import { Box, Button, Typography } from "@mui/material";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import { ShortenerInfo } from "./ShortenerInfo";
import type { SavedUrl } from "@/app/util/types";

interface SavedUrlsProps {
  urls: SavedUrl[];
  hydrated: boolean;
  copiedCode: string | null;
  onCopy: (urlCode: string) => void;
  onRemove: (urlCode: string) => void;
  onClear: () => void;
}

const SavedUrlsComponent = ({
  urls,
  hydrated,
  copiedCode,
  onCopy,
  onRemove,
  onClear,
}: SavedUrlsProps) => {
  const [confirmClear, setConfirmClear] = React.useState(false);

  React.useEffect(() => {
    if (!confirmClear) return;
    const timer = setTimeout(() => setConfirmClear(false), 3000);
    return () => clearTimeout(timer);
  }, [confirmClear]);

  const handleClear = () => {
    if (!confirmClear) {
      setConfirmClear(true);
      return;
    }
    setConfirmClear(false);
    onClear();
  };

  // Avoid flashing the empty state before localStorage has been read.
  if (!hydrated) return null;

  return (
    <Box
      component="section"
      aria-label="Recent links"
      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 0.5,
        }}
      >
        <Typography
          component="h2"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.25,
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          Recent links
          <Box
            component="span"
            sx={{
              minWidth: 24,
              height: 22,
              px: 1,
              borderRadius: "11px",
              background: "var(--tile)",
              color: "var(--accent-soft)",
              fontSize: 12,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {urls.length}
          </Box>
        </Typography>
        {urls.length > 0 && (
          <Button
            onClick={handleClear}
            sx={{
              height: 44,
              px: 1.5,
              borderRadius: "10px",
              color: confirmClear ? "var(--danger)" : "var(--muted)",
              fontWeight: 600,
              fontSize: 14,
              textTransform: "none",
              "&:hover": { background: "var(--tile)" },
            }}
          >
            {confirmClear ? "Click again to confirm" : "Clear all"}
          </Button>
        )}
      </Box>

      {urls.length > 0 ? (
        <Box
          component="ul"
          sx={{
            listStyle: "none",
            p: 0.75,
            borderRadius: "var(--radius-card)",
            background: "var(--surface-list)",
            border: "1px solid var(--border)",
            display: "flex",
            flexDirection: "column",
            gap: 0.25,
          }}
        >
          {urls.map((link) => (
            <ShortenerInfo
              key={link.urlCode}
              link={link}
              copied={copiedCode === link.urlCode}
              onCopy={onCopy}
              onRemove={onRemove}
            />
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            px: 2.5,
            py: 5,
            textAlign: "center",
            borderRadius: "var(--radius-card)",
            border: "1px dashed var(--border-strong)",
          }}
        >
          <InsertLinkIcon
            sx={{ color: "var(--subtle)", rotate: "-45deg", fontSize: 30 }}
          />
          <Typography fontSize={16} fontWeight={600}>
            No links yet
          </Typography>
          <Typography fontSize={14} color="var(--muted)">
            Links you shorten will show up here.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export const SavedUrls = React.memo(SavedUrlsComponent);
