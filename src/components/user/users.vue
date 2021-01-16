<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input v-model="queryInfo.query" clearable placeholder="请输入内容" @clear="clearQuery">
            <el-button slot="append" icon="el-icon-search" @click="searchQuery"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addUserDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="userList" stripe border>
        <el-table-column align="center" type="index"></el-table-column>
        <el-table-column align="center" label="姓名" prop="username"></el-table-column>
        <el-table-column align="center" label="邮箱" prop="email"></el-table-column>
        <el-table-column align="center" label="电话" prop="mobile"></el-table-column>
        <el-table-column align="center" label="角色" prop="role_name"></el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 编辑按钮 -->
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="showEditUser(scope.row)"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" size="mini" icon="el-icon-delete"  @click="showDeleteUser(scope.row)"></el-button>
            <!-- 分配角色按钮 -->
            <el-tooltip effect="dark" content="分配角色" placement="top-start" :enterable="false">
              <el-button type="warning" size="mini" icon="el-icon-setting"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="totalUser"></el-pagination>
    </el-card>

    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" ref="addDialog" :visible.sync="addUserDialogVisible" width="50%" @close="addDialogClose">
      <!-- 添加用户主体部分 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addUserDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑用户对话框 -->
    <el-dialog title="编辑用户" :visible.sync="editUserDialogVisible" width="50%" @close="editDialogClose">
      <!-- 编辑用户主体部分 -->
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editUserDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { userList } from '@/data/data.json'
let localUserList = userList

// 校验添加用户邮箱规则
const checkEmail = (rule, value, cb) => {
  const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/

  if (reg.test(value)) return cb()

  cb(new Error('请输入正确的邮箱!'))
}

// 校验添加用户手机号规则
const checkMobile = (rule, value, cb) => {
  const reg = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/

  if (reg.test(value)) return cb()

  cb(new Error('请输入正确的手机号!'))
}

export default {
  data () {
    return {
      queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 5
      },
      // 用户数据
      userList: [],
      // 总用户数量
      totalUser: 0,

      // 是否显示添加用户对话框
      addUserDialogVisible: false,
      // 添加用户数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 添加用户检验规则对象
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 5, message: '用户名在2~5个字符之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码在6~15个字符之间', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },

      // 是否显示编辑用户对话框
      editUserDialogVisible: false,
      editForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 添加用户检验规则对象
      editFormRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    const _userList = window.localStorage.getItem('userList')
    if (_userList) localUserList = JSON.parse(_userList)
    this.getUserList()
    window.localStorage.setItem('userList', JSON.stringify(localUserList))
  },
  methods: {
    // 监听 pagesize 发生变化
    handleSizeChange (newsize) {
      this.queryInfo.pagesize = newsize
      this.getUserList()
    },
    // 监听 pagenum 发生变化
    handleCurrentChange (newpage) {
      this.queryInfo.pagenum = newpage
      this.getUserList()
    },
    // 获取 userList 数据
    getUserList () {
      const _userList = window.localStorage.getItem('userList')
      if (_userList) localUserList = JSON.parse(_userList)
      const { pagenum, pagesize } = this.queryInfo
      const startIndex = (pagenum - 1) * pagesize
      const endIndex = pagenum * pagesize
      this.totalUser = localUserList.length
      this.userList = localUserList.slice(startIndex, endIndex)
    },
    // 修改用户 swith状态
    userStateChange (scope) {
      this.updateUserList(scope)
    },
    // 关闭添加用户对话框事件 重置添加用户对话框表单
    addDialogClose () {
      this.$refs.addFormRef.resetFields()
    },
    // 关闭编辑用户对话框事件 重置编辑用户对话框表单
    editDialogClose () {
      this.$refs.editFormRef.resetFields()
    },
    // 添加用户
    addUser () {
      this.$refs.addFormRef.validate(valid => {
        if (valid) {
          const id = Number(localUserList[localUserList.length - 1].id) + 1 + ''
          const createTime = this.$tools.format('yyyy-MM-ddThh:mm:ss.SZ')

          const sendData = { ...this.addForm, id, create_time: createTime, mg_state: false, role_name: '用户', type: 1 }
          localUserList.push(sendData)

          window.localStorage.setItem('userList', JSON.stringify(localUserList))

          this.addUserDialogVisible = false
        }
      })
    },
    // 显示编辑用户对话框
    showEditUser (scope) {
      this.editForm = scope
      this.editUserDialogVisible = true
    },
    // 编辑用户
    editUserInfo () {
      this.$refs.editFormRef.validate(valid => {
        if (!valid) return
        for (let i = 0; i < localUserList.length; i++) {
          if (localUserList[i].id === this.editForm.id) localUserList[i] = this.editForm
          break
        }
        window.localStorage.setItem('userList', JSON.stringify(localUserList))
        this.editUserDialogVisible = false
        this.getUserList()
      })
    },
    // 显示删除用户确认消息弹窗
    showDeleteUser (scope) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        for (let i = 0; i < localUserList.length; i++) {
          if (localUserList[i].id === scope.id) {
            localUserList.splice(i, 1)
            break
          }
        }
        console.log('localUserList', localUserList)
        window.localStorage.setItem('userList', JSON.stringify(localUserList))
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getUserList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 搜索用户
    searchQuery () {
      const searchValue = this.queryInfo.query.toLowerCase()
      const arr = []
      localUserList.forEach(item => {
        if (item.username.toLowerCase().indexOf(searchValue) > -1) arr.push(item)
      })
      this.userList = arr
    },
    // 清楚搜索数据
    clearQuery () {
      this.getUserList()
    },
    // 修改 localStorage 数据 localStorage模拟后台存储
    updateUserList (scope) {
      for (let i = 0; i < localUserList.length; i++) {
        if (localUserList[i].id === scope.id) {
          localUserList[i] = scope
          break
        }
      }
      window.localStorage.setItem('userList', JSON.stringify(localUserList))
    }
  }
}
</script>

<style lang="less" scoped>

</style>
