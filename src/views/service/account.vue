<template>
  <div class="account">
    <!-- 账号查询 -->
    <table class="stop">
      <tr>
        <th colspan="3">账号查询</th>
      </tr>
      <tr>
        <td>
          玩家ID、昵称或登录IP
        </td>
        <td>
          <el-input
            v-model="memberId"
            placeholder="请输入用户ID"
          />
        </td>
        <td>
          <el-button
            type="primary"
            @click="handleData"
          >查询</el-button>
        </td>
      </tr>
    </table>
    <div>
      <el-table
        :data="tableData"
        border
        fit
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        style="width: 100%"
        class="table"
      >
        <el-table-column
          fixed
          prop="createTime"
          label="角色创建时间"
        />
        <el-table-column
          fixed
          prop="createTime"
          label="用户账号"
        />
        <el-table-column
          fixed
          prop="memberId"
          label="玩家ID"
        />
        <el-table-column
          fixed
          prop="memberName"
          label="昵称"
        />
        <el-table-column
          fixed
          prop="date"
          label="渠道"
        />

        <el-table-column
          fixed
          prop="level"
          label="VIP等级"
        />
        <el-table-column
          fixed
          prop="point"
          label="VIP经验"
        />
        <el-table-column
          fixed
          prop="gun"
          label="最大炮倍"
        />
        <el-table-column
          fixed
          prop="lastLoginTime"
          label="上次登录时间"
        />
        <el-table-column
          fixed
          prop="lastLoginIP"
          label="上次登录IP"
        />
        <el-table-column
          fixed
          prop="goldCoinQty"
          label="金币数量"
        />
        <el-table-column
          fixed
          prop="diamondsQty"
          label="钻石数量"
        />
        <el-table-column
          fixed
          prop="status"
          label="账号状态"
        >
          <template slot-scope="scope">
            {{ scope.row.status==0?"未激活":(scope.row.status==1?"正常":(scope.row.status==10?"渠道":(scope.row.status==-1?"已注销":"封停"))) }}
          </template>
        </el-table-column>
        <el-table-column
          fixed
          label="背包查询"
          width="180"
        >
          <template slot-scope="scope">
            <el-popover
              ref="popover4"
              placement="right"
              width="400"
              trigger="click"
              popper-class="pops"
              style="width: 586px;"
            >
              <el-table :data="backpackData">
                <el-table-column width="100" property="itemId" label="背包物品id" />
                <el-table-column width="150" property="itemName" label="背包物品名称" />
                <el-table-column width="120" property="count" label="背包物品数量" />
              </el-table>
            </el-popover>
            <el-button v-popover:popover4 @click="updateDetail(scope.row.memberId)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="page">
        <div class="block pagination">
          <el-pagination
            :current-page="pageSize"
            :page-sizes="[3, 5, 10, 30]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>

    <hr class="nap">
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

    <hr class="nap">
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
    <hr class="nap">
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
    <hr class="nap">
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
          <p>请输入6-14位字符，允许字母和数字</p>
        </td>
      </tr>
      <tr>
        <td>
          确认密码
        </td>
        <td>
          <el-input
            v-model="resetPW"
            type="password"
            placeholder="请再次输入密码"
          />
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <el-button type="primary">
            确定
          </el-button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import {
  getAccounts,
  getMemberBackpackInfo,
  suspendAccount,
  unblockAccount,
  getSuspendAccount,
  resetMemberPassword
} from '@/api/service'
export default {
  name: 'Account',
  data() {
    return {
      memberId: '', // 查询用户ID
      stopID: '', // 停封用户ID
      mark: '', // 输入停封备注
      frozenReason: '', // 冻结原因
      startID: '', // 解封ID
      showUInfo: false,
      resetID: '',
      resetPW: '',
      tableData: [],
      resetType: '1', // 渠道
      types: [
        {
          value: '1',
          label: '登录密码'
        },
        {
          value: '2',
          label: '保险箱密码'
        }
      ],
      total: 0,
      pageSize: 30,
      page: 1,
      backpackData: []
    }
  },
  created() {
    this.selectID()
  },
  methods: {
    selectID() {
      // 查询用户列表
      const params = {
        memberId: this.memberId,
        page: this.page,
        size: this.pageSize
      }
      getAccounts(params)
        .then(res => {
          this.total = res.totalElements
          this.tableData = res.content
          console.log('----', res)
        })
        .catch(res => {
          this.$message({
            type: 'error',
            message: '获取用户列表失败'
          })
        })
    },
    handleData() {
      // 查询
      this.pageSize = 30
      this.page = 1
      this.selectID()
    },
    updateDetail(val) {
      // 查看详情
      const params = {
        memberId: val
      }
      getMemberBackpackInfo(params)
        .then(res => {
          this.backpackData = res
        })
        .catch(res => {
          this.$message({
            type: 'error',
            message: '获取用户列表失败'
          })
        })
    },
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
    },
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
    },
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
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.selectID()
    },
    handleCurrentChange(val) {
      this.page = val
      this.selectID()
    }
  }
}
</script>

<style lang="scss" scoped>
.stop {
  width: 100%;
  margin: 0 auto;
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
.nap {
  height: 1px;
  border: none;
  border-top: 1px dashed #454545;
  margin: 20px 5%;
}
.page {
  display: block;
  margin: 20px;
  clear: both;
  height: 71px;
}
.pagination {
  float: right;
  clear: both;
  overflow: hidden;
  margin: 20px;
}
.pops{
  width:500px !important;
}
</style>
