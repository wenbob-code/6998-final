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
              <p class="ml10 mb10 font16">Email: {{ emailId }}</p>
              <p class="ml10 mb10 font16">Phone: {{ phoneNum }}</p>
              <p class="ml10 mb10 font16">Wechat: {{ wechatId }}</p>
              <p class="ml10 mb10 font16">FaceBook: {{ faceBookId }}</p>
              <p class="ml10 mb10 font16">LinkedIn: {{ linkedInId }}</p>
            </el-col>
            <el-col :span="16">
              <el-tabs v-model="activeName">
                <el-tab-pane label="Skills" name="skills">
                  <p
                    v-for="(item, index) in skillList"
                    :key="index"
                    class="mb10"
                  >
                    {{ item }}
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
        <el-form-item label="Concentration">
          <el-input
            v-model="userInfoForm.concentration"
            placeholder="Enter Concentration"
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
            <img
              v-if="userInfoForm.imageUrl"
              :src="userInfoForm.imageUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="Email">
          <el-input
            v-model="userInfoForm.email"
            placeholder="Enter Your Email"
            class="w200"
          ></el-input>
        </el-form-item>
        <el-form-item label="Phone">
          <el-input
            v-model="userInfoForm.phone"
            placeholder="Enter Your Phone"
            class="w200"
          ></el-input>
        </el-form-item>
        <el-form-item label="Wechat">
          <el-input
            v-model="userInfoForm.wechat"
            placeholder="Enter Your WechatId"
            class="w200"
          ></el-input>
        </el-form-item>
        <el-form-item label="FaceBook">
          <el-input
            v-model="userInfoForm.faceBook"
            placeholder="Enter Your FaceBookId"
            class="w200"
          ></el-input>
        </el-form-item>
        <el-form-item label="LinkedIn">
          <el-input
            v-model="userInfoForm.linkedIn"
            placeholder="Enter Your LinkedInId"
            class="w200"
          ></el-input>
        </el-form-item>
        <el-form-item label="Skills">
          <el-row
            v-for="(item, index) in userInfoForm.skillList"
            :key="index"
            class="mb20"
          >
            <el-input
              v-model="item.value"
              placeholder="Enter Your Skills"
              class="w200 mr20"
            ></el-input>
            <el-button
              type="primary"
              v-if="index == userInfoForm.skillList.length - 1"
              @click="addInput(index)"
              >plus</el-button
            >
            <el-button v-if="index >= 1" @click="delInput(index)"
              >minus</el-button
            >
          </el-row>
        </el-form-item>
        <el-form-item label="CourseTaken">
          <el-select
            v-model="userInfoForm.courseTaken"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="Please enter a keyword"
            :remote-method="remoteMethod"
          >
            <el-option
              v-for="item in userInfoForm.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
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
// import apigClientFactory from '../../apiGateway-js-sdk/apigClient'
import {getCourse, getAllExistingCourse, getUserInfo, setUserInfo} from "@/api/api";
export default {
  name: "homePage",
  data() {
    return {
      isEdit: false,
      userName: "Huiyu Zhao",
      title:
        "Master of Science - MS at Columbia University in the City of New York",
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
        concentration: "",
        soc: "",
        country: "",
        imageUrl: "",
        email: "",
        wechat: "",
        phone: "",
        faceBook: "",
        linkedIn: "",
        skillList: [
          // {
          //   // id: 1,
          //   // value: "oooo",
          // },
        ],
        courseTaken: [],
        options: [],
        list: [],
        states: [
          "Alabama",
          "Alaska",
          "Arizona",
          "Arkansas",
          "California",
          "Colorado",
          "Connecticut",
          "Delaware",
          "Florida",
          "Georgia",
          "Hawaii",
          "Idaho",
          "Illinois",
          "Indiana",
          "Iowa",
          "Kansas",
          "Kentucky",
          "Louisiana",
          "Maine",
          "Maryland",
          "Massachusetts",
          "Michigan",
          "Minnesota",
          "Mississippi",
          "Missouri",
          "Montana",
          "Nebraska",
          "Nevada",
          "New Hampshire",
          "New Jersey",
          "New Mexico",
          "New York",
          "North Carolina",
          "North Dakota",
          "Ohio",
          "Oklahoma",
          "Oregon",
          "Pennsylvania",
          "Rhode Island",
          "South Carolina",
          "South Dakota",
          "Tennessee",
          "Texas",
          "Utah",
          "Vermont",
          "Virginia",
          "Washington",
          "West Virginia",
          "Wisconsin",
          "Wyoming",
        ],
      },
    };
  },
  methods: {
    init() {
      // get user's data from database
      let user_email = this.$cookies.get('user_email')
      this.emailId = user_email;
      console.log(user_email);
      getUserInfo({"user_email":user_email},this.getUserInfo_callback);
    },
    getUserInfo_callback(userInfoResponse){
      console.log(userInfoResponse)
      this.phoneNum = userInfoResponse.Phone;
      this.wechatId = userInfoResponse.Wechat;
      this.faceBookId = userInfoResponse.Facebook;
      this.linkedInId = userInfoResponse.LinkedIn;
      this.userName = userInfoResponse.FirstName + " " + userInfoResponse.LastName;
      this.address = userInfoResponse.CityOrState + ", " + userInfoResponse.Country;
      this.title = userInfoResponse.Major;
      this.skillList = userInfoResponse.Skill;
      console.log(this.skillList);
      this.courseTakenList = userInfoResponse.CourseTaken;
      this.userInfoForm.name = this.userName;
      this.userInfoForm.concentration = this.title;
      this.userInfoForm.country = userInfoResponse.Country;
      this.userInfoForm.email = this.emailId;
      this.userInfoForm.soc = userInfoResponse.CityOrState;
      this.userInfoForm.faceBook = this.faceBookId;
      this.userInfoForm.linkedIn = this.linkedInId;
      this.userInfoForm.wechat = this.wechatId;
      this.userInfoForm.phone = this.phoneNum;

      var i;
      for (i = 0; i < this.skillList.length; i++) {
        this.userInfoForm.skillList.push({
          id: i,
          value: this.skillList[i],
        })
      }

      //
      // this.userInfoForm.skillList = this.skillList;

      this.userInfoForm.courseTaken = this.courseTakenList;
    },
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
          setUserInfo(this.userInfoForm,this.init);
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
    goHome() {
      this.$router.push("/index");
    },
    goLogin() {
      this.$router.push("/login");
    },
    addInput(index) {
      if (this.userInfoForm.skillList.length >= 10) {
        this.$message.error("At Most Ten Skills Are Allowed");
      } else {
        this.userInfoForm.skillList.push({
          id: index + 1,
          value: "",
        });
      }
    },
    delInput(index) {
      this.userInfoForm.skillList = this.userInfoForm.skillList.filter(
        (item, i) => {
          return index != i;
        }
      );
    },
    remoteMethod(query) {
      if (query !== "") {
        setTimeout(() => {
          this.userInfoForm.options = this.userInfoForm.list.filter((item) => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.userInfoForm.options = [];
      }
    },
  },
  created() {
    // this.showDialog();
    this.init();
  },
  mounted() {
    this.userInfoForm.list = this.userInfoForm.states.map((item) => {
      return { value: `value:${item}`, label: `label:${item}` };
    });
  },
};
</script>
<style lang="scss" scoped>
.container {
  // height: 100%;
  background: #acc8ec;
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
.mb20 {
  margin-bottom: 20px;
}
</style>