<template>
  <div class="loginPage">
    <img src="https://prod-bentleycdn.azureedge.net/-/media/images/website-specific-graphics/hero/hero_ist_39752344_designteam_l.jpg?h=349&amp;la=zh-CN&amp;w=1800&amp;modified=20170710135652&amp;hash=740A15E0E1DC0AE6D1F4AF75FF89E5860E0B7BE6" alt="" width="1800" height="349" draggable="false">
    <div class="login">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="80px">
        <el-form-item label="" prop="name">
          <el-input v-model.trim="loginForm.name" placeholder="please input your Name"></el-input>
        </el-form-item>
        <el-form-item label="" prop="telephone">
          <el-input  placeholder="please input your telephone" v-model.number="loginForm.telephone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="" prop="identityCode">
          <div class="vertifyCode">
            <el-input  v-model.number="loginForm.identityCode" autocomplete="off"></el-input>
            <img @load="verifyLoadState=true"  @click="toggleVerify()" :src="img_src" alt="">
          </div>

        </el-form-item>
        <el-form-item>
          <div>
            <el-button type="primary" @click="login('loginForm')">start the exam</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      <div>email:april1984417@163.com</div>

    </div>
    <el-dialog
      title="INSTRCTIONS"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <ul>
        <li>1.This test is for evaluation of Javascript langage understanding and programming skills;</li>
        <li>2.you are suppose to complete the test independently;</li>
        <li>3.you have <span class="red">2</span> minutes for each question;</li>
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
import MD5 from  '../utils/md5'
import * as localStorage from '../utils/localStorage';
// import JSEncrypt from '../utils/jsencrypt.min'
import { JSEncrypt } from 'jsencrypt'
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        name: '',
        telephone: '',
        identityCode:'',
      },
      img_src:'',
      verifyLoadState:true,
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
      },
      identityCode:[{
        required: true,
        message: "",
      }]
    }
  },
  created(){
    this.toggleVerify();
  },
  methods: {
    toggleVerify(){

      if(!this.verifyLoadState) return;
      // 防止下一次重复点击
      this.verifyLoadState =  false;
      const base = '/api/getIdentifyCode'
      this.img_src = base + '?' + (new Date()).getTime();
    },
    login(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = true;
        } else {
          return;
        }
      });
    },
    startTest () {
      this.dialogVisible = false;
      //向后端发消息

      this.$get('/api/key').then(response=>{
        let key = response.data.publicKey;
        let encrypt = new JSEncrypt()
        encrypt.setPublicKey(key);

        let param = {
          name:encrypt.encrypt(this.loginForm.name.toString()),
          telephone:encrypt.encrypt(this.loginForm.telephone.toString()),
          vertifyCode:this.loginForm.identityCode
        };

        this.$post('/api/login',param).then(response=>{
           // 获取到token，存下作为路由防护

           if(response.code != 200){
             this.toggleVerify();
             this.$message({
               message: response.msg,
               type: 'warning'
             });

           }else{
             localStorage.setItem('sessionId', response.data.token);
             this.$router.push({ path: '/exam' });
           }
        })
      })
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
  }
  .login{
    background-color: #fff;
    position: absolute;
    top: 40%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    text-align: left;
    border: 1px solid #888888;
    border-radius: 3px;
    -webkit-box-shadow: 8px 8px 10px #888888;
    box-shadow: 8px 8px 10px #888888;
    width: 500px;
    height: 250px;
    padding: 10px;
    padding-top: 30px;
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

  .footer{
    text-align: left;
    width: 100%;
    height: 20px;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #e1e1e1;
    color: #333;
    padding: 25px 40px 20px 60px;
  }

  .red{
    color: red;
  }

  .vertifyCode{
    display: flex;
  }

  .vertifyCode img{
    height: 40px;
    cursor: pointer;
  }
 </style>
