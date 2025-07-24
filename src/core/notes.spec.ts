import { describe, it, expect, vi, afterEach } from 'vitest'
import { nextNote, previousNote, randomNote } from '@/core/notes'

describe('nextNote', ()=>{
  it('should return the next note in the sequence', () => {
    expect(nextNote('do')).toBe('ré');
    expect(nextNote('ré')).toBe('mi');
    expect(nextNote('mi')).toBe('fa');
    expect(nextNote('fa')).toBe('sol');
    expect(nextNote('sol')).toBe('la');
    expect(nextNote('la')).toBe('si');
    expect(nextNote('si')).toBe('do');
  });
})

describe('previousNote', ()=>{
  it('should return the previous note in the sequence', () => {
    expect(previousNote('do')).toBe('si');
    expect(previousNote('ré')).toBe('do');
    expect(previousNote('mi')).toBe('ré');
    expect(previousNote('fa')).toBe('mi');
    expect(previousNote('sol')).toBe('fa');
    expect(previousNote('la')).toBe('sol');
    expect(previousNote('si')).toBe('la');
  });
})


describe('randomNote', () => {
  const originalRandom = Math.random;

  afterEach(() => {
    Math.random = originalRandom
  })

  it('should return a valid note', () => {
    Math.random = vi.fn(() => 0)
    expect(randomNote()).toBe('do');
    expect(randomNote()).toBe('do');

    Math.random = vi.fn(() => 0.9999)
    expect(randomNote()).toBe('si');
    expect(randomNote()).toBe('si');
  });


})


