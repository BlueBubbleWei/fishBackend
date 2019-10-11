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
            v-model="memberId"
            placeholder="请输入内容"
          />
        </el-col>
        <el-button type="primary" @click="handleData">查询</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        fit
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        style="width: 100%"
      >
        <el-table-column
          fixed
          prop="point"
          label="vip 经验"
        />
        <el-table-column
          fixed
          prop="gold"
          label="金币"
        />
        <el-table-column
          fixed
          prop="diamond"
          label="钻石"
        />
        <el-table-column
          fixed
          prop="dragonBomb"
          label="龙弹	"
        />
      </el-table>
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
          <el-col
            :span="16"
            class="val-input"
          >
            <el-input />
          </el-col>
        </td>
        <td>
          <el-col
            :span="16"
            class="val-input"
          >
            <el-input />
          </el-col>
        </td>
        <td>
          <el-button
            type="success"
            class="button"
          >增加</el-button>
        </td>
      </tr>
      <tr>
        <th>金币</th>
        <td>
          <el-col
            :span="16"
            class="val-input"
          >
            <el-input />
          </el-col>
        </td>
        <td>
          <el-col
            :span="16"
            class="val-input"
          >
            <el-input />
          </el-col>
        </td>
        <td>
          <el-button
            type="success"
            class="button"
          >增加</el-button>
          <el-button
            type="danger"
            class="button"
          >减少</el-button>
        </td>
      </tr>
      <tr>
        <th>钻石</th>
        <td>
          <el-col
            :span="16"
            class="val-input"
          >
            <el-input />
          </el-col>
        </td>
        <td>
          <el-col
            :span="16"
            class="val-input"
          >
            <el-input />
          </el-col>
        </td>
        <td>
          <el-button
            type="success"
            class="button"
          >增加</el-button>
          <el-button
            type="danger"
            class="button"
          >减少</el-button>
        </td>
      </tr>
      <tr>
        <th>龙牌</th>
        <td>
          <el-col
            :span="16"
            class="val-input"
          >
            <el-input />
          </el-col>
        </td>
        <td>
          <el-col
            :span="16"
            class="val-input"
          >
            <el-input />
          </el-col>
        </td>
        <td>
          <el-button
            type="success"
            class="button"
          >增加</el-button>
          <el-button
            type="danger"
            class="button"
          >减少</el-button>
        </td>
      </tr>
      <tr>
        <th>踢出</th>
        <td>
          <p class="subKey">玩家ID</p>
          <el-col
            :span="16"
            class="val-input"
          >
            <el-input v-model="tickId" placeholder="玩家ID" />
          </el-col>
        </td>
        <td />
        <td>
          <el-button
            type="danger"
            class="button"
            @click="tickOut"
          >踢出玩家</el-button>
        </td>
      </tr>
      <tr>
        <th>引导礼包</th>
        <td>
          <p class="subKey">玩家ID</p>
          <el-col
            :span="16"
            class="val-input"
          >
            <el-input v-model="resetId" placeholder="玩家ID" />
          </el-col>
        </td>
        <td />
        <td>
          <el-button
            type="warning"
            class="button"
            @click="resetStatus"
          >重置玩家礼包</el-button>
        </td>
      </tr>
    </table>
  </div>
</template>
<script >
import { getMemberGameInfo, resetMemberGiftPackage, kickOffMember } from '@/api/service'
export default {

  data() {
    return {
      tableData: [],
      memberId: '', // 用户ID
      value: '', // 渠道
      tickId: '', // 剔除玩家ID
      resetId: '', // 重置玩家礼包ID
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
  created() {
  },
  methods: {
    selectID() {
      // 查询用户列表
      this.tableData = []
      if (this.memberId.length === 0) {
        this.$message('请输入玩家ID')
        return
      }
      const params = {
        memberId: this.memberId
      }
      getMemberGameInfo(params)
        .then(res => {
          this.tableData.push(res)
        })
        .catch(res => {
          this.$message({
            type: 'error',
            message: '获取用户列表失败'
          })
        })
    },
    handleData() {
      // 查询
      this.selectID()
    },
    tickOut() {
      // 剔除玩家
      if (this.tickId.length === 0) {
        this.$message('请输入玩家ID')
        return
      }
      const params = {
        memberId: this.tickId
      }
      kickOffMember(params)
        .then(res => {
          console.log('无成功标志')
          this.$message({
            type: 'success',
            message: '已成功剔除玩家'
          })
        })
        .catch(res => {
          this.$message({
            type: 'error',
            message: '剔除玩家失败'
          })
        })
    },
    resetStatus() {
      // 重置玩家礼包
      if (this.resetId.length === 0) {
        this.$message('请输入玩家ID')
        return
      }
      const params = {
        memberId: this.resetId
      }
      resetMemberGiftPackage(params)
        .then(res => {
          console.log('无成功标志')
          this.$message({
            type: 'success',
            message: '已成功重置玩家礼包'
          })
        })
        .catch(res => {
          this.$message({
            type: 'error',
            message: '重置玩家礼包失败'
          })
        })
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
  width: 85%;
  border-collapse: collapse;
  margin: 50px 8%;
  th,
  td {
    padding: 12px 0;
    text-align: center;
    min-height: 40px;
    border: 1px solid #ebeef5;
  }
  .val-input {
    margin-left: 5%;
  }
  .button {
    margin: 0 5px;
  }
}
.subKey{
  margin: 10px 0 0 0;
  padding: 0;
  width: 60px;
  float: left;

}
</style>
