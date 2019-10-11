<template>
  <div class="profit">

    <div class="userID">
      <!-- 查询玩家ID -->
      <p>玩家ID或账号</p>
      <el-col
        :span="3"
        class="user"
      >
        <el-input
          v-model="input"
          placeholder="请输入"
        />
      </el-col>
      <el-button type="primary">查询</el-button>
      <!-- 查询渠道 -->
      <div class="source">
        <p>所在游戏</p>
        <el-select
          v-model="game"
          placeholder="请选择"
        >
          <el-option
            v-for="item in games"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button type="primary">查询</el-button>
      </div>
      <div class="source">
        <p>变化原因</p>
        <el-select
          v-model="reason"
          placeholder="请选择"
        >
          <el-option
            v-for="item in reasons"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button type="primary">查询</el-button>
      </div>

      <div class="source">
        <p>属性</p>
        <el-select
          v-model="value"
          placeholder="请选择"
        >
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
        <el-button type="primary">查询</el-button>
      </div>
    </div>
    <!-- 数据表格 -->
    <el-table
      v-loading="listLoading"
      :data="tableData3"
      border
      highlight-current-row
      style="width: 100%"
      :header-cell-style="{'text-align':'center'}"
      :cell-style="{'text-align':'center'}"
      class="table"
      element-loading-text="拼命加载中"
    >
      <el-table-column
        fixed
        prop="date"
        label="时间"
        width="100"
      />
      <el-table-column
        fixed
        prop="date"
        label="玩家ID"
        width="100"
      />
      <el-table-column
        prop="source"
        label="玩家昵称"
        width="100"
      />
      <el-table-column
        prop="total"
        label="属性"
        width="100"
      />
      <el-table-column
        prop="lanzuan"
        label="变化原因"
        width="200"
      />
      <el-table-column
        prop="payPersons"
        label="初始值"
        width="100"
      />
      <el-table-column
        prop="payNums"
        label="结束值"
        width="100"
      />
      <el-table-column
        prop="ARPPU"
        label="差值（结束值-初始值）"
        width="180"
      />
      <el-table-column
        prop="newPayUser"
        label="投注"
        width="100"
      />
      <el-table-column
        prop="newPayUserRate"
        label="返还"
        width="100"
      />
      <el-table-column
        prop="newPayUserRate"
        label="盈利"
        width="100"
      />
      <el-table-column
        prop="newPayUserRate"
        label="获胜盈利"
        width="100"
      />
      <el-table-column
        prop="newPayUserRate"
        label="所在游戏"
        width="100"
      />
      <el-table-column
        prop="newPayUserRate"
        label="备注"
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
    <div class="download">
      <el-button
        class="excel"
        type="primary"
        :loading="downloadLoading"
        icon="el-icon-document"
        @click="handleDownload"
      >导出到excel</el-button>
    </div>
  </div>
</template>
<script >
import { parseTime } from '@/utils'
export default {
  data() {
    return {
      listLoading: false, // 加载中
      downloadLoading: false, // 导出到excel
      input: '', // 用户ID
      value: '', // 渠道
      game: '', // 游戏
      reason: '', // 原因
      options: [
        {
          value: '选项1',
          label: '全部'
        },
        {
          value: '选项2',
          label: '金币'
        },
        {
          value: '选项3',
          label: '钻石'
        }
      ],
      games: [
        {
          value: '选项1',
          label: '全部'
        },
        {
          value: '选项2',
          label: '大厅'
        },
        {
          value: '选项3',
          label: '南海'
        },
        {
          value: '选项4',
          label: '竞技场'
        }
      ],
      reasons: [
        {
          value: '选项1',
          label: '全部'
        },
        {
          value: '选项2',
          label: '领取救济金'
        },
        {
          value: '选项3',
          label: '充值'
        },
        {
          value: '选项4',
          label: '领取邮件'
        },
        {
          value: '选项5',
          label: 'CDKEY'
        },
        {
          value: '选项6',
          label: '玩家升级'
        },
        {
          value: '选项7',
          label: '炮倍升级'
        },
        {
          value: '选项8',
          label: '首充'
        },
        {
          value: '选项9',
          label: '每日任务'
        },
        {
          value: '选项10',
          label: '每周任务'
        },
        {
          value: '选项11',
          label: '主线任务'
        },
        {
          value: '选项12',
          label: '使用鱼雷'
        },
        {
          value: '选项13',
          label: '打开空投'
        },
        {
          value: '选项14',
          label: '手游引导'
        },
        {
          value: '选项15',
          label: '新手任务'
        },
        {
          value: '选项16',
          label: '每日签到'
        }
      ],
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
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['date', 'name', 'address']
        const filterVal = ['date', 'name', 'address']
        const list = this.tableData3
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
  margin:10px 0;
  text-align: center;
  display: inline-block;
}
.table {
  margin-top: 10px;
  border-bottom: none;
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
</style>
