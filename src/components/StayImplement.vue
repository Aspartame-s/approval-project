<template>
    <div style="width: 100%; padding-top: 0.3rem;">
      <list-item :list="list" ></list-item>
    </div>
   
</template>

<script>
// 待实施
import { listToSceneConfirmOfCustomer } from "../api/customer";
export default {
components: {
},
data() {
return {
    list: [],
    data: {
      page_No: 1,
      page_Size: 10
    },
};
},
computed: {},
watch: {},
methods: {
  listToSceneConfirmOfCustomer() {
    listToSceneConfirmOfCustomer(this.data).then(e => {
      if(e.success) {
        this.list = e.result_List
      }else {
        alert(e.message)
      }
    })
  }
},
created() {

},
mounted() {
  this.listToSceneConfirmOfCustomer()
},
}
</script>
<style lang='scss' scoped>
</style>
