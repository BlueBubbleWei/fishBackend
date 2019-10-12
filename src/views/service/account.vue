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
              <el-table-column
                width="100"
                property="itemId"
                label="背包物品id"
              />
              <el-table-column
                width="150"
                property="itemName"
                label="背包物品名称"
              />
              <el-table-column
                width="120"
                property="count"
                label="背包物品数量"
              />
            </el-table>
          </el-popover>
          <el-button
            v-popover:popover4
            type="warning"
            @click="updateDetail(scope.row.memberId)"
          >查看详情</el-button>
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
</template>

<script>
import { getAccounts, getMemberBackpackInfo } from '@/api/service'
export default {
  name: 'Account',
  data() {
    return {
      memberId: '', // 查询用户ID
      tableData: [],
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
    handleSizeChange(val) {
      this.pageSize = val
      this.page = 1
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
.account {
  margin: 20px;
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
.pops {
  width: 500px !important;
}
</style>
