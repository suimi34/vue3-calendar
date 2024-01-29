<script setup lang="ts"></script>

<template>
  <div className="Week-row">
    <div className="Day-box Sunday">Sun</div>
    <div className="Day-box">Mon</div>
    <div className="Day-box">Tue</div>
    <div className="Day-box">Wed</div>
    <div className="Day-box">Thu</div>
    <div className="Day-box">Fri</div>
    <div className="Day-box Saturday">Sat</div>
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
.Sunday {
  color: #ff0000;
}
.Saturday {
  color: #6495ed;
}
</style>
