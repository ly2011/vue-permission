<template>
  <el-menu :collapse="isSidebarNavCollapse" background-color="#304156" text-color="#eee" active-text-color="#4dbcff" :default-active="currentMenu">
    <DynamicMenu :menuList="sidebarMenu"></DynamicMenu>
  </el-menu>
</template>

<script>
import { mapState } from 'vuex'
import DynamicMenu from '@/components/dynamic-menu'
export default {
  components: {
    DynamicMenu
  },
  computed: {
    ...mapState(['isSidebarNavCollapse']),
    ...mapState('permission', ['sidebarMenu', 'currentMenu'])
  }
}
</script>

<style>
</style>
