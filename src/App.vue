<script setup lang="ts">
import { NOTES } from '@/core/notes'
import { NoteGuesser } from '@/core/noteGuesser'
import { computed, reactive } from 'vue'

const guesser = reactive(new NoteGuesser())

const notesWithoutStatement = computed(() => {
  const notes = NOTES.filter((note) => note !== guesser.statement.note)

  if (guesser.statement.direction === 'previous') {
    notes.reverse()
  }

  return notes
})
</script>

<template>
  <main class="flex flex-col items-center justify-center h-dvh gap-6 p-2">
    <p>Score : {{ guesser.score }}</p>
    <p class="text-4xl">
      {{ guesser.statement.direction === 'next' ? 'Après' : 'Avant' }}
      "{{ guesser.statement.note }}"
    </p>
    <div
      class="w-full h-12 grid grid-flow-col auto-cols-fr gap-1 *:bg-neutral-100 *:rounded-lg *:w-full"
    >
      <button v-for="note in notesWithoutStatement" :key="note" @click="guesser.guess(note)">
        {{ note }}
      </button>
    </div>
  </main>
</template>
