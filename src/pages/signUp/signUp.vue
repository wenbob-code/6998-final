<template>
  <div class="page-container">
    <!-- titleBar -->
    <div class="titleBar">
      <span class="mainTitle">CoStudier</span>
      <span class="subTitle">--Your cloud study room</span>
    </div>
    <!-- content -->
    <div class="content">
      <!-- logo -->
      <div class="logo mb30">
        <img
          src="../../../static/images/loginLogo.png"
          style="width: 100px; height: 100px"
        />
      </div>
      <!-- signUpForm -->
      <div class="signUpForm">
        <!-- title -->
        <p class="flex_center font24 mb10">Please Sign Up</p>
        <!-- form -->
        <el-form ref="signUpForm" :model="signUpForm" :rules="signUpFormRules">
          <el-row class="flex_spaceBetween w100">
            <el-col :span="12">
              <el-form-item prop="firstName">
                <el-input
                  placeholder="First Name"
                  v-model="signUpForm.firstName"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="lastName">
                <el-input
                  placeholder="Last Name"
                  v-model="signUpForm.lastName"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item prop="email">
            <div class="flex_spaceBetween">
              <el-input
                placeholder="Email Address"
                v-model="signUpForm.email"
              ></el-input>
              <el-button
                type="primary"
                :disabled="isSended"
                @click="sendCode"
                >{{ buttonText }}</el-button
              >
            </div>
          </el-form-item>
          <el-form-item prop="code">
            <el-input
              placeholder="Verify Code"
              v-model="signUpForm.code"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="Password"
              v-model="signUpForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item prop="confirmedPassword">
            <el-input
              placeholder="Confirm Your Password"
              v-model="signUpForm.confirmedPassword"
            ></el-input>
          </el-form-item>
        </el-form>
        <!-- sign Up -->
        <div class="signUp flex_center flex_alignCenter">
          <span>Already have an account? </span>
          <el-button type="text" @click="goLogin">Login</el-button>
        </div>
        <!-- signUpButton -->
        <el-button class="signUpButton" type="primary" @click="signUp"
          >sign Up</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import { RegisterUser,ConfirmEmail } from '../../app/auth.js';
export default {

  name: "signUp",
  data() {
    return {
      signUpForm: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmedPassword: "",
        code: "",
      },
      signUpFormRules: {
        firstName: [
          {
            required: true,
            message: "Please Enter FirstName",
            trigger: "blur",
          },
        ],
        lastName: [
          { required: true, message: "Please Enter lastName", trigger: "blur" },
        ],
        email: [
          { required: true, message: "Please Enter email", trigger: "blur" },
        ],
        // code: [
        //   {
        //     required: true,
        //     message: "Please Enter verifyCode",
        //     trigger: "blur",
        //   },
        // ],
        password: [
          { required: true, message: "Please Enter password", trigger: "blur" },
        ],
        confirmedPassword: [
          {
            required: true,
            message: "Please Enter confirmedPassword",
            trigger: "blur",
          },
        ],
      },
      buttonText: "Send Code",
      isSended: false,
      count:300
    };
  },
  methods: {
    goLogin() {
      this.$router.push("/login");
    },
    signUp() {
      this.$refs.signUpForm.validate((valid) => {
        if (!valid) {
          this.$message.error("Please Complete All Information");
        }else if (this.signUpForm.password != this.signUpForm.confirmedPassword){
          this.$message.error("Password and confirmpassword should be the same");
        }else {
          ConfirmEmail(this.signUpForm.firstName+'_'+this.signUpForm.lastName,
          this.signUpForm.code,this.signupcallback)
        }
      });
    },
    signupcallback(result){
      if (result == "sucess"){
        alert("Signup Success!");
        this.$router.push('/login')
      }
    },
    sendCode() {
      this.$refs.signUpForm.validate((valid) => {
        if (!valid) {
          this.$message.error("Please Complete All Information");
        }else if (this.signUpForm.password != this.signUpForm.confirmedPassword){
          this.$message.error("Password and confirmpassword should be the same");
        }else{
          var countDown = setInterval(() => {
            if (this.count < 1) {
              this.isSended = false;
              this.buttonText = "Send Code";
              this.count = 300;
              clearInterval(countDown);
            } else {
              this.isSended = true;
              this.buttonText = this.count-- + "s Resend";
            }
          }, 1000);
          RegisterUser(this.signUpForm.firstName+"_"+this.signUpForm.lastName,
                  this.signUpForm.password,
                  this.signUpForm.email,
                  this.signUpForm.firstName,
                  this.signUpForm.lastName,
          function(cognitoUser){
              console.log(cognitoUser)
          })
        }
      });

    },
  },
  created() {},
};
</script>
<style  lang="scss" scoped>
.page-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .titleBar {
    position: fixed;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
    background-color: #acc8ec;
    color: #fff;
    font-size: 14px;
    .mainTitle {
      font-size: 40px;
      display: block;
      margin-right: 10px;
    }
    .subTitle {
      display: block;
      padding-top: 15px;
    }
  }
  .content {
    // height: 500px;
    .logo {
      display: flex;
      justify-content: center;
    }
  }
}
/deep/ .signUpButton {
  width: 500px;
}
</style>