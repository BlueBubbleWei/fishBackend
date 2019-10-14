<template>
  <div class="profit">

    <div class="userID">
      <!-- 查询玩家ID -->
      <div class="first">
        <div class="source">
          <p>玩家ID</p>
          <div>
            <el-col
              :span="24"
              class="user"
            >
              <el-input
                v-model="memberId"
                placeholder="请输入玩家ID"
              />
            </el-col>
          </div>
        </div>
        <!-- <div class="source">
          <p>渠道</p>
          <el-select v-model="source" placeholder="请选择">
            <el-option
              v-for="item in sources"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div> -->

        <div class="block time">
          <span class="demonstration">选择时间</span>
          <el-date-picker
            v-model="DataSelect"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions1"
          />
        </div>
        <el-button type="primary" @click="handleData">查询</el-button>
      </div>
    </div>
    <!-- 数据表格 -->
    <el-table
      :data="tableData"
      border
      :header-cell-style="{'text-align':'center'}"
      :cell-style="{'text-align':'center'}"
      style="width: 100%"
      class="table"
    >
      <el-table-column
        fixed
        prop="memberId"
        label="玩家ID"
        width="180"
      />
      <!-- <el-table-column
        prop="source"
        label="渠道"
        width="180"
      /> -->
      <el-table-column
        prop="rechargeNum"
        label="充值次数"
        width="180"
      />
      <el-table-column
        prop="rechargeAmount"
        label="充值金额"
        width="180"
      />
      <el-table-column
        prop="createTime"
        label="注册时间"
        width="180"
      />
      <el-table-column
        prop="onlineNumber"
        label="上线次数"
        width="180"
      />
      <el-table-column
        prop="remainingGoldCoins"
        label="剩余金币"
        width="180"
      />
      <el-table-column
        prop="lastOnlineTime"
        label="最后上线时间"
      />
    </el-table>
    <!-- 分页 -->
    <div class="block pagination">
      <el-pagination
        :current-page="page"
        :page-sizes="[3, 5, 10, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script >
import { getMemberBaseInfo } from '@/api/player'
export default {
  data() {
    return {
      memberId: '', // 用户ID
      source: '', // 渠道
      sources: [
        {
          value: '选项1',
          label: 'QQ'
        },
        {
          value: '选项2',
          label: '其他'
        }
      ],
      pickerOptions1: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const end = new Date()
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              const start = new Date(date)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '7天',
            onClick(picker) {
              const end = new Date()
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              const start = new Date(date)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '30天',
            onClick(picker) {
              const end = new Date()
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 30)
              const start = new Date(date)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '当前月',
            onClick(picker) {
              const end = new Date()
              const date = new Date()
              const currentDay = date.getDate() - 1
              date.setTime(date.getTime() - 3600 * 1000 * 24 * currentDay)
              const start = new Date(date)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '上个月',
            onClick(picker) {
              const date1 = new Date()
              const date2 = new Date()
              const currentDay = date1.getDate()
              const lastDay = date1.getDate() - 1
              date1.setTime(date1.getTime() - 3600 * 1000 * 24 * currentDay)
              date2.setMonth(Number.parseInt(date2.getMonth()) - 1)
              date2.setTime(date2.getTime() - 3600 * 1000 * 24 * lastDay)
              const end = new Date(date1)
              const start = new Date(date2)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      DataSelect: [],
      beginTime: new Date(),
      endTime: new Date(),
      tableData: [],
      total: 0,
      pageSize: 30,
      page: 1
    }
  },
  created() {
    this.selectData()
    this.DataSelect = []
    if (sessionStorage.getItem('PB_beginTime') !== null) {
      this.beginTime = sessionStorage.getItem('PB_beginTime')
      this.endTime = sessionStorage.getItem('PB_endTime')
    }
    this.DataSelect = this.DataSelect.concat([this.beginTime, this.endTime])
  },
  methods: {
    selectData() {
      const params = {
        beginTime: this.beginTime,
        endTime: this.endTime,
        memberId: this.memberId,
        page: this.page,
        size: this.pageSize
      }
      sessionStorage.setItem('PB_beginTime', this.beginTime)
      sessionStorage.setItem('PB_endTime', this.endTime)
      getMemberBaseInfo(params)
        .then(res => {
          console.log(res)
          this.total = res.totalElements
          this.tableData = res.content
          // console.log(this.tableData)
        })
        .catch(res => {
          this.$message({
            type: 'error',
            message: '获取数据失败'
          })
        })
    },
    handleData() {
      this.page = 1
      this.pageSize = 30
      this.selectData()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.pageSize = 1
      this.selectData()
    },
    handleCurrentChange(val) {
      this.pageSize = val
      this.selectData()
    }
  },
  beforeRouteLeave(to, from, next) {
    sessionStorage.removeItem('PB_beginTime')
    sessionStorage.removeItem('PB_endTime')
  }
}
</script>
<style lang="scss" scoped>
.profit {
  padding: 10px;
}
.userID {
  p {
    display: inline-block;
    float: left;
    margin: 12px 4px 0 0;
  }
  .user {
    margin-right: 4px;
    float: left;
  }
}

.source {
  margin: 20px;
  p {
    margin: 10px 4px;
    float: left;
  }
  div{
    float: left;
  }
}
.first {
  display: flex;
  justify-content: center;
  align-items: center;
}
.time {
  margin-right: 4px;
}
.table {
  margin-top: 10px;
  border-bottom: none;
}
.pagination {
  float: right;
}
</style>
