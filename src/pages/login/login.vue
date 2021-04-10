<template>
  <div class="container">
    <!-- titleBar -->
    <div class="titleBar">
      <span class="mainTitle">CoStudier</span>
      <span class="subTitle">--Your cloud study room</span>
    </div>
    <!-- content -->
    <div class="content">
      <!-- logo -->
      <div class="logo mb30">
        <img src="../../../static/images/loginLogo.png" style="width:100px;height:100px">
      </div>
      <!-- loginForm -->
      <div class="loginForm">
        <!-- title -->
        <p class="flex_center font24 mb10">Please Login</p>
        <!-- form -->
        <el-form ref="loginForm" :model="loginForm" :rules="loginFormRules">
          <el-form-item prop="email">
            <el-input placeholder="Email Address" v-model="loginForm.email"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type=password placeholder="Password" v-model="loginForm.password"></el-input>
          </el-form-item>
        </el-form>
        <!-- sign Up -->
        <div class="signUp flex_center flex_alignCenter">
          <span>Don't have an account? </span>
          <el-button type="text" @click="goSignUp">Sign Up</el-button>
        </div>
        <!-- loginButton -->
        <el-button class="loginButton" type="primary" @click="login">Login</el-button>
      </div>

    </div>
  </div>
</template>
<script>
import { Login } from '../../app/auth.js';
export default {
  name:"login",
  data(){
    return {
      loginForm:{
        email:'',
        password:'',
      },
      loginFormRules: {
          email: [
            { required: true, message: "Please Enter email", trigger: "blur" },
          ],
          password: [
            { required: true, message: "Please Enter password", trigger: "blur" },
          ]
        },
    }
  },
  methods:{
    //  goSignUp
    goSignUp(){
      this.$router.push('/signUp')
    },
    login(){
      this.$refs.loginForm.validate(valid => {
        if(!valid){
          this.$message.error('Please Complete All Information')
        }else{
          Login(this.loginForm.email,this.loginForm.password,this.logincallback);
        }
      })
    },
    logincallback(result){
      console.log(result)
        if (result == "success") {
          console.log("success")
          this.$cookies.set('user_email', this.loginForm.email, 60 * 60 * 24 * 7)
          console.log(this.$cookies.get('user_email'))
          this.$router.push('/index')
        }
    }
  },
  created(){}
}
</script>
<style  lang='scss' scoped>
.container{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .titleBar{
    position:fixed;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
    background-color: #acc8ec;
    color: #fff;
    font-size: 14px;
    .mainTitle{
      font-size: 40px;
      display: block;
      margin-right: 10px;
    }
    .subTitle{
      display: block;
      padding-top: 15px;
    }
  }
  .content{
    width: 500px;
    height: 500px;
    .logo{
      display: flex;
      justify-content: center;
    }
  }
}
/deep/ .loginButton{
  width: 500px;
}
</style>