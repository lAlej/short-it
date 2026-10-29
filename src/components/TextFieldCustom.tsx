import { Box, Button, IconButton, InputBase } from "@mui/material";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  value: string;
  onChange: (e: string) => void;
  error: boolean;
}

export const TextFieldCustom = ({ onChange, error, value }: Props) => {
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) onChange(text.trim());
    } catch {
      // Clipboard permission denied: the user can still paste manually.
    }
  };

  return (
    <Box
      sx={{
        flex: "1 1 340px",
        minWidth: 0,
        height: 56,
        display: "flex",
        alignItems: "center",
        gap: 1.25,
        pl: 2,
        pr: 1,
        borderRadius: "var(--radius-control)",
        background: "var(--field)",
        border: `1px solid ${error ? "var(--danger-border)" : "var(--border-strong)"}`,
        transition: "box-shadow 0.15s, border-color 0.15s",
        "&:focus-within": {
          borderColor: "var(--accent-text)",
          boxShadow: "0 0 0 3px rgba(129, 140, 255, 0.35)",
        },
      }}
    >
      <InsertLinkIcon
        sx={{ color: "var(--subtle)", rotate: "-45deg", flexShrink: 0 }}
      />
      <InputBase
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://example.com/a-very-long-link"
        inputProps={{
          "aria-label": "URL to shorten",
          "aria-invalid": error,
          "aria-describedby": "url-hint",
          inputMode: "url",
          autoComplete: "off",
          spellCheck: false,
        }}
        sx={{
          color: "var(--text)",
          fontSize: 16,
          fontWeight: 500,
          "& input::placeholder": { color: "var(--subtle)", opacity: 1 },
        }}
      />
      {value ? (
        <IconButton
          aria-label="Clear"
          onClick={() => onChange("")}
          sx={{
            width: 44,
            height: 44,
            color: "var(--muted)",
            borderRadius: "10px",
            "&:hover": { background: "var(--tile)", color: "var(--text)" },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      ) : (
        <Button
          onClick={handlePaste}
          startIcon={<ContentPasteIcon sx={{ fontSize: 16 }} />}
          sx={{
            height: 44,
            px: 1.5,
            color: "var(--muted)",
            fontWeight: 600,
            fontSize: 14,
            textTransform: "none",
            borderRadius: "10px",
            "&:hover": { background: "var(--tile)", color: "var(--text)" },
          }}
        >
          Paste
        </Button>
      )}
    </Box>
  );
};
