<template>
  <div class="profit">

    <div class="userID">
      <!-- 查询玩家ID -->
      <div class="source">
        <p>玩家ID</p>
        <el-col
          :span="14"
          class="user"
        >
          <el-input
            v-model="input"
            placeholder="请输入内容"
          />
        </el-col>
        <el-button type="primary">查询</el-button>
      </div>
    </div>
    <!-- 数据表格 -->
    <table class="table">
      <tr>

        <th>操作内容</th>
        <th>现值</th>
        <th>修改值</th>
        <th>操作</th>
      </tr>
      <tr>
        <th>VIP经验值</th>
        <td>
          <el-col :span="16" class="val-input">
            <el-input />
          </el-col>
        </td>
        <td>
          <el-col :span="16" class="val-input">
            <el-input />
          </el-col>
        </td>
        <td><el-button type="success" class="button">增加</el-button></td>
      </tr>
      <tr>
        <th>金币</th>
        <td>
          <el-col :span="16" class="val-input">
            <el-input />
          </el-col>
        </td>
        <td>
          <el-col :span="16" class="val-input">
            <el-input />
          </el-col>
        </td>
        <td>
          <el-button type="success" class="button">增加</el-button>
          <el-button type="danger" class="button">减少</el-button>
        </td>
      </tr>
      <tr>
        <th>钻石</th>
        <td>
          <el-col :span="16" class="val-input">
            <el-input />
          </el-col>
        </td>
        <td>
          <el-col :span="16" class="val-input">
            <el-input />
          </el-col>
        </td>
        <td>
          <el-button type="success" class="button">增加</el-button>
          <el-button type="danger" class="button">减少</el-button>
        </td>
      </tr>
      <tr>
        <th>龙牌</th>
        <td>
          <el-col :span="16" class="val-input">
            <el-input />
          </el-col>
        </td>
        <td>
          <el-col :span="16" class="val-input">
            <el-input />
          </el-col>
        </td>
        <td>
          <el-button type="success" class="button">增加</el-button>
          <el-button type="danger" class="button">减少</el-button>
        </td>
      </tr>
      <tr>
        <th>踢出</th>
        <td />
        <td />
        <td><el-button type="danger" class="button">踢出玩家</el-button></td>
      </tr>
      <tr>
        <th>引导礼包</th>
        <td />
        <td />
        <td><el-button type="warning" class="button">重置所有玩家引导礼包状态</el-button></td>
      </tr>
    </table>
  </div></template>
<script >
export default {
  data() {
    return {
      tableData: [
        { id: '1', name: '122', sex: 'wewe', ops: 'sdfsf' },
        { id: '2', name: '122', sex: 'wewe', ops: 'sdfsf' }
      ],
      input: '', // 用户ID
      value: '', // 渠道
      options: [
        {
          value: '选项1',
          label: '彩券'
        },
        {
          value: '选项2',
          label: '其他'
        }
      ]
    }
  },
  methods: {

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
  }
}
.source {
  margin: 5px 0 5px 10%;
  display: inline-block;
  p {
    margin: 12px 4px 0 0;
    float: left;
  }
}
.table {
    width:85%;
   border-collapse: collapse;
   margin:50px 8%;
  th,
  td {
      padding: 12px 0;
    text-align: center;
    min-height: 40px;
    border: 1px solid #ebeef5;
  }
  .val-input{
      margin-left: 5%;
  }
  .button{
      margin: 0 5px;
  }
}
</style>
