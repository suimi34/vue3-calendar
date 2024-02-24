<script setup lang="ts">
import { ref } from 'vue'

type Tag = {
  name: String
}

const newTag = ref<Tag>({ name: '' })

const emit = defineEmits(['addTag'])

function handleAddTag(e: any) {
  e.preventDefault()

  const newTagValue = newTag.value
  emit('addTag', newTagValue)
  newTag.value = { name: '' }
}
</script>

<template>
  <span>タグ</span>
  <div class="add-tag-area">
    <input type="text" v-model="newTag.name" placeholder="タグ" />
    <span @click="handleAddTag">+</span>
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
