<template>
  <div class="profit">

    <!-- 查询玩家ID -->
    <div class="source">
      <p>玩家ID</p>
      <el-col
        :span="14"
        class="user"
      >
        <el-input
          v-model="input"
          placeholder="请输入"
        />
      </el-col>
      <el-button type="primary">查询</el-button>
    </div>

    <!-- 空投状态 -->
    <div class="source">
      <p>空投状态</p>
      <el-select
        v-model="state"
        placeholder="请选择"
      >
        <el-option
          v-for="item in states"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button type="primary">查询</el-button>
    </div>

    <!-- 操作 -->
    <div class="source">
      <p>操作</p>
      <el-select
        v-model="operate"
        placeholder="请选择"
      >
        <el-option
          v-for="item in operations"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button type="primary">查询</el-button>
    </div>
    <!-- 发布表格 -->
    <p class="keyword">发布表格</p>
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
        fixed
        prop="ID"
        label="空投人"
      />
      <el-table-column
        fixed
        prop="ID"
        label="空投ID"
      />
      <el-table-column
        fixed
        prop="ID"
        label="空投暗码"
      />
      <el-table-column
        fixed
        prop="ID"
        label="空投道具：数量"
      />
      <el-table-column
        fixed
        prop="ID"
        label="空投数量"
      />
      <el-table-column
        fixed
        prop="ID"
        label="领取人"
      />
      <el-table-column
        fixed
        prop="ID"
        label="被打开次数"
      />
      <el-table-column
        fixed
        prop="ID"
        label="打开人数"
      />
      <el-table-column
        fixed
        prop="ID"
        label="打开次数收入总计"
      />
      <el-table-column
        fixed
        prop="ID"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleClick(scope.row)"
          >{{ scope.row.operate }}</el-button>
        </template>
      </el-table-column>
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
    <p class="keyword">打开表格</p>
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
        fixed
        prop="date"
        label="空投道具"
      />
      <el-table-column
        fixed
        prop="date"
        label="打开人"
      />
      <el-table-column
        fixed
        prop="date"
        label="打开空投编号"
      />
      <el-table-column
        fixed
        prop="date"
        label="空投道具：数量"
      />
      <el-table-column
        fixed
        prop="date"
        label="空投密码"
      />
      <el-table-column
        fixed
        prop="date"
        label="被打开次数"
      />
      <el-table-column
        fixed
        prop="date"
        label="打开消耗金币"
      />
      <el-table-column
        fixed
        prop="date"
        label="领取状态"
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
      operate: '',
      value: '', // 渠道
      state: '',
      states: [
        {
          value: '选项1',
          label: '绿龙弹'
        },
        {
          value: '选项2',
          label: '金龙弹'
        },
        {
          value: '选项3',
          label: '紫龙弹'
        },
        {
          value: '选项4',
          label: '彩龙弹'
        }
      ],
      operations: [
        {
          value: '选项1',
          label: '打开'
        },
        {
          value: '选项2',
          label: '发布'
        }
      ],
      tableData3: [
        {
          date: '2016-05-02',
          ID: '30',
          address: '上海市普陀区金沙江路 1518 弄',
          operate: '打开'
        },
        {
          date: '2016-05-02',
          ID: '30',
          address: '上海市普陀区金沙江路 1518 弄',
          operate: '发布'
        }
      ],
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    }
  },
  methods: {
    handleClick(row) {
      console.log(row)
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

.source {
  margin-left: 10%;
  display: inline-block;
  p {
    margin: 12px 5px 0 0;
    float: left;
  }
  .user {
    margin-right: 4px;
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
  th,
  td {
    text-align: center;
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
