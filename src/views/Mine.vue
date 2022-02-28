<template>
<div>
    <app-header :titleName="title" :backShow="backShow"></app-header>
    <div class="user-info" style="margin-top: .15rem">
        <span>所属公司</span>
        <span style="color: #000">南京远能电力工程有限公司</span>
    </div>
    <div class="user-info">
        <span>账号</span>
        <span style="color: #000">{{account}}</span>
    </div>
    <div class="user-info">
        <span>版本</span>
        <span style="color: #000">1.1.8</span>
    </div>
    <div class="user-info" @click="skip">
        <span>我的地址</span>
        <span>{{this.$route.query.address}} ></span>
    </div>
    <div class="login-out">
        <div class="btn" @click="loginout">退出登录</div>
    </div>
</div>
</template>

<script>
import { login, loginout, personalInfo } from "../api/sys";
export default {
components: {},
data() {
return {
    title: '我的',
    backShow: false,
    myAddress: '',
    account: ''
};
},
computed: {},
watch: {},
methods: {
    skip() {
        this.$router.push('/addressindex')
    },
    loginout() {
        loginout().then(e => {
            localStorage.clear()
            this.$router.replace('/')
            console.log(e)
        })
    }
},
created() {

},
mounted() {
    // console.log(localStorage.getItem('token'))
    this.myAddress = this.$route.query.address
    personalInfo().then(e => {
        console.log(e)
        this.account = e.info.account
    })
    // console.log(this.$route.query.address)
},
}
</script>
<style lang='scss' scoped>
.user-info {
    width: 100%;
    background-color: #fff;
    height: .9rem;
    @include between;
    font-size: .28rem;
    color: #7F7F7F;
    padding: 0 .4rem 0 .6rem;
    border-bottom: 1px solid #DDDDDD;
}
.login-out {
    width: 100%;
    height: .78rem;
    @include center;
    margin-top: 1.25rem;
}
.btn {
    width: 6.85rem;
    height: .78rem;
    background-image: linear-gradient(to right, #049AFB, #017AE8);
    border-radius: .39rem;
    color: #fff;
    font-size: .3rem;
    font-weight: 500;
    @include center;
}
</style>