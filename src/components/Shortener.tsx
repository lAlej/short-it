import { TextFieldCustom } from "./TextFieldCustom";
import { CustomButton } from "./CustomButton";
import { Grid } from "@mui/material";

interface ShortenerProps {
  setUrl: (e: string) => void;
  loading: boolean;
  handleSaveUrl: () => void;
  error: boolean;
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
    <Grid
      container
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={2}
      padding={4}
      sx={{
        backgroundColor: "var(--primary-darker)",
        border: "1px solid var(--background-secondary)",
        borderRadius: "var(--radius)",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
      }}
    >
      <TextFieldCustom onChange={(e) => setUrl(e)} error={error} value={url} />
      <CustomButton loading={loading} handleSaveUrl={handleSaveUrl} />
    </Grid>
  );
};
