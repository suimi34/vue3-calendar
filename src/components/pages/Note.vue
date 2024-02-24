<script setup lang="ts">
import { computed, ref } from 'vue'
import Notes from '../Notes.vue'
import { v4 as uuid } from 'uuid'
import NewNote from '../NewNote.vue'

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
  <div>
    <h1>Notes</h1>
    <Notes :notes="userNotes" />
    <NewNote @submit-new-note="handleSubmit" />
  </div>
</template>

<style scoped></style>
