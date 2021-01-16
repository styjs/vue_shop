<template>
  <el-container>
    <el-header>
      <div class="header-info">
        <img src="../assets/imgs/logo.png" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="collapse" @click="toggleCollapse">|||</div>
        <el-menu
          :default-active="activePath"
          class="el-menu-vertical-demo"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409efe"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
        >
          <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="selecteNavPath(subItem.path)">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { menuList } from '@/data/data.json'
export default {
  data () {
    return {
      // 左侧菜单数据
      menuList: [],
      iconsObj: {
        100: 'el-icon-user-solid',
        200: 'el-icon-s-cooperation',
        300: 'el-icon-s-grid',
        400: 'el-icon-s-order',
        500: 'el-icon-s-data'
      },
      isCollapse: false,
      activePath: ''
    }
  },
  created () {
    // console.log('menuList', menuList)
    this.menuList = menuList
    this.activePath = window.sessionStorage.getItem('activePath')
    // console.log('activePath', this.activePath)
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    selecteNavPath (navpath) {
      this.activePath = navpath
      window.sessionStorage.setItem('activePath', navpath)
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;

  .header-info {
    display: flex;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
    }
    span {
      font-size: 16px;
      color: #fff;
      font-weight: bold;
      margin-left: 10px;
    }
  }
}

.el-aside {
  background-color: #333744;

  .collapse {
    width: 100%;
    height: 30px;
    line-height: 30px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    background-color: #4a5046;
    user-select:none;
    font-size: 16px;
    cursor: pointer;
  }

  .el-menu {
    border-right: 0;
  }
}

.el-main {
  background-color: #eeeeff;
}
</style>
