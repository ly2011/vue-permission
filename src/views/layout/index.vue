<template>
  <div class="layout" :class="{navCollapsed: isSidebarNavCollapse}">
    <SidebarNav class="sidebar"/>
    <MainContent/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SidebarNav from './component/sidebar-nav'
import MainContent from './component/main-content/index'
export default {
  components: {
    SidebarNav,
    MainContent
  },
  computed: {
    ...mapState(['isSidebarNavCollapse'])
  }
}
</script>

<style>
</style>
