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
const props = defineProps({
  isShow: Boolean
})

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

const isShow = computed(() => {
  return props.isShow
})
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div class="new-note-box" v-if="isShow">
        <h2>Note追加</h2>
        <form>
          <input type="text" v-model="newNote.name" placeholder="noteの名前" />
          <br />
          <input type="text" v-model="newNote.url" placeholder="noteのURL" />
          <br />
          <Tags :tags="userNewTags" />
          <NewTag @add-tag="addTag" />
          <br />
          <div>
            <button class="button-primary" @click="handleSubmit">登録</button>
            <button class="button-cancel">やめる</button>
          </div>
        </form>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.new-note-box {
  border: 1px solid #000;
  padding: 10px;
}

@media (max-width: 1023px) {
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  .new-note-box {
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 5px;
    width: 80%;
  }

  button.button-primary {
    background-color: #007bff;
    border-radius: 5px;
    border: 1px solid #007bff;
    color: #fff;
  }
  button.button-cancel {
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid #343a40;
    color: #343a40;
  }
}
</style>
