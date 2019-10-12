<template>
  <div class="account">
    <!-- 添加账号 -->
    <table class="stop new">
      <tr>
        <th colspan="2">添加账号</th>
      </tr>
      <tr>
        <td>
          玩家ID
        </td>
        <td>
          <el-input
            v-model="newID"
            placeholder="请输入用户ID"
          />
        </td>
      </tr>
      <tr>
        <td>
          新密码
        </td>
        <td>
          <el-input
            v-model="newPW"
            type="password"
            placeholder="请输入新密码"
          />
          <p>请输入6-14位字符，允许字母和数字</p>
        </td>
      </tr>
      <tr>
        <td>
          确认密码
        </td>
        <td>
          <el-input
            v-model="rePw"
            type="password"
            placeholder="请再次输入密码"
          />
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <el-button
            type="primary"
            @click="createAccount"
          >
            确定
          </el-button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
// import {
//   resetMemberPassword
// } from '@/api/service'
export default {
  name: 'Account',
  data() {
    return {
      newID: '',
      newPW: '',
      rePw: ''
    }
  },
  created() {},
  methods: {
    createAccount() {
      if (this.newID.length === 0) {
        this.$message('请输入玩家ID')
        return
      } else if (this.newPW.length === 0) {
        this.$message('请输入密码')
        return
      } else if (this.newPW.length < 6 || this.newPW.length > 14) {
        this.$message('密码长度在6到14之间')
        return
      } else if (this.newPW !== this.rePw) {
        this.$message('两次输入的密码不一致')
        return
      }
    //   const params = {
    //     memberId: this.newID,
    //     password: this.newPW,
    //     type: 1
    //   }
    }

  }
}
</script>

<style lang="scss" scoped>
.stop {
  width: 100%;
  margin: 30px auto;
  padding: 0 30%;
  tr,
  th,
  td {
    text-align: center;
    padding: 12px 0;
  }
}
.new {
  padding: 0 35% 0 34%;
  p {
    margin: 0;
    padding: 0;
    font-size: 12px;
    color: red;
  }
}
</style>
