<template>
  <div class="countDown">{{minute}}:{{second}}</div>
</template>

<script>
  export default {
    name: "countDown",
    props:['countDownMin','countDownSec'],
    data() {
      return {
        timeId:'',
        minutes:2,
        seconds:0
      }
    },
    created(){

    },
    mounted(){
      this.resetTime();
    },
    methods: {
      num: function (n) {
        return n < 10 ? "0" + n : "" + n;
      },
      resetTime: function () {
        this.minutes = Number(this.countDownMin);
        this.seconds = Number(this.countDownSec);
      },
      startCountdown: function () {  // 把这个回头抽成一个组件
        this.timeId = setInterval(() => {
          if (this.seconds === 0 && this.minutes !== 0) {
            this.seconds = 59;
            this.minutes -= 1;
          } else if (this.minutes === 0 && this.seconds === 0) {
            this.$emit("TimeOver");
          } else {
            this.seconds -= 1;
          }
        }, 1000)
      },
      stopCountDown: function () {
        clearInterval(this.timeId);
      }
    },
    computed: {
      second: function() {
        return this.num(this.seconds);
      },
      minute: function() {
        return this.num(this.minutes);
      }
    }
  }
</script>

<style scoped>
  .countDown{
    width: 100px;
    padding: 10px;
    border: 1px dotted #888888;
  }

</style>
