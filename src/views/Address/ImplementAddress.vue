<template>
  <div>
    <div class="address-list" >
      <div
        class="address-item"
        @click="select(item)"
        v-for="(item, index) in addressList"
        :key="index"
      >
        <div class="address font4">{{ item.address }}</div>
        <div class="info font5">
          <span class="name">{{ item.contact_Person }}{{ "\xa0\xa0" }}</span>
          <span class="number">{{ item.contact_Phone }}</span>
        </div>
        <div class="modify font5" @click.stop="modify(item)">
          <img src="@/assets/icon_edit@2x.png" alt="" />编辑
        </div>
      </div>
    </div>
    <div class="add-address font6" @click="add">添加收货地址</div>
  </div>
</template>

<script>
import {addressList, editAddress} from '../../api/customer'
export default {
  components: {},
  data() {
    return {
      title: "实施地址",
      backShow: true,
      addressList: [],
      // address: this.$route.query.address,
      data: {
        page_No: 1,
        page_Size: 10
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    modify(e, value2) {
        // this.$store.commit('setaddressId', {id: e})
        this.$store.commit('setFlag', {flag: 'modify'})
      // this.GLOBAL.addressId = e;
      // this.GLOBAL.flag = "modify";
      this.$router.push({
        path: '/modifyaddress',
        query: {
          info: e
        }
      }); 
      //如果这里路由跳转用的是push会导致在路由栈中添加了一个implementAddress的路由记录，
      //从modifyAddress页面中编辑过地址，又replace到implementAddress中，此时就回有两个implementAddress的路由记录，所以编辑之后回退会出现需要点两次才能回退成功
      //所有从编辑按钮点击时就要使用replace而不是push
    },
    add() {
      this.$store.commit('setFlag', {flag: 'add'})
      this.$router.push("/modifyaddress");
    },
    getAddressList(data) {
      addressList(data).then(e => {
        console.log(e)
        this.addressList = e.result_List
      })
    },
    select(e) {
      this.$store.commit('setActiveAddress', {info: e})
      this.$router.back(-1)
    }
  },
  
  created() {
    //   console.log(this.address)
    // if (this.GLOBAL.flag == "modify") {
    //   this.addressList.forEach((item) => {
    //     if (item.id == this.GLOBAL.addressId) {
    //       if (this.$route.query.address) {
    //         item.address = this.$route.query.address;
    //         item.name = this.$route.query.name;
    //         item.number = this.$route.query.num;
    //       }
    //     }
    //   });
    // }
  },
  
  mounted() {
    this.getAddressList(this.data)
  },
  
};
</script>
<style lang='scss' scoped>
.address-list {
  width: 100%;
  height: auto;
  padding: 0.24rem 0.25rem 0;
  .address-item {
    width: 100%;
    height: 1.82rem;
    background-color: #fff;
    padding: 0.2rem 1.44rem 0 0.3rem;
    border-radius: 0.1rem;
    position: relative;
    margin-bottom: 0.3rem;
    .address {
      width: 5.26rem;
      height: 0.8rem;
      margin-bottom: 0.13rem;
    }
    .info {
      width: auto;
      height: 0.4rem;
    }
    .modify {
      position: absolute;
      width: auto;
      height: 0.3rem;
      top: 50%;
      transform: translateY(-50%);
      right: 0.2rem;
      vertical-align: middle;
      display: flex;
      align-items: center;
      img {
        width: 0.3rem;
        height: 0.3rem;
        margin-right: 0.05rem;
      }
    }
  }
}
.add-address {
  width: 6.85rem;
  height: 0.78rem;
  border-radius: 0.39rem;
  background-image: linear-gradient(to right, #049afb, #017ae8);
  @include center;
  position: fixed;
  left: 0.35rem;
  bottom: 0.1rem;
}
</style>