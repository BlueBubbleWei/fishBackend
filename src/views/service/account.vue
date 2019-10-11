<template>
  <div class="account">
    <!-- 账号查询 -->
    <table class="stop">
      <tr>
        <th colspan="3">账号查询</th>
      </tr>
      <tr>
        <td>
          玩家ID、昵称或登录IP
        </td>
        <td>
          <el-input
            v-model="stopID"
            placeholder="请输入用户ID"
          />
        </td>
        <td>
          <el-button
            type="primary"
            @click="selectID(stopID)"
          >查询</el-button>
        </td>
      </tr>
    </table>
    <el-table
      v-if="showUInfo"
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
        label="用户账号"
      />
      <el-table-column
        fixed
        prop="date"
        label="玩家ID"
      />
      <el-table-column
        fixed
        prop="date"
        label="昵称"
      />
      <el-table-column
        fixed
        prop="date"
        label="渠道"
      />
      <el-table-column
        fixed
        prop="date"
        label="角色创建时间"
      />
      <el-table-column
        fixed
        prop="date"
        label="VIP等级"
      />
      <el-table-column
        fixed
        prop="date"
        label="最大炮倍"
      />
      <el-table-column
        fixed
        prop="date"
        label="上次登录时间"
      />
      <el-table-column
        fixed
        prop="name"
        label="上次登录IP"
      />
      <el-table-column
        fixed
        prop="name"
        label="金币数量"
      />
      <el-table-column
        fixed
        prop="date"
        label="钻石数量"
      />
      <el-table-column
        fixed
        prop="date"
        label="账号状态"
      />
      <el-table-column
        fixed
        prop="date"
        label="背包查询"
      />
    </el-table>
    <hr class="nap">
    <!-- 停封玩家 -->
    <table class="stop">
      <tr>
        <th colspan="3">停封玩家</th>
      </tr>
      <tr>
        <td>
          玩家ID
        </td>
        <td>
          <el-input
            v-model="stopID"
            placeholder="请输入用户ID"
          />
        </td>
        <td>
          <el-button
            type="primary"
            @click="selectID(stopID)"
          >查询</el-button>
        </td>
      </tr>
      <tr>
        <td>
          停封备注
        </td>
        <td>
          <el-input
            v-model="other"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
          />
        </td>
        <td>
          <el-button
            class="other"
            type="danger"
            @click="stop"
          >停封用户
          </el-button>
        </td>
      </tr>
    </table>

    <hr class="nap">
    <!-- 解封玩家 -->
    <table class="stop">
      <tr>
        <th colspan="3">解封玩家</th>
      </tr>
      <tr>
        <td>
          玩家ID
        </td>
        <td>
          <el-input
            v-model="startID"
            placeholder="请输入用户ID"
          />
        </td>
        <td>
          <el-button
            type="primary"
            @click="selectID(startID)"
          >查询</el-button>
        </td>
      </tr>
      <tr>
        <td>
          停封原因
        </td>
        <td>
          <el-input
            v-model="startOther"
            type="textarea"
            :rows="2"
          />
        </td>
        <td>
          <el-button
            class="other"
            type="danger"
            @click="start"
          >解封用户
          </el-button>
        </td>
      </tr>
    </table>
    <hr class="nap">
    <!-- 重置密码 -->
    <table class="stop reset">
      <tr>
        <th colspan="2">重置密码</th>
      </tr>
      <tr>
        <td>
          类型
        </td>
        <td>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </td>
      </tr>
      <tr>
        <td>
          玩家ID
        </td>
        <td>
          <el-input
            v-model="resetID"
            placeholder="请输入用户ID"
          />
        </td>
      </tr>
      <tr>
        <td>
          新密码
        </td>
        <td>
          <el-input
            v-model="resetPW"
            type="password"
            placeholder="请输入新密码"
          />
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <el-button type="primary">
            重置
          </el-button>
        </td>
      </tr>
    </table>
    <hr class="nap">
    <!-- 添加账号 -->
    <table class="stop new">
      <tr>
        <th colspan="2">添加账号</th>
      </tr>
      <tr>
        <td>
          玩家ID
        </td>
        <td>
          <el-input
            v-model="resetID"
            placeholder="请输入用户ID"
          />
        </td>
      </tr>
      <tr>
        <td>
          新密码
        </td>
        <td>
          <el-input
            v-model="resetPW"
            type="password"
            placeholder="请输入新密码"
          />
          <p>请输入6-14位字符，允许字母和数字</p>
        </td>
      </tr>
      <tr>
        <td>
          确认密码
        </td>
        <td>
          <el-input
            v-model="resetPW"
            type="password"
            placeholder="请再次输入密码"
          />
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <el-button type="primary">
            确定
          </el-button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Account',
  data() {
    return {
      stopID: '',
      other: '',
      startID: '',
      startOther: '',
      showUInfo: false,
      resetID: '',
      resetPW: '',
      tableData3: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      value: '', // 渠道
      options: [{
        value: '选项1',
        label: '登录密码'
      }, {
        value: '选项2',
        label: '保险箱密码'
      }]
    }
  },
  methods: {
    selectID(val) {
      if (val.length === 0) {
        this.$message('请输入停封用户ID')
      } else {
        this.$message('用户不存在')
      }
    },
    stop() {
      if (this.stopID.length > 0) {
        this.$confirm('确认停封玩家?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$message({
              type: 'success',
              message: '玩家 ' + this.stopID + ' 已被停封!'
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
      } else {
        this.$message('请输入停封用户ID')
      }
    }, start() {
      if (this.startID.length > 0) {
        this.$confirm('确认解封玩家?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$message({
              type: 'success',
              message: '玩家 ' + this.startID + ' 已被解封'
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
      } else {
        this.$message('请输入停封用户ID')
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.stop{
    width: 100%;
    margin: 0 auto;
    padding: 0 30%;
    tr,th,td{
        text-align: center;
        padding: 12px 0;
    }
}
.reset{
    padding: 0 35%;
}
.new{
    padding: 0 35% 0 34%;
    p{
        margin: 0;
        padding: 0;
        font-size: 12px;
        color: red;
    }
}
.nap {
  height: 1px;
  border: none;
  border-top: 1px dashed #454545;
  margin: 20px 5%;
}
</style>
