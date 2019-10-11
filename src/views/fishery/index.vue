<template>
  <div class="profit">

    <div class="userID">
      <!-- 查询玩家ID -->
      <div class="source">
        <p>排行方式</p>
        <el-select
          v-model="way"
          placeholder="请选择"
        >
          <el-option
            v-for="item in ways"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button type="primary">查询</el-button>
      </div>

      <!-- 查询渠道 -->
      <div class="source">
        <p>榜单</p>
        <el-select
          v-model="bangdan"
          placeholder="请选择"
        >
          <el-option
            v-for="item in order"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button type="primary">查询</el-button>
      </div>

      <!-- 查询时间 -->
      <div class="source">
        <p>渠道</p>
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
        prop="ID"
        label="玩家ID"
      />
      <el-table-column
        fixed
        prop="ID"
        label="渠道"
      />
      <el-table-column
        fixed
        prop="ID"
        label="排行"
      />
      <el-table-column
        fixed
        prop="ID"
        label="增长值"
      />
      <el-table-column
        fixed
        prop="ID"
        label="累计充值"
      />
      <el-table-column
        fixed
        prop="ID"
        label="当日累计充值"
      />
      <el-table-column
        fixed
        prop="ID"
        label="最后登录"
      />
    </el-table>

  </div>
</template>
<script >
export default {
  data() {
    return {
      input: '', // 用户ID
      way: '',
      value: '', // 渠道
      bangdan: '',
      order: [
        {
          value: '选项1',
          label: '金币榜'
        },
        {
          value: '选项2',
          label: '钻石榜'
        }
      ],
      options: [
        {
          value: '选项1',
          label: 'QQ'
        },
        {
          value: '选项2',
          label: '其他'
        }
      ],
      ways: [
        {
          value: '选项1',
          label: '增长'
        },
        {
          value: '选项2',
          label: '净增长'
        }
      ],
      tableData3: [
        {
          date: '2016-05-02',
          ID: '30',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    }
  },
  methods: {}
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
.source {
  margin-left: 10%;
  display: inline-block;
  p {
    margin:12px 5px 0 0;
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
  th, td {
    text-align: center;
  }
}
.pagination {
  float: right;
}
</style>
