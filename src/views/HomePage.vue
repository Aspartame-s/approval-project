<template>
  <div class="common-bg">
    <div class="banner">
      <swiper
        :list="demo01_list"
        v-model="demo01_index"
        @on-index-change="demo01_onIndexChange"
      ></swiper>
      <div class="module">
        <div class="module-item gzh">
          <div class="text">
            <span>和瑞智能</span><br />
            <span style="font-size: 0.3rem">公众号</span>
          </div>
          <img src="../assets/IndexPic/1@2x.png" alt="" />
        </div>
        <div class="module-item gw">
          <div class="text">
            <span>和瑞智能</span><br />
            <span style="font-size: 0.3rem">官网</span>
          </div>
          <img src="../assets/IndexPic/2@2x.png" alt="" />
        </div>
      </div>
    </div>

    <!-- 客户端显示 -->
    <div v-if="role == 'C'">
      <div class="wait-do">
        待办
        <div class="want-do-num">共5条</div>
      </div>
      <list-item :list="list"></list-item>
    </div>

    <!-- 实施人员端显示 -->
    <div v-else>
      <div class="tab">
        <tab
          :line-width="1"
          :custom-bar-width="getBarWidth"
          :scroll-threshold="5"
          bar-active-color="#1373FF"
        >
          <tab-item
            :selected="item.id == 1"
            @on-item-click="onItemClick1(item.component)"
            v-for="(item, index) in tabList"
            :key="index"
            >{{ item.title }}</tab-item
          >
        </tab>
      </div>
      <component :is="component" :list="serviceList"></component>
    </div>
  </div>
</template>

