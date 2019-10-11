<template>
  <div class="profit">

    <div class="userID">
      <!-- 查询渠道 -->
      <div class="source">
        <p>游戏</p>
        <el-select
          v-model="type"
        >
          <el-option
            v-for="item in types"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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
      </div>
      <el-button
        type="primary"
        handle-data
        @click="handleData"
      >查询</el-button>
    </div>
    <!-- 全部数据表格 -->
    <el-table
      v-if="!allShow"
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
        prop="date"
        label="日期"
      />
      <el-table-column
        prop="playerCount"
        label="初级场总活跃人数"
      />

      <el-table-column
        prop="faileBullet"
        label="初级场废弹"
      />
      <el-table-column
        prop="profitValue"
        label="盈利值"
      />
      <el-table-column
        prop="profitability"
        label="盈利率"
      />
      <el-table-column
        prop="ARPPU"
        label="龙珠场系统总收入"
      />
      <el-table-column
        prop="dragonBallFarmTotalIncome"
        label="龙珠场总收入"
      />
      <el-table-column
        prop="dragonBallFarmTotalExpend"
        label="龙珠场总支出"
      />
      <el-table-column
        prop="goldCoinFarmTotalIncome"
        label="金币场总收入"
      />
      <el-table-column
        prop="goldCoinFarmTotalExpend"
        label="金币场总支出"
      />

      <!-- 南海争霸 表格 -->
      <el-table
        v-if="allShow"
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
          prop="date"
          label="日期"
        />
        <el-table-column
          prop="name"
          label="场次名称"
        />
        <el-table-column
          prop="faileBullet"
          label="废弹"
        />
        <el-table-column
          prop="totalIncome"
          label="初级场收入"
        />
        <el-table-column
          prop="totalExpend"
          label="初级场产出"
        />
        <el-table-column
          prop="profitValue"
          label="盈利值"
        />
        <el-table-column
          prop="profitability"
          label="盈利率"
        />
      </el-table>
    </el-table>
  </div>
</template>
<script >
import { getFlowOfGoldCoins } from '@/api/stats'
export default {
  data() {
    return {
      allShow: true,
      type: '1', // 游戏类型
      types: [{
        value: '1',
        label: '全部'
      }, {
        value: '2',
        label: '南海争霸'
      }, {
        value: '3',
        label: '竞技场'
      }],
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
      tableData: []
    }
  },
  created() {
    this.selectData()
  },
  methods: {
    selectData() {
      const params = {
        beginTime: this.beginTime,
        endTime: this.endTime,
        type: this.type
      }
      if (this.type === '1') {
        this.allShow = false
      } else {
        this.allShow = true
      }
      getFlowOfGoldCoins(params)
        .then(res => {
          this.tableData = res
        })
        .catch(res => {

        })
    },
    handleData() {
      this.selectData()
    },
    selectTime(e) {
      // 选择时间
      this.beginTime = this.DataSelect[0]
      this.endTime = this.DataSelect[1]
    }
  }
}
</script>
<style lang="scss" scoped>
.profit {
  padding: 10px;
}
.userID {
  margin-left: 10%;
  p {
    display: inline-block;
    float: left;
    margin: 0;
    margin: 10px 4px 0 0;
  }
}
.source {
  margin-left: 10%;
  display: inline-block;
  p {
    margin-right: 5px;
    float: left;
  }
}
.time {
  clear: both;
  margin-left: 10%;
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
