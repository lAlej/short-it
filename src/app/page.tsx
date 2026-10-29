"use client";

import { Box } from "@mui/material";

import React from "react";
import { createUrl } from "@/app/util/api";
import { normalizeUrl, validateUrl } from "./util/validateUrl";
import { SavedUrls } from "@/components/SavedUrls";
import { Header } from "@/components/Header";
import { Shortener } from "@/components/Shortener";
import { ResultCard } from "@/components/ResultCard";
import { Toast } from "@/components/Toast";
import {
  clearStorage,
  handleSaveStorage,
  removeFromStorage,
} from "./util/saveStorage";
import { searchUrl } from "./util/getUrls";
import { shortLink } from "./util/format";
import type { SavedUrl } from "./util/types";

export default function Home() {
  const [url, setUrl] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [savedUrls, setSavedUrls] = React.useState<SavedUrl[]>([]);
  const [hydrated, setHydrated] = React.useState(false);
  const [latest, setLatest] = React.useState<SavedUrl | null>(null);
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);
  const [toast, setToast] = React.useState({ open: false, message: "" });
  const copyTimer = React.useRef<ReturnType<typeof setTimeout>>();

  const handleChangeUrl = (value: string) => {
    setUrl(value);
    setError(null);
  };

  const handleSaveUrl = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (loading) return;

    if (!validateUrl(url)) {
      setError(
        "That doesn't look like a valid URL. Try something like https://example.com"
      );
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const normalized = normalizeUrl(url);
      const data = await createUrl(normalized);
      const link: SavedUrl = {
        url: normalized,
        urlCode: data.urlCode,
        createdAt: new Date().toISOString(),
      };
      handleSaveStorage(link);
      setSavedUrls((prev) => [link, ...prev]);
      setLatest(link);
      setUrl("");
    } catch {
      setError("Couldn't shorten your link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (urlCode: string) => {
    let message = "Link copied to clipboard";
    try {
      await navigator.clipboard.writeText(shortLink(urlCode));
    } catch {
      message = "Couldn't copy. Select the link and copy it manually.";
    }
    setCopiedCode(urlCode);
    setToast({ open: true, message });
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleRemove = (urlCode: string) => {
    removeFromStorage(urlCode);
    setSavedUrls((prev) => prev.filter((u) => u.urlCode !== urlCode));
    setLatest((prev) => (prev?.urlCode === urlCode ? null : prev));
  };

  const handleClear = () => {
    clearStorage();
    setSavedUrls([]);
    setLatest(null);
  };

  React.useEffect(() => {
    setSavedUrls(searchUrl());
    setHydrated(true);
    return () => clearTimeout(copyTimer.current);
  }, []);

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        px: 2.5,
        pb: 6,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 760,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Header />
        <Shortener
          url={url}
          setUrl={handleChangeUrl}
          loading={loading}
          handleSaveUrl={handleSaveUrl}
          error={error}
        />
        {latest && (
          <ResultCard
            link={latest}
            copied={copiedCode === latest.urlCode}
            onCopy={handleCopy}
          />
        )}
        <SavedUrls
          urls={savedUrls}
          hydrated={hydrated}
          copiedCode={copiedCode}
          onCopy={handleCopy}
          onRemove={handleRemove}
          onClear={handleClear}
        />
        <Box
          component="footer"
          sx={{ textAlign: "center", fontSize: 13, color: "var(--subtle)" }}
        >
          Built by{" "}
          <a
            href="https://www.linkedin.com/in/lapee/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Luis Peña
          </a>
        </Box>
      </Box>
      <Toast
        open={toast.open}
        message={toast.message}
        handleClose={() => setToast((t) => ({ ...t, open: false }))}
      />
    </Box>
  );
}
