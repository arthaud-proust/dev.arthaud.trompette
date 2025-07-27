import { describe, expect, it } from 'vitest'
import { NoteGuesser } from '@/core/noteGuesser'
import { BaseNoteSet, Note, NOTES, NoteSet } from '@/core/note'

const OnlyDoSet = new NoteSet([NOTES.DO])
describe('NoteGuesser', () => {
  it('can be instantiated with specific set', () => {
    const noteGuesser = new NoteGuesser(BaseNoteSet)
    expect(noteGuesser.set).toBe(BaseNoteSet)
  })

  it('starts with 0 correct answers', () => {
    const noteGuesser = new NoteGuesser()
    expect(noteGuesser.correctAnswers).toBe(0)
  })

  it('starts with 0 incorrect answers', () => {
    const noteGuesser = new NoteGuesser()
    expect(noteGuesser.incorrectAnswers).toBe(0)
  })

  it('ask previous or next of a random note', () => {
    const noteGuesser = new NoteGuesser()

    expect(['asc', 'desc']).toContain(noteGuesser.direction)
    expect(noteGuesser.note).toBeInstanceOf(Note)
  })

  it('can display correct answer', () => {
    const noteGuesser = new NoteGuesser(OnlyDoSet)

    expect(noteGuesser.answer.value).toBe(NOTES.DO)
  })

  it('increments correct answers by 1 when correct note is guessed', () => {
    const noteGuesser = new NoteGuesser()

    noteGuesser.handleGuessCorrect()

    expect(noteGuesser.correctAnswers).toBe(1)
  })

  it('changes statement after correct note is guessed', () => {
    const noteGuesser = new NoteGuesser()
    const initialStatement = [noteGuesser.note, noteGuesser.direction]

    noteGuesser.handleGuessCorrect()

    expect([noteGuesser.note, noteGuesser.direction]).not.toBe(initialStatement)
  })

  it('increments incorrect answers by 1 when correct note is not guessed', () => {
    const noteGuesser = new NoteGuesser()

    noteGuesser.handleGuessWrong()

    expect(noteGuesser.incorrectAnswers).toBe(1)
  })

  it('changes statement after incorrect guess', () => {
    const noteGuesser = new NoteGuesser()
    const initialStatement = [noteGuesser.note, noteGuesser.direction]

    noteGuesser.handleGuessWrong()

    expect([noteGuesser.note, noteGuesser.direction]).not.toBe(initialStatement)
  })
})
