<script setup lang="ts">
import { BaseNoteSet, CompleteNoteSet, NoteSet } from '@/core/note'
import { NoteGuesser } from '@/core/noteGuesser'
import { ref, watch } from 'vue'

const set = ref<NoteSet>(BaseNoteSet)
const guesser = ref(new NoteGuesser(set.value))

watch(set, (newSet) => {
  guesser.value = new NoteGuesser(newSet)
})
</script>

<template>
  <main class="flex flex-col items-center justify-center h-dvh gap-6 p-2">
    <label>
      <span>Notes</span>
      <select v-model="set">
        <option :value="CompleteNoteSet">Toutes les notes</option>
        <option :value="BaseNoteSet">Notes de base</option>
      </select>
    </label>
    <p>Score : {{ guesser.score }}</p>
    <p class="text-4xl">
      {{ guesser.statement.note.value }}
      {{ guesser.statement.direction === 'asc' ? '+1' : '-1' }}
    </p>
    <div
      class="w-full h-12 grid grid-flow-col auto-cols-fr gap-1 *:bg-neutral-100 *:rounded-lg *:w-full"
    >
      <button v-for="note in set.notesAsc" :key="note.value" @click="guesser.guess(note)">
        {{ note.value }}
      </button>
    </div>
  </main>
</template>
