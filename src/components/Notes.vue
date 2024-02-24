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
});

const userNotes = ref<Note[]>(props.notes as Note[] || []);

</script>

<template>
  <h2>Note一覧</h2>
  <ul>
    <li v-for="(note, key) in userNotes" :key="key">
      <a class="anker-link" :href="`${note.url}`">{{ note.name }}</a>
      <ul>
        <li v-for="(tag, key) in note.tags" :key="key">{{ tag.name }}</li>
      </ul>
    </li>
  </ul>
</template>

<style scoped>
.anker-link {
  text-decoration: none;
  color: blue;
  transition: 0.4s;
  padding: 3px;
}
</style>
