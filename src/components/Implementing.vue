<template>
    <div style="width: 100%; padding-top: 0.3rem;">
      <list-item :list="list" ></list-item>
    </div>
   
</template>

<script>
import { listImplementingOfCustomer } from "../api/customer";
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
  listImplementingOfCustomer(data) {
    listImplementingOfCustomer(data).then(e => {
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
  this.listImplementingOfCustomer(this.data)
},
}
</script>
<style lang='scss' scoped>
</style>
