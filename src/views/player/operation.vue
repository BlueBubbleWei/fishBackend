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
            placeholder="请输入玩家ID"
          />
        </el-col>
        <el-button
          type="primary"
          @click="handleData"
        >查询</el-button>
      </div>
      <el-table
        v-show="tableData.length>0"
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
            <el-input v-model="curVip" />
          </el-col>
        </td>
        <td>
          <el-col
            :span="16"
            class="val-input"
          >
            <el-input
              v-model="modifiedVip"
              placeholder="请输入修改值"
            />
          </el-col>
        </td>
        <td>
          <el-button
            type="success"
            class="button"
            @click="modifyVip"
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
            <el-input v-model="curCoin" />
          </el-col>
        </td>
        <td>
          <el-col
            :span="16"
            class="val-input"
          >
            <el-input
              v-model="modifiedCoin"
              placeholder="请输入修改值"
            />
          </el-col>
        </td>
        <td>
          <el-button
            type="success"
            class="button"
            @click="modifyCoin('add')"
          >增加</el-button>
          <el-button
            type="danger"
            class="button"
            @click="modifyCoin('cut')"
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
            <el-input v-model="curDiamond" />
          </el-col>
        </td>
        <td>
          <el-col
            :span="16"
            class="val-input"
          >
            <el-input
              v-model="modifiedDiamond"
              placeholder="请输入修改值"
            />
          </el-col>
        </td>
        <td>
          <el-button
            type="success"
            class="button"
            @click="modifyDiamond('add')"
          >增加</el-button>
          <el-button
            type="danger"
            class="button"
            @click="modifyDiamond('cut')"
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
            <el-input v-model="curDragon" />
          </el-col>
        </td>
        <td>
          <el-col
            :span="16"
            class="val-input"
          >
            <el-input
              v-model="modifiedDragon"
              placeholder="请输入修改值"
            />
          </el-col>
        </td>
        <td>
          <el-button
            type="success"
            class="button"
            @click="modifyDragon('add')"
          >增加
          </el-button>
          <el-button
            type="danger"
            class="button"
            @click="modifyDragon('cut')"
          >减少
          </el-button>
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
            <el-input
              v-model="tickId"
              placeholder="请输入玩家ID"
            />
          </el-col>
        </td>
        <td colspan="2">
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
            <el-input
              v-model="resetId"
              placeholder="请输入玩家ID"
            />
          </el-col>
        </td>

        <td colspan="2">
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
import {
  getMemberGameInfo,
  resetMemberGiftPackage,
  kickOffMember,
  updateMemberVipExp,
  updateMemberPropInfo
} from '@/api/player'
export default {
  data() {
    return {
      tableData: [],
      memberId: '', // 用户ID
      curVip: '',
      modifiedVip: '',
      curCoin: '',
      modifiedCoin: '',
      curDiamond: '',
      modifiedDiamond: '',
      curDragon: '',
      modifiedDragon: '',
      tickId: '', // 剔除玩家ID
      resetId: '', // 重置玩家礼包ID
      flag: ''// 1 钻石 2 金币 3 龙弹

      //   value: '', // 渠道
      //   options: [
      //     {
      //       value: '选项1',
      //       label: '彩券'
      //     },
      //     {
      //       value: '选项2',
      //       label: '其他'
      //     }
      //   ]
    }
  },
  created() {},
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
          this.curVip = res.point
          this.curCoin = res.gold
          this.curDiamond = res.diamond
          this.curDragon = res.dragonBomb
          this.tickId = this.memberId
          this.resetId = this.memberId
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
    justify(val) {
      if (this.memberId.length === 0) {
        this.$message('请先查询玩家ID是否存在')
        return
      } else if (val.length === 0) {
        this.$message('请输入修改值')
        return
      } else if (!parseFloat(val)) {
        this.$message('修改值为数值')
        return
      } else {
        return 1
      }
    },
    modifyVip() {
      // 修改VIP
      if (!this.justify(this.modifiedVip)) {
        return
      }
      const params = {
        memberId: this.memberId,
        count: this.modifiedVip
      }
      this.$confirm('确认修改VIP经验值？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          updateMemberVipExp(params)
            .then(res => {
              console.log('无请求成功标志')
              this.$message({
                type: 'success',
                message: '修改VIP成功!'
              })
            })
            .catch(res => {
              this.$message({
                type: 'error',
                message: '修改VIP失败'
              })
            })
        })
        .catch(() => {})
    },
    fetchData(params, msg1, msg2) {
      updateMemberPropInfo(params)
        .then(res => {
          console.log('无请求成功标志')
          // 更新修改后数据  置空修改值
          this.modifiedVip = ''
          this.modifiedCoin = ''
          this.modifiedDiamond = ''
          this.modifiedDragon = ''
          this.selectID()
          this.$message({
            type: 'success',
            message: msg1
          })
        })
        .catch(res => {
          this.$message({
            type: 'error',
            message: msg2
          })
        })
    },
    modifyCoin(msg) {
      // 修改金币
      if (!this.justify(this.modifiedCoin)) {
        return
      }
      const params = {
        memberId: this.memberId,
        count: this.modifiedCoin,
        flag: 1
      }
      if (msg === 'add') {
        if (this.modifiedCoin < 0) {
          this.$message('增加值必须为正数')
          return
        }
      } else {
        if (this.modifiedCoin < 0) {
          this.$message('减少值必须为正数')
          return
        }
        params['count'] = -this.modifiedCoin
      }
      this.$confirm('确认修改金币数量？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const msg1 = '修改金币数量成功'
          const msg2 = '修改金币数量失败'
          this.fetchData(params, msg1, msg2)
        })
        .catch(() => {})
    },
    modifyDiamond(msg) {
      // 修改钻石
      if (!this.justify(this.modifiedDiamond)) {
        return
      }
      const params = {
        memberId: this.memberId,
        count: this.modifiedDiamond,
        flag: 2
      }
      if (msg === 'add') {
        if (this.modifiedDiamond < 0) {
          this.$message('增加值必须为正数')
          return
        }
      } else {
        if (this.modifiedDiamond < 0) {
          this.$message('减少值必须为正数')
          return
        }
        params['count'] = -this.modifiedDiamond
      }
      this.$confirm('确认修改钻石数量？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const msg1 = '修改钻石数量成功'
          const msg2 = '修改钻石数量失败'
          this.fetchData(params, msg1, msg2)
        })
        .catch(() => {})
    },
    modifyDragon(msg) {
      // 修改龙牌
      if (!this.justify(this.modifiedDragon)) {
        return
      }
      const params = {
        memberId: this.memberId,
        count: this.modifiedDragon,
        flag: 3
      }
      if (msg === 'add') {
        if (this.modifiedDragon < 0) {
          this.$message('增加值必须为正数')
          return
        }
      } else {
        if (this.modifiedDragon < 0) {
          this.$message('减少值必须为正数')
          return
        }
        params['count'] = -this.modifiedDragon
      }
      this.$confirm('确认修改龙牌数量？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const msg1 = '修改龙牌数量成功'
          const msg2 = '修改龙牌数量失败'
          this.fetchData(params, msg1, msg2)
        })
        .catch(() => {})
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
          console.log('无请求成功标志')
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
.subKey {
  margin: 10px 0 0 0;
  padding: 0;
  width: 60px;
  float: left;
}
</style>
