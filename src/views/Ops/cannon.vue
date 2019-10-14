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
      :data="tableData"
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
            @change="startTime"
          />
        </div>
        <div class="block paoshu-time">
          <span class="demonstration">结束时间</span>
          <el-date-picker
            v-model="end"
            type="date"
            placeholder="选择日期"
            @change="endTime"
          />
        </div>
        <el-button type="primary" @click="handleSelect">确定</el-button>
      </div>

    </div>
    <el-table
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
        prop="registerTime"
        label="注册日期"
        width="180"
      />
      <el-table-column
        prop="day"
        label="天数"
        width="100"
      />
      <el-table-column v-for="(item, index) in nameList" :key="index" :label="item">
        <template slot-scope="scope">
          <span>{{ scope.row.list[index]?scope.row.list[index].num:0 }}</span>
        </template>
      </el-table-column>

    </el-table>
    <!-- 分页 -->
    <div class="block pagination">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[1, 10, 20, 30]"
        :page-size="1"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>

</template>
<script >
import { getGunLevelStatistics } from '@/api/Ops'
export default {
  data() {
    return {
      start: new Date(), // 开始日期
      end: new Date(), // 结束日期
      tableData: [],
      totalSize: 0,
      currentPage: 1,
      pageSize: 30,
      nameList: ['1炮', '5炮', '10炮', '20炮', '30炮', '40炮', '50炮', '60炮', '70炮', '80炮', '90炮', '100炮', '150炮', '200炮',
        '250炮', '300炮', '350炮', '400炮', '450炮', '500炮', '550炮', '600炮', '650炮', '700炮', '750炮', '800炮', '850炮', '950炮', '1000炮',
        '1500炮', '2000炮', '2500炮', '3000炮'
      ],
      fullData: []
    }
  },
  created() {
    this.getData()

    if (sessionStorage.getItem('cannonData_beginTime') !== null) {
      this.start = sessionStorage.getItem('cannonData_beginTime')
      this.end = sessionStorage.getItem('cannonData_endTime')
    } else {
      this.start = new Date()
      this.end = new Date()
    }
  },
  methods: {
    getData() {
      const params = {
        beginTime: this.start,
        endTime: this.end,
        page: this.currentPage,
        size: this.pageSize
      }
      sessionStorage.setItem('cannonData_beginTime', this.start)
      sessionStorage.setItem('cannonData_endTime', this.end)
      this.tableData = []
      getGunLevelStatistics(params).then(res => {
        const data = res.content
        data.map((item, index) => {
          const eachData = {}
          const list = []
          eachData['registerTime'] = item.registerTime
          eachData['day'] = item.day
          // 假设gunLevelList返回的是全部的数据，没有差值
          item.gunLevelList.map((ele, idx) => {
            list.push({ 'num': ele.num })
          })
          eachData['list'] = list
          this.tableData.push(eachData)
        })
        // console.log(this.nameList, 'this.nameList')
        console.log(this.tableData)
        this.totalSize = Number.parseInt(res.totalElements)
      }).catch(res => {
        this.$message({
          type: 'error',
          message: '获取列表失败'
        })
      })
    },
    handleSelect() {
      this.totalSize = 0
      this.currentPage = 1
      this.pageSize = 30
      this.getData()
    },
    startTime() {
      const date = new Date(this.start)
      return date.getFullYear() + '-' + this.p(date.getMonth() + 1) + '-' + date.getDate()
    },
    endTime() {
      const date = new Date(this.end)
      return date.getFullYear() + '-' + this.p(date.getMonth() + 1) + '-' + date.getDate()
    },
    p(s) {
      return s < 10 ? '0' + s : s
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.getData()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getData()
      console.log(`当前页: ${val}`)
    }
  },
  beforeRouteLeave(to, from, next) {
    sessionStorage.removeItem('cannonData_beginTime')
    sessionStorage.removeItem('cannonData_endTime')
  }
}
</script>
<style lang="scss" scoped>
.profit {
  padding: 10px;
}
.userID {
   margin-left: 31%;
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
      margin: 5px 0;
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
