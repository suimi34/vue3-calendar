<script setup lang="ts">
import { ref } from 'vue'
import ShowDetailButton from '../components/organisms/ShowDetailButton.vue'
import Button from '../components/organisms/Button.vue'

const isShowDetail = ref(false)

const toggleButton = () => {
  console.log('clicked')
  isShowDetail.value = !isShowDetail.value
}

</script>

<template>
  <div>
    <div>
      <input type="text" />
    </div>
    <div
      v-show="isShowDetail"
      class="detail"
    >
      <p>some text</p>
    </div>
    <Transition
      name="show"
    >
      <ShowDetailButton v-if="!isShowDetail" @click="toggleButton()" />
    </Transition>
    <Transition
      name="normal"
    >
      <Button v-if="isShowDetail" @click="toggleButton()" />
    </Transition>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

.about {
  background-color: green;
  height: 10px
}


.detail {
  background-color: red;
  height: 200px;
}

.show-enter-from {
  opacity: 0;
  transform: translateY(200px);
}

.show-enter-active {
  transition: all 1s linear;
}

.show-enter-to {
  transform: translateY(0);
}

.normal-enter-from {
  opacity: 0;
  transform: translateY(-200px);
}

.normal-enter-active {
  transition: all 1s linear;
}

.normal-enter-to {
  transform: translateY(0);
}

</style>
