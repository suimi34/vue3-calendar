<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import moment from 'moment'
import WeekHeader from './WeekHeader.vue'
import Weeks from './Weeks.vue'

const today = moment()
const firstDay = today.startOf('month')

const displayDays = ref<string[]>([])
const year = ref(today.year())
const month = ref(today.month())

watch(displayDays, (newValue) => {
  displayDays.value = newValue
})

watch(month, (newValue) => {
  month.value = newValue
})

onMounted(() => {
  let tempDay = firstDay
  let wday = firstDay.day()
  let tempMonth = month.value

  let dayArray = []
  // 1日よりも前の日を入れる
  for (let i = 0; i < wday; i++) {
    const beforeDay = tempDay.subtract(wday - i, 'days').format('YYYY-M-D')
    dayArray.push(beforeDay)
    tempDay.add(wday - i, 'days').format('YYYY-M-D')
  }

  let nextMonth = tempMonth + 1
  let flag = true
  while (flag === true) {
    const day = tempDay.format('YYYY-M-D')
    dayArray.push(day)
    tempDay.add(1, 'days').format('YYYY-M-D')
    tempMonth = tempDay.month()
    if (tempDay.day() === 0) {
      if (tempMonth === nextMonth) {
        flag = false
        break
      }
    }
  }

  displayDays.value = dayArray
})

function moveToPreviousMonth() {
  let previousMonth = month.value - 1
  let tempYear = year.value

  // 12月から1月の場合
  if (previousMonth === -1) {
    previousMonth = 11
    tempYear = tempYear - 1
  }
  const firstDayOfPrevioutMonth = moment().year(tempYear).month(previousMonth).date(1)

  // ここから表示する日付を計算
  let tempDay = firstDayOfPrevioutMonth
  const wday = firstDayOfPrevioutMonth.day()

  let dayArray = []
  // 1日よりも前の日を入れる
  for (let i = 0; i < wday; i++) {
    const beforeDay = tempDay.subtract(wday - i, 'days').format('YYYY-M-D')
    dayArray.push(beforeDay)
    tempDay.add(wday - i, 'days').format('YYYY-M-D')
  }

  let flag = true
  while (flag === true) {
    const day = tempDay.format('YYYY-M-D')
    dayArray.push(day)
    tempDay.add(1, 'days').format('YYYY-M-D')
    // 12月を表示する場合、ここは11
    let tempMonth = tempDay.month()
    if (tempDay.day() === 0) {
      if (tempMonth === previousMonth + 1) {
        flag = false
        break
      } else if (previousMonth === 11 && tempMonth === 0) {
        flag = false
        break
      }
    }
  }

  displayDays.value = dayArray
  year.value = tempYear
  month.value = previousMonth
}
</script>

<template>
  <h3>Here is calendar</h3>
  <div>
    <p>Today is {{ `${year}年${month + 1}月` }}.</p>
    <button className="Month-button" @click="moveToPreviousMonth()">先月</button>
  </div>
  <div class="calendar-body">
    <WeekHeader />
    <Weeks :displayDays="displayDays" />
  </div>
</template>
