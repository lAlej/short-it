import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import Link from "next/link";

interface ShortenerInfoProps {
  urlCode: string;
  originalUrl: string;
}

export const ShortenerInfo = ({ urlCode, originalUrl }: ShortenerInfoProps) => {
  const [copied, setCopied] = React.useState(false);
  const [boxShadow, setBoxShadow] = React.useState("none");

  const truncateUrl = (url: string, maxLength = 32) => {
    if (url.length <= maxLength) return url;
    return url.slice(0, maxLength - 3) + "...";
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_HOST_URL}/${urlCode}`
    );
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  React.useEffect(() => {
    setBoxShadow("inset 0 0 15px var(--success-light)");

    setTimeout(() => {
      setBoxShadow("none");
    }, 300);
  }, []);

  return (
    <Grid
      container
      paddingY={4}
      paddingX={2}
      alignItems={"center"}
      gap={2}
      direction={"row"}
      sx={{
        borderBottom: "1px solid var(--background-secondary)",
        boxShadow: boxShadow,
        transition: "all 0.3s ease",
      }}
    >
      <Grid container alignItems={"center"} gap={1}>
        <Grid
          sx={{
            backgroundColor: "var(--primary-accent)",
            borderRadius: "var(--radius)",
            padding: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <InsertLinkIcon
            sx={{ color: "var(--primary-light)", rotate: "-45deg" }}
          />
        </Grid>
        <Grid>
          <Link
            target="_blank"
            style={{
              color: "var(--primary-light)",
              fontWeight: 500,
              fontSize: 18,
              textDecoration: "none",
            }}
            href={`${process.env.NEXT_PUBLIC_HOST_URL}/${urlCode}`}
          >
            {`${process.env.NEXT_PUBLIC_HOST_URL}/${urlCode}`}
          </Link>
          <Typography
            fontWeight={500}
            fontSize={14}
            color={"var(--text-secondary)"}
          >
            {truncateUrl(originalUrl)}
          </Typography>
        </Grid>
      </Grid>
      <Button
        sx={{
          backgroundColor: "var(--background-secondary)",
          boxShadow: "none",
          borderRadius: "var(--radius)",
          color: copied ? "var(--success)" : "var(--text-secondary)",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "var(--background-primary)",
            boxShadow: "none",
          },
          transition: "all 0.3s ease",
        }}
        variant="contained"
        color="primary"
        startIcon={
          copied ? (
            <TaskAltIcon sx={{ color: "var(--success)" }} />
          ) : (
            <ContentCopyIcon
              sx={{
                color: "var(--text-secondary)",
              }}
            />
          )
        }
        onClick={handleCopy}
      >
        {copied ? "Copied" : "Copy"}
      </Button>
    </Grid>
  );
};
