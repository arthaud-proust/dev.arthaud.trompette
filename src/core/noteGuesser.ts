import type { Note } from '@/core/notes'
import { nextNote, previousNote, randomNote } from '@/core/notes'

export class Statement {
  constructor(
    public readonly note: Note,
    public readonly direction: 'next' | 'previous',
  ) {}

  public static random(): Statement {
    return new Statement(randomNote(), Math.random() < 0.5 ? 'next' : 'previous')
  }

  isCorrectGuess(note: Note): boolean {
    const isCorrectNextNote = this.direction === 'next' && note === nextNote(this.note)
    const isCorrectPreviousNote = this.direction === 'previous' && note === previousNote(this.note)

    return isCorrectNextNote || isCorrectPreviousNote
  }
}

export class NoteGuesser {
  private _score: number = 0
  private _statement: Statement

  constructor() {
    this._statement = Statement.random()
  }

  guess(note: Note): void {
    if (this._statement.isCorrectGuess(note)) {
      this._score++
    }

    this._statement = Statement.random()
  }

  get score() {
    return this._score
  }

  get statement() {
    return this._statement
  }
}
