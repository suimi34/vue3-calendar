<script setup lang="ts">
import { computed, ref } from 'vue'
import NewTag from './NewTag.vue'
import Tags from './Tags.vue'
import type { Note, Tag } from '../../types'

const newNote = ref<Note>({
  name: '',
  url: '',
  tags: []
})

const emit = defineEmits(['submitNewNote'])

const addTag = (newTag: Tag) => {
  newNote.value.tags.push(newTag)
}

const handleSubmit = (e: any) => {
  e.preventDefault()

  const newNoteValue = newNote.value
  emit('submitNewNote', newNoteValue)
  newNote.value = {
    name: '',
    url: '',
    tags: []
  }
}

const userNewTags = computed(() => {
  return newNote.value.tags
})
</script>

<template>
  <h2>Note追加</h2>
  <form>
    <input type="text" v-model="newNote.name" placeholder="noteの名前" />
    <br />
    <input type="text" v-model="newNote.url" placeholder="noteのURL" />
    <br />
    <Tags :tags="userNewTags" />
    <NewTag @add-tag="addTag" />
    <br />
    <button @click="handleSubmit">登録</button>
  </form>
</template>

<style scoped></style>
