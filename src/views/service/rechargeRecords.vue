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
              v-model="input"
              placeholder="请输入"
            />
          </el-col>
        </td>
      </tr>
      <tr>
        <td>查询参数</td>
        <td>
          <el-col
            :span="24"
            class="user"
          >
            <el-input
              v-model="input"
              placeholder="请输入"
            />
          </el-col>
        </td>
      </tr>
      <tr>
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
      </tr>
      <tr>
        <td>充值结果</td>
        <td>
          <el-select
            v-model="result"
            placeholder="请选择"
          >
            <el-option
              v-for="item in results"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </td>
      </tr>
      <tr>
        <td>付费点</td>
        <td>
          <el-select
            v-model="place"
            placeholder="请选择"
          >
            <el-option
              v-for="item in places"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </td>
      </tr>
      <tr>
        <td>充值范围</td>
        <td>
          <el-col
            :span="24"
            class="user"
          >
            <el-input placeholder="请输入" />
          </el-col>
        </td>
      </tr>
      <tr>
        <td>时间</td>
        <td>
          <div class="block time">
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
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <el-button type="primary">查询</el-button>
          <el-button type="primary">统计</el-button>
          <el-button
            class="excel"
            type="primary"
            :loading="downloadLoading"
            icon="el-icon-document"
            @click="handleDownload"
          >导出到excel</el-button>
          <el-button type="primary">通过爱贝充值查询</el-button>
        </td>
      </tr>
    </table>

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
      result: '', // 充值结果
      source: '', // 渠道
      place: '', // 付费点
      places: [
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
      sources: [
        {
          value: '选项1',
          label: '全部'
        },
        {
          value: '选项2',
          label: 'QQ'
        },
        {
          value: '选项3',
          label: '其他'
        },
        {
          value: '选项4',
          label: '竞技场'
        }
      ],
      results: [
        {
          value: '选项1',
          label: '全部'
        },
        {
          value: '选项2',
          label: '领取救济金'
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
  margin: 10px 0;
  text-align: center;
  display: inline-block;
}

.table {
  margin: 20px 0;
  border-bottom: none;
}
.select-tab {
  margin-left: 34%;
  tr,
  th,
  td {
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
