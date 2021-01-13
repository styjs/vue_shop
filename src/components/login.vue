<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/imgs/logo_avatar.jpg" alt="logo" />
      </div>

      <!-- 登录表单区域 -->
      <el-form ref="loginForm" :rules="LoginFormRules" :model="loginForm" label-width="0px" class="form_box">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" @keyup.native.enter="login" prefix-icon="el-icon-s-finance"></el-input>
        </el-form-item>

        <el-form-item class="el_btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
const LoginFormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 5, message: '请输入2-5位用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 15, message: '请输入6-15位用户名', trigger: 'blur' }
  ]
}
export default {
  data() {
    return {
      loginForm: {
        username: '张三',
        password: '123456'
      },
      LoginFormRules
    }
  },
  methods: {
    login () {
      console.log(123456)
      this.$refs.loginForm.validate(valid => {
        if (!valid) return
        if (this.loginForm.username === '张三' && this.loginForm.password === '123456') this.$message.success('登录成功')
        else this.$message.error('登陆失败')

        window.sessionStorage.setItem('token', '123456798')

        this.$router.push('/home')
      })
    },
    reset () {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 290px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .form_box {
    position: absolute;
    bottom: 0;
    left: 20px;
    width: calc(100% - 40px);
    .el_btns {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
