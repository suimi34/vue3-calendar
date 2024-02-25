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
const isShow = ref(false)
const userNotes = computed(() => {
  return notes.value
})

function handleSubmit(newNote: Note) {
  notes.value.push(newNote)
  localStorage.setItem('notes', JSON.stringify(notes.value))
}

function handleOpenNewNote() {
  isShow.value = true
}
</script>

<template>
  <header>
    <h1>Notes</h1>
    <button @click="handleOpenNewNote">追加</button>
  </header>
  <div class="note-main">
    <section>
      <Notes :notes="userNotes" />
    </section>
    <aside class="new-note">
      <NewNote @submit-new-note="handleSubmit" :isShow="isShow" />
    </aside>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  header {
    display: block;
  }
  header button {
    display: none;
  }
  .note-main {
    display: flex;
    max-width: 100%;
  }
  .new-note {
    margin-left: 20px;
  }
}

@media (max-width: 1023px) {
  header {
    display: flex;
    justify-content: space-between;
  }
  button {
    margin: 10px;
    background-color: #007bff;
    border-radius: 5px;
    border: 1px solid #007bff;
    color: #fff;
  }
  .note-main {
    flex-direction: column;
  }
  .new-note {
    margin-top: 20px;
  }
}
</style>
