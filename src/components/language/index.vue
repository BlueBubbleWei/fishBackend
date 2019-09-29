<template>
  <el-dropdown
    trigger="click"
    @command="hangdleSetLanguage"
  >
    <el-button type="primary">
      切换语言<i class="el-icon-arrow-down el-icon--right"></i>
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        command="zh"
        :disabled="lang==='zh'"
      >中文</el-dropdown-item>
      <el-dropdown-item
        command="en"
        :disabled="lang==='en'"
      >English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<style lang="scss">
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
<script>
export default {
  data () {
    return {}
  },
  computed: {
    lang () {
      return this.$store.getters.language
    }
  },
  created () {},
  methods: {
    hangdleSetLanguage (lang) {
      this.$i18n.locale = lang
      console.log('切换语言', lang)
      this.$store.commit('SET_LANGUAGE', lang)
      this.$message.success('switch language')
    }
  }
}
</script>
