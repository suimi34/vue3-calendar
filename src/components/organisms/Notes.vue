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

const props = defineProps({
  notes: Array
})

const userNotes = ref<Note[]>((props.notes as Note[]) || [])
</script>

<template>
  <table>
    <thead>
      <tr>
        <th scope="col">名前</th>
        <th scope="col">URL</th>
        <th scope="col">タグ</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(note, key) in userNotes" :key="key">
        <th scope="row">{{ note.name }}</th>
        <td>
          <a :href="`${note.url}`">{{ note.url }}</a>
        </td>
        <td>
          <ul>
            <li class="note-tag" v-for="(tag, key) in note.tags" :key="key">{{ tag.name }}</li>
          </ul>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  border-collapse: collapse;
  border: 2px solid rgb(140 140 140);
  font-family: sans-serif;
  font-size: 0.8rem;
  letter-spacing: 1px;
}

thead,
tfoot {
  background-color: rgb(228 240 245);
}

th,
td {
  border: 1px solid rgb(160 160 160);
  padding: 8px 10px;
}

td:last-of-type {
  text-align: center;
}

ul {
  padding: 0;
  margin: 0;
}

li {
  list-style: none;
}

.note-tag {
  display: inline-block;
  margin-right: 5px;
  margin-bottom: 5px;
  padding: 3px;
  background-color: #f0f0f0;
  border-radius: 5px;
}

.anker-link {
  text-decoration: none;
  color: blue;
  transition: 0.4s;
  padding: 3px;
}

@media (max-width: 1023px) {
  table {
    table-layout: fixed;
    width: 100%;
  }
  th,
  td {
    display: block;
    width: 100%;
    overflow-wrap: break-word;
  }
  ul {
    text-align: left;
  }
}
</style>
