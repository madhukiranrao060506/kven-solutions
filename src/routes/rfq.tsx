/* Tell the browser this is a dark-scheme page so form elements use dark colors */
:root {
  color-scheme: dark;
}

/* Ensure input text is always visible on dark backgrounds */
@layer base {
  input, textarea, select {
    color: var(--color-foreground);
    -webkit-text-fill-color: var(--color-foreground);
    caret-color: var(--color-foreground);
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px #1e1e1e inset !important;
    -webkit-text-fill-color: var(--color-foreground) !important;
  }
}