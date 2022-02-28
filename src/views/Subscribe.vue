<template>
  <div class="subscribe-bg">
    <app-header
      :titleName="title"
      :backShow="backShow"
      :color="color"
      :backColor="true"
    ></app-header>
    <div class="content1">
      <div class="mission-contant">
        <div class="mission-title font3">
          {{ name }}
        </div>
        <div class="mission-detail font1">
          <span>任务详情：</span><br />
          <span>{{ task_Info }}</span>
        </div>
      </div>
    </div>
    <div class="contant2">
      <div class="li">
        <div class="li-title font4">预约时间：</div>
        <div class="li-contant font7">{{ time_plan }}</div>
      </div>
      <div class="li" @click="skip">
        <div class="li-title font4">实施地址：</div>
        <div class="li-contant font7">{{ address }}</div>
      </div>
      <!-- <div class="li-type1">
          <div class="line">
            <div class="li-title1">实施人员:</div>
            <div class="li-contant1">李四 17828387748</div>
          </div>
          <div class="line">
            <div class="li-title1">预计到达时间:</div>
            <div class="li-contant1">李四 17828387748</div>
          </div>
          <div class="line">
            <div class="li-title1">预计到达地点:</div>
            <div class="li-contant1">江苏省南京市栖霞区迈皋桥创业园8号</div>
          </div>
      </div> -->
      <div
        class="li-type2"
        v-for="(item, index) in implementList"
        :key="index"
        v-show="!modifyAddressFlag || isShow"
      >
        <div class="line" v-for="(item, index) in servicer_Objs" :key="index">
          <div class="li-title1">实施人员：</div>
          <div class="li-contant1">{{ item.real_Name }} {{ item.phone }}</div>
        </div>
        <!-- <div class="line">
            <div class="li-title1">开始实施时间:</div>
            <div class="li-contant1">2022/10/31 14:00</div>
          </div> -->
      </div>
    </div>
    <div class="commit font6" @click="commit" v-show="(modifyAddressFlag && role !== 'S')">
      提交
    </div>
  </div>
</template>

<script>
import { getTask, confirm } from "../api/customer";
export default {
  components: {},
  data() {
    return {
      title: "预约申请",
      backShow: true,
      color: "#fff",
      name: "",
      task_Info: "",
      time_plan: "",
      implementList: [],
      flag: "", //判断实施地址时候可以修改 从路由判断
      implementation_Address_Id: "",
      address: "请选择实施地址",
      modifyAddressFlag: false, //判断当前是否可以修改地址
      servicer_Objs: [],
      role: localStorage.getItem('role'),
      isShow: null,
    };
  },
  computed: {},
  watch: {},
  methods: {
    skip() {
      if (!this.modifyAddressFlag || this.role == 'S') {
        return;
      }
      this.$router.push("/implementaddress");
    },
    getTask() {
      getTask({ task_Id: this.$route.query.id }).then((e) => {
        console.log(e);
        const data = e.task;
        this.name = data.name;
        this.task_Info = data.task_Info;
        this.time_plan =
          data.service_Time_Plan_S.substring(0, 10) +
          "-" +
          data.service_Time_Plan_E.substring(0, 10);
        this.implementList = data.servicers;
        this.task_Id = data.id;
        this.servicer_Objs = data.servicer_Objs;
        if(data.status_Trl == '待确认') {
          this.modifyAddressFlag = true
        }
        if (!this.$store.state.activeAddress) {
          this.address = data.address;
        } else {
          this.implementation_Address_Id = this.$store.state.activeAddress.id;
          this.address = this.$store.state.activeAddress.address;
        }
        // console.log(data.service_Time_Plan_E.substring(0, 10))
      });
    },
    commit() {
      if (this.implementation_Address_Id) {
        console.log("提交");
        confirm({
          task_Id: this.task_Id,
          implementation_Address_Id: this.implementation_Address_Id,
        })
          .then((e) => {
            console.log(e);
            if (e.success) {
              this.$router.back(-1);
            } else {
              alert(e.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("请选择实施地址");
      }
    },
  },
  beforeRouteEnter(to, from, next) { 
    if (
      from.path == "/order/implementing" ||
      from.path == "/order/stayimplement"
    ) {
      next((vm) => {
        console.log(vm.address);
        vm.modifyAddressFlag = false;
      });
    } else {
      next();
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("setActiveAddress", { info: null });
    next();
  },
  created() {
    this.isShow = this.$route.query.isShow
    console.log(this.isShow)
    console.log(this.modifyAddressFlag)
  },
  mounted() {
    console.log(this.$store.state.activeAddress);
    if (this.$store.state.activeAddress) {
      this.implementation_Address_Id = this.$store.state.activeAddress.id;
      this.address = this.$store.state.activeAddress.address;
    }
    this.getTask();
  },
};
</script>
<style lang='scss' scoped>
.subscribe-bg {
  width: 100%;
  height: 100vh;
  background-color: #f3f3f3;
  background-image: url("../assets/bg_wode1@2x.png");
  background-size: 100% 4.9rem;
  background-repeat: no-repeat;
  .content1 {
    width: 100%;
    // height: calc(100vh - .88rem);
    // overflow: scroll;
    padding: 0 0.25rem;
    margin-top: 0.6rem;
    .mission-contant {
      width: 100%;
      height: 2.86rem;
      border-radius: 0.1rem;
      background-color: #fff;
      padding: 0.24rem 0.26rem 0 0.32rem;
      margin-bottom: 0.6rem;
      .mission-title {
        margin-bottom: 0.12rem;
      }
      .mission-detail {
        line-height: 0.42rem;
      }
    }
  }
  .contant2 {
    width: 100%;
    padding: 0.4rem 0.25rem;
    background-color: #f3f3f3;
    padding-bottom: 1rem;
    .li {
      width: 100%;
      height: auto;
      padding: 0.25rem 0.3rem 0.25rem 0.32rem;
      background-color: #fff;
      border-radius: 0.1rem;
      margin-bottom: 0.3rem;
      display: flex;
      align-items: center;
      .li-title {
        margin-right: 0.1rem;
      }
    }
    .li-type1,
    .li-type2 {
      background-color: #fff;
      border-radius: 0.1rem;
      width: 100%;
      height: auto;
      padding: 0.2rem 0.32rem;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-bottom: 0.3rem;
      .line {
        display: flex;
        font-size: 0.28rem;
        margin: 0.04rem;
      }
      .li-title1 {
        // width: 2rem;
        margin-right: 0.1rem;
        font-size: 0.28rem;
        font-weight: 500;
      }
    }
  }
  .commit {
    width: 6.85rem;
    height: 0.78rem;
    border-radius: 0.39rem;
    background-image: linear-gradient(to right, #049afb, #017ae8);
    @include center;
    position: fixed;
    bottom: 0.2rem;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>