<template>
  <div class="profit">

    <div class="userID">
      <!-- 查询玩家ID -->
      <div class="first">
        <div class="source">
          <p>玩家ID</p>
          <div>
            <el-col
              :span="24"
              class="user"
            >
              <el-input
                v-model="memberId"
                placeholder="请输入玩家ID"
              />
            </el-col>
          </div>
        </div>
        <!-- <div class="source">
          <p>渠道</p>
          <el-select v-model="source" placeholder="请选择">
            <el-option
              v-for="item in sources"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div> -->

        <div class="block time">
          <span class="demonstration">选择时间</span>
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
        </div>
        <el-button type="primary" @click="handleData">查询</el-button>
      </div>
    </div>
    <!-- 数据表格 -->
    <el-table
      v-show="tableData.length>0"
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
        prop="memberId"
        label="玩家ID"
      />
      <!-- <el-table-column
        prop="source"
        label="渠道"
      /> -->
      <el-table-column
        prop="violentQty"
        label="狂暴数量"
      />
      <!-- <el-table-column
        prop="lanzuan"
        label="精准数量"
      /> -->
      <el-table-column
        prop="frozenQty"
        label="冰冻数量"
      />
      <el-table-column
        prop="summonRingQty"
        label="召唤数量"
      />
      <el-table-column
        prop="hornQty"
        label="号角数量"
      />
      <!-- <el-table-column
        prop="newPayUser"
        label="使用精准数量"
      /> -->
      <el-table-column
        prop="useViolentQty"
        label="使用狂暴数量"
      />
      <el-table-column
        prop="useFrozenQty"
        label="使用冰冻数量"
      />
      <el-table-column
        prop="useSummonRingQty"
        label="使用召唤数量"
      />
      <el-table-column
        prop="useHornQty"
        label="使用号角数量"
      />
      <el-table-column
        prop="almsNum"
        label="领取救济金次数"
      />
    </el-table>
  </div>
</template>
<script >
import { getMemberPropInfo } from '@/api/player'
export default {
  data() {
    return { memberId: '', // 用户ID
      source: '', // 渠道
      sources: [
        {
          value: '选项1',
          label: 'QQ'
        },
        {
          value: '选项2',
          label: '其他'
        }
      ],
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
    this.DataSelect = this.DataSelect.concat([this.beginTime, this.endTime])
  },
  methods: {
    selectData() {
      // 必须输入参数
      this.tableData = []
      if (this.memberId.length === 0) {
        this.$message('请输入玩家ID')
        return
      }
      const params = {
        beginTime: this.beginTime,
        endTime: this.endTime,
        memberId: this.memberId
      }
      getMemberPropInfo(params)
        .then(res => {
          console.log(res)
          this.tableData.push(res)
          // console.log(this.tableData)
        })
        .catch(res => {
          this.$message({
            type: 'error',
            message: '获取数据失败'
          })
        })
    },
    handleData() {
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
  p {
    display: inline-block;
    float: left;
    margin: 12px 4px 0 0;
  }
  .user {
    margin-right: 4px;
    float: left;
  }
}

.source {
  margin: 20px;
  p {
    margin: 10px 4px;
    float: left;
  }
  div{
    float: left;
  }
}
.first {
  display: flex;
  justify-content: center;
  align-items: center;
}
.time {
  margin-right: 4px;
}
.table {
  margin-top: 10px;
  border-bottom: none;
}
.pagination{
  float: right;
}
</style>
