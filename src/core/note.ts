import { next, prev, randomElement } from '@/core/utils/array'

export const NOTES = Object.freeze({
  DO: 'do',
  DO_H: 'do#',
  RE_B: 'reb',
  RE: 're',
  RE_H: 're#',
  MI_B: 'mib',
  MI: 'mi',
  FA: 'fa',
  FA_H: 'fa#',
  SOL_B: 'solb',
  SOL: 'sol',
  SOL_H: 'sol#',
  LA_B: 'lab',
  LA: 'la',
  LA_H: 'la#',
  SI_B: 'sib',
  SI: 'si',
} as const)
export type NoteName = keyof typeof NOTES
export type NoteValue = (typeof NOTES)[NoteName]

const {
  DO,
  DO_H,
  RE_B,
  RE,
  RE_H,
  MI_B,
  MI,
  FA,
  FA_H,
  SOL_B,
  SOL,
  SOL_H,
  LA_B,
  LA,
  LA_H,
  SI_B,
  SI,
} = NOTES

const NOTES_ORDER = Object.freeze([
  { asc: DO, desc: DO },
  { asc: DO_H, desc: RE_B },
  { asc: RE, desc: RE },
  { asc: RE_H, desc: MI_B },
  { asc: MI, desc: MI },
  { asc: FA, desc: FA },
  { asc: FA_H, desc: SOL_B },
  { asc: SOL, desc: SOL },
  { asc: SOL_H, desc: LA_B },
  { asc: LA, desc: LA },
  { asc: LA_H, desc: SI_B },
  { asc: SI, desc: SI },
] as const)
export type OrderedNote = (typeof NOTES_ORDER)[number]

const COMPLETE_NOTES = Object.freeze(NOTES_ORDER.map((note) => note.asc))
const BASE_NOTES = Object.freeze([DO, RE, MI, FA, SOL, LA, SI] as const)

export class NoteSet {
  public readonly noteValues: Readonly<Array<NoteValue>>
  public readonly notesOrder: Readonly<OrderedNote[]>

  constructor(noteValues: Readonly<Array<NoteValue>>) {
    if (noteValues.length <= 0) {
      throw new Error('NoteSet must contain at least one note')
    }

    this.noteValues = noteValues
    this.notesOrder = Object.freeze(
      NOTES_ORDER.filter(
        (group) => noteValues.includes(group.asc) || noteValues.includes(group.desc),
      ),
    )
  }

  private findOrderIndex(value: NoteValue): number {
    const index = this.notesOrder.findIndex((group) => {
      return group.asc === value || group.desc === value
    })

    if (index < 0) {
      throw new Error(`Note ${value} is out of set`)
    }

    return index
  }

  get(value: NoteValue): Note {
    return new Note(this, value)
  }

  randomNote(): Note {
    const orderedNote = randomElement(this.notesOrder)
    const direction = randomElement(['asc', 'desc'] as const)

    return new Note(this, orderedNote[direction])
  }

  ascNote(value: NoteValue): Note {
    const orderIndex = this.findOrderIndex(value)
    const { asc } = next(this.notesOrder, orderIndex)

    return new Note(this, asc)
  }

  descNote(value: NoteValue): Note {
    const orderIndex = this.findOrderIndex(value)
    const { desc } = prev(this.notesOrder, orderIndex)

    return new Note(this, desc)
  }

  get notesAsc(): Note[] {
    return this.notesOrder.map((group) => new Note(this, group.asc))
  }

  get notesDesc(): Note[] {
    return [...this.notesOrder].reverse().map((group) => new Note(this, group.asc))
  }
}

export const BaseNoteSet = new NoteSet(BASE_NOTES)
export const CompleteNoteSet = new NoteSet(COMPLETE_NOTES)

export class Note {
  constructor(
    public readonly set: NoteSet = BaseNoteSet,
    public readonly value: NoteValue = DO,
  ) {}

  static fromBaseSet(value: NoteValue = DO): Note {
    return new Note(BaseNoteSet, value)
  }

  static fromCompleteSet(value: NoteValue = DO): Note {
    return new Note(CompleteNoteSet, value)
  }

  get ascended(): Note {
    return this.set.ascNote(this.value)
  }

  get descended(): Note {
    return this.set.descNote(this.value)
  }
}
