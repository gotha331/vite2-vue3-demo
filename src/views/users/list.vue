<template>
  <div class="app-container">
    <div class="btn-container">
      <!-- 新增按钮 -->
      <router-link to="users/create">
        <el-button type="success" icon="el-icon-edit">创建用户</el-button>
      </router-link>
    </div>

    <el-table :data="list" v-loading="loading" border fit highlight-current-row style="width: 100%">
      <el-table-column prop="id" label="ID" align="center" />
      <el-table-column prop="name" label="账户名" align="center" />
      <el-table-column prop="age" label="年龄" align="center" />

      <!-- 操作列 -->
      <el-table-column label="操作" align="center">
        <template v-slot="scope">
          <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope)">更新</el-button>
          <el-button type="danger" icon="el-icon-remove" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="listQuery.page"
      v-model:limit="listQuery.limit"
      @pagination="getList"
    ></pagination>
  </div>
</template>

<script>
import { toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import Pagination from 'comps/Pagination.vue'
import { useList } from './model/useModel'

export default {
  name: "UserList",
  components: {
    Pagination
  },
  setup () {
    // 用户列表数据
    const router = useRouter()
    const { state, getList, delItem } = useList()

    // 用户更新
    function handleEdit ({ row }) {
      router.push({
        name: "userEdit",
        params: { id: row.id }
      })
    }

    // 删除玩家
    function handleDelete ({ row }) {
      delItem(row.id).then(() => {
        // TODO:删除这一行，或者重新获取数据
        // 通知用户
        ElMessage.success("删除成功！")
      })
    }

    return {
      ...toRefs(state),
      getList,
      handleEdit,
      handleDelete
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-container {
  text-align: left;
  padding: 0px 10px 20px 0px;
}
</style>
