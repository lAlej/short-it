import { IconButton, InputAdornment, styled, TextField } from "@mui/material";
import { Link as LinkIcon } from "@mui/icons-material";

const CustomTextField = styled(TextField)({
  "& .MuiInputBase-input": {
    height: "55px",
    fontSize: "0.9rem",
    padding: "0 14px",
    background: "var(--background-secondary)",
    borderRadius: "var(--radius)",
    boxShadow: "var(--shadow)",
    transition: "box-shadow 0.2s",
  },
  "& .MuiOutlinedInput-root": {
    backgroundColor: "var(--background-secondary)",
    borderRadius: "var(--radius)",
    color: "var(--text-secondary)",
    "& fieldset": {
      borderColor: "var(--background-tertiary)",
      borderWidth: 1,
    },
    "&:hover fieldset": {
      borderColor: "var(--background-tertiary)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--blue)",
    },
  },
  "& .MuiInputLabel-root": {
    fontWeight: 500,
    color: "var(--text-secondary)",
    "&.Mui-focused": {
      color: "var(--accent)",
    },
  },
  "& .MuiInputAdornment-root": {
    backgroundColor: "var(--background-secondary)",
    color: "var(--text-secondary)",
    width: 20,
    height: 50,
  },
});

interface Props {
  value: string;
  onChange: (e: string) => void;
  error: boolean;
}

export const TextFieldCustom = ({ onChange, error, value }: Props) => {

  return (
    <CustomTextField
      InputProps={{
        startAdornment: (
          <InputAdornment
            position="start"
          >
            <LinkIcon />
          </InputAdornment>
        ),
      }}
      error={error}
      helperText={error ? "Please enter a valid URL" : ""}
      sx={{ width: { xs: "100%" } }}
      placeholder="Enter your URL here..."
      variant="outlined"
      onChange={(e) => onChange(e.target.value)}
      value={value}

    />
  );
};
