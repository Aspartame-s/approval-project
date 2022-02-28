<template>
  <div>
    <!-- state_id 1是待审核 2是审核驳回 3是待评价 4是实施中 5是待实施 6是待预约-->
    <div
      class="list"
      v-for="(item, index) in list"
      :key="index"
      @click="watch(item.id, item.status_Trl)"
    >
      <div class="list-item">
        <div class="code font4">{{ item.c_Project_Id }}</div>
        <div
          :class="[
            'state',
            'font1',
            item.status_Trl == '待审核'
              ? 'state2'
              : item.status_Trl == '待评价'
              ? 'state3'
              : item.status_Trl == '实施中'
              ? 'state4'
              : item.status_Trl == '待实施'
              ? 'state5'
              : item.status_Trl == '待实施'
              ? 'state6'
              : 'state',
          ]"
        >
          {{ item.status_Trl }}
        </div>
        <div class="title font4">{{ item.project_Name }}</div>
        <div class="content font5">
          {{ item.task_Info }}
        </div>
        <div class="time">
          <div class="time-show font5">{{ item.service_Time_Plan_S }}</div>
          <div
            class="order-btn"
            @click.stop="skip(item.id, item.status_Trl)"
            v-show="
              (item.status_Trl == '待评价' && flag == 'C') ||
              (item.status_Trl == '待确认' && flag == 'C') ||
              (item.status_Trl == '待实施完成' && flag == 'S') ||
              (item.status_Trl == '待现场确认' && flag == 'S')
            "
          >
            {{
              item.status_Trl == "待评价" && flag == "C"
                ? "评价"
                : item.status_Trl == "待确认" && flag == "C"
                ? "预约"
                : item.status_Trl == "待实施完成" && flag == "S"
                ? "完成确认"
                : item.status_Trl == "待现场确认" && flag == "S"
                ? "现场确认"
                : ""
            }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      flag: localStorage.getItem("role"),
    };
  },
  props: {
    list: Array,
  },
  computed: {},
  watch: {},
  methods: {
    skip(id, trl) {
      if (trl == "待确认" && this.flag == "C") {
        this.$router.push({
          path: "/subscribe",
          query: {
            id,
          },
        });
      } else if (trl == "待评价" && this.flag == "C") {
        this.$router.push({
          path: "/evaluation",
          query: {
            id,
          },
        });
      } else if (trl == "待现场确认" && this.flag == "S") {
        this.$router.push({
          path: "/sceneconfirme",
          query: {
            id,
          },
        });
      } else if (trl == "待实施完成" && this.flag == "S") {
        this.$router.push({
          path: "/serviceconfirm",
          query: {
            id,
          },
        });
      }
    },
    watch(id, trl) {
      if ((trl == "待现场确认" || trl == "待实施完成") && this.flag == "C") {
        this.$router.push({
          path: "/subscribe",
          query: {
            id,
          },
        });
      } else if (
        (trl == "待现场确认" || trl == "待实施完成") &&
        this.flag == "S"
      ) {
        this.$router.push({
          path: "/subscribe",
          query: {
            id,
            isShow: true
          },
        });
      } else if (trl == "待评价" && this.flag == "S") {
        this.$router.push({
          path: "/evaluation",
          query: {
            id,
          },
        });
      } else if (trl == "已完成") {
        this.$router.push({
          path: "/evaluation",
          query: {
            id,
          },
        });
      }else if (trl == "待确认" && this.flag == "S") {
        this.$router.push({
          path: "/subscribe",
          query: {
            id,
            isShow: ''
          },
        });
      }
    },
  },

  created() {},
  mounted() {},
};
</script>
<style lang='scss' scoped>
.list {
  width: 100%;
  height: auto;
  padding: 0 0.25rem;

  .list-item {
    width: 100%;
    height: 3rem;
    background-color: #fff;
    border-radius: 0.1rem;
    padding: 0.15rem 0.18rem 0 0.3rem;
    position: relative;
    margin-bottom: 0.3rem;
    .code {
      margin-bottom: 0.22rem;
    }
    // 待审核
    .state {
      width: 1.2rem;
      height: 0.42rem;
      background-image: linear-gradient(
        to right,
        #bddfff,
        rgba(182, 211, 232, 0.2)
      );
      border-radius: 1rem 0 0 1rem;
      position: absolute;
      right: 0;
      top: 0.13rem;
      @include center;
    }
    // 审核驳回
    .state2 {
      background-image: linear-gradient(
        to right,
        rgba(250, 213, 178, 1),
        rgba(255, 232, 211, 0.25)
      );
    }
    // 待评价
    .state3 {
      background-image: linear-gradient(
        to right,
        rgba(208, 238, 215, 1),
        rgba(208, 238, 215, 0.26)
      );
    }
    // 实施中
    .state4 {
      background-image: linear-gradient(
        to right,
        rgb(107, 30, 30),
        rgba(208, 238, 215, 0.26)
      );
    }
    // 待实施
    .state5 {
      background-image: linear-gradient(
        to right,
        rgb(71, 188, 241),
        rgba(208, 238, 215, 0.26)
      );
    }
    // 待预约
    .state6 {
      background-image: linear-gradient(
        to right,
        rgb(94, 184, 128),
        rgba(208, 238, 215, 0.26)
      );
    }

    .title {
      margin-bottom: 0.1rem;
    }
    .content {
      margin-bottom: 0.28rem;
    }
    .time {
      width: 100%;
      height: 0.64rem;
      @include between;
      .order-btn {
        width: 1.32rem;
        height: 0.64rem;
        color: #005fe9;
        @include center;
        border: 1px solid #b6b6b6;
        border-radius: 0.1rem;
        font-size: 0.26rem;
        font-weight: 500;
      }
    }
  }
}
</style>