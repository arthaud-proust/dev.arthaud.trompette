import { BaseNoteSet, Note, NoteSet } from '@/core/note'

export class Statement {
  constructor(
    public readonly note: Note,
    public readonly direction: 'asc' | 'desc',
  ) {}

  public static randomFor(set: NoteSet): Statement {
    return new Statement(set.randomNote(), Math.random() < 0.5 ? 'asc' : 'desc')
  }

  isCorrectGuess(note: Note): boolean {
    const isCorrectAscNote = this.direction === 'asc' && this.note.ascended.value === note.value
    const isCorrectDescNote = this.direction === 'desc' && this.note.descended.value === note.value

    return isCorrectAscNote || isCorrectDescNote
  }
}

export class NoteGuesser {
  readonly set: NoteSet
  private _score: number = 0
  private _statement: Statement

  constructor(set: NoteSet = BaseNoteSet) {
    this.set = set
    this._statement = Statement.randomFor(this.set)
  }

  handleGuessCorrect(): void {
    this._score++

    this._statement = Statement.randomFor(this.set)
  }

  handleGuessWrong(): void {
    this._statement = Statement.randomFor(this.set)
  }

  get score() {
    return this._score
  }

  get note() {
    return this._statement.note
  }

  get direction() {
    return this._statement.direction
  }

  get answer() {
    return this.direction === 'asc' ? this.note.ascended : this.note.descended
  }
}
