"use client";
import { getUrl } from "@/app/util/api";
import { domainOf } from "@/app/util/format";
import { normalizeUrl } from "@/app/util/validateUrl";
import React from "react";
import Link from "next/link";
import { Box, CircularProgress, Typography } from "@mui/material";

type State =
  | { status: "loading" }
  | { status: "redirecting"; target: string }
  | { status: "notfound" };

const Page = ({ params }: { params: { url: string } }) => {
  const [state, setState] = React.useState<State>({ status: "loading" });

  React.useEffect(() => {
    const redirectTo = async () => {
      try {
        const data = await getUrl(params.url);
        if (!data?.url) {
          setState({ status: "notfound" });
          return;
        }
        const target = normalizeUrl(data.url);
        setState({ status: "redirecting", target });
        window.location.replace(target);
      } catch {
        setState({ status: "notfound" });
      }
    };

    redirectTo();
  }, [params.url]);

  const notFound = state.status === "notfound";

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2.5,
        px: 3,
        textAlign: "center",
      }}
    >
      {!notFound && (
        <>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "16px",
              background: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress size={26} sx={{ color: "#fff" }} />
          </Box>
          <Box role="status" sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography component="h1" fontSize={22} fontWeight={700}>
              Taking you there…
            </Typography>
            {state.status === "redirecting" && (
              <Typography
                fontSize={14}
                color="var(--muted)"
                sx={{ wordBreak: "break-all" }}
              >
                {domainOf(state.target)}
              </Typography>
            )}
          </Box>
          {state.status === "redirecting" && (
            <Typography fontSize={13} color="var(--subtle)">
              Not redirected? <a href={state.target}>Open the link manually</a>
            </Typography>
          )}
        </>
      )}

      {notFound && (
        <Box
          role="status"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            p: 3,
            maxWidth: 360,
            borderRadius: "var(--radius-card)",
            border: "1px dashed var(--border-strong)",
          }}
        >
          <Typography component="h1" fontSize={18} fontWeight={700}>
            This link doesn&apos;t exist or was removed
          </Typography>
          <Link href="/" style={{ fontSize: 14 }}>
            Create a new short link
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default Page;
