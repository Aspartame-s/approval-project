<template>
  <div class="common-bg">
    <app-header :backShow="backShow" :titleName="title"></app-header>
    <div class="contant-bg">
      <div class="title1 font3">实施信息</div>
      <div class="contant-item" v-for="(item, index) in servicer_Objs" :key="index">
        <div class="line">
          <div class="line-title">实施人员:</div>
          <div class="line-contant">{{item.real_Name}}</div>
        </div>
        <div class="line">
          <div class="line-title">电话:</div>
          <div class="line-contant">{{item.phone}}</div>
        </div>
        <!-- <div class="line">
          <div class="line-title">结束实施时间:</div>
          <div class="line-contant">2022/11/03 11:00</div>
        </div> -->
      </div>
      <div class="title1 font3">服务评价</div>
      <div class="evaluation">
        <group title="">
          <cell :title="item.evaluate_Name" v-for="(item, index) in result_List" :key="index">
            <rater
              v-model="item.evaluate_Result"
              :disabled="disabled"
              :margin="5"
              :font-size="22"
              @click.native="click1(item.evaluate_Result, item.evaluate_Config_Id)"
            ></rater>
          </cell>
          <!-- <cell title="服务专业性:">
            <rater v-model="data2" @click.native="click2(data1)" :margin="5" :font-size="22"></rater>
          </cell>
          <cell title="培训质量:">
            <rater v-model="data3" @click.native="click3(data1)" :margin="5" :font-size="22"></rater>
          </cell> -->
        </group>
      </div>
      <!-- <div class="file-box">
        <input type="file" class="file-btn" />
        上传文件
      </div> -->
      <!-- <input type="file" accept="video/*" /> -->
    </div>
    <div class="commit font6" @click="commit" v-show="(role == 'C' && evaluation_state !== '已完成')">提交</div>
  </div>
</template>

<script>
import {listTaskEvaluateResult, evaluate, getTask} from '../api/customer'
export default {
  components: {},
  data() {
    return {
      backShow: true,
      title: "评价",
      data1: 0,
      data2: 0,
      data3: 0,
      evaluate_Results: {
        task_Id: '',
        evaluate_Results: []
      },
      servicer_Objs: [],
      dataArr: [],
      result_List: [],
      role: localStorage.getItem('role'),
      disabled: false,
      evaluation_state: ''
    };
  },
  computed: {},
  watch: {},
  methods: {
    click1(e, id) {
      if(this.role == "S") {
        return
      }
      console.log(e);
      console.log(id)
      this.evaluate_Results.evaluate_Results.push({
        "evaluate_Config_Id": id,
        "evaluate_Result": e
      })
      // this.evaluate_Results.evaluate_Results[0].evaluate_Result = e
    },
    // click2(e) {
    //   console.log(e);
    //   this.evaluate_Results.evaluate_Results[1].evaluate_Result = e
    // },
    // click3(e) {
    //   console.log(e);
    //   this.evaluate_Results.evaluate_Results[2].evaluate_Result = e
    // },
    //获取评价信息
    listTaskEvaluateResult(data) {
      listTaskEvaluateResult(data).then(e => {
        this.evaluate_Results.task_Id = this.$route.query.id
        console.log(e)
        if(e.success) {
          this.result_List = e.result_List
          // e.result_List.forEach(item => {
          //   this.evaluate_Results.evaluate_Results.forEach(item1 => {
          //     item1.evaluate_Config_Id = item.evaluate_Config_Id
          //   })
          // });
          console.log(this.dataArr)
        }
      })
    },
    //获取任务信息
    getTask(data) {
      getTask(data).then(e => {
        if(e.success) {
          this.servicer_Objs = e.task.servicer_Objs
          this.evaluation_state = e.task.status_Trl
          if(e.task.status_Trl == '已完成') {
            this.disabled = true
          }
        }
      })
    },
    commit() {
      evaluate(this.evaluate_Results).then(e => {
        console.log(e)
        if(e.success) {
          this.$router.back(-1)
        }
      })
    }
  },
  created() {
    if(this.role == "S" ) {
      this.disabled = true
    }
    this.getTask({task_Id: this.$route.query.id})
  },
  mounted() {
    console.log(localStorage.getItem('role'))
    this.listTaskEvaluateResult({task_Id: this.$route.query.id})
  },
};
</script>
<style lang='scss' scoped>
.file-box {
  display: inline-block;
  position: relative;
  padding: 3px 5px;
  overflow: hidden;
  color: #fff;
  background-color: #ccc;
}
.file-btn {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  outline: none;
  background-color: transparent;
  filter: alpha(opacity=0);
  -moz-opacity: 0;
  -khtml-opacity: 0;
  opacity: 0;
}
.contant-bg {
  padding: 0 0.25rem 0.2rem;
  .title1 {
    margin-bottom: 0.2rem;
    margin-top: 0.25rem;
    margin-left: 0.14rem;
  }
  .contant-item {
    width: 100%;
    height: 1.5rem;
    margin-bottom: 0.05rem;
    border-radius: 0.1rem;
    background-color: #fff;
    padding: 0.2rem 0.32rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .line {
      display: flex;
      font-size: 0.28rem;
      margin: 0.04rem;
    }
    .line-title {
      width: 2rem;
      margin-right: 0.1rem;
      font-size: 0.28rem;
      font-weight: 500;
    }
  }
  .evaluation {
    width: 100%;
    height: auto;
    padding: 0.1rem 0.32rem;
    border-radius: 0.1rem;
    background-color: #fff;
    /deep/ .weui-cells {
      margin-top: 0;
    }
    /deep/ .weui-cell:before {
      content: none;
    }
    /deep/ .weui-cells:after,
    /deep/.weui-cells:before {
      content: none;
    }
    /deep/ .weui-cell .vux-cell-primary {
      width: 2rem;
      flex: none;
      font-size: 0.28rem;
      font-weight: 500;
    }
  }
}
.commit {
  width: 6.85rem;
  height: 0.78rem;
  border-radius: 0.39rem;
  background-image: linear-gradient(to right, #049afb, #017ae8);
  @include center;
  position: fixed;
  bottom: 0.2rem;
  left: 50%;
  transform: translateX(-50%);
}
</style>