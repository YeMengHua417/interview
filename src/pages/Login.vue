<template>
  <div class="loginPage">
    <img src="../assets/image/ben-mullins-785450-unsplash.jpg" width="100%" height="100%"/>
    <div class="login">
      <h1>sign up</h1>
      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="80px">
        <el-form-item label="" prop="name">
          <el-input v-model="loginForm.name" placeholder="please input your Name"></el-input>
        </el-form-item>
        <el-form-item label="" prop="telephone">
          <el-input  placeholder="please input your telephone" v-model.number="loginForm.telephone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <div>
            <el-button type="primary" @click="login('loginForm')"> login</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      title="Instructions"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <ul>
        <li>1.This test is for evaluation of Javascript langage understanding and programming skills;</li>
        <li>2.you are suppose to complete the test independently;</li>
        <li>3.you have 2 minutes for each question;</li>
        <li>4.please keep the window as the foreground window during the test;</li>
        <li>5.<span class="red">Do Not switch/hide/resize/ this window</span>,otherwise it may affect your final score;</li>
        <li>Thanks for your cooperation!</li>
      </ul>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="startTest()">confirm</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        name: '',
        telephone: ''
      },
      dialogVisible: false,
      rules: {
        name: [{
          required: true,
          message: "",
          trigger: ["blur", "change"]
        },{
          min: 3,
          max: 15,
          message: 'the length between  3 to 15 characters',
          trigger: 'blur'}
        ],
        telephone: [{
          required: true,
          message: "",
          trigger: ["blur", "change"]
        },{
          type: 'number',
          maxLength:20,
          message: '',
          trigger: 'blur' }
          ]
      }
    }
  },
  methods: {
    login(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = true;
        } else {
          // 发消息后端要session，后续要把验证码加上，以及路由检测
          return;
        }
      });
    },
    startTest () {
      this.dialogVisible = false;
      //向后端发消息
      this.$router.push({ path: '/exam' });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  html{
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  .loginPage{
    position: absolute;
    top:0;
    left:0;
    right: 0;
    bottom: 0;
    background-image: url(../assets/image/ben-mullins-785450-unsplash.jpg);
    background-size: cover;

  }
  .login{
    position: absolute;
    top:40%;
    left: 50%;
    transform: translate(-50%,-50%);

    text-align: left;
    border: 1px solid #888888;
    border-radius: 3px;
    box-shadow: 8px 8px 10px #888888;
    width: 500px;
    height: 320px;
    padding: 10px;
    padding-right: 80px;
  }
  .login h1{
    margin-left: 80px;
  }


  ul{
    list-style-type: none;
    margin: 0;
    text-align: left;
    border: 1px solid #88888888;
    padding: 25px;
    font-size: 16px;
    line-height: 20px;
  }

 </style>
