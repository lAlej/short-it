"use client";

import React from "react";
import { Grid, Typography } from "@mui/material";
import { ShortenerInfo } from "./ShortenerInfo";
import InsertLinkIcon from "@mui/icons-material/InsertLink";

interface SavedUrlsProps {
  urls: { url: string; urlCode: string }[];
}

const SavedUrlsComponent = ({ urls }: SavedUrlsProps) => {
  return urls.length > 0 ? (
    <Grid
      padding={4}
      gap={2}
      sx={{
        width: "100%",
        backgroundColor: "var(--primary-darker)",
        border: "1px solid var(--background-secondary)",
        borderRadius: "var(--radius)",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
        maxHeight: 450,
      }}
    >
      <Typography
        fontWeight={600}
        fontSize={18}
        borderBottom={"1px solid var(--background-secondary)"}
        paddingBottom={2}
      >
        Your Shortened URLs
      </Typography>

      <Grid sx={{ overflowY: "auto", maxHeight: 350, width: "100%" }}>
        {urls.map((url) => (
          <ShortenerInfo
            key={url.urlCode}
            urlCode={url.urlCode}
            originalUrl={url.url}
          />
        ))}
      </Grid>
    </Grid>
  ) : (
    <Grid
      container
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      padding={4}
      gap={2}
      width={"100%"}
    >
      <Grid
        container
        justifyItems={"center"}
        alignItems={"center"}
        justifyContent={"center"}
        width={100}
        height={100}
        borderRadius={"100%"}
        sx={{
          backgroundColor: "var(--primary-darker)",
        }}
      >
        <InsertLinkIcon
          sx={{
            color: "var(--text-secondary)",
            rotate: "-45deg",
            width: 55,
            height: 55,
          }}
        />
      </Grid>
      <Typography fontSize={18} color={"var(--text-secondary)"}>
        No URLs saved
      </Typography>
    </Grid>
  );
};

export const SavedUrls = React.memo(SavedUrlsComponent);
