<template>
    <div>
        <list-item :list="list"></list-item>
    </div>
</template>

<script>
import listItem from '../ListTemplete.vue'
export default {
  props: {
    list: {
      type: Array
    }
  },
components: {
    listItem
},
data() {
return {
    
};
},
computed: {},
watch: {},
methods: {

},
created() {

},
mounted() {

},
}
</script>
<style lang='scss' scoped>
</style>