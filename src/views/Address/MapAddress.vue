<template>
  <div style="position: relative">
    <baidu-map
      class="map"
      :center="center"
      :zoom="zoom"
      @ready="handler"
      @click="cjs"
    >
      <bm-view class="map"></bm-view>
      <bm-geolocation
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        :showAddressBar="true"
        :autoLocation="true"
      ></bm-geolocation>
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <bm-control
        :offset="{ width: '10px', height: '10px' }"
        style="left: 2rem; top: 2rem"
      >
        <bm-auto-complete
          v-model="keyword"
          :sugStyle="{ zIndex: 1 }"
          @searchcomplete="hand1"
          @confirm="hand2"
          @highlight="hand3"
        >
          <!-- <input class="jjj" placeholder="请输入地名关键字" /> -->
          <!-- <group>
            <x-input
              title=""
              v-model="value"
              placeholder="请输入地名关键字"
            ></x-input> -->
            <input type="text" v-model="value"
              placeholder="请输入地名关键字">
          <!-- </group> -->
        </bm-auto-complete>
      </bm-control>
      <bm-local-search
        :keyword="keyword"
        :auto-viewport="true"
      ></bm-local-search>
    </baidu-map>
    <div class="address">
      <div class="handle-bar">
        <div class="cancel" @click="cancel">取消</div>
        <div style="font-weight: 500; color: #000">请确认详细地址</div>
        <div class="complete" @click="skip">完成</div>
      </div>
      <div class="address-container">
        <div class="address-detail">地址:<br />{{ mapAddress }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 3,
      keyword: "",
      BMap: "",
      mapAddress: "",
      value: "",
    };
  },
  computed: {},
  watch: {},
  methods: {
    handler({ BMap, map }) {
      this.BMap = BMap;

      // console.log(BMap, map);
      this.center.lng = 118.802444;
      this.center.lat = 32.064277;
      this.zoom = 15;
    },
    cjs(e) {
      //点击地图上的坐标可以获取点击的地点信息和经纬度 迭代再说
      // console.log(e)
      if (this.BMap) {
        const that = this;
        // 获取定位地址信息并赋值给声明变量
        // Geolocation 对象的 getCurrentPosition()、watchPosition()、clearWatch() 方法详解 ：https://blog.csdn.net/zyz00000000/article/details/82774543
        const geolocation = new this.BMap.Geolocation();
        // 通过 getCurrentPosition() 方法：获取当前的位置信息
        geolocation.getCurrentPosition((res) => {
          // console.log("返回详细地址和经纬度", res);
          const { lng, lat } = res.point;
          const { province, city, district, street, street_number } =
            res.address;

          that.center = { lng, lat };
          that.choosedLocation = {
            province,
            city,
            district,
            addr: street + street_number,
            lng,
            lat,
          };
        });
      }
    },
    hand1(e) {
      //  console.log(e)
    },
    hand2(e) {
      console.log(e);
      this.mapAddress =
        e.item.value.city + e.item.value.district + e.item.value.business;
      this.value = this.mapAddress;
      //  this.longitude_Latitude = e.currentTarge
      //    console.log(address)
    },
    hand3(e) {
      //  console.log(e)
    },
    cancel() {
      this.mapAddress = "";
      this.value = "";
      this.$router.replace("/modifyaddress");
    },
    skip() {
      this.$store.commit("settemporaryAddress", { address: this.mapAddress });
      this.$router.replace({
        path: "/modifyaddress",
        query: {
          address: this.mapAddress,
        },
      });
      // this.$router.go(-1)
    },
    // getClickInfo(e) {
    //     console.log(e)
    // }
  },
  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = false;
    next();
  },
  created() {},
  mounted() {
    console.log(this.$route.path);
  },
};
</script>
<style lang='scss' scoped>
/deep/ .weui-cells {
  width: 70vw;
  height: 0.7rem;
  font-size: 0.28rem;
  background-color: #fff;
  box-shadow: 1px 1px 20px 1px #000;
  display: flex;
  .weui-cell {
    width: 100%;
  }
}
input {
  width: 70vw;
  height: 0.7rem;
  outline-style: none;
  box-shadow: 1px 1px 20px 1px rgb(22, 22, 22);
  padding-left: .1rem;
  border: none;
}
.map {
  width: 100%;
  height: 100vh;
  /deep/ .anchorBR {
    inset: unset !important;
    bottom: 4rem !important;
    right: 0.2rem !important;
  }
  /deep/ .BMap_noprint {
    width: 100vw;
    display: flex;
    @include center;
  }
}
.address {
  width: 100vw;
  height: 3.85rem;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 999;
  background-color: #fff;
  .handle-bar {
    @include between;
    width: 100%;
    height: 0.85rem;
    box-shadow: 0 1px 0 0 #ddd;
    font-size: 0.3rem;
    color: #108ee9;
    padding: 0 0.3rem;
  }
  .address-container {
    width: 100%;
    height: 3rem;
    padding: 0.37rem 0.35rem 0 0.35rem;
    .address-detail {
      width: 100%;
      height: 1.86rem;
      background-color: #f7f7f7;
      padding: 0.25rem 0.57rem 0.1rem;
      font-size: 0.3rem;
      font-weight: 500;
    }
  }
}
</style>