<template>
  <div class="common-bg">
    <app-header :titleName="title" :backShow="backShow"></app-header>
    <div class="contant1">
      <div class="title font3">服务确认</div>
      <div class="upload-container">
        <div class="upload-item" v-for="(item, index) in result" :key="index">
          <div class="item-title font4">
            <span>{{ item.proof_Name }}： </span>
            <span>(已签字)</span>
          </div>
          <div class="upload-btn">
            <input type="file" class="input" @change="handle(item.proof_Config_Id, $event)" />
            <img src="../assets/icon_can@2x.png" alt="" />
            <span>添加照片</span>
          </div>
        </div>
      </div>
      <div class="commit font6" @click="finish">提交</div>
    </div>
  </div>
</template>

<script>
import { listTaskProof, uploadTaskProof, finish } from "../api/servicer";
import axios from "axios";
export default {
  components: {},
  data() {
    return {
      title: "服务确认",
      backShow: true,
      result: [],
      formData: null
    };
  },
  computed: {},
  watch: {},
  methods: {
    listTaskProof(data) {
      listTaskProof(data).then((e) => {
        if (e.success) {
            this.result = e.result
        }
      });
    },
    handle(id, e) {
    this.formData = new FormData();
    this.formData.append('task_Id', this.$route.query.id)
    this.formData.append('proof_Config_Id', id)
    this.formData.append('proof_File', e.target.files[0])
      console.log(e.target.files[0]);
      console.log(id)
      this.uploadTaskProof(this.formData)
    },
    uploadTaskProof(data) {
       axios({
        method: "post",
        url: "/api/servicer/task/uploadTaskProof",
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(e => {
        console.log(e)
        if(e.data.success) {
          alert('上传成功')
        }
      }).catch(err => {
          alert('操作失败:系统存在重复数据')
      })
    },
    finish() {
        finish({task_Id: this.$route.query.id}).then(e => {
            if(e.success) {
                this.$router.back(-1)
            }
        })
    }
  },
  created() {},
  mounted() {
    this.listTaskProof({ task_Id: this.$route.query.id });
  },
};
</script>
<style lang='scss' scoped>
.common-bg {
  background-color: #fff !important;
  padding-bottom: 0;
}
.contant1 {
  width: 100%;
  height: auto;
  min-height: calc(100vh - 0.88rem);
  padding: 0.4rem 0.25rem 0;
  background-color: #f3f3f3;
  position: relative;
  .title {
    margin-bottom: 0.2rem;
    margin-left: 0.1rem;
  }
  .commit {
    position: fixed;
    bottom: 0.1rem;
    width: 6.85rem;
    height: 0.78rem;
    left: 50%;
    transform: translateX(-50%);
    @include center;
    font-size: 0.3rem;
    color: #fff;
    font-weight: 500;
    background-image: linear-gradient(to right, #049AFB, #017AE8);
    border-radius: .39rem;
  }
}
.upload-container {
  width: 100%;
  height: 7.5rem;
  border-radius: 0.1rem;
  // background-color: red;
  overflow: hidden;
  .upload-item {
    width: 100%;
    height: 1.73rem;
    background-color: #fff;
    position: relative;
    border-bottom: 1px solid #cacaca;
    padding: 0 0.53rem 0 0.32rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .item-title {
      height: 0.9rem;
      width: auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .upload-btn {
      width: 1.1rem;
      height: 1.1rem;
      background-color: #f8f8f8;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      padding: 0.15rem 0 0.15rem 0;
      .input {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
      }
      img {
        width: 0.6rem;
        height: 0.6rem;
      }
      span {
        font-size: 0.2rem;
        color: #7d7d7d;
      }
    }
    &:last-child {
      border-bottom: 0;
    }
  }
}
</style>