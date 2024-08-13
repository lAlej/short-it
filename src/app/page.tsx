"use client";

import { Button, Grid, Typography } from "@mui/material";

import Link from "next/link";
import React from "react";
import { createUrl } from "@/app/util/api";
import { TextFieldCustom } from "@/components/TextFieldCustom";
import { validateUrl } from "./util/validateUrl";
import { Loading } from "@/components/Loading";
import { Toast } from "@/components/Toast";

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
    const url = `${process.env.NEXT_PUBLIC_HOST_URL}/${newUrl}`;

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
    >
      <Typography
        style={{
          fontWeight: "bold",
          fontSize: 50,
          color: "#C5705D",
          textAlign: "center",
        }}
      >
        Url Shortener
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
          style={{ height: 50 }}
          variant="outlined"
          onClick={() => sendUrl()}
          sx={{
            color: "#C5705D",
            borderColor: "#C5705D",
            "&:hover": {
              backgroundColor: "#C5705D",
              borderColor: "#FFF",
              color: "#FFF",
            },
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
          // display: newUrl !== "" ? "flex" : "none",
        }}
      >
        <Typography
          style={{
            fontWeight: "bold",
            fontSize: 25,
            transition: "all 1s",
          }}
        >
          New Url:{" "}
        </Typography>
        <Button
          style={{ height: 40 }}
          variant="outlined"
          onClick={() => handleClipboard()}
          sx={{
            color: "#C5705D",
            borderColor: "#C5705D",
            "&:hover": {
              backgroundColor: "#C5705D",
              borderColor: "#FFF",
              color: "#FFF",
            },
          }}
        >
          Copy to Clipboard
        </Button>
      </Grid>
      <Toast
        message={openToast.message}
        open={openToast.open}
        handleClose={() => handleToast()}
      />
    </Grid>
  );
}
