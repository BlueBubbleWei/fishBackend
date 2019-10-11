<template>
  <div class="flex-container">
    <div
      v-for="item in data"
      :key="item.id"
      class="flex-item"
    >
      <div class="profit-top">
        <svg-icon
          :icon-class="item.icon"
          class-name="profit-icon"
        />
        <h1>{{ item.num }}</h1>
        <p>{{ item.word }}</p>
      </div>
      <div
        class="profit-bot"
        @click="handleDetail(item.id, item.word)"
      >
        <p>详情</p>
        <svg-icon
          icon-class="right-arrow"
          class-name="detail-icon"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Home',
  data() {
    return {
      data: [
        {
          id: 1,
          word: '昨日收入（人民币）',
          icon: 'rmb',
          num: 36
        },
        {
          id: 2,
          word: '昨日DAU',
          icon: 'DAU',
          num: 25
        },
        {
          id: 3,
          word: '昨日ARPU',
          icon: 'ARPU',
          num: 25
        },
        {
          id: 4,
          word: '昨日ARPPU',
          icon: 'ARPPU',
          num: 25
        },
        {
          id: 5,
          word: '昨日新增用户',
          icon: 'newuser',
          num: 25
        },
        {
          id: 6,
          word: '昨日付费率',
          icon: 'pay',
          num: '78%'
        },
        {
          id: 7,
          word: '次日留存',
          icon: 'yestoday',
          num: 25
        },
        {
          id: 8,
          word: '3日留存',
          icon: '3days',
          num: 25
        },
        {
          id: 9,
          word: '7日留存',
          icon: '7days',
          num: 25
        },
        {
          id: 10,
          word: '30日留存',
          icon: '1month',
          num: 25
        }
      ]
    }
  },
  methods: {
    handleDetail(id, tit) {
      this.$router.push({ path: '/home/detail', query: { id: id, title: tit }})
      console.log('this.$router:', this.$router)
    }
  }
}
</script>

<style lang="scss" scoped>
.flex-container {
  display: -webkit-flex;
  display: flex;
  width: 100%;
  height: 100%;
  -webkit-flex-direction: row;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.flex-item {
  background-color: cornflowerblue;
  box-shadow: 3px 2px 3px #4a555f5e;
  width: 23.8%;
  height: 200px;
  margin: 10px;
  .profit-top {
    padding: 10px;
    border-bottom: 1px solid #666;
  }
  .profit-icon {
    height: 50px;
    width: 20%;
    float: left;
  }
  .profit-top h1 {
    margin: 10px 0;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 78%;
    float: left;
  }
  .profit-top p {
    clear: both;
    padding: 30px 10px 10px 0;
    text-align: right;
    font-weight: bold;
  }
  .profit-bot {
    padding: 20px 10px;
    clear: both;
    overflow: hidden;
    p {
      margin: 0;
      padding: 0;
      font-weight: bold;
      float: left;
      width: 40%;
    }
    .detail-icon {
      float: right;
    }
  }
}
</style>

