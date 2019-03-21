<template>
  <div class="menu-container">
    <template v-for="v in menuList">
      <el-submenu :index="v.name" v-if="v.children && v.children.length > 0" :key="v.name">
        <template slot="title">
          <i class="iconfont" :class="v.meta.icon"></i>
          <span>{{v.meta.name}}</span>
        </template>
        <el-menu-item-group>
          <dynamic-menu :menuList="v.children"></dynamic-menu>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item :index="v.name" :key="v.name" @click="gotoRoute(v.name)" v-else>
        <i class="iconfont" :class="v.meta.icon"></i>
        <span slot="title">{{v.meta.name}}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: 'dynamic-menu',
  props: {
    menuList: {
      type: Array,
      default: () => ([])
    }
  },
  methods: {
    gotoRoute (name) {
      this.$router.push({ name })
    }
  }
}
</script>

<style>
</style>
