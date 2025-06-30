"use client";

import { Button, Grid, Typography } from "@mui/material";

import Link from "next/link";
import React from "react";
import { createUrl } from "@/app/util/api";
import { TextFieldCustom } from "@/components/TextFieldCustom";
import { validateUrl } from "./util/validateUrl";
import { Loading } from "@/components/Loading";
import { Toast } from "@/components/Toast";
import { SavedUrls } from "@/components/SavedUrls";

export default function Home() {
  const [url, setUrl] = React.useState<string>("");
  const [newUrl, setNewUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [openToast, setOpenToast] = React.useState({
    message: "",
    open: false,
  });

  const handleToast = () => {
    setOpenToast((prev) => {
      let prevData = { ...prev };
      prevData.open = false;

      return prevData;
    });
  };

  const sendUrl = async () => {
    const isValid = validateUrl(url);
    if (!isValid) {
      return setOpenToast((prev) => {
        let prevData = { ...prev };
        prevData.open = true;
        prevData.message = "Use a valid URL";

        return prevData;
      });
    }
    setLoading(true);
    try {
      const data = await createUrl(url);
      if (data) {
        setLoading(false);
        setNewUrl(data.urlCode);
      }
    } catch (error) {
      setLoading(false);

      return setOpenToast((prev) => {
        let prevData = { ...prev };
        prevData.open = true;
        prevData.message = "Server error, try again";

        return prevData;
      });
    }
  };

  const handleClipboard = () => {
    const savedUrls = window.localStorage.getItem("savedUrls");
    const savedUrlsArray = savedUrls ? JSON.parse(savedUrls) : [];

    navigator.clipboard
      .writeText(url)
      .then(() => {
        return setOpenToast((prev) => {
          let prevData = { ...prev };
          prevData.open = true;
          prevData.message = "Copied to Clipboard";

          return prevData;
        });
      })
      .catch((err) => {
        console.error("Error to clipboard: ", err);
      });

    window.localStorage.setItem("savedUrls", JSON.stringify([...savedUrlsArray, { url, urlCode: newUrl }]));
  };

  return (
    <Grid
      item
      container
      xs={12}
      flexDirection={"column"}
      height={"80vh"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={5}
      sx={{ background: '#fff', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', p: { xs: 2, sm: 4 }, maxWidth: 600, mx: 'auto' }}
    >
      <Typography
        style={{
          fontWeight: 700,
          fontSize: 54,
          color: "var(--accent)",
          textAlign: "center",
          letterSpacing: -1,
          marginBottom: 8,
        }}
      >
        Url Shortener
        <span style={{
          display: 'block',
          width: 60,
          height: 6,
          background: 'var(--accent)',
          borderRadius: 3,
          margin: '12px auto 0',
        }} />
      </Typography>
      <Grid
        item
        container
        alignItems={"center"}
        justifyContent={"center"}
        gap={2}
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
      >
        <TextFieldCustom onChange={(e) => setUrl(e)} />
        <Button
          style={{ height: 50, borderRadius: 'var(--radius)', fontWeight: 600, fontSize: 18 }}
          variant="contained"
          onClick={() => sendUrl()}
          sx={{
            background: "var(--accent)",
            color: "#fff",
            boxShadow: 'var(--shadow)',
            px: 4,
            '&:hover': {
              background: "var(--accent-dark)",
              color: '#fff',
            },
            transition: 'all 0.2s',
          }}
        >
          Shorten URL
        </Button>
      </Grid>
      <Loading isLoading={loading} />
      <Grid
        item
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
            color: '#222',
            transition: "all 1s",
          }}
        >
          New Url:
        </Typography>
        <Button
          style={{ height: 40, borderRadius: 'var(--radius)', fontWeight: 500 }}
          variant="contained"
          onClick={() => handleClipboard()}
          sx={{
            background: "var(--accent)",
            color: "#fff",
            boxShadow: 'var(--shadow)',
            px: 3,
            '&:hover': {
              background: "var(--accent-dark)",
              color: '#fff',
            },
            transition: 'all 0.2s',
          }}
        >
          Copy to Clipboard
        </Button>
      </Grid>
      <SavedUrls />
      <Toast
        message={openToast.message}
        open={openToast.open}
        handleClose={() => handleToast()}
      />
    </Grid>
  );
}
