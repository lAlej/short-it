"use client";

import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: { fontFamily: "inherit" },
});

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
