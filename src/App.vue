<script setup lang="ts">
import { BaseNoteSet, CompleteNoteSet, NoteSet } from '@/core/note'
import { NoteGuesser } from '@/core/noteGuesser'
import { type Ref, ref, watch } from 'vue'
import { ArrowDownRightIcon, ArrowUpRightIcon } from '@heroicons/vue/24/solid'
import { CheckIcon, XMarkIcon } from '@heroicons/vue/20/solid'
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/vue/16/solid'
import { onKeyStroke } from '@vueuse/core'

// "as T" is needed because ref don't handle private class methods
// See https://github.com/vuejs/core/issues/2981
const set = ref(BaseNoteSet) as Ref<NoteSet>

const guesser = ref(new NoteGuesser(set.value))

const isSolutionDisplayed = ref(false)

const handleGuessCorrect = () => {
  guesser.value.handleGuessCorrect()
  isSolutionDisplayed.value = false
}

const handleGuessWrong = () => {
  guesser.value.handleGuessWrong()
  isSolutionDisplayed.value = false
}

watch(set, (newSet) => {
  guesser.value = new NoteGuesser(newSet)
})

onKeyStroke(' ', () => {
  isSolutionDisplayed.value = !isSolutionDisplayed.value
})

onKeyStroke('ArrowUp', () => handleGuessCorrect())
onKeyStroke('ArrowDown', () => handleGuessWrong())
</script>

<template>
  <main class="flex flex-col text-center pt-20 h-dvh mx-auto max-w-sm gap-6 p-2">
    <header class="flex justify-between">
      <p>
        <span class="sr-only">Notes</span>
        <select v-model="set">
          <option :value="CompleteNoteSet">Toutes les notes</option>
          <option :value="BaseNoteSet">Notes de base</option>
        </select>
      </p>

      <p>Score : {{ guesser.score }}</p>
    </header>

    <section class="py-8">
      <p class="text-5xl">
        {{ guesser.note.value }}
        <Component
          :is="guesser.direction === 'asc' ? ArrowUpRightIcon : ArrowDownRightIcon"
          class="inline-block size-8"
        />
      </p>
      <p class="text-neutral-500 mt-2">
        {{ guesser.direction === 'asc' ? 'au-dessus' : 'en-dessous' }} du {{ guesser.note.value }}
      </p>
    </section>

    <div v-if="isSolutionDisplayed" class="flex flex-col gap-1">
      <p class="text-neutral-500">La réponse est</p>
      <p class="text-4xl pb-4">{{ guesser.answer.value }}</p>
      <button
        @click="handleGuessCorrect"
        class="cursor-pointer flex items-center justify-center gap-1 bg-green-100 text-green-900 py-2 px-4 rounded-md"
      >
        <CheckIcon class="inline-block size-6" />
        J'ai eu bon
        <kbd class="ml-2"><ArrowUpIcon class="size-4" /></kbd>
      </button>
      <button
        @click="handleGuessWrong"
        class="cursor-pointer flex items-center justify-center gap-1 bg-red-100 text-red-900 py-2 px-4 rounded-md"
      >
        <XMarkIcon class="inline-block size-6" />
        J'ai eu faux
        <kbd class="ml-2"><ArrowDownIcon class="size-4" /></kbd>
      </button>
    </div>
    <button
      v-else
      @click="isSolutionDisplayed = true"
      class="cursor-pointer flex items-center justify-center gap-1 bg-neutral-100 py-2 px-4 rounded-md"
    >
      Voir la solution <kbd class="ml-2">Espace</kbd>
    </button>
  </main>
</template>
