import { describe, expect, it } from 'vitest'
import { NoteGuesser } from '@/core/noteGuesser'
import { BaseNoteSet, Note } from '@/core/note'

describe('NoteGuesser', () => {
  it('can be instantiated with specific set', () => {
    const noteGuesser = new NoteGuesser(BaseNoteSet)
    expect(noteGuesser.set).toBe(BaseNoteSet)
  })

  it('starts with score of 0', () => {
    const noteGuesser = new NoteGuesser()
    expect(noteGuesser.score).toBe(0)
  })

  it('ask previous or next of a random note', () => {
    const noteGuesser = new NoteGuesser()
    expect(['asc', 'desc']).toContain(noteGuesser.statement.direction)
    expect(noteGuesser.statement.note).toBeInstanceOf(Note)
  })

  it('increments score by 1 when correct note is guessed', () => {
    const noteGuesser = new NoteGuesser()

    if (noteGuesser.statement.direction === 'asc') {
      noteGuesser.guess(noteGuesser.statement.note.ascended)
    } else {
      noteGuesser.guess(noteGuesser.statement.note.descended)
    }

    expect(noteGuesser.score).toBe(1)
  })

  it('changes statement after correct note is guessed', () => {
    const noteGuesser = new NoteGuesser()
    const initialStatement = { ...noteGuesser.statement }

    if (noteGuesser.statement.direction === 'asc') {
      noteGuesser.guess(noteGuesser.statement.note.ascended)
    } else {
      noteGuesser.guess(noteGuesser.statement.note.descended)
    }

    expect(noteGuesser.statement).not.toBe(initialStatement)
  })

  it("don't change score when correct note is not guessed", () => {
    const noteGuesser = new NoteGuesser()

    noteGuesser.guess(noteGuesser.statement.note)

    expect(noteGuesser.score).toBe(0)
  })

  it('changes statement after incorrect guess', () => {
    const noteGuesser = new NoteGuesser()
    const initialStatement = { ...noteGuesser.statement }

    noteGuesser.guess(noteGuesser.statement.note)

    expect(noteGuesser.statement).not.toBe(initialStatement)
  })
})
