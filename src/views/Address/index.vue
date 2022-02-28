<template>
  <div class="common-bg2">
    <app-header :titleName="title" :backShow="backShow" v-show="show"></app-header>
    <router-view @getMessage="showMsg"></router-view>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      backShow: true,
      title: "实施地址",
      show: true
    };
  },
  computed: {},
  watch: {},
  methods: {
    showMsg(val) {
      // methods方法  val即为子组件传过来的值
      console.log(val);
      this.show = val
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang='scss' scoped>
</style>