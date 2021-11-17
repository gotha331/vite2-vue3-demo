<template>
  <div class="app-wrapper">
    <!-- 侧边栏 -->
    <side-bar class="sidebar-container"></side-bar>
    <!-- 右侧内容区 -->
    <div class="main-container">
      <nav-bar />
      <app-main />
    </div>
  </div>
</template>

<script setup>
import AppMain from './components/AppMain.vue'
import NavBar from './components/NavBar.vue';
import SideBar from './components/Sidebar/index.vue'

</script>

<style  lang="scss" scoped>
@import "styles/mixin.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
