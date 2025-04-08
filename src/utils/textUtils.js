export function cleanTextInput(text) {
  return text
    .replace(/\r\n/g, "\n") // Windows line endings
    .replace(/\r/g, "\n") // Old Mac line endings
    .replace(/\n\n+/g, "\n\n") // Collapse multiple line breaks
    .trim(); // Clean up extra whitespace
}
