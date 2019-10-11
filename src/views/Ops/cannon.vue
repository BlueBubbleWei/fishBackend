<template>
  <div class="profit">
    <!-- <p class="keyword">新增玩家在前期流失情况</p>
    <div class="userID">
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
        label="活跃人数"
        width="100"
      />
      <el-table-column
        prop="total"
        label="100倍人数"
        width="100"
      />
      <el-table-column
        prop="lanzuan"
        label="200倍人数"
        width="100"
      />
      <el-table-column
        prop="payPersons"
        label="300倍人数"
        width="100"
      />
      <el-table-column
        prop="payNums"
        label="800倍人数"
        width="100"
      />
      <el-table-column
        prop="ARPPU"
        label="500倍人数"
        width="100"
      />
      <el-table-column
        prop="newPayUser"
        label="600倍人数"
        width="100"
      />
      <el-table-column
        prop="newPayUserRate"
        label="700倍人数"
        width="100"
      />
      <el-table-column
        prop="newPayUserRate"
        label="800倍人数"
        width="100"
      />
      <el-table-column
        prop="newPayUserRate"
        label="900倍人数"
        width="100"
      />
      <el-table-column
        prop="newPayUserRate"
        label="1000倍人数"
        width="100"
      />
      <el-table-column
        prop="newPayUserRate"
        label="2000倍人数"
        width="100"
      />
      <el-table-column
        prop="newPayUserRate"
        label="3000倍人数"
        width="100"
      />
      <el-table-column
        prop="newPayUserRate"
        label="8000倍人数"
        width="100"
      />
      <el-table-column
        prop="newPayUserRate"
        label="5000倍人数"
        width="100"
      />
      <el-table-column
        prop="newPayUserRate"
        label="6000倍人数"
        width="100"
      />
      <el-table-column
        prop="newPayUserRate"
        label="7000倍人数"
        width="100"
      />
      <el-table-column
        prop="newPayUserRate"
        label="8000倍人数"
        width="100"
      />
      <el-table-column
        prop="newPayUserRate"
        label="9000倍人数"
        width="100"
      />
      <el-table-column
        prop="newPayUserRate"
        label="10000倍人数"
        width="120"
      />

    </el-table>
    <div class="block pagination">
      <el-pagination
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 800]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="800"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div> -->
    <!-- 炮术成长分布 -->
    <p class="keyword">炮术成长分布表</p>
    <div class="userID">
      <div class="source paoshu">
        <div class="block paoshu-time">
          <span class="demonstration">开始时间</span>
          <el-date-picker
            v-model="start"
            type="date"
            placeholder="选择日期"
          />
        </div>
        <div class="block paoshu-time">
          <span class="demonstration">结束时间</span>
          <el-date-picker
            v-model="end"
            type="date"
            placeholder="选择日期"
          />
        </div>
        <el-button type="primary">确定</el-button>
      </div>

    </div>
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
        label="注册日期"
        width="180"
      />
      <el-table-column
        prop="source"
        label="天数"
        width="100"
      />
      <el-table-column
        prop="total"
        label="1炮"
        width="80"
      />
      <el-table-column
        prop="lanzuan"
        label="5炮"
        width="80"
      />
      <el-table-column
        prop="lanzuan"
        label="10炮"
        width="80"
      />
      <el-table-column
        prop="lanzuan"
        label="20炮"
        width="80"
      />
      <el-table-column
        prop="lanzuan"
        label="30炮"
        width="80"
      />
      <el-table-column
        prop="lanzuan"
        label="80炮"
        width="80"
      />
      <el-table-column
        prop="lanzuan"
        label="50炮"
        width="80"
      />
      <el-table-column
        prop="lanzuan"
        label="60炮"
        width="80"
      />
      <el-table-column
        prop="lanzuan"
        label="70炮"
        width="80"
      />
      <el-table-column
        prop="lanzuan"
        label="80炮"
        width="80"
      />
      <el-table-column
        prop="lanzuan"
        label="90炮"
        width="80"
      />
      <el-table-column
        prop="lanzuan"
        label="100炮"
        width="80"
      />
      <el-table-column
        prop="lanzuan"
        label="150炮"
        width="80"
      />
      <el-table-column
        prop="lanzuan"
        label="200炮"
        width="80"
      />
      <el-table-column
        prop="lanzuan"
        label="250炮"
        width="80"
      />
      <el-table-column
        prop="lanzuan"
        label="300炮"
      />
    </el-table>
    <!-- 分页 -->
    <div class="block pagination">
      <el-pagination
        :current-page="currentPage3"
        :page-sizes="[100, 200, 300, 800]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="800"
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
      start: '', // 开始日期
      end: '', // 结束日期
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
          },
          {
            text: '当前月',
            onClick(picker) {
              const date = new Date()
              const day = now.getDate()// 得到日期
              console.log(day)
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', date)
            }
          }
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
  methods: {
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
   margin-left: 8%;
  p {
    display: inline-block;
    float: left;
    margin-right: 5px;
  }
}
.source{
  margin-left: 8%;
  display: inline-block;
   p {
    margin-right: 5px;
    float: left;
  }
  .paoshu-time{
    margin-left: 0%;
    display: inline-block;
    margin-right: 20px;
    float: left;
  }
}
.paoshu{
  float: left;
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
</style>
