"use client";

import { Grid } from "@mui/material";

import React from "react";
import { createUrl } from "@/app/util/api";
import { validateUrl } from "./util/validateUrl";
import { SavedUrls } from "@/components/SavedUrls";
import { Header } from "@/components/Header";
import { Shortener } from "@/components/Shortener";
import { handleSaveStorage } from "./util/saveStorage";
import { searchUrl } from "./util/getUrls";

export default function Home() {
  const [url, setUrl] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [savedUrls, setSavedUrls] = React.useState<
    { url: string; urlCode: string }[]
  >([]);

  const handleSaveUrl = async () => {
    const isValid = validateUrl(url);
    if (!isValid) {
      setError(true);
      return;
    }
    setLoading(true);
    try {
      const data = await createUrl(url);
      if (data) {
        setLoading(false);
        handleSaveStorage({ url, urlCode: data.urlCode });
        setSavedUrls([{ url, urlCode: data.urlCode }, ...savedUrls]);
        setUrl("");
        setError(false);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      return;
    }
  };

  React.useEffect(() => {
    setSavedUrls(searchUrl());
  }, []);

  return (
    <Grid
      xs={12}
      container
      flexDirection={"column"}
      height={"100%"}
      alignItems={"center"}
      justifyContent={"start"}
      sx={{
        background: "var(--background-primary)",
        boxShadow: "var(--shadow)",
        mx: "auto",
        minHeight: "100vh",
      }}
    >
      <Grid
        container
        xs={12}
        sm={11}
        md={10}
        lg={6}
        flexDirection={"column"}
        gap={2}
        padding={2}
        height={"100%"}
        minHeight={"100vh"}
      >
        <Header />
        <Shortener
          url={url}
          setUrl={setUrl}
          loading={loading}
          handleSaveUrl={handleSaveUrl}
          error={error}
        />
        <SavedUrls urls={savedUrls} />
      </Grid>
    </Grid>
  );
}