<script>
import All from "../components/HomePageModule/All.vue";
import StayImplement from "../components/HomePageModule/StayImplement.vue";
import Implementing from "../components/HomePageModule/Implementing.vue";
import StayEvaluate from "../components/HomePageModule/StayEvaluate.vue";
import { listTodoTask, listToConfirmOfCustomer, listToSceneConfirmOfCustomer } from "../api/customer";
import {listAll, listToSceneConfirmOfServicer, listImplementingTask, listToEvaluateTask} from '../api/servicer'
const baseList = [
  {
    url: "javascript:",
    img: require("@/assets/IndexPic/pic1@2x.png"),
  },
  {
    url: "javascript:",
    img: require("@/assets/IndexPic/pic1@2x.png"),
  },
  {
    url: "javascript:",
    img: require("@/assets/IndexPic/pic1@2x.png"), // 404
    // fallbackImg: '../assets/IndexPic/pic1@2x.png'
  },
];
export default {
  name: "HomePage",
  components: {
    All,
    StayImplement,
    Implementing,
    StayEvaluate,
  },
  data() {
    return {
      component: "All",
      tabList: [
        {
          id: 1,
          title: "全部",
          component: "All",
        },
        {
          id: 2,
          title: "待实施",
          component: "StayImplement",
        },
        {
          id: 3,
          title: "实施中",
          component: "Implementing",
        },
        {
          id: 4,
          title: "待评价",
          component: "StayEvaluate",
        },
      ],
      getBarWidth: function (index) {
        return 0.8 + "rem";
      },
      demo01_list: baseList,
      demo01_index: 0,
      list: [],
      serviceList: [],
      data: {
        page_No: 1,
        page_Size: 10
      },
      role: ''
    };
  },
  computed: {},
  watch: {},
  methods: {
    demo01_onIndexChange(index) {
      this.demo01_index = index;
    },
    onItemClick1(e) {
      console.log("切换");
      console.log(e)
      this.component = e;
      if(e == 'StayImplement') {
        this.listToSceneConfirmOfServicer(this.data)
      }else if(e == 'Implementing') {
        this.listImplementingTask(this.data)
      }else if(e == 'StayEvaluate') {
        this.listToEvaluateTask(this.data)
      }else {
        this.listAll(this.data)
      }
    },
    //待办任务查询（客户端）
    listTodoTask(data) {
      listTodoTask(data).then((e) => {
        // console.log(e);
        this.list = e.result_List;
      });
    },
    // 任务查询（全部）(实施人员端)
    listAll(data) {
      listAll(data).then(e => {
        this.serviceList = e.result_List;
      })
    },
    // 任务查询（待实施）(实施人员端)
    listToSceneConfirmOfServicer(data) {
      listToSceneConfirmOfServicer(data).then(e => {
        this.serviceList = e.result_List;
      })
    },
    // 任务查询（实施中）(实施人员端)
    listImplementingTask(data) {
      listImplementingTask(data).then(e => {
        this.serviceList = e.result_List;
      })
    },
    // 任务查询（待评价）(实施人员端)
    listToEvaluateTask(data) {
      listToEvaluateTask(data).then(e => {
        this.serviceList = e.result_List;
      })
    }
  },
  created() {
    this.role = localStorage.getItem('role')
  },
  mounted() {
    this.listTodoTask(this.data);
    this.listAll(this.data)
  },
};
</script>
<style lang='scss' scoped>
.tab {
  width: 100%;
  height: 0.7rem;
  color: #7e7e7e;
  position: relative;
  margin-bottom: 0.15rem;
  /deep/ .vux-tab-wrap {
    padding: 0;
  }
  /deep/ .vux-tab-container {
    height: 0.7rem;
  }
  /deep/ .vux-tab {
    width: 80%;
    background-color: transparent;
    height: 0.7rem;
    .vux-tab-item {
      line-height: 0.7rem;
      font-size: 0.28rem;
      color: #7e7e7e;
    }
    .vux-tab-selected {
      color: #000;
      font-size: 0.3rem;
      font-weight: 500;
    }
    .vux-tab-ink-bar {
      height: 4px !important;
    }
  }
}
.banner {
  width: 100%;
  height: 5.15rem;
  margin-bottom: 1.1rem;
  position: relative;
  /deep/ .vux-slider > .vux-swiper {
    height: 5.15rem !important;
  }
  /deep/ .vux-swiper-desc {
    display: none;
  }
  .module {
    width: 100%;
    height: 1.28rem;
    position: absolute;
    bottom: -0.59rem;
    // background-color: pink;
    @include between;
    padding: 0 0.25rem;
    .module-item {
      width: 3.35rem;
      height: 1.28rem;
      border-radius: 0.1rem;
      background-color: #fff;
      display: flex;
      align-items: center;
      padding-left: 0.59rem;
      font-size: 0.24rem;
      font-weight: 500;
      .text {
        margin-right: 0.34rem;
      }
      img {
        width: 1rem;
        height: 1rem;
      }
    }
  }
}
.wait-do {
  width: 100%;
  height: 0.5rem;
  @include center;
  font-weight: 500;
  font-size: 0.36rem;
  margin-bottom: 0.24rem;
  .want-do-num {
    margin-left: 0.2rem;
    font-weight: 400;
    font-size: 0.24rem;
  }
}
// .list {
//   width: 100%;
//   height: auto;
//   padding: 0 0.25rem;

//   .list-item {
//     width: 100%;
//     height: 3rem;
//     background-color: #fff;
//     border-radius: 0.1rem;
//     padding: 0.15rem 0.18rem 0 0.3rem;
//     position: relative;
//     margin-bottom: .3rem;
//     .code {
//       margin-bottom: 0.22rem;
//     }
//     .state {
//       width: 1.2rem;
//       height: .42rem;
//       background-image: linear-gradient(to right, #BDDFFF, rgba(182,211,232,0.2));
//       border-radius: 1rem 0 0 1rem;
//       position: absolute;
//       right: 0;
//       top: .13rem;
//       @include center;
//     }
//     .state2 {
//       background-image: linear-gradient(to right, rgba(250,213,178,1), rgba(255,232,211,0.25));
//     }
//     .state3 {
//       background-image: linear-gradient(to right, rgba(208,238,215,1), rgba(208,238,215,0.26));
//     }
//     .title {
//       margin-bottom: 0.1rem;
//     }
//     .content {
//       margin-bottom: 0.28rem;
//     }
//     .time {
//       width: 100%;
//       height: 0.64rem;
//       @include between;
//       .order-btn {
//         width: 1.32rem;
//         height: 0.64rem;
//         color: #005fe9;
//         @include center;
//         border: 1px solid #b6b6b6;
//         border-radius: 0.1rem;
//         font-size: 0.26rem;
//         font-weight: 500;
//       }
//     }
//   }
// }
</style>
