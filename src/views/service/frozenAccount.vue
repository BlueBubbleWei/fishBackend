<template>
  <div class="account">

    <!-- 停封玩家 -->
    <table class="stop">
      <tr>
        <th colspan="2">停封玩家</th>
      </tr>
      <tr>
        <td>
          玩家ID
        </td>
        <td>
          <el-input
            v-model="stopID"
            placeholder="请输入用户ID"
          />
        </td>
      </tr>
      <tr>
        <td>
          停封备注
        </td>
        <td>
          <el-input
            v-model="mark"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
          />
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <el-button
            class="other"
            type="danger"
            @click="frozenUser"
          >停封用户
          </el-button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import {
  suspendAccount
} from '@/api/service'
export default {
  name: 'Account',
  data() {
    return {
      stopID: '', // 停封用户ID
      mark: '' // 输入停封备注
    }
  },
  created() {
  },
  methods: {
    frozenUser() {
      // 停封用户
      if (this.stopID.length === 0) {
        this.$message('请输入停封用户ID')
        return
      }
      this.$confirm('确认停封玩家?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const params = {
            memberId: this.stopID,
            remark: this.mark
          }
          suspendAccount(params)
            .then(res => {
              this.$message({
                type: 'success',
                message: '玩家 ' + this.stopID + ' 已被停封!'
              })
            })
            .catch(res => {
              this.$message({
                type: 'error',
                message: '封停用户失败'
              })
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
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
