<template>
<div>
    <app-header :titleName="title"></app-header>
    <div>aaaaaaaaaa</div>
    <router-view/>
</div>
  
</template>

<script>
export default {
  name: "OrderApply",
  components: {},
  data() {
    return {
        title: '预约'
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {

  },
  mounted() {},
};
</script>
<style lang='scss' scoped>
</style>