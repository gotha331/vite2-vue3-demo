<template>
  <div class="navbar">
    <!-- 面包屑 -->
    <breadcrumb class="breadcrumb-container"></breadcrumb>

    <!-- 右侧下拉菜单 -->
    <div class="right-menu">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          Dropdown List
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/home">
              <el-dropdown-item>首页</el-dropdown-item>
            </router-link>
            <a target="_blank" href="https://github.com/rivers-guitar">
              <el-dropdown-item>我的github</el-dropdown-item>
            </a>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { ArrowDown } from '@element-plus/icons'
import Breadcrumb from './Breadcrumb.vue';
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 50px;
  border: 1px solid #000;

  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    width: 100%;
    height: 50px;

    .avatar-container {
      width: 50px;
      // height: 100%;

      border: 1px solid #000;

      .avatar-wrapper {
        width: 50px;
        height: 5px;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
