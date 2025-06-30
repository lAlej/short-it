"use client";

import { Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip } from "@mui/material";
import { Toast } from "@/components/Toast";
import React from "react";

export const SavedUrls = () => {
  const savedUrls = window.localStorage.getItem("savedUrls");
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

  if (!savedUrls) return null;

  const savedUrlsArray = JSON.parse(savedUrls);

  // Helper to truncate long URLs
  const truncateUrl = (url: string, maxLength = 32) => {
    if (url.length <= maxLength) return url;
    return url.slice(0, maxLength - 3) + '...';
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 4, borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', background: '#fff', maxWidth: 600, mx: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700, color: 'var(--accent)', fontSize: 18 }}>Original URL</TableCell>
            <TableCell sx={{ fontWeight: 700, color: 'var(--accent)', fontSize: 18 }}>Short URL</TableCell>
            <TableCell sx={{ fontWeight: 700, color: 'var(--accent)', fontSize: 18 }} align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {savedUrlsArray.map(({ url, urlCode }: { url: string; urlCode: string }, index: number) => (
            <TableRow key={index}>
              <TableCell>
                <Tooltip title={url} arrow>
                  <span style={{ cursor: 'pointer', fontSize: 15 }}>{truncateUrl(url)}</span>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title={`${process.env.NEXT_PUBLIC_HOST_URL}/${urlCode}`} arrow>
                  <span style={{ cursor: 'pointer', color: 'var(--accent)', fontWeight: 500, fontSize: 15 }}>{truncateUrl(`${process.env.NEXT_PUBLIC_HOST_URL}/${urlCode}`, 28)}</span>
                </Tooltip>
              </TableCell>
              <TableCell align="right">
                <Button
                  style={{ height: 36, borderRadius: 'var(--radius)', fontWeight: 500 }}
                  variant="contained"
                  onClick={() => {
                    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_HOST_URL}/${urlCode}`);
                    setOpenToast((prev) => {
                      let prevData = { ...prev };
                      prevData.open = true;
                      prevData.message = "Copied to Clipboard";
                      return prevData;
                    });
                  }}
                  sx={{
                    background: "var(--accent)",
                    color: "#fff",
                    boxShadow: 'var(--shadow)',
                    px: 2,
                    minWidth: 0,
                    '&:hover': {
                      background: "var(--accent-dark)",
                      color: '#fff',
                    },
                    transition: 'all 0.2s',
                  }}
                >
                  Copy
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Toast
        message={openToast.message}
        open={openToast.open}
        handleClose={handleToast}
      />
    </TableContainer>
  );
};
