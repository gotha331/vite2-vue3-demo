import { reactive, onMounted, ref } from 'vue';
import request from 'utils/request';

export function useList () {
  // 列表数据
  const state = reactive({
    loading: true,
    list: [],
    total: 0,
    listQuery: {
      page: 1,
      limit: 5
    }
  })

  // 获取列表
  function getList () {
    state.loading = true

    return request({
      url: "/getUsers",
      methods: "get",
      params: state.listQuery
    }).then(({ data, total }) => {
      state.list = data
      state.total = total
    }).finally(() => {
      state.loading = false
    })
  }

  // 删除项
  function delItem (id) {
    state.loading = true

    return request({
      url: "/deleteUser",
      method: "get",
      parmas: { id }
    }).finally(() => {
      state.loading = false
    })
  }

  //首次获取数据
  getList()

  return { state, getList, delItem }
}


const defaultData = {
  name: '',
  age: undefined
}

export function useItem (isEdit, id) {
  const model = ref(Object.assign({}, defaultData))

  // 初始化时，根据isEdit判断是否需要获取用户详情
  onMounted(() => {
    if (isEdit && id) {
      request({
        url: '/getUser',
        method: "get",
        params: { id }
      }).then(({ data }) => {
        model.value = data
      })
    }
  })

  const updateUser = () => {
    return request({
      url: '/updataUser',
      methods: "post",
      data: model.value
    })
  }

  const addUser = () => {
    return request({
      url: '/addUser',
      methods: "post",
      data: model.value
    })
  }

  return { model, updateUser, addUser }
}