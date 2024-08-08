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
        height: "10px",
      }}
    >
      <CircularProgress style={{ color: "#C5705D" }} />
    </Box>
  );
};
