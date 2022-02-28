<template>
    <div style="width: 100%; padding-top: 0.3rem;">
      <list-item :list="list"></list-item>
    </div>
   
</template>

<script>
// 待确认
import { listTodoTask, listToConfirmOfCustomer } from "../api/customer";
export default {
components: {
},
data() {
return {
    list: [],
};
},
computed: {},
watch: {},
methods: {
  listToConfirmOfCustomer() {
    listToConfirmOfCustomer({page_No: 1, page_Size: 100}).then(e => {
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
  this.routePath = '预约'
  this.listToConfirmOfCustomer()
},
}
</script>
<style lang='scss' scoped>
</style>
