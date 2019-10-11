<template>
  <p>获取详情数据</p>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      name: ''
    }
  },
  created() {
    this.init()
  },
  mounted() {
    // 动态修改tit
    document.title = this.$route.query.title
  },
  methods: {
    init() {
      this.id = this.$route.query.id
      document.title = this.$route.query.title
      console.log(this.id, this.$route.query.title)
    }
  },
  beforeRouteEnter(to, from, next) {
    // 不！能！获取组件实例 `this`
    // 因为当钩子执行前，组件实例还没被创建
    // to.meta.title = 123
    console.log('to', to.query.title)
    document.title = 123
    next()
  }

}
</script>

<style>
</style>
