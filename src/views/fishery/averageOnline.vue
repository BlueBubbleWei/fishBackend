<template>
  <div>
    <p class="keyword">平均在线游戏时间</p>
    <div class="block">
      <span class="demonstration">选择时间</span>
      <el-date-picker
        v-model="value2"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions1"
      />
      <el-button type="primary">查询</el-button>
      <el-button type="success">活跃玩家</el-button>
      <el-button type="danger">付费玩家</el-button>
    </div>

    <!-- 捕鱼大厅图表 -->
    <div class="chart-container">
      <chart
        :id="fishingID"
        height="100%"
        width="100%"
        :chart-name="fishingChart"
        :labels="classicLabels"
        :x-name="classicXName"
        :x-data="fishingData"
        :x-color="classicColor"
      />
    </div>
    <!-- 经典图表 -->
    <div class="chart-container">
      <chart
        :id="classicID"
        height="100%"
        width="100%"
        :chart-name="classicChart"
        :labels="fishingLabels"
        :x-name="fishingXName"
        :x-data="classicData"
        :x-color="classicColor"
      />
    </div>
  </div>
</template>

<script>
import Chart from '@/components/Charts/singleLine'
export default {
  components: {
    Chart
  },
  data() {
    return {
      value2: '',
      fishingID: 'fishingID',
      fishingChart: '捕鱼大厅',
      fishingLabels: ['数量'],
      fishingXName: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      fishingData: [
        [123, 154, 234, 321, 120, 390, 634]
      ],
      fishingColor: ['#00f8ff'],
      classicID: 'classicID',
      classicChart: '经典捕鱼',
      classicLabels: ['数量'],
      classicXName: ['2019/01', '2019/02', '2019/03', '2019/04', '2019/05', '2019/06', '2019/07'],
      classicData: [
        [123, 154, 234, 321, 120, 390, 634]
      ],
      classicColor: ['#21ec21'],
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
      }
    }
  }
}
</script>

<style>
.arverageOnline {
    width: 100%;
}
.keyword {
      width: 100%;
      text-align: center;
      font-weight: bold;
  }
.block{
    margin-left: 25%;
}
.chart-container{
  position: relative;
  width: 100%;
  height: 400px;
  margin-bottom: 20px;
}
</style>
