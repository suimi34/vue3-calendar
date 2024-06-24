<script setup lang="ts">
import { ref } from 'vue'
import ShowDetailButton from '../components/organisms/ShowDetailButton.vue'
import Button from '../components/organisms/Button.vue'

const isShowDetail = ref(false)

const toggleButton = () => {
  console.log('clicked', !isShowDetail.value)
  isShowDetail.value = !isShowDetail.value
}

</script>

<template>
  <div>
    <div style="width: 100px;">
      <input type="text" style="width: 100%;" />
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
  background-color: pink;
  height: 200px;
  width: 100px;
}

.show-enter-from {
  opacity: 0;
  transform: translateY(200px);
}

.show-enter-active {
  transition: all .5s linear;
}

.show-enter-to {
  transform: translateY(0);
}

.normal-enter-from {
  opacity: 0;
  transform: translateY(-200px);
}

.normal-enter-active {
  transition: all .5s linear;
}

.normal-enter-to {
  transform: translateY(0);
}

.normal-leave-from {
  display: none;
}

</style>
