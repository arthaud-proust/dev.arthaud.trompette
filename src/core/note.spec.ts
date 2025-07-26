import { afterEach, describe, expect, it, vi } from 'vitest'
import { BaseNoteSet, CompleteNoteSet, Note, NOTES, NoteSet } from '@/core/note'

describe('NoteSet', () => {
  const originalRandom = Math.random

  afterEach(() => {
    Math.random = originalRandom
  })

  it('can be instantiated with custom notes', () => {
    const set = new NoteSet([NOTES.DO, NOTES.RE])
    expect(set.noteValues).toEqual([NOTES.DO, NOTES.RE])
  })

  it("can't be instantiated with no notes", () => {
    expect(() => new NoteSet([])).toThrow('NoteSet must contain at least one note')
  })

  it('can return ascending notes list', () => {
    const set = new NoteSet([NOTES.DO, NOTES.RE])

    const notes = set.notesAsc

    expect(notes.length).toBe(2)
    expect(notes[0].value).toBe(NOTES.DO)
    expect(notes[1].value).toBe(NOTES.RE)
  })

  it('can return descending notes list', () => {
    const set = new NoteSet([NOTES.DO, NOTES.RE])

    const notes = set.notesDesc

    expect(notes.length).toBe(2)
    expect(notes[0].value).toBe(NOTES.RE)
    expect(notes[1].value).toBe(NOTES.DO)
  })

  it('can return a specific note', () => {
    const set = new NoteSet([NOTES.DO, NOTES.RE])

    const note = set.get(NOTES.DO)
    expect(note.value).toBe(NOTES.DO)
    expect(note.set).toBe(set)
  })

  it('can return asc note', () => {
    const set = new NoteSet([NOTES.DO, NOTES.MI])

    expect(set.ascNote(NOTES.DO).value).toBe(NOTES.MI)
    expect(set.ascNote(NOTES.MI).value).toBe(NOTES.DO)
  })

  it('can return desc note', () => {
    const set = new NoteSet([NOTES.DO, NOTES.MI])

    expect(set.descNote(NOTES.MI).value).toBe(NOTES.DO)
    expect(set.descNote(NOTES.DO).value).toBe(NOTES.MI)
  })

  it('can pick random note', () => {
    const set = new NoteSet([NOTES.DO, NOTES.RE])

    Math.random = vi.fn(() => 0)
    expect(set.randomNote().value).toBe(NOTES.DO)

    Math.random = vi.fn(() => 0.9999)
    expect(set.randomNote().value).toBe(NOTES.RE)
  })
})

describe('Note', () => {
  const originalRandom = Math.random

  afterEach(() => {
    Math.random = originalRandom
  })

  it('can instantiate note from a set', () => {
    const note = new Note(new NoteSet([NOTES.DO, NOTES.RE]), NOTES.DO)

    expect(note.value).toBe(NOTES.DO)
    expect(note.set.noteValues).toEqual([NOTES.DO, NOTES.RE])
  })

  it('can instantiate note from complete set', () => {
    const note = Note.fromCompleteSet(NOTES.DO)

    expect(note.value).toBe(NOTES.DO)
    expect(note.set.noteValues).toEqual(CompleteNoteSet.noteValues)
  })

  it('can instantiate note from base set', () => {
    const note = Note.fromBaseSet(NOTES.DO)

    expect(note.value).toBe(NOTES.DO)
    expect(note.set.noteValues).toEqual(BaseNoteSet.noteValues)
  })

  it('can be ascended', () => {
    const note = Note.fromBaseSet(NOTES.DO)
    expect(note.ascended.value).toBe(Note.fromBaseSet(NOTES.RE).value)
  })

  it('can be descended', () => {
    const note = Note.fromBaseSet(NOTES.DO)
    expect(note.descended.value).toBe(Note.fromBaseSet(NOTES.SI).value)
  })
})
