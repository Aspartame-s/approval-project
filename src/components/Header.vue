<template>
    <div class="header" :style="{'color': color}">
        <img :src="backColor ? whiteBack : blackBack" alt="" @click="back" class="back" v-if="backShow">
        {{titleName}}
    </div>
</template>

<script>

export default {
    props: {
        titleName: {
            type: String,
            default: ''
        },
        backShow: {
            type: Boolean,
            default: true
        },
        color: {
            type: String
        },
        backColor: {
            type: Boolean,
            default: false
        }
    },
components: {
    name: 'Header'
},
data() {
return {
    blackBack: require('../assets/btn_back@2x.png'),
    whiteBack: require('../assets/btn_back1@2x.png')
};
},
computed: {},
watch: {},
methods: {
    back() {
        console.log(this.$router.currentRoute.path)
        this.$router.back(-1)
    }
},
created() {

},
mounted() {

},
}
</script>
<style lang='scss' scoped>
.header {
    width: 100vw;
    // background-color: #fff;
    height: .88rem;
    @include center;
    font-size: .32rem;
    font-weight: 500;
    position: relative;
    .back {
        position: absolute;
        left: .2rem;
        width: .46rem;
        height: .46rem;
    }
}
</style>