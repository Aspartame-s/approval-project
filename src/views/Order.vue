<template>
  <div class="common-bg">
    <app-header :titleName="title" :backShow="backShow"></app-header>
      <div class="tab">
        <tab :line-width="1" :custom-bar-width="getBarWidth" :scroll-threshold="5" bar-active-color="#1373FF">
          <tab-item :selected="storeTabFlag ? item.id == storeTabFlag : item.id == tabFlag" @on-item-click="onItemClick(item.url, item.id)" v-for="(item, index) in tabList" :key="index">{{item.title}}</tab-item>
          <!-- <tab-item @on-item-click="onItemClick2">待预约</tab-item>
          <tab-item @on-item-click="onItemClick3">待实施</tab-item>
          <tab-item @on-item-click="onItemClick4">实施中</tab-item>
          <tab-item @on-item-click="onItemClick5">待评价</tab-item> -->
        </tab>
      </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      title: "预约",
      backShow: false,
      getBarWidth: function (index) {
        return 0.8 + 'rem'
      },
      tabList: [
        {
          id: 1,
          title: '全部',
          url: '/order/alllist'
        },
        {
          id: 2,
          title: '待确认',
          url: '/order/staysubscribe'
        },
        {
          id: 3,
          title: '待实施',
          url: '/order/stayimplement'
        },
        {
          id: 4,
          title: '实施中',
          url: '/order/implementing'
        },
        {
          id: 5,
          title: '待评价',
          url: '/order/stayevaluate'
        }
      ],
      tabFlag: 1,
      storeTabFlag: this.$store.state.tabFlag
    };
  },
  computed: {},
  watch: {},
  methods: {
    skip() {
      this.$router.push("/orderapply").catch((err) => {
        err;
      });
    },
    onItemClick(e, id) {
      console.log(id)
      localStorage.setItem('flag', id) //防止刷新页面后 tab栏状态不对 vuex刷新后数据丢失 刷新后就会回到全部的状态下 实际页面可能不是全部
      this.$store.commit('setTabFlag', {tabFlag: id})
       this.$router.push(e).catch((err) => {
        err;
      });
    }
  },
  created() {
    this.storeTabFlag = localStorage.getItem('flag')
  },
  mounted() {
    console.log(this.$store.state.tabFlag)
    console.log(localStorage.getItem('flag'))
  },
  beforeRouteLeave(to, from, next) {
    console.log(to)
    if(to.name !== 'Subscribe') {
      this.$store.commit('setTabFlag', {tabFlag: null})
      // localStorage.clear('flag')
      localStorage.removeItem('flag')
    }
    next()
  }
};
</script>
<style lang='scss' scoped>
.btn {
  width: 1rem;
  height: 1rem;
  background-color: red;
}
.tab {
  width: 100%;
  height: 0.7rem;
  color: #7e7e7e;
  position: relative;
  /deep/ .vux-tab-wrap {
      padding: 0;
  }
  /deep/ .vux-tab-container {
      height: 0.7rem;
  }
  /deep/ .vux-tab {
      width: 80%;
      background-color: transparent;
      height: .7rem;
      .vux-tab-item {
          line-height: .7rem;
          font-size: .28rem;
          color: #7E7E7E;
      }
      .vux-tab-selected {
          color: #000;
          font-size: .3rem;
          font-weight: 500;
      }
      .vux-tab-ink-bar {
          height: 4px!important;
      }
  }
}
</style>