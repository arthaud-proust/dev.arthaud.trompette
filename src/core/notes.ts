export const NOTES = [
  'do',
  'ré',
  'mi',
  'fa',
  'sol',
  'la',
  'si'
]
export type Note = typeof NOTES[number]

export const nextNote = (note: Note): Note => {
  const index = NOTES.indexOf(note);
  if (index === -1) {
    throw new Error(`Invalid note: ${note}`);
  }
  return NOTES[(index + 1) % NOTES.length];
}
export const previousNote = (note: Note): Note => {
  const index = NOTES.indexOf(note);
  if (index === -1) {
    throw new Error(`Invalid note: ${note}`);
  }
  return NOTES[(index - 1 + NOTES.length) % NOTES.length];
}
export const randomNote = (): Note => {
  const randomIndex = Math.floor(Math.random() * NOTES.length);
  return NOTES[randomIndex];
}
