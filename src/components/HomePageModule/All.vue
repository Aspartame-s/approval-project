<template>
  <div>
    <listItem :list="list"></listItem>
  </div>
</template>

<script>
import listItem from "../ListTemplete.vue";
export default {
  props: {
    list: {
      type: Array
    }
  },
  components: {
    listItem,
  },
  data() {
    return {
      
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang='scss' scoped>
</style>