import { Box, Typography } from "@mui/material";
import { TextFieldCustom } from "./TextFieldCustom";
import { CustomButton } from "./CustomButton";

interface ShortenerProps {
  setUrl: (e: string) => void;
  loading: boolean;
  handleSaveUrl: (e?: React.FormEvent) => void;
  error: string | null;
  url: string;
}

export const Shortener = ({
  setUrl,
  loading,
  handleSaveUrl,
  error,
  url,
}: ShortenerProps) => {
  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSaveUrl}
      sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}
    >
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.25 }}>
        <TextFieldCustom onChange={setUrl} error={!!error} value={url} />
        <CustomButton loading={loading} />
      </Box>
      <Typography
        id="url-hint"
        role="status"
        sx={{
          minHeight: 20,
          fontSize: 14,
          color: error ? "var(--danger)" : "var(--subtle)",
        }}
      >
        {error ?? "Works with any http or https link."}
      </Typography>
    </Box>
  );
};
