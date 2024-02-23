<script setup lang="ts">

import { ref } from 'vue'
import NewNote from './NewNote.vue'
import { v4 as uuid } from 'uuid';

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

const notes = ref<Note[]>([])
</script>

<template>
  <div>
    <h1>Notes</h1>
    <h2>Note一覧</h2>
    <ul>
      <li v-for="(note, key) in notes" :key="key">
        <a href="note.url">{{ note.name }}</a>
        <ul>
          <li v-for="(tag, key) in note.tags" :key="key">{{ tag.name }}</li>
        </ul>
      </li>
    </ul>
    <NewNote />
  </div>
</template>

<style scoped>
  .add-tag-area {
    display: flex;
  }
  .add-tag-area input {
    width: 100px;
  }
  .add-tag-area span {
    width: 20px;
    height: 20px;
    background-color: #000;
    color: #fff;
    text-align: center;
    line-height: 20px;
    cursor: pointer;
    margin-left: 5px;
  }
  </style>
