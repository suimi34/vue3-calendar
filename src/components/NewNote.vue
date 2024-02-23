<script setup lang="ts">

import { ref } from 'vue'

type Note = {
  name: String
  url: String
  tags: Tag[]
}

type Tag = {
  name: String
}

const newNote = ref<Note>({
  name: '',
  url: '',
  tags: []
})

const addTag = () => {
  console.log('add Tag')
}

const handleSubmit = (e: any) => {
  e.preventDefault();

  const userId = localStorage.getItem('userId') || ''
  const json = localStorage.getItem(userId) || '[]'

  const notes: Note[] = JSON.parse(json);
  notes.push(newNote.value)
  localStorage.setItem(userId, JSON.stringify(notes))
}

</script>

<template>
  <h2>Note追加</h2>
  <form>
    <input type="text" v-model="newNote.name" placeholder="noteの名前" />
    <br>
    <input type="text" v-model="newNote.url" placeholder="noteのURL" />
    <br>
    <span>タグ</span>
    <div class="add-tag-area">
      <input type="text" placeholder="タグ" />
      <span @click="addTag">+</span>
    </div>
    <br>
    <button @click="handleSubmit">登録</button>
  </form>
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
