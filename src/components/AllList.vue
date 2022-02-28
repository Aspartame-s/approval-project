<template>
  <div style="width: 100%; padding-top: 0.3rem">
    <list-item :list="list"></list-item>
  </div>
</template>

<script>
import { listAll } from "../api/customer";
export default {
  components: {},
  data() {
    return {
      list: [],
      data: {
        page_No: 1,
        page_Size: 10,
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    listAll(data) {
      listAll(data).then((e) => {
        if (e.success) {
          this.list = e.result_List;
        }
      });
    },
  },
  created() {},
  mounted() {
    this.listAll(this.data);
  },
};
</script>
<style lang='scss' scoped>
</style>
