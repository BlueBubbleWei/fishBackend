<template>
  <div class="profit">
    <p class="state">实时付费</p>
    <div class="userID">
      <!-- 查询渠道 -->
      <div class="source">
        <p>渠道</p>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button type="primary">查询</el-button>
      </div>

      <!-- 查询时间 -->
      <div class="block time">
        <span class="demonstration">选择时间</span>
        <el-date-picker
          v-model="value2"
          type="datetime"
          placeholder="选择日期时间"
          align="right"
          :picker-options="pickerOptions1"
        />
      </div>
      <el-button type="primary">查询</el-button>
    </div>
    <!-- 数据表格 -->
    <el-table
      :data="tableData3"
      border
      :header-cell-style="{'text-align':'center'}"
      :cell-style="{'text-align':'center'}"
      style="width: 100%"
      class="table"
    >
      <el-table-column
        fixed
        prop="date"
        label="日期"
        width="180"
      />
      <el-table-column
        prop="source"
        label="0点累计"
        width="80"
      />
      <el-table-column
        prop="total"
        label="1点累计"
        width="80"
      />
      <el-table-column
        prop="lanzuan"
        label="2点累计"
        width="80"
      />
      <el-table-column
        prop="payPersons"
        label="3点累计"
        width="80"
      />
      <el-table-column
        prop="payNums"
        label="4点累计"
        width="80"
      />
      <el-table-column
        prop="ARPPU"
        label="5点累计"
        width="80"
      />
      <el-table-column
        prop="newPayUser"
        label="6点累计"
        width="80"
      />
      <el-table-column
        prop="newPayUserRate"
        label="7点累计"
        width="80"
      />
      <el-table-column
        prop="newPayUserRate"
        label="8点累计"
        width="80"
      />
      <el-table-column
        prop="newPayUserRate"
        label="9点累计"
      />
      <el-table-column
        prop="newPayUserRate"
        label="10点累计"
      />
      <el-table-column
        prop="newPayUserRate"
        label="11点累计"
      />
      <el-table-column
        prop="newPayUserRate"
        label="12点累计"
      />
      <el-table-column
        prop="newPayUserRate"
        label="13点累计"
      />
      <el-table-column
        prop="newPayUserRate"
        label="14点累计"
      />
      <el-table-column
        prop="newPayUserRate"
        label="15点累计"
      />
      <el-table-column
        prop="newPayUserRate"
        label="16点累计"
      />
      <el-table-column
        prop="newPayUserRate"
        label="17点累计"
      />
      <el-table-column
        prop="newPayUserRate"
        label="18点累计"
      />
      <el-table-column
        prop="newPayUserRate"
        label="19点累计"
      />
      <el-table-column
        prop="newPayUserRate"
        label="20点累计"
      />
      <el-table-column
        prop="newPayUserRate"
        label="21点累计"
      />
      <el-table-column
        prop="newPayUserRate"
        label="21点累计"
      />
      <el-table-column
        prop="newPayUserRate"
        label="21点累计"
      />
    </el-table>
    <!-- 图表 -->
    <div class="chart-container">
      <chart height="100%" width="100%" />
    </div>
  </div>
</template>
<script >
import Chart from '@/components/Charts/lineChart'
export default {
  components: { Chart },
  data() {
    return {
      value: '', // 渠道
      options: [{
        value: '选项1',
        label: 'QQ'
      }, {
        value: '选项2',
        label: '其他'
      }],
      pickerOptions1: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '7天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          },
          {
            text: '30天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', date)
            }
          }
          // {  这个还没有计算
          //   text: '当前月',
          //   onClick(picker) {
          //     const date = new Date()
          //     date.setTime(date.getTime() - 3600 * 1000 * 24 * 30)
          //     picker.$emit('pick', date)
          //   }
          // }
        ]
      },
      value2: '',
      tableData3: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }

      ]
    }
  },
  methods: {

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
    margin-right: 5px;
  }
}
.source{
  margin-left: 20%;
  display: inline-block;
   p {
    margin:12px 4px 0 0;
    float: left;
  }
}
.time {
  clear: both;
  margin-left: 20%;
  text-align: center;
  display: inline-block;
}
.table {
  margin-top: 10px;
  border-bottom: none;
}
.pagination{
  float: right;
}
.keyword{
  margin:30px 0;
  clear: both;
  width: 100%;
  text-align: center;
  font-weight: bold;
}
.chart-container{
  position: relative;
  width: 100%;
  height: 500px;
}
</style>
