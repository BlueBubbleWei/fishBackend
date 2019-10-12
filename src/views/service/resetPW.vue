<template>
  <div class="account">
    <!-- 重置密码 -->
    <table class="stop reset">
      <tr>
        <th colspan="2">重置密码</th>
      </tr>
      <tr>
        <td>
          类型
        </td>
        <td>
          <el-select
            v-model="resetType"
            placeholder="请选择"
          >
            <el-option
              v-for="item in types"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </td>
      </tr>
      <tr>
        <td>
          玩家ID
        </td>
        <td>
          <el-input
            v-model="resetID"
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
            v-model="resetPW"
            type="password"
            placeholder="请输入新密码"
          />
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <el-button type="primary" @click="resetBtn">
            重置
          </el-button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import {
  resetMemberPassword
} from '@/api/service'
export default {
  name: 'Account',
  data() {
    return {
      resetID: '',
      resetPW: '',
      resetType: '1', // 密码类型
      types: [
        {
          value: '1',
          label: '登录密码'
        },
        {
          value: '2',
          label: '保险箱密码'
        }
      ]
    }
  },
  created() {
  },
  methods: {
    resetBtn() {
      // 重置密码
      if (this.resetID.length === 0) {
        this.$message('请输入玩家ID')
        return
      } else if (this.resetPW.length === 0) {
        this.$message('请输入重置密码')
        return
      }
      const params = {
        memberId: this.resetID,
        password: this.resetPW,
        type: this.resetType
      }
      resetMemberPassword(params)
        .then(res => {
          this.$message({
            type: 'success',
            message: '重置密码成功'
          })
        })
        .catch(res => {
          this.$message({
            type: 'error',
            message: '重置密码失败'
          })
        })
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
</style>
