<template>
  <div class="common-bg">
    <router-view/>
    <div class="tabbar" v-show="role == 'C'">
      <div
        :class="['tabbar-item', $route.path.includes(item.route) ? 'active' : '']"
        v-for="(item, index) in tabbarList"
        :key="index"
        @click="skip(item)"
      >
        <img
          :src="$route.path.includes(item.route) ? item.active_icon_url : item.icon_url"
          alt=""
          class="icon"
        />
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      // flag: true,
      // metaName: $route.path,
      tabbarList: [
        {
          name: "首页",
          route: "/homepage",
          icon_url: require("../assets/tabbarPic/icon_shouye@2x.png"),
          active_icon_url: require("../assets/tabbarPic/icon_shouye_active@2x.png"),
        },
        {
          name: "预约",
          route: "/order",
          redirect: '/order/alllist',
          icon_url: require("../assets/tabbarPic/icon_yuyue@2x.png"),
          active_icon_url: require("../assets/tabbarPic/icon_yuyue_active@2x.png"),
        },
        {
          name: "我的",
          route: "/mine",
          icon_url: require("../assets/tabbarPic/icon_wode@2x.png"),
          active_icon_url: require("../assets/tabbarPic/icon_wode_active@2x.png"),
        },
      ],
      role: ''
    };
  },
  computed: {},
  watch: {},
  methods: {
    skip(e) {
      // this.tabId = e.tabId;
      if(e.redirect) {
        this.$router.push(e.redirect).catch(err => {err})
      }else {
        this.$router.push(e.route).catch(err => {err})
      }
      console.log(e);
    },
  },
  created() {
    this.role = localStorage.getItem('role')
    // this.flag = this.$route.meta.name.includes('gg')
    // console.log(this.flag)
    // console.log(123)
    // console.log(this.$route.path)
  },
  mounted() {
    
  },
};
</script>
<style lang='scss' scoped>
.tabbar {
  width: 100vw;
  height: 1rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  @include around;
  .tabbar-item {
    width: 0.5rem;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.18rem;
    color: #7d7d7d;
    .icon {
      width: 0.5rem;
      height: 0.5rem;
    }
  }
  .active {
    color: #0079f4;
  }
}
</style>