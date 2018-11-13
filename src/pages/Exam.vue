<template>
  <div class="question">
    <header class="header"></header>
    <count-down ref="countDown" :countDownMin="'2'" :countDownSec="'0'" @TimeOver="TimerOver()"></count-down>
    <section>
      <h1>{{question.title}}</h1>
      <div class="que-body">
        <div>
            <pre>{{question.body}}</pre>
        </div>
        <el-radio-group v-model="radio">
          <div v-for="(item,index) in question.answer">
            <el-radio :label=index border @change="radioChange()">{{item}}</el-radio>
          </div>
        </el-radio-group>
      </div>
      <div></div>
    </section>
    <footer></footer>
  </div>
</template>

<script>
  import countDown from '../components/countDown'

  export default {
    name: "Exam",
    components: {countDown},
    data () {
      return {
        timeId:'',
        question:{},
        radio:'',
        exam:[],
        examResult:[],
        index:0
      }
    },
    created(){

    },
    mounted(){
        this.preventCheat();
        this.getQuestion();
    },
    methods: {
      preventCheat:function(){
        let that = this;
        document.oncontextmenu = function(){ // 禁止鼠标右键
          if(that.$route.name == 'exam'){
            return false
          }
        };

        window.onblur = function(e) {
          if(that.$route.name == 'exam'){
            that.getNextQuestion();
          }
        };
      },
      getQuestion:function(){
        this.$get('static/exam.json').then(res => {
          this.exam = res.question;
          this.question = this.exam[this.index];
          this.$refs.countDown.startCountdown();
        })
      },
      TimerOver:function(){
        this.getNextQuestion();
      },
      getNextQuestion:function(){
        // 判断是否有下一题，然后最后一道题，结束定时
        if(this.index === (this.exam.length-1)){
          this.$refs.countDown.stopCountDown();
          // 向后台发消息 报告成绩
          this.$router.replace({ path: '/thanks' });
        }
        else{
          this.examResult.push(this.radio);
          this.index++;
          this.question = this.exam[this.index];
          this.radio ='';
          this.$refs.countDown.resetTime();
        }
      },
      radioChange:function () {
       this.getNextQuestion();
      }
    }
  }
</script>

<style scoped>
  header{
    -moz-opacity:0.5;
    -khtml-opacity: 0.5;
    opacity: 0.5;
    background-color:  #62bb47;
    width: 100%;
    height: 50px;
  }
  section{
    background-color: #fff;
    text-align: left;
    padding: 10px;
    width: 600px;
    margin: 0 auto;
  }

  .question pre{
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 16px;
    line-height: 20px;
  }

  footer{
    opacity: 0.5;
    background-color: #62bb47;
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0;
    left: 0;
  }

  .el-radio.is-bordered {
    width: 600px;
    padding: 12px 20px 0 10px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height: 40px;
    margin: 5px;
  }

  .countDown{
    width: 100px;
    padding: 10px;
    border: 1px dotted #888888;
  }
</style>
