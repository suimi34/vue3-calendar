<script setup lang="ts">
import { ref, onMounted } from 'vue'
import moment from 'moment'
import WeekHeader from './WeekHeader.vue'
import Weeks from './Weeks.vue'

const today = moment()
const displayDays = ref<string[]>([])
const year = ref(today.year())
const month = ref(today.month())

onMounted(() => {
  const firstDay = today.startOf('month')
  const dayArray = getDaysBeforeFirstDayOfTheMonth(firstDay)
  const dayArrayOfTheMonth = getDaysOfTheMonth(firstDay, month.value)

  displayDays.value = dayArray.concat(dayArrayOfTheMonth)
})

// 1日よりも前の日を入れる
const getDaysBeforeFirstDayOfTheMonth = (baseDay: any) => {
  const wday = baseDay.day()

  let dayArray = []
  for (let i = 0; i < wday; i++) {
    const beforeDay = baseDay.subtract(wday - i, 'days').format('YYYY-M-D')
    dayArray.push(beforeDay)
    baseDay.add(wday - i, 'days').format('YYYY-M-D')
  }

  return dayArray
}

// 月の日付を入れる
const getDaysOfTheMonth = (baseDay: any, month: number) => {
  let tempDay = baseDay
  let dayArray = []
  let flag = true

  while (flag === true) {
    const day = tempDay.format('YYYY-M-D')
    dayArray.push(day)
    tempDay.add(1, 'days').format('YYYY-M-D')
    // 12月を表示する場合、ここは11
    let tempMonth = tempDay.month()
    if (tempDay.day() === 0) {
      if (tempMonth === month + 1 || (tempMonth == 0 && month === 11)) {
        flag = false
        break
      }
    }
  }

  return dayArray
}

function moveToPreviousMonth() {
  let previousMonth = month.value - 1
  let tempYear = year.value

  // 12月から1月の場合
  if (previousMonth === -1) {
    previousMonth = 11
    tempYear = tempYear - 1
  }
  const firstDayOfPrevioutMonth = moment().year(tempYear).month(previousMonth).date(1)
  const dayArray = getDaysBeforeFirstDayOfTheMonth(firstDayOfPrevioutMonth)
  const dayArrayOfTheMonth = getDaysOfTheMonth(firstDayOfPrevioutMonth, previousMonth)

  year.value = tempYear
  month.value = previousMonth
  displayDays.value = dayArray.concat(dayArrayOfTheMonth)
}

function moveToNextMonth() {
  let nextMonth = month.value + 1
  let tempYear = year.value

  // 12月から1月の場合
  if (nextMonth === 12) {
    nextMonth = 0
    tempYear = tempYear + 1
  }
  const firstDayOfNextMonth = moment().year(tempYear).month(nextMonth).date(1)
  const dayArray = getDaysBeforeFirstDayOfTheMonth(firstDayOfNextMonth)
  const dayArrayOfTheMonth = getDaysOfTheMonth(firstDayOfNextMonth, nextMonth)

  year.value = tempYear
  month.value = nextMonth
  displayDays.value = dayArray.concat(dayArrayOfTheMonth)
}
</script>

<template>
  <div class="Month-button-area">
    <button className="Month-button" @click="moveToPreviousMonth()">先月</button>
    <span>{{ `${year}年${month + 1}月` }}</span>
    <button className="Month-button" @click="moveToNextMonth()">次月</button>
  </div>
  <div class="calendar-body">
    <WeekHeader />
    <Weeks :displayDays="displayDays" />
  </div>
</template>

<style scoped>
.Month-button-area {
  display: flex;
  margin-bottom: 20px;
}
</style>
