import { Box, CircularProgress } from "@mui/material";

interface Props {
  isLoading: boolean;
}

export const Loading = ({ isLoading }: Props) => {
  return (
    <Box
      sx={{
        display: isLoading ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        height: "40px",
        width: '100%',
        my: 2,
      }}
    >
      <CircularProgress style={{ color: "var(--accent)", width: 40, height: 40 }} />
    </Box>
  );
};
