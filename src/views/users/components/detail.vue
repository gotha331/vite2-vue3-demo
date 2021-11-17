<template>
  <div class="container">
    <el-form ref="form" :model="model" rules="rules">
      <el-form-item prop="name" label="用户名">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item prop="age" label="用户年龄">
        <el-input v-model.number="model.age"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm" type="primary">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import { reactive, red } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useItem } from '../model/useModel'
import { valid } from 'mockjs'

export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    // 路由
    const route = useRoute()
    const { model, addUser, updateUser } = useItem(props.isEdit, route.params.id)
    const rules = reactive({
      name: [{ required: true, message: '用户名为必填项' }]
    })

    // 表单实例
    const form = ref(null)
    // 提交表单
    function submitForm () {
      // 校验
      form.value.validate((valid) => {
        if (valid) {
          // 校验通过
          if (props.isEdit) {
            updateUser().then(() => {
              // 操作成功提示信息
              ElMessage.success({
                title: "操作成功",
                message: "更新用户数据成功",
                duration: 2000
              })
            })
          } else {
            addUser().then(() => {
              ElMessage.success({
                title: "操作成功",
                message: "新增用户数据成功",
                duration: 2000
              })
            })
          }
        }
      })
    }

    return {
      model,
      rules,
      form,
      submitForm
    }
  }
}

</script>

<style lang="scss" scoped>
.container {
  padding: 10px;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
