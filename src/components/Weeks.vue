<script setup lang="ts">
import { computed, type PropType } from 'vue'

type Week = {
  days: string[]
}

const props = defineProps({
  displayDays: {
    type: Array as PropType<string[]>,
    required: true
  }
})

const displayWeeks = computed(() => {
  const weeks: Week[] = []
  const weekNum = props.displayDays.length / 7

  for (let i = 0; i < weekNum; i++) {
    let num = i * 7
    const week = { days: props.displayDays.slice(num, num + 7) }
    weeks.push(week)
  }
  return weeks
})
</script>

<template>
  <div className="Display-weeks">
    <!-- eslint-disable-next-line vue/require-v-for-key -->
    <div v-for="week in displayWeeks">
      <div className="Week-row">
        <!-- eslint-disable-next-line vue/require-v-for-key -->
        <div v-for="day in week.days" class="Day-box">
          {{ day }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.Week-row {
  display: flex;
  margin: 0, auto;
}
.Day-box {
  width: 200px;
  height: 50px;
  border: 1px solid #e0e0e0;
  background-color: #fff;
  text-align: left;
  vertical-align: middle;
  font-size: 12px;
  padding-left: 5px;
  padding-top: 5px;
}
</style>
