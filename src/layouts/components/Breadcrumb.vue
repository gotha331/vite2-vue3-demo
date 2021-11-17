<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
  
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
        >{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { compile } from 'path-to-regexp'
import { useRoute, useRouter } from 'vue-router'
import { reactive, ref, watch } from 'vue'

const levelList = ref(null)
const router = useRouter()
const route = useRoute()

// 解析路由匹配数组
const getBreadcrumb = () => {
  // 留下只有title的路由
  let matched = route.matched.filter(item => item.meta && item.meta.title)

  // 首页判断
  const first = matched[0]
  if (first.path !== "/") {
    matched = [{ path: "/home", meta: { title: "首页" } }].concat(matched)
  }

  //拼出最终需要展现的跳转数据 
  levelList.value = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
}

// 手动解析path中可能存在的参数
const pathCompile = (path) => {
  let toPath = compile(path)
  return toPath(route.params)
}

const handleLink = (item) => {
  const { redirect, path } = item;
  if (redirect) {
    router.push(redirect)
    return
  }

  router.push(pathCompile(path))
}

// 首次调用
getBreadcrumb()

// 监控route的变化
watch(route, getBreadcrumb)

</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>


