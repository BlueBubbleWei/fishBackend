<template>
  <div class="profit">

    <div class="userID">
      <!-- 查询玩家ID -->
      <div class="source">
        <p>玩家ID</p>
        <el-col :span="14" class="user">
          <el-input
            v-model="input"
            placeholder="请输入内容"
          />
        </el-col>
        <el-button type="primary">查询</el-button>
      </div>

      <!-- 查询兑换类型 -->
      <div class="source">
        <p>兑换类型</p>
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
    </div>
    <!-- 数据表格 -->
    <el-table
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
        label="玩家ID"
      />
      <el-table-column
        prop="total"
        label="历史充值金额"
      />
      <el-table-column
        prop="lanzuan"
        label="道具名称"
      />
      <el-table-column
        prop="payPersons"
        label="手机号"
      />
      <el-table-column
        prop="payNums"
        label="绑定手机号"
      />
      <el-table-column
        prop="ARPPU"
        label="兑换ID"
      />
      <el-table-column
        prop="ARPPU"
        label="数量"
      />
      <el-table-column
        prop="ARPPU"
        label="领取时间"
      />
      <el-table-column
        prop="ARPPU"
        label="成功时间"
      />
      <el-table-column
        prop="ARPPU"
        label="兑换状态"
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
      input: '', // 用户ID
      value: '', // 渠道
      options: [{
        value: '选项1',
        label: '彩券'
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
  p {
    display: inline-block;
    float: left;
     margin:12px 4px 0 0;
  }
  .user{
    margin-right: 4px;
  }
}
.source{
  margin:5px 0 5px 10%;
  display: inline-block;
   p {
    margin:12px 4px 0 0;
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
