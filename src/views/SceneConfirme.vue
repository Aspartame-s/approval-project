<template>
  <div class="common-bg">
    <app-header :titleName="title" :backShow="backShow"></app-header>
    <div class="contant1">
      <img :src="src" ref="input1" alt="" class="showImg" />
      <div class="camera">
        <img src="../assets/btn_camera@2x.png" alt="" class="camera-img" />
        <input class="input" type="file" @change="handle" ref="input" />
      </div>
      <div class="upload font6" @click="upload">上传</div>
    </div>
  </div>
</template>

<script>
import { sceneConfirm } from "../api/servicer";
import axios from "axios";
// var formData = new FormData();
export default {
  components: {},
  data() {
    return {
      title: "到场确认",
      backShow: true,
      file: null,
      src: "",
      formData: null,
    };
  },
  computed: {},
  watch: {},
  methods: {
    handle(e) {
      this.formData = new FormData();
      var that = this;
      // console.log(e);
      that.file = e.target.files[0];
      this.formData.append("scene_Proof_File", e.target.files[0]);
      this.formData.append("task_Id", that.$route.query.id);
      console.log(this.formData);
      console.log(that.file);
      var reader = new FileReader();
      var AllowImgFileSize = 2100000000; //上传图片最大值(单位字节)（ 2 M = 2097152 B ）超过2M上传失败
      var file = e.target.files[0];
      var imgUrlBase64;
      var src1;
      if (file) {
        //将文件以Data URL形式读入页面
        imgUrlBase64 = reader.readAsDataURL(file);
        reader.onload = function (e) {
          //var ImgFileSize = reader.result.substring(reader.result.indexOf(",") + 1).length;//截取base64码部分（可选可不选，需要与后台沟通）
          if (
            AllowImgFileSize != 0 &&
            AllowImgFileSize < reader.result.length
          ) {
            alert("上传失败，请上传不大于2M的图片！");
            return;
          } else {
            //   console.log(e.target.result)
            //执行上传操作
            // console.log(reader.result)
            that.src = e.target.result;
            console.log(that.title);
            // this.$store.commit('setsrc', {src: e.target.result})
            // this.$refs.img.src = reader.result
            // console.log(this.$refs.input1)
          }
        };
      }
    },
    upload() {
      // console.log(formData)
      // sceneConfirm(this.formData).then(e => {
      //   console.log(e)
      // })
      axios({
        method: "post",
        url: "/api/servicer/task/sceneConfirm",
        data: this.formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(e => {
        console.log(e)
        if(e.data.success) {
          this.$router.back(-1)
        }
      })
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang='scss' scoped>
.contant1 {
  width: 100%;
  height: auto;
  padding: 0.3rem 0.3rem;
  @include center;
  flex-direction: column;
  .showImg {
    width: 100%;
    height: 8.7rem;
  }
  .camera {
    width: 1.2rem;
    height: 1.2rem;
    // background-color: pink;
    overflow: hidden;
    position: relative;
    margin-top: 0.2rem;
    margin-bottom: 0.54rem;
    .input {
      width: 100%;
      height: 100%;
      opacity: 0;
      position: absolute;
      left: 0;
      top: 0;
    }
    .camera-img {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .upload {
    width: 100%;
    height: 0.88rem;
    border-radius: 0.44rem;
    background-color: #00bf5e;
    @include center;
  }
}

.eee {
  width: 1rem;
  height: 1rem;
  background-color: pink;
}
</style>