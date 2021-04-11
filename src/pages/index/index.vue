<template>
  <div class="container">
    <!-- 顶部banner -->
    <div class="topBanner">
      <img src="../../../static/images/banner.jpg" class="banner" />
      <div class="mask">
        <p>CoStudier</p>
        <p class="font20">-- Your cloud study room</p>
      </div>
    </div>
    <!-- 用户操作栏 -->
    <div class="userOperate">
      <div class="right">
        <div class="btns">
          <!-- 登录按钮 -->
          <el-button type="text" class="mr10">Sign In</el-button>
          <!-- 签出按钮 -->
          <el-button type="text" @click="goSignInPage">LogOut</el-button>
        </div>
        <!-- 用户头像 -->
        <div class="userImg" @click="goPersonalCenter">
          <img
            src="../../../static/images/userImg.png"
            v-if="userImg && userImg != ''"
          />
          <img src="../../../static/images/userImg.png" v-else />
        </div>
      </div>
    </div>
    <!-- 顶部导航栏 -->
    <div class="tabs flex_alignCenter">
      <el-tabs v-model="activeName" class="w73">
        <el-tab-pane
            v-for="(item, index) in userCourseList"
            :key="index"
            :label="item.label"
            :name="item.name"
        ></el-tab-pane>
<!--        <el-tab-pane label="COMS 4111" name="first"></el-tab-pane>-->
<!--        <el-tab-pane label="COMS 6998" name="second"></el-tab-pane>-->
<!--        <el-tab-pane label="ELEN 6767" name="third"></el-tab-pane>-->
<!--        <el-tab-pane label="ELEN 6883" name="fourth"></el-tab-pane>-->
      </el-tabs>
      <i
        class="el-icon-circle-plus font30 mr10 cp"
        @click="showAddCoursesDialog"
      ></i>
      <i class="el-icon-delete font30 cp" @click="showDeleteCourseDialog"></i>
    </div>
    <!-- 内容 -->
    <div class="content">
      <!-- 左侧内容栏 -->
      <div class="leftContent mr20">
        <!-- group -->
        <div class="group pdb30">
          <div class="title mb20">
            <span>Group</span>
            <div class="icons">
              <i class="el-icon-circle-plus font30 mr10 cp"></i>
              <i class="el-icon-delete font30 cp"></i>
            </div>
          </div>
          <div class="groupList">
            <div
              class="group-item"
              v-for="(item, index) in groupList"
              :key="index"
              @click="showGroupDialog"
            >
              <img
                :src="item.groupImg"
                class="groupImg"
                v-if="item.groupImg && item.groupImg != ''"
              />
              <img
                src="../../../static/images/userImg.png"
                class="groupImg"
                v-else
              />
              <p class="groupName">{{ item.groupName }}</p>
            </div>
          </div>
        </div>
        <!-- buddy -->
        <div class="group mb30">
          <div class="title mb20">
            <span>Buddy</span>
            <div>
              <!-- find button -->
              <el-button
                class="mr30"
                type="primary"
                plain
                @click="showFindBuddyDialog"
                >Find Your Buddy</el-button
              >
              <!-- search for teammate -->
              <el-switch
                v-model="isOpen"
                active-text="Open For Team Mate"
                inactive-text=""
                @change="changeStatus"
                class="mr30"
              >
              </el-switch>
              <!-- search for studyBuddy -->
              <el-switch
                v-model="isOpenForStudy"
                active-text="Open For Study Buddy"
                inactive-text=""
                @change="changeStudyStatus"
              >
              </el-switch>
            </div>
          </div>
          <div class="groupList">
            <div
              class="group-item"
              v-for="(item, index) in buddyList"
              :key="index"
              @click="showBuddyDialog(index)"
            >
              <img :src="item.buddyImg" class="groupImg" />
              <p class="groupName">{{ item.buddyName }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 右侧内容栏 -->
      <div class="rightContent">
        <!-- 日历 -->
        <div class="calendar">
          <functional-calendar
            v-model="calendarData"
            :markedDates="markedDates"
            :dayNames="['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']"
            :markedDateRange="markedDateRange"
            :sundayStart="true"
            @changedMonth="toggleMonth"
            :isDateRange="false"
            :markedDatesColor="markedDatesColor"
          ></functional-calendar>
        </div>
        <!-- meeting -->
        <div class="meeting">
          <div class="colorfff font20 mb20 flex_spaceBetween">
            <span>Meeting</span>
            <div class="icons">
              <i class="el-icon-circle-plus font20 mr10 cp"></i>
              <i class="el-icon-delete font20 cp"></i>
            </div>
          </div>
          <div class="meetingList">
            <div
              v-for="(item, index) in meetingList"
              :key="index"
              class="meeting-item mb20"
            >
              <div class="icon mr10"></div>
              <div class="colorfff">
                <p>{{ item.meetingTime }}</p>
                <p>{{ item.meetingName }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- groupDialog -->
    <el-dialog :visible.sync="groupDialogFlag" class="groupDialog" width="25%">
      <img :src="groupQrCode" class="groupQrCode" />
    </el-dialog>
    <!-- buddyDialog -->
    <el-dialog :visible.sync="buddyDialogFlag" class="buddyDialog">
      <!-- basicinfo -->
      <div class="basicInfo mb20">
        <img src="../../../static/images/peter.jpg" class="buddyImg mr20" />
        <div class="info font20 lh25">
          <p>Huiyu Zhao</p>
          <p>Electrical Engineering (2nd semester)</p>
          <p>Email: hz2691@columbia.edu</p>
        </div>
      </div>
      <!-- course-learning-info -->
      <div class="courseLearning-info">
        <p class="font20 title mb10">Course Learned:</p>
        <p class="lh25 pdl5">CSEE 4119 W COMPUTER NETWORKS</p>
        <p class="lh25 pdl5">EECS 4764 E IoT - INTELLIG & CONNECTE</p>
        <p class="lh25 pdl5">EEOR 4650 E CONVEX OPTIMIZATION ELCT</p>
        <p class="lh25 pdl5">ELEN 6761 E COMPUTER COMMUNCATION NET</p>
      </div>
    </el-dialog>
    <!-- jwbDialog -->
    <el-dialog :visible.sync="jwbDialogFlag" class="buddyDialog">
      <!-- basicinfo -->
      <div class="basicInfo mb20">
        <img src="../../../static/images/jwb.jpg" class="buddyImg mr20" />
        <div class="info font20 lh25">
          <p>Wenbo Jiang</p>
          <p>Computer Engineering (2nd semester)</p>
          <p>Email: wj2311@columbia.edu</p>
        </div>
      </div>
      <!-- course-learning-info -->
      <div class="courseLearning-info">
        <p class="font20 title mb10">Course Learned:</p>
        <p class="lh25 pdl5">COMS 4111 W INTRODUCTION TO DATABASES</p>
        <p class="lh25 pdl5">EECS 4764 E IoT - INTELLIG & CONNECTE</p>
        <p class="lh25 pdl5">CSEE 4119 W COMPUTER NETWORKS</p>
        <p class="lh25 pdl5">CSEE 4868 W System-On-Chip Platforms</p>
      </div>
    </el-dialog>
    <!-- addCoursesDialog -->
    <el-dialog :visible.sync="addCoursesDialogFlag">
      <p class="mb30 font30">Add Another Course</p>
      <el-select
        v-model="addCoursesSelectors"
        multiple
        filterable
        remote
        reserve-keyword
        placeholder="Please enter a keyword"
        :remote-method="remoteMethod"
        ><el-option
          v-for="(item, index) in courseList"
          :key="index"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <span slot="footer">
        <el-button type="primary" @click="confirmAddCourse">Done</el-button>
        <el-button @click="addCoursesDialogFlag = false">Cancel</el-button>
      </span>
    </el-dialog>
    <!-- delCoursesDialog -->
    <el-dialog :visible.sync="delCoursesDialogFlag">
      <p class="mb30 font30">Delete Course</p>
      <el-select v-model="delCoursesSelectors" placeholder="Select">
        <el-option
          v-for="(item, index) in courseList"
          :key="index"
          :label="item.name"
          :value="item.courseNo"
        ></el-option>
      </el-select>
      <span slot="footer">
        <el-button type="primary" @click="confirmDeleteCourse">Done</el-button>
        <el-button @click="delCoursesDialogFlag = false">Cancel</el-button>
      </span>
    </el-dialog>
    <!-- Find Buddy Dialog-->
    <el-dialog :visible.sync="isShowFindBuddyDialog" title="Find Your Buddy">
      <!-- search conditions -->
      <div class="searchConditions mb30">
        <el-form :model="searchForm" ref="searchBuddyForm" :inline="true">
          <el-form-item label="Type Of Buddy" class="mr30">
            <el-select v-model="searchForm.buddyType">
              <el-option
                v-for="(item, index) in searchForm.buddyTypeList"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            :label="sConditionName"
            v-if="searchForm.buddyType != ''"
          >
            <el-select v-model="searchForm.sCondition">
              <el-option
                v-for="(item, index) in searchForm.sConditionList"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">Search</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="HeadImg">
          <template slot-scope="scope">
            <img :src="scope.row.headImg" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="Name"> </el-table-column>
        <el-table-column prop="major" label="Major"> </el-table-column>
        <el-table-column prop="email" label="Email"> </el-table-column>
        <el-table-column label="Operation">
          <template slot-scope="scope">
            <el-button type="text" @click="checkDetail(scope.row)"
              >Detail</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { FunctionalCalendar } from "vue-functional-calendar";
import {getCourse, getAllExistingCourse, getUserInfo} from "@/api/api";
export default {
  name: "index",
  components: {
    FunctionalCalendar,
  },

  data() {
    return {
      activeName: "first", // 导航栏下标
      userImg: "", // 用户头像
      calendarData: {},
      markedDates: [],
      markedDatesColor: {},
      markedDateRange: [],
      meetingList: [
        {
          meetingTime: "2021/2/15 10:00",
          meetingName: "international academic conferences",
        },
        {
          meetingTime: "2021/2/15 10:00",
          meetingName: "international academic conferences",
        },
        {
          meetingTime: "2021/2/15 10:00",
          meetingName: "international academic conferences",
        },
      ],
      // groupList: [
      //   {
      //     groupImg:
      //       "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3505972091,655450644&fm=26&gp=0.jpg",
      //     groupName: "groupMe",
      //   },
      //   {
      //     groupImg:
      //       "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2043718202,425822973&fm=26&gp=0.jpg",
      //     groupName: "faceBook",
      //   },
      //   {
      //     groupImg:
      //       "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1118145297,860305148&fm=26&gp=0.jpg",
      //     groupName: "wechat",
      //   },
      // ],
      // buddyList: [
      //   {
      //     buddyImg: require("../../../static/images/peter.jpg"),
      //     buddyName: "Huiyu Zhao",
      //   },
      //   {
      //     buddyImg: require("../../../static/images/jwb.jpg"),
      //     buddyName: "Wenbo Jiang",
      //   },
      // ],
      groupDialogFlag: false,
      groupQrCode: require("../../../static/images/qrCodeOne.png"),
      buddyDialogFlag: false,
      jwbDialogFlag: false,
      isOpen: false,
      isOpenForStudy: false,
      addCoursesDialogFlag: false,
      delCoursesDialogFlag: false,
      addCoursesSelectors: [],
      delCoursesSelectors: "",
      courseList: [],
      userCourseList: [
        // {"label": "COMS 4111", "name": "first"},
        // {"label": "COMS 6998", "name": "second"},
        // {"label": "ELEN 6767", "name": "third"},
        // {"label": "ELEN 6883", "name": "fourth"},
      ],
      list: [],
      existingCourse: [],
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
      isShowFindBuddyDialog: false,
      searchForm: {
        buddyType: "",
        buddyTypeList: [
          {
            id: 1,
            name: "Team Mate",
            value: 1,
          },
          {
            id: 2,
            name: "Study Buddy",
            value: 2,
          },
        ],
        sCondition: "",
        sConditionList: [
          {
            id: 1,
            name: "a",
            value: 1,
          },
          {
            id: 2,
            name: "b",
            value: 2,
          },
        ],
      },
      tableData: [
        {
          id: 1,
          headImg: "",
          name: "11111111",
          major: "2222222",
          email: "333333333",
        },
      ],
    };
  },

  methods: {
    getcourse_callback(allCourseResponse){
      var i;
      for (i = 0; i < allCourseResponse.body.length; i++) {
        var course_format = allCourseResponse.body[i].course_no + " - " + allCourseResponse.body[i].course_name +
            " - " + allCourseResponse.body[i].professor
        console.log(course_format);
        this.existingCourse.push(course_format);
      }
      this.list = this.existingCourse.map(item => {
        return {
          value: `${item}`,
          label: `${item}`};
      });
    },
    getUserInfo_callback(response){
      console.log(response);
      if (response.CourseTaking.length == 0){
        this.userCourseList = [
          {"label": "Please press + button to add course", "name": "first"}
        ]
      }
      else {
        this.userCourseList = response.CourseTaking
      }
      console.log(this.userCourseList);
    },
    //  跳转个人中心
    goPersonalCenter() {
      this.$router.push("/homePage");
    },
    // 跳转登录界面
    goSignInPage() {
      this.$router.push("/login");
    },
    //  日历切换月份
    toggleMonth(date) {
      console.log(date);
    },
    //  展示group二维码
    showGroupDialog() {
      this.groupDialogFlag = true;
    },
    //  展示buddy信息弹窗
    showBuddyDialog(index) {
      if (index == 0) {
        this.buddyDialogFlag = true;
      } else if (index == 1) {
        this.jwbDialogFlag = true;
      }
    },
    changeStatus(e) {
      this.$confirm("Are You Want To Update Your Status?", "Tips", {
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        type: "info",
      })
        .then(() => {
          console.log(1111);
        })
        .catch(() => {
          this.isOpen = !this.isOpen;
        });
    },
    changeStudyStatus() {
      this.$confirm("Are You Want To Update Your Status?", "Tips", {
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        type: "info",
      })
        .then(() => {
          console.log(1111);
        })
        .catch(() => {
          this.isOpenForStudy = !this.isOpenForStudy;
        });
    },
    showAddCoursesDialog() {
      this.addCoursesDialogFlag = true;
    },
    confirmAddCourse() {
      this.$confirm("Are You Sure To Add The Course?", "Tips", {
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        type: "warning",
      })
        .then(() => {
          console.log("yes");
          this.addCoursesDialogFlag = false;
        })
        .catch(() => {
          console.log("no");
          this.addCoursesDialogFlag = false;
        });
    },
    showDeleteCourseDialog() {
      this.delCoursesDialogFlag = true;
    },
    confirmDeleteCourse() {
      this.$confirm("Are You Sure To Delete The Course?", "Tips", {
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        type: "warning",
      })
        .then(() => {
          console.log("yes");
          this.delCoursesDialogFlag = false;
        })
        .catch(() => {
          console.log("no");
          this.delCoursesDialogFlag = false;
        });
    },
    showFindBuddyDialog() {
      this.isShowFindBuddyDialog = true;
    },
    checkDetail(row) {
      console.log(row);
    },
    remoteMethod(query) {
      if (query !== "") {
        setTimeout(() => {
          this.courseList = this.list.filter((item) => {
            console.log(this.list)
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.courseList = [];
      }
    },
  },

  created(){
    // RegisterUser();
    getAllExistingCourse({},this.getcourse_callback);
    // this.userCourseList =  [
    //   {"label": "COMS 4111", "name": "first"},
    //   {"label": "COMS 6998", "name": "second"}
    // ];
    let user_email = this.$cookies.get('user_email')
    getUserInfo({user_email},this.getUserInfo_callback)
    // this.existingCourse.push("diannao");
  },
  // mounted() {},
  mounted() {
    // console.log(this.states);
    // console.log(this.existingCourse);
    // this.list = this.existingCourse.map(item => {
    //   console.log(item);
    //   return {
    //     value: `value:${item}`,
    //     label: `label:${item}`};
    // });
    // this.list = this.existingCourse.map(item => item+'+');
  },
  computed: {
    groupList: function () {
      let arr;
      if (this.activeName == "first") {
        arr = [
          {
            groupImg:
              "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3505972091,655450644&fm=26&gp=0.jpg",
            groupName: "groupMe",
          },
          {
            groupImg:
              "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2043718202,425822973&fm=26&gp=0.jpg",
            groupName: "faceBook",
          },
          {
            groupImg:
              "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1118145297,860305148&fm=26&gp=0.jpg",
            groupName: "wechat",
          },
        ];
      } else if (this.activeName == "second") {
        arr = [
          {
            groupImg:
              "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3505972091,655450644&fm=26&gp=0.jpg",
            groupName: "groupMe",
          },
          {
            groupImg:
              "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2043718202,425822973&fm=26&gp=0.jpg",
            groupName: "faceBook",
          },
        ];
      } else if (this.activeName == "third") {
        arr = [
          {
            groupImg:
              "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3505972091,655450644&fm=26&gp=0.jpg",
            groupName: "groupMe",
          },
        ];
      } else if (this.activeName == "fourth") {
        arr = [
          {
            groupImg:
              "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3505972091,655450644&fm=26&gp=0.jpg",
            groupName: "groupMe",
          },
          {
            groupImg:
              "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1118145297,860305148&fm=26&gp=0.jpg",
            groupName: "wechat",
          },
        ];
      }
      return arr;
    },
    buddyList: function () {
      let arr;
      if (this.activeName == "first") {
        arr = [
          {
            buddyImg: require("../../../static/images/peter.jpg"),
            buddyName: "Huiyu Zhao",
          },
          {
            buddyImg: require("../../../static/images/jwb.jpg"),
            buddyName: "Wenbo Jiang",
          },
        ];
      } else if (this.activeName == "second") {
        arr = [
          {
            buddyImg: require("../../../static/images/peter.jpg"),
            buddyName: "Huiyu Zhao",
          },
        ];
      } else if (this.activeName == "third") {
        arr = [
          {
            buddyImg: require("../../../static/images/jwb.jpg"),
            buddyName: "Wenbo Jiang",
          },
        ];
      } else if (this.activeName == "fourth") {
        arr = [
          {
            buddyImg: require("../../../static/images/peter.jpg"),
            buddyName: "Huiyu Zhao",
          },
        ];
      }
      return arr;
    },
    sConditionName: function () {
      if (this.searchForm.buddyType == 1) {
        return "Concentration";
      } else if (this.searchForm.buddyType == 2) {
        return "On/Off Line";
      } else {
        return "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding-bottom: 50px;
  background-color: #acc8ec;
  .topBanner {
    width: 100%;
    height: 500px;
    position: relative;
    .banner {
      width: 100%;
      height: 100%;
    }
    .mask {
      position: absolute;
      width: 350px;
      padding: 40px 0;
      background-color: rgba($color: #000000, $alpha: 0.7);
      color: #fff;
      font-size: 60px;
      text-align: center;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: 10px;
    }
  }
  .userOperate {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: flex-end;

    background-color: lightgrey;
    .right {
      width: 20%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      .userImg {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }
  }
  .el-menu-demo {
    padding: 0 20px;
  }
  .content {
    display: flex;
    padding: 0 20px;
    .leftContent {
      width: 80%;
      height: 500px;
      // background-color: red;
      .group {
        background-color: #acc8ec;
        .groupList {
          display: flex;
          .group-item {
            width: 120px;
            flex-basis: 15%;
            cursor: pointer;
            .groupImg {
              display: block;
              width: 100px;
              height: 100px;
              border-radius: 50%;
              margin: 0 auto 10px;
            }
            .groupName {
              width: 100%;
              text-align: center;
              font-size: 20px;
              color: #fff;
            }
          }
        }
      }
    }
    .rightContent {
      width: 20%;
      // height: 500px;
      padding-bottom: 50px;
      background-color: #3767a6;
      .meeting {
        padding: 0 20px;
        .meetingList {
          height: 500px;
          .meeting-item {
            padding: 10px 15px;
            background-color: #3f77bf;
            display: flex;
            align-items: center;
            .icon {
              flex-shrink: 0;
              width: 15px;
              height: 15px;
              border: 2px solid #5eb88c;
              border-radius: 50%;
            }
          }
        }
      }
    }
  }
  .groupQrCode {
    display: block;
    width: 350px;
    height: 350px;
  }
  .basicInfo {
    display: flex;
    align-items: center;
  }
  .buddyImg {
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .title {
    padding: 10px;
    background-color: #3767a6;
    color: #fff;
    font-weight: 700;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
/deep/ .el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 3px solid #409eff;
}
.calendar {
  // height: 610px;
  /deep/ .vc-container {
    background: #3767a6;
    color: #fff;
    .vc-title {
      color: #fff;
    }
    .vc-text-gray-600 {
      color: #fff;
    }
    .vc-weeks {
      color: #fff;
    }
    .vc-arrows-container {
      justify-content: space-around;
    }
    .vc-text-gray-500 {
      color: #fff;
    }
    .vc-header {
      padding: 25px 0;
      border-bottom: 1px solid #fff;
      margin-bottom: 30px;
    }
    .vc-arrows-container {
      padding: 25px 0;
    }
    .vc-grid-cell {
      margin-bottom: 20px;
    }
  }
  /deep/ .vc-border-gray-400 {
    border-color: #3767a6;
  }
}
/deep/ .vfc-calendars-container {
  background-color: #3767a6;
}
/deep/ .vfc-dayNames span {
  width: 100%;
  margin-right: 0.025rem;
  color: #ffffff;
  text-align: center;
  // font-size: 20px;
}

/deep/ .vfc-week .vfc-day span.vfc-span-day {
  display: inline-block;
  text-align: center;
  // width: 0.15rem;
  // line-height: 0.15rem;
  border-radius: 50%;
  margin: 0 auto;
  vertical-align: middle;
  // font-size: 20px;
  color: #fff;
}
/deep/ .vfc-dayNames {
  -webkit-box-flex: 0.15rem;
  -ms-flex: 0.15rem 0 0;
  flex: 0.15rem 0 0;
  margin-bottom: 0.05rem;
  // width: 27px;
  height: 25px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  // font-weight: 500;
  color: #ffffff;
  line-height: 25px;
}
/deep/ .vfc-top-date {
  font-family: PingFangSC-Medium, PingFang SC !important;
}
/deep/ .vfc-main-container {
  box-shadow: none;
}
/deep/ .vfc-top-date {
  span {
    color: #fff;
  }
}
/deep/ .vfc-dayNames {
  span {
    color: #fff;
  }
}
/deep/ .vfc-arrow-left {
  border-color: #fff !important;
}
/deep/ .vfc-arrow-right {
  border-color: #fff !important;
}
/deep/ .vfc-week .vfc-day:last-child {
  color: #fff;
}
/deep/ .vfc-week .vfc-day span.vfc-span-day.vfc-hide {
  color: #bfbfbf;
}
/deep/ .el-tabs__nav-wrap::after {
  background-color: transparent;
}
/deep/ .el-tabs__item.is-active {
  color: #3767a6;
}
/deep/ .el-tabs__active-bar {
  background-color: #3767a6;
}
/deep/ .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
  padding-left: 40px;
}
/deep/ .el-tabs__item {
  padding: 0 40px;
  font-size: 20px;
  color: #fff;
}
/deep/ .el-tabs__header {
  padding: 10px 0;
}
.mr10 {
  margin-right: 10px;
}
.mb20 {
  margin-bottom: 20px;
}
.mb30 {
  margin-bottom: 30px;
}
.colorfff {
  color: #fff;
}
.font20 {
  font-size: 20px;
}
.pdb30 {
  padding-bottom: 30px;
}
.lh25 {
  line-height: 25px;
}
.pdl5 {
  padding-left: 5px;
}
.w73 {
  width: 73%;
}
.cp {
  cursor: pointer;
}
/deep/ .el-switch__label--right {
  color: #fff;
}
.font20 {
  font-size: 20px;
}
</style>
