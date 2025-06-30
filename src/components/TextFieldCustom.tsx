import { styled, TextField } from "@mui/material";

const CustomTextField = styled(TextField)({
  '& .MuiInputBase-input': {
    height: '50px',
    fontSize: '1.1rem',
    padding: '0 14px',
    background: '#fff',
    borderRadius: 'var(--radius)',
    boxShadow: 'var(--shadow)',
    transition: 'box-shadow 0.2s',
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: 'var(--radius)',
    '& fieldset': {
      borderColor: 'var(--accent-light)',
      borderWidth: 2,
    },
    '&:hover fieldset': {
      borderColor: 'var(--accent)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--accent)',
      boxShadow: '0 0 0 2px var(--accent-light)',
    },
  },
  '& .MuiInputLabel-root': {
    fontWeight: 500,
    color: '#888',
    '&.Mui-focused': {
      color: 'var(--accent)',
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
