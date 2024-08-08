import { styled, TextField } from "@mui/material";

const CustomTextField = styled(TextField)({
  "& .MuiInputBase-input": {
    width: "100vw",
    height: "50px",
    boxSizing: "border-box",
    padding: "0 14px",
    display: "flex",
    alignItems: "center",
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#C5705D",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#C5705D",
    },
  },
  "& .MuiInputLabel-root": {
    "&.Mui-focused": {
      color: "#C5705D",
    },
  },
});


interface Props {
  onChange: (e:string) => void
}

export const TextFieldCustom = ({onChange}: Props) => {
  return (
    <CustomTextField
      sx={{width: {xs: "90vw", sm: "60vw", md: "50vw", lg: "25vw"}}}
      placeholder="Paste url to shorten"
      variant="outlined"
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
