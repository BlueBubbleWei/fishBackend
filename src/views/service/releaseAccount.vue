<template>
  <div class="account">

    <!-- 解封玩家 -->
    <table class="stop">
      <tr>
        <th colspan="3">解封玩家</th>
      </tr>
      <tr>
        <td>
          玩家ID
        </td>
        <td>
          <el-input
            v-model="startID"
            placeholder="请输入用户ID"
          />
        </td>
        <td>
          <el-button
            type="primary"
            @click="getFrozenReason"
          >查询</el-button>
        </td>
      </tr>
      <tr>
        <td>
          停封原因
        </td>
        <td>
          <el-input
            v-model="frozenReason"
            type="textarea"
            :rows="2"
          />
        </td>
      </tr>
      <tr>
        <td colspan="3">
          <el-button
            class="other"
            type="danger"
            @click="releaseUser"
          >解封用户
          </el-button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import {
  unblockAccount,
  getSuspendAccount
} from '@/api/service'
export default {
  name: 'Account',
  data() {
    return {
      frozenReason: '', // 冻结原因
      startID: '' // 解封ID
    }
  },
  created() {
  },
  methods: {
    getFrozenReason() {
      // 查询用户冻结原因
      if (this.startID.length === 0) {
        this.$message('请输入停封用户ID')
        return
      }
      const params = {
        memberId: this.startID
      }
      getSuspendAccount(params)
        .then(res => {
          this.frozenReason = res.remake
        })
        .catch(res => {
          this.$message({
            type: 'error',
            message: '获取数据失败'
          })
        })
    },
    releaseUser() {
      // 解封用户
      if (this.startID.length === 0) {
        this.$message('请输入停封用户ID')
      }
      this.$confirm('确认解封玩家?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const params = {
            memberId: this.startID
          }
          unblockAccount(params)
            .then(res => {
              this.$message({
                type: 'success',
                message: '玩家 ' + this.startID + ' 已被解封'
              })
            })
            .catch(res => {
              this.$message({
                type: 'error',
                message: '解封用户失败'
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
.reset {
  padding: 0 35%;
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
