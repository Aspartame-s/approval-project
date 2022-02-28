<template>
  <div style="margin-top: 0.1rem">
    <div v-show="!flag" class="up">
      <group>
        <x-input
          title="联系人"
          placeholder="请输入姓名"
          :required="true"
          v-model="username"
        ></x-input>
        <div class="sex">
          <div class="item-title">性别</div>
          <div class="check-box">
            <div
              class="check-item"
              v-for="(item, index) in sexList"
              :key="index"
            >
              <div
                :class="['click', item.show ? 'active-click' : '']"
                @click="selectSex(item.sex)"
              >
                <div class="click-inner" v-show="item.show"></div>
              </div>
              <div class="flag">{{ item.flag }}</div>
            </div>
          </div>
        </div>
        <x-input
          title="手机号"
          placeholder="请输入手机号"
          :required="true"
          v-model="number"
        ></x-input>
        <x-address
          @on-hide="logHide"
          @on-show="logShow"
          :title="title"
          v-model="values"
          :list="addressData"
          @on-shadow-change="onShadowChange"
          :placeholder="area"
          :show.sync="showAddress"
        ></x-address>
        <div class="address-detail" @click="modifyAddress">
          <div class="item-title">详细地址</div>
          <span class="address-info">{{address}}</span>
        </div>
      </group>
      <div class="save" @click="save">保存</div>
    </div>
    <!-- 地图页面 -->
    <div v-show="flag">
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
                ></x-input>
              </group> -->
               <input type="text" v-model="value"
              placeholder="请输入地名关键字">
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
            <div class="complete" @click="complete">完成</div>
          </div>
          <div class="address-container">
            <div class="address-detail">地址:<br />{{ mapAddress }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ChinaAddressV4Data } from "vux";
