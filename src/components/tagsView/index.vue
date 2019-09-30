<template id="">
  <div class="tags-view-container">
    <scroll-panel class="tags-view-wrap">
      <router-link v-for="tag in Array.from(visitedViews)" :to="tag.path" :key="tag.path"  class="tags-view-item" :class="isActive(tag)?'active':''">
        {{tag.title}}
         <span class='el-icon-close' @click.prevent.stop="delSelectTag(tag)"></span>
      </router-link>
    </scroll-panel>
  </div>
</template>
<script>
export default {
  name: 'tagsView',
  data () {

  },
  computed: {
    visitedViews () { // store中取值
      return this.$store.state.tagsview.visitedviews
    }
  },
  methods: {
    isActive (route) {
      return route.path === this.$route.path
    },
    addViewTags () { // 路由改变时执行的方法
      if (this.$route.name) {
        const route = this.$route
        this.$store.dispatch('addVisitedViews', route)
      }
    },
    delSelectTag (route) { // 先提交删除数据的方法,数组删除出掉数据后，如果关闭的是当前打开的路由需要将路由改为数组最后一次push进去的路由
      this.$store.dispatch('delVisitedViews', route).then((views) => {
        if (this.isActive(route)) { // 只有在关闭当前打开的标签页才会有影响
          let lastView = views.slice(-1)[0]// 选取路由数组中的最后一位
          if (lastView) {
            this.$router.push(lastView)
          } else {
            this.$router.push('/')
          }
        }
      })
    }
  },
  watch: {
    $route () {
      this.addViewTags()
    }
  }
}
</script>
