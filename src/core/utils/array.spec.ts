import { describe, expect, it } from 'vitest'
import { next, prev, shuffled } from '@/core/utils/array'

describe('prev', () => {
  it('return previous element', () => {
    expect(prev([0, 1], 1)).toBe(0)
  })

  it('loop to the end', () => {
    expect(prev([0, 1], 0)).toBe(1)
  })
})

describe('next', () => {
  it('return next element', () => {
    expect(next([0, 1], 0)).toBe(1)
  })

  it('loop to the beginning', () => {
    expect(next([0, 1], 1)).toBe(0)
  })
})

describe('shuffled', () => {
  it('shuffles the array', () => {
    const array = [1, 2, 3, 4, 5]
    const originalArray = [...array]
    const shuffledArray = shuffled([...array])

    expect(shuffledArray).not.toEqual(originalArray)
    expect(shuffledArray.length).toBe(originalArray.length)
    expect(new Set(shuffledArray)).toEqual(new Set(originalArray))
  })
})