import { addAddress, editAddress } from "../../api/customer";
export default {
  components: {},
  data() {
    return {
      values: [],
      value1: ["天津市", "市辖区", "和平区"],
      title: "实施地区",
      value_0_1: [],
      title2: "设置值",
      value2: ["天津市", "市辖区", "和平区"],
      value3: ["广东省", "中山市", "--"],
      addressData: ChinaAddressV4Data,
      value4: ["天津市", "市辖区", "和平区"],
      value5: ["广东省", "深圳 市", "南山区"],
      showAddress: false,
      areaArr: [],
      area: '', //三级联动的字符串
      username: "", //传给后台的用户名
      number: "", // 传给后台的号码
      sexList: [
        {
          sex: '男',
          flag: "男士",
          show: false,
        },
        {
          sex: '女',
          flag: "女士",
          show: false,
        },
      ],
      sexFlag: "", //传给后台的性别标识
      address: "",
      defaultArea: "请选择地址",
      flag: 0, //0显示修改界面 1显示地图界面
      center: { lng: 0, lat: 0 },
      zoom: 3,
      keyword: "",
      BMap: "",
      mapAddress: "",
      value: "",
      id: '' //实施地点id
    };
  },
  computed: {},
  watch: {},
  methods: {
    doShowAddress() {
      this.showAddress = true;
      setTimeout(() => {
        this.showAddress = false;
      }, 2000);
    },
    onShadowChange(ids, names) {
      this.areaArr = names;
      //   console.log(ids, names);
    },
    changeData() {
      this.value2 = ["430000", "430400", "430407"];
    },
    changeDataByLabels() {
      this.value2 = ["广东省", "广州市", "天河区"];
    },
    changeDataByLabels2() {
      this.value2 = ["广东省", "中山市", "--"];
    },
    getName(value) {
      return value2name(value, ChinaAddressV4Data);
    },
    logHide(str) {
      if (str) {
        console.log(111);
        console.log(this.areaArr);
        console.log(this.areaArr.join(''))
        this.area = this.areaArr.join('')
      }
      console.log("on-hide", str);
    },
    logShow() {
      console.log("on-show");
    },
    selectSex(e) {
      this.sexFlag = e;
      console.log(e)
      this.sexList.forEach((item) => {
        if (item.sex == e) {
          item.show = true;
        } else {
          item.show = false;
        }
      });
    },
    modifyAddress() {
      // this.$router.replace("/mapaddress");
      this.flag = 1
      this.$emit('getMessage', false);
    },
    save() {
      if (this.$store.state.flag == "add") {
        addAddress({
          address: this.address,
          contact_Person: this.username,
          contact_Phone: this.number,
          area: this.area,
          gender: this.sexFlag
        }).then((e) => {
          console.log(e);
          if (e.success) {
            this.$router.back(-1);
          }
        });
      } else {
        editAddress({
          id: this.id,
          address: this.address,
          contact_Person: this.username,
          contact_Phone: this.number,
          area: this.area,
          gender: this.sexFlag
        }).then(e => {
          console.log(e)
          if(e.success) {
            this.$router.back(-1);
          }else {
            alert(e.message)
          }
        })

        // this.$router.replace({
        //   path: "/implementaddress",
        //   query: {
        //     address: this.$store.state.temporaryAddress,
        //     name: this.username,
        //     num: this.number,
        //   },
        // });
      }
    },
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
      // this.$router.replace("/modifyaddress");
      this.$emit('getMessage', true);
      this.flag = 0
    },
    complete() {
      this.address = this.mapAddress
      // this.$store.commit("settemporaryAddress", { address: this.mapAddress });
      // this.$router.replace({
      //   path: "/modifyaddress",
      //   query: {
      //     address: this.mapAddress,
      //   },
      // });
      // this.$router.go(-1)
      this.$emit('getMessage', true);
      this.flag = 0
      // this.mapAddress = ''
      // this.value = ''
    },
    // getClickInfo(e) {
    //     console.log(e)
    // }
  },
  beforeRouteLeave(to, from, next) {
    this.$store.state.temporaryAddress = "";
    next();
  },
  created() {
    if (this.$store.state.flag == "modify") {
      // this.$store.state.addressList.forEach((item) => {
      //   if (item.id == this.$store.state.addressId) {
      //     this.username = item.name;
      //     this.number = item.number;
      //     this.address = item.address;
      //   }
      // });
      if (this.$route.query.info) {
      }
      const info = this.$route.query.info;
      this.username = info.contact_Person;
      this.number = info.contact_Phone;
      this.address = info.address;
      this.defaultArea = info.address.substring(0, 9);
      this.id = info.id
      this.area = info.area
      this.sex = info.gender
      this.sexList.forEach(item => {
        if(item.sex == info.gender) {
          item.show = true
        }
      })
    }
  },
  mounted() {
    console.log(this.$store.state.flag);
    console.log(this.$route.query.info);
  },
};
</script>
<style lang='scss' scoped>
.up {
  /deep/ .weui-cell {
    padding: 0 0.36rem 0 0.3rem;
    width: 100%;
    height: 0.9rem;
    font-size: 0.28rem;
    .weui-cell__hd {
      width: 1.65rem;
    }
  }
  /deep/ .weui-cells {
   .vux-cell-box {
      height: 0.9rem;
      display: flex;
      align-items: center;
      width: 100%;
      .weui-cell {
        padding: 0 0.36rem 0 0.3rem;
        width: 100%;
        //   @include between;
        
        .vux-popup-picker-select {
          text-align: left!important;
        }
        .weui-cell__ft::after {
          width: 0.2rem;
          height: 0.2rem;
          margin-top: -0.1rem;
          border-width: 0.04rem 0.04rem 0 0;
        }
      }
    }
  }
  .sex,
  .address-detail {
    width: 100%;
    height: 0.9rem;
    background-color: #fff;
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 0.36rem 0 0.3rem;
    font-size: 0.28rem;
    position: relative;
    &::before {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 0.01rem;
      border-top: 0.01rem solid #d9d9d9;
      color: #d9d9d9;
      transform-origin: 0 0;
      transform: scaleY(0.5);
    }
    .item-title {
      width: 1.65rem;
    }
    .address-info {
      width: 4.8rem;
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap; //溢出不换行
    }
    .check-box {
      height: 0.33rem;
      display: flex;
      align-items: center;
      .check-item {
        width: 1rem;
        height: 0.33rem;
        margin-right: 0.8rem;
        @include between;
        font-size: 0.24rem;
        .click {
          width: 0.3rem;
          height: 0.3rem;
          border-radius: 50%;
          border: 1px solid #979797;
          @include center;
          .click-inner {
            width: 0.19rem;
            height: 0.19rem;
            background-color: #0079f4;
            border-radius: 50%;
          }
        }
        .active-click {
          border-color: #0079f4;
        }
      }
    }
  }
  .address-detail {
    &::after {
      content: " ";
      display: inline-block;
      border-color: #c8c8cd;
      border-style: solid;
      transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
      position: relative;
      top: -0.02rem;
      position: absolute;
      top: 50%;
      right: 0.36rem;
      width: 0.2rem;
      height: 0.2rem;
      margin-top: -0.1rem;
      border-width: 0.04rem 0.04rem 0 0;
    }
  }
  .save {
    width: 6.85rem;
    height: 0.78rem;
    @include center;
    position: fixed;
    left: 0.35rem;
    bottom: 0.1rem;
    font-size: 0.3rem;
    color: #fff;
    background-image: linear-gradient(to right, #049afb, #017ae8);
    border-radius: 0.39rem;
  }
}

// /deep/ .weui-cells {
//   width: 70vw;
//   height: 0.7rem;
//   font-size: 0.28rem;
//   background-color: #fff;
//   box-shadow: 1px 1px 20px 1px #000;
//   display: flex;
//   .weui-cell {
//     width: 100%;
//   }
// }
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
  height: 3.86rem;
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