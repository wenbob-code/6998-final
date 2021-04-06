<template>
  <div class="container">
    <!-- content -->
    <div class="content">
      <!-- topBar -->
      <div class="topBar flex mb30">
        <div class="colorfff font18 mr30">CoStudier</div>
        <div class="colorfff font18 mr30 cp" @click="goHome">Home</div>
        <div class="colorfff font18 cp" @click="goLogin">Login Out</div>
      </div>
      <!-- userInfo -->
      <div class="userInfo">
        <div class="icon" @click="showDialog">
          <i class="el-icon-edit editIcon cp font30"></i>
        </div>
        <div class="backgorund">
          <img
            src="../../../static/images/columbia.jpg"
            style="width: 100%; height: 300px; border-radius: 7px 7px 0 0"
          />
        </div>
        <div class="userPic">
          <img src="../../../static/images/peter.jpg" class="headImg" />

        </div>
        <div class="basicInfo mb30">
          <el-row class="name mb10">
            <el-col :span="12" class="font30">{{ userName }}</el-col>
          </el-row>
          <el-row class="title mb10">
            <el-col :span="12" class="font18">{{ title }}</el-col>
          </el-row>
          <div class="address mb10">
            <p class="font18">{{ address }}</p>
          </div>
          <div class="line"></div>
        </div>
        <div class="complexInfo">
          <el-row>
            <el-col :span="8">
              <p class="ml10 font20 mb30 h40 flex_alignCenter">Contact</p>
              <p class="ml10 mb10 font16">Email:{{ emailId }}</p>
              <p class="ml10 mb10 font16">Phone:{{ phoneNum }}</p>
              <p class="ml10 mb10 font16">Wechat:{{ wechatId }}</p>
              <p class="ml10 mb10 font16">FaceBook:{{ faceBookId }}</p>
              <p class="ml10 mb10 font16">LinkedIn:{{ linkedInId }}</p>
            </el-col>
            <el-col :span="16">
              <el-tabs v-model="activeName">
                <el-tab-pane label="Skills" name="skills">
                  <p
                    v-for="(item, index) in skillList"
                    :key="index"
                    class="mb10"
                  >
                    {{ item.name }}
                  </p>
                </el-tab-pane>
                <el-tab-pane label="Course Taken" name="courseTaken">
                  <p
                    v-for="(item, index) in courseTakenList"
                    :key="index"
                    class="mb10"
                  >
                    {{ item.name }}
                  </p>
                </el-tab-pane>
              </el-tabs>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <!-- dialog -->
    <el-dialog title="Edit" :visible.sync="editDialogFlag">
      <el-form :model="userInfoForm" ref="userInfoForm" label-width="100px">
        <el-form-item label="Name">
          <el-input
            v-model="userInfoForm.name"
            placeholder="Enter Your Name"
            class="w200"
          ></el-input>
        </el-form-item>
        <el-form-item label="Title">
          <el-input
            v-model="userInfoForm.title"
            placeholder="Enter Title"
            class="w200"
          ></el-input>
        </el-form-item>
        <el-form-item label="soc">
          <el-input
            v-model="userInfoForm.soc"
            placeholder="Enter Your City Or State"
            class="w200 mr10"
          ></el-input>
          <el-input 
             v-model="userInfoForm.country"
            placeholder="Enter Your Country"
            class="w200"
          ></el-input>
        </el-form-item>
        <el-form-item label="Upload Your Photo">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="userInfoForm.imageUrl" :src="userInfoForm.imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="userInfoForm.email" placeholder="Enter Your Email" class="w200"></el-input>
        </el-form-item>
        <el-form-item label="Phone">
          <el-input v-model="userInfoForm.phone" placeholder="Enter Your Phone" class="w200"></el-input>
        </el-form-item>
        <el-form-item label="Wechat">
          <el-input v-model="userInfoForm.wechat" placeholder="Enter Your WechatId" class="w200"></el-input>
        </el-form-item>
        <el-form-item label="FaceBook">
          <el-input v-model="userInfoForm.faceBook" placeholder="Enter Your FaceBookId" class="w200"></el-input>
        </el-form-item>
        <el-form-item label="LinkedIn">
          <el-input v-model="userInfoForm.linkedIn" placeholder="Enter Your LinkedInId" class="w200"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogFlag = false">Cancel</el-button>
        <el-button type="primary" @click="confirmSaveChange">Done</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "homePage",
  data() {
    return {
      isEdit: false,
      userName: "Huiyu Zhao",
      title: "Master of Science - MS at Columbia University in the City of New York",
      address: "East Lansing, Michigan, United States",
      emailId: "",
      phoneNum: "",
      wechatId: "",
      faceBookId: "",
      linkedInId: "",
      activeName: "skills",
      skillList: [],
      courseTakenList: [],
      editDialogFlag: false,
      userInfoForm: {
        name: "",
        title: "",
        soc: "",
        country:"",
        imageUrl:'',
        email:'',
        wechat:'',
        phone:'',
        faceBook:'',
        linkedIn:''
      },
    };
  },
  methods: {
    showDialog() {
      this.editDialogFlag = true;
    },
    confirmSaveChange() {
      this.$confirm("Are You Sure Save Your Changes?", "Tips", {
        type: "Info",
        cancelButtonText: "No",
        confirmButtonText: "Yes",
      })
        .then(() => {
          this.editDialogFlag = false;
        })
        .catch(() => {
          this.editDialogFlag = false;
        });
    },
    handleAvatarSuccess(response, file, fileList) {
      console.log(response, file, fileList);
    },
    beforeAvatarUpload(file) {
      console.log(file);
    },
    goHome(){
      this.$router.push('/index')
    },
    goLogin(){
      this.$router.push('/login')
    }
  },
  created() {},
};
</script>
<style lang="scss" scoped>
.container {
  // height: 100%;
  background: #acc8ec;
;
  padding-bottom: 50px;
  .content {
    width: 80%;
    margin: 0 auto;
    .topBar {
      padding-top: 10px;
    }
    .userInfo {
      position: relative;
      width: 100%;
      // padding: 30px 0;
      padding-bottom: 50px;
      background-color: #fff;
      border-radius: 7px;
      .icon {
        position: absolute;
        top: 230px;
        right: 30px;
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: #fff;
      }
      .userPic {
        width: 200px;
        height: 200px;
        border-radius: 75%;
        margin-top: -95px;
        border: 5px solid #fff;
        margin-left: 100px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 5px solid #fff;
        }
      }
      .basicInfo {
        width: 100%;
        padding: 0 30px;
        .line {
          height: 2px;
          width: 100%;
          background-color: #3767a6;
        }
      }
      .complexInfo {
        padding: 0 30px;
      }
    }
  }
}
.cp {
  cursor: pointer;
}
.w200 {
  width: 200px;
  /deep/ .el-input__inner {
    width: 200px;
  }
}
/deep/ .el-tabs__item {
  font-size: 20px;
}
.h40 {
  height: 40px;
}
/deep/ .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>