<template>
  <div class="profit">

    <div class="userID">
      <!-- 查询玩家ID -->
      <p>玩家ID</p>
      <el-col
        :span="18"
        class="user"
      >
        <el-input
          v-model="memberId"
          placeholder="请输入玩家ID"
        />
      </el-col>
    </div>
    <!-- 查询渠道 -->
    <div class="userID">
      <!-- 查询玩家ID -->
      <p>道具ID</p>
      <el-col
        :span="18"
        class="user"
      >
        <el-input
          v-model="propId"
          placeholder="请输入道具ID"
        />
      </el-col>
    </div>

    <!-- 查询时间 -->
    <div class="block time">
      <span class="demonstration">选择时间</span>
      <el-date-picker
        v-model="DataSelect"
        type="daterange"
        align="right"
        unlink-panels
        format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions1"
        @change="selectTime"
      />
      <el-button
        type="primary"
        @click="handleData"
      >查询</el-button>
    </div>
    <!-- 数据表格 -->
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
        label="日期"
      />
      <el-table-column
        prop="memo"
        label="变化原因"
      />
      <el-table-column
        prop="itemId"
        label="道具ID"
      />
      <el-table-column
        prop="itemId"
        label="道具"
      />
      <el-table-column
        prop="preCount"
        label="起始值"
      />
      <el-table-column
        prop="curCount"
        label="结束值"
      />
      <el-table-column
        prop="opt"
        label="差额"
      />
      <!-- <el-table-column
        prop="newPayUser"
        label="同步字段"
      /> -->
    </el-table>
    <!-- 分页 -->
    <div class="block pagination">
      <el-pagination
        :current-page="page"
        :page-sizes="[3, 5, 10, 30]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script >
import { getItemLog } from '@/api/player'
export default {
  data() {
    return {
      memberId: '', // 用户ID
      propId: '', // 道具ID
      tableData: [],
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
      page: 1,
      size: 30,
      total: 0
    }
  },
  created() {
    this.DataSelect = this.DataSelect.concat([this.beginTime, this.endTime])
    this.selectData()
  },
  methods: {
    selectData() {
      const params = {
        beginTime: this.beginTime,
        endTime: this.endTime,
        memberId: this.memberId,
        propId: this.propId,
        page: this.page,
        size: this.pageSize
      }
      getItemLog(params)
        .then(res => {
          const data = res
          this.total = data.totalElements
          this.tableData = data.content
        })
        .catch(res => {
          this.$message({
            type: 'error',
            message: '获取数据失败'
          })
        })
    },
    selectTime(e) {
      this.beginTime = this.DataSelect[0]
      this.endTime = this.DataSelect[1]
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
  }
}
</script>
<style lang="scss" scoped>
.profit {
  padding: 10px;
}
.userID {
  margin-left: 8%;
  float: left;
  p {
    margin: 0;
    margin-top: 10px;
    display: inline-block;
    float: left;
    margin-right: 5px;
  }
  .user {
    margin-right: 4px;
  }
}
.time {
  clear: both;
  margin-left: 8%;
  text-align: center;
  display: inline-block;
}
.table {
  margin-top: 10px;
  border-bottom: none;
}
.pagination {
  float: right;
}
</style>
