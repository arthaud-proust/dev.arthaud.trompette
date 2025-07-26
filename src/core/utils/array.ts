export const next = <T>(array: readonly T[], index: number): T => array[(index + 1) % array.length]
export const prev = <T>(array: readonly T[], index: number): T =>
  array[(index - 1 + array.length) % array.length]

export const randomElement = <T>(array: T[] | Readonly<T[]>): T => {
  const index = Math.floor(Math.random() * array.length)

  return array[index]
}

export const shuffled = <T>(original: T[]): T[] => {
  let currentIndex = original.length
  const array = [...original]

  while (currentIndex != 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }

  return array
}
