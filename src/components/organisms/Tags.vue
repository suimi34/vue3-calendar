<script setup lang="ts">
import { computed } from 'vue'

type Tag = {
  name: String
}
const props = defineProps({
  tags: Array
})

const userNewTags = computed(() => {
  return props.tags as Tag[]
})
</script>

<template>
  <h2>Tag一覧</h2>
  <ul>
    <li v-for="(tag, key) in userNewTags" :key="key">{{ tag.name }}</li>
  </ul>
</template>

<style scoped></style>
