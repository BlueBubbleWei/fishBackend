<template>
  <div class="profit">

    <div class="userID">
      <!-- 查询渠道 -->
      <div class="source">
        <p>游戏</p>
        <el-select v-model="value" @change="currentSel">
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
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions1"
        />
      </div>
      <el-button type="primary">查询</el-button>
    </div>
    <!-- 全部数据表格 -->
    <el-table
      v-if="allShow"
      :data="tableData3"
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
        prop="source"
        label="盈利率"
      />
      <el-table-column
        prop="total"
        label="盈利值"
      />
      <el-table-column
        prop="lanzuan"
        label="活跃人数"
      />
      <el-table-column
        prop="payPersons"
        label="金币场系统总收入"
      />
      <el-table-column
        prop="payNums"
        label="金币场系统总支出"
      />
      <el-table-column
        prop="ARPPU"
        label="龙珠场系统总收入"
      />
      <el-table-column
        prop="newPayUser"
        label="龙珠场系统总支出"
      />
    </el-table>
    <!-- 南海争霸 表格 -->
    <el-table
      v-if="!allShow"
      :data="tableData3"
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
        prop="source"
        label="初级场总活跃人数"
      />
      <el-table-column
        prop="total"
        label="初级场收入"
      />
      <el-table-column
        prop="lanzuan"
        label="初级场产出"
      />
      <el-table-column
        prop="payPersons"
        label="盈利值"
      />
      <el-table-column
        prop="payNums"
        label="盈利率"
      />
      <el-table-column
        prop="ARPPU"
        label="龙珠场系统总收入"
      />
      <el-table-column
        prop="newPayUser"
        label="初级场废弹"
      />
    </el-table>
    <!-- 分页 -->
    <div class="block pagination">
      <el-pagination
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script >
export default {
  data() {
    return {
      allShow: true,
      value: '', // 游戏
      options: [{
        value: '选项1',
        label: '全部'
      }, {
        value: '选项2',
        label: '南海争霸'
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
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    }
  },
  created() {
    this.value = this.options[0].label
  },
  methods: {
    currentSel(val) {
      this.allShow = !this.allShow
      console.log(val)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
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
    margin:0;
    margin: 12px 4px 0 0;
  }
}
.source{
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
.pagination{
  float: right;
}
</style>
