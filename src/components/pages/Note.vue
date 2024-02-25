<script setup lang="ts">
import { computed, ref } from 'vue'
import { v4 as uuid } from 'uuid'
import Notes from '../organisms/Notes.vue'
import NewNote from '../organisms/NewNote.vue'

type Note = {
  name: String
  url: String
  tags: Tag[]
}

type Tag = {
  name: String
}

const userId = localStorage.getItem('userId')
if (!userId) {
  localStorage.setItem('userId', uuid())
}

const json = localStorage.getItem('notes') || '[]'
const notes = ref<Note[]>(JSON.parse(json))
const userNotes = computed(() => {
  return notes.value
})

function handleSubmit(newNote: Note) {
  notes.value.push(newNote)
  localStorage.setItem('notes', JSON.stringify(notes.value))
}
</script>

<template>
  <h1>Notes</h1>
  <div class="note-main">
    <section>
      <Notes :notes="userNotes" />
    </section>
    <aside class="new-note">
      <NewNote @submit-new-note="handleSubmit" />
    </aside>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .note-main {
    display: flex;
    max-width: 100%;
  }
  .new-note {
    margin-left: 20px;
  }
}

@media (max-width: 1023px) {
  .note-main {
    flex-direction: column;
  }
  .new-note {
    margin-top: 20px;
  }
}
</style>
