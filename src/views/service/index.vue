<template>
  <div class="profit">
    <p class="keyword">充值记录查询</p>
    <table class="table select-tab">
      <tr>
        <td>玩家ID或账号</td>
        <td>
          <el-col
            :span="24"
            class="user"
          >
            <el-input
              v-model="memberId"
              placeholder="请输入玩家ID"
            />
          </el-col>
        </td>
      </tr>
      <tr>
        <td>订单号</td>
        <td>
          <el-col
            :span="24"
            class="user"
          >
            <el-input
              v-model="orderNo"
              placeholder="请输入订单号"
            />
          </el-col>
        </td>
      </tr>
      <!-- <tr>
        <td>渠道</td>
        <td>
          <el-select
            v-model="source"
            placeholder="请选择"
          >
            <el-option
              v-for="item in sources"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </td>
      </tr> -->
      <tr>
        <td>充值结果</td>
        <td>
          <el-select
            v-model="state"
            placeholder="请选择"
          >
            <el-option
              v-for="item in status"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </td>
      </tr>
      <tr>
        <td>订单类型</td>
        <td>
          <el-select
            v-model="orderType"
            placeholder="请选择"
          >
            <el-option
              v-for="item in orderTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </td>
      </tr>
      <!-- <tr>
        <td>充值范围</td>
        <td>
          <el-col
            :span="24"
            class="user"
          >
            <el-input placeholder="请输入" />
          </el-col>
        </td>
      </tr> -->
      <tr>
        <td>时间</td>
        <td>
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
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <el-button type="primary" @click="handleData">查询</el-button>
          <!-- <el-button type="primary">统计</el-button> -->
          <el-button
            class="excel"
            type="primary"
            :loading="downloadLoading"
            icon="el-icon-document"
            @click="handleDownload"
          >导出到excel</el-button>
          <!-- <el-button type="primary">通过爱贝充值查询</el-button> -->
        </td>
      </tr>
    </table>

    <!-- 数据表格 -->
    <el-table
      v-show="tableData.length>0"
      v-loading="listLoading"
      :data="tableData"
      border
      fit
      highlight-current-row
      style="width: 100%"
      :header-cell-style="{'text-align':'center'}"
      :cell-style="{'text-align':'center'}"
      class="table"
      element-loading-text="拼命加载中"
    >
      <el-table-column
        fixed
        prop="createTime"
        label="充值时间"
      />
      <el-table-column
        fixed
        prop="memberId"
        label="玩家ID"
      />
      <el-table-column
        prop="orderId"
        label="订单ID"
      />
      <el-table-column
        prop="orderType"
        label="订单类型"
      />

      <el-table-column
        prop="amount"
        label="充值金额"
      />
      <el-table-column
        label="充值状态"
      >
        <template slot-scope="scope">
          {{ scope.row.status ==='0'?'创建订单':(scope.row.status ==='100'?'全部完成':'到账') }}
        </template>
      </el-table-column>
      <el-table-column
        prop="outerOrderId"
        label="外部订单号"
      />
      <el-table-column
        prop="channel"
        label="channel"
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
import { parseTime } from '@/utils'
import { getRechargeRecord } from '@/api/service'
export default {
  data() {
    return {
      listLoading: false, // 加载中
      downloadLoading: false, // 导出到excel
      memberId: '', // 用户ID
      orderNo: '', // 订单号
      state: '100', // 充值状态
      // source: '', // 渠道
      orderType: '16', // 订单类型
      orderTypes: [
        {
          value: '16',
          label: '首充'
        },
        {
          value: '1010',
          label: '开服聚惠'
        },
        {
          value: '15',
          label: '月卡'
        },
        {
          value: '17',
          label: '168万炮礼包'
        },
        {
          value: '1',
          label: '300000金币'
        },
        {
          value: '2',
          label: '900000金币'
        },
        {
          value: '3',
          label: '1500000金币'
        },
        {
          value: '4',
          label: '4900000金币'
        },
        {
          value: '5',
          label: '9900000金币'
        },
        {
          value: '6',
          label: '16400000金币'
        },
        {
          value: '7',
          label: '32400000金币'
        },
        {
          value: '8',
          label: '60钻石'
        },
        {
          value: '9',
          label: '180钻石'
        },
        {
          value: '10',
          label: '300钻石'
        },
        {
          value: '11',
          label: '980钻石'
        },
        {
          value: '12',
          label: '1980钻石'
        },
        {
          value: '13',
          label: '3280钻石'
        },
        {
          value: '14',
          label: '6480钻石'
        }
      ],
      // sources: [
      //   {
      //     value: '选项1',
      //     label: '全部'
      //   }
      // ],
      status: [
        {
          value: '100',
          label: '全部完成'
        },
        {
          value: '9',
          label: '到账'
        },
        {
          value: '0',
          label: '创建订单'
        }
      ],
      DataSelect: [],
      beginTime: new Date(),
      endTime: new Date(),
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
      tableData: [],
      total: 0,
      pageSize: 30,
      page: 1

    }
  },
  created() {
    this.DataSelect = this.DataSelect.concat([this.beginTime, this.endTime])
    this.selectData()
  },
  methods: {
    selectData() {
      const params = {
        memberId: this.memberId,
        orderNo: this.orderNo,
        status: this.state,
        orderType: this.orderType,
        beginTime: this.beginTime,
        endTime: this.endTime,
        size: this.pageSize,
        page: this.page

      }
      this.listLoading = true
      getRechargeRecord(params)
        .then(res => {
          console.log(res)
          this.listLoading = false
          this.total = res.totalElements
          this.tableData = res.content
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
    handleDownload() { // 导出到excel
      this.downloadLoading = true

      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['玩家ID', '订单ID', '订单类型', '充值金额', '充值状态', '外部订单号', 'channel']
        const filterVal = ['memberId', 'orderId', 'orderType', 'amount', 'status', 'outerOrderId', 'channel']
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    },
    handleSizeChange(val) {
      this.page = 1
      this.pageSize = val
      this.selectData()
    },
    handleCurrentChange(val) {
      this.page = val
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
  margin-left: 20px;
  p {
    margin: 0;
    margin-top: 12px;
    display: inline-block;
    float: left;
    margin-right: 5px;
  }
  .user {
    margin-right: 4px;
  }
}
.source {
  margin-left: 3%;
  display: inline-block;
  p {
    margin-right: 5px;
    float: left;
  }
}
.attris {
  margin-top: 10px;
}
.time {
  clear: both;
  margin: 10px 0;
  text-align: center;
  display: inline-block;
}

.table {
  margin: 20px 0;
  border-bottom: none;
}
.select-tab {
  margin-left: 32%;
  tr,
  th,
  td {
    padding: 12px;
    text-align: center;
  }
  margin-bottom: 50px;
}
.download {
  clear: both;
  padding: 15px 25px 0 0;
  .excel {
    float: right;
  }
}
.pagination {
  float: right;
}
.keyword {
  margin: 30px 0;
  clear: both;
  width: 100%;
  text-align: center;
  font-weight: bold;
}
</style>
