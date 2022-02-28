<template>
  <div>
    <div class="login-bg">
      <div class="title">
        <div class="text">登陆</div>
        <img src="../assets/LoginPic/line@2x.png" alt="" />
      </div>
      <group>
        <div class="username">
          <img src="../assets/LoginPic/icon_1@2x.png" alt="" />
          <x-input
            title="账号"
            v-model="form.user_Name"
            @on-change="setUser"
            required
            :show-clear="false"
          ></x-input>
        </div>
        <div class="password">
          <img src="../assets/LoginPic/icon_4.1@2x.png" alt="" />
          <x-input
            title="密码"
            type="password"
            @on-change="setP"
            v-model="form.p"
            required
          ></x-input>
        </div>
      </group>
      <div class="btn-denglu" @click="login">登陆</div>
    </div>
  </div>
</template>

<script>
import { login, loginout, personalInfo } from "../api/sys";
export default {
  components: {},
  data() {
    return {
      form: {
        user_Name: "",
        p: "",
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    setUser(e) {
      this.form.user_Name = e;
    },
    setP(e) {
      this.form.p = e;
    },
    login() {
      const { user_Name, p } = this.form;
      login({ user_Name, p }).then((e) => {
        console.log(e);
        if (e.success) {
          localStorage.setItem("token", e.info.token);
          localStorage.setItem("real_Name", e.info.real_Name);
          localStorage.setItem("ad_User_Id", e.info.ad_User_Id);
          localStorage.setItem("role", e.info.client_Type);
          this.$router.push("index");
          return;
        } else {
          alert(e.message);
        }
      });
    },
    // login() {
    //   get('/api/customer/task/listTodoTask', {
    //     token: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY0NjAzMzExMiwidXNlciI6IntcImFkX0NsaWVudF9JZFwiOlwiMTAwXCIsXCJhZF9PcmdfSWRcIjpcIjEwMFwiLFwiYWRfVXNlcl9JZFwiOlwiMTAwXCIsXCJyZWFsX05hbWVcIjpcImFkbWluXCJ9IiwiaWF0IjoxNjQ1NDI4MzEyfQ.270e1pQtr0-kZvTOvjiF6F_8PsGtvSh3EU5s1_T77ME7asiynNEN9OQmlQ9wgP7z1Qikwbo_bD9E97eSW82O2w',
    //     page_No: '1',
    //     page_Size: '10'
    //   }).then(e => {
    //     console.log(e)
    //   })
    // }
  },
  created() {},
  mounted() {},
};
</script>
<style lang='scss' scoped>
.login-bg {
  width: 100vw;
  height: 100vh;
  // background-repeat: repeat-y;
  background-image: url("../assets/LoginPic/bg1@2x.png");
  background-size: 100%;
  padding-top: 1.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .title {
    width: 100%;
    height: 0.67rem;
    font-size: 0.48rem;
    font-weight: 500;
    margin-bottom: 1.72rem;
    @include center;
    position: relative;
    color: #fff;
    .text {
      position: absolute;
    }
    img {
      width: 6.64rem;
      height: 0.03rem;
    }
  }
  /deep/ .vux-no-group-title {
    margin-top: 0;
  }
  /deep/ .weui-cells {
    background-color: transparent;
    line-height: 0;
    color: #000;
  }
  /deep/ .weui-cells:before,
  /deep/.weui-cells:after {
    border: none;
  }
  /deep/ .weui-cell {
    font-size: 0.26rem;
    padding: 0;
  }
  /deep/ .weui-cell:before {
    border: none;
  }
  // /deep/ .weui-input {
    //   font-size: .26rem;
    //   line-height: .1rem;
    // height: .5rem;
    // line-height: .27rem!important;
  // }
  /deep/ .weui-label {
    text-align: left;
  }
  /deep/ .weui-icon-clear {
    font-size: 0.2rem;
  }
  .username,
  .password {
    background-color: #fff;
    //   border: 1px solid #000;
    width: 5.36rem;
    height: 0.8rem;
    border-radius: 0.4rem;
    padding-left: 0.37rem;
    display: flex;
    align-items: center;
    margin-bottom: 0.2rem;
    img {
      width: 0.36rem;
      height: 0.36rem;
      margin-right: 0.1rem;
    }
  }
  .btn-denglu {
    width: 5.36rem;
    height: 1rem;
    border-radius: 0.5rem;
    background-color: #fff;
    @include center;
    color: #0079f4;
    font-weight: 500;
    font-size: 0.34rem;
    margin-top: 0.63rem;
  }
}
</style>