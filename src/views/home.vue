<template>
  <div>
    <HelloWorld msg="this is home page"></HelloWorld>
    <el-button type="primary">Primary</el-button>
    <router-link to="/home/1">detail1</router-link>
    <router-link to="/home/2">detail2</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from 'comps/HelloWorld.vue';
</script>

<style scoped></style>