<template>
  <div class="clockInPage">
    <template v-if="!attendanceRule || attendanceRule.isDeploy == 1">
      <header class="_header">
        <van-nav-bar :title="title" left-arrow :border="false" :fixed="false">
          <template #left>
            <van-icon name="arrow-left" color='white' size="20" @click="onClickLeft" />
          </template>
        </van-nav-bar>
        <div class="_content">
          <p class="txt">{{UserInfo.name || UserInfo.phone}}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{{attendanceRule.fourOrgName}}</p>
          <div class="time_box">
            <div class="time">
              <p>{{dateTime.hour}} : {{dateTime.minutes}} : {{dateTime.second}}</p>
              <p>{{dateTime.year}}/{{dateTime.month}}/{{dateTime.day}} 星期{{dateTime.week == 0 ? '日' : dateTime.week == 1 ? '一' : dateTime.week == 2 ? '二' : dateTime.week == 3 ? '三' : dateTime.week == 4 ? '四' : dateTime.week == 5 ? '五' : dateTime.week == 6 ? '六' : ''}}</p>
            </div>
            <div class="r">
              <van-icon v-if="isLocation" :name="$CTXBASE + '/img/page/clockIn/location_icon.gif'" size="50" />
              <span v-else class="tips">考勤范围{{isFieldwork == 0 ? '内' : '外'}}</span>
            </div>
          </div>
        </div>
      </header>
      <div class="_content">
        <ol class="class">
          <li class="item" @click="goPage('clockIn/attendanceRecord')">
            <van-icon :name="$CTXBASE + '/img/page/clockIn/daka@2x.png'" size="18" />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;考勤记录
          </li>
          <li class="item" @click="showRule">
            <van-icon :name="$CTXBASE + '/img/page/clockIn/guize@2x.png'" size="18" />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;考勤规则
          </li>
        </ol>
        <ol class="clockIn">
          <li class="item">
            <van-icon v-if="atWorkRecord.clockInAddress" :name="$CTXBASE + '/img/page/clockIn/ic_check_day_on@2x.png'" size="44" />
            <van-icon v-else :name="$CTXBASE + '/img/page/clockIn/ic_check_day_off@2x.png'" size="44" />
            <div class="time">
              <p class="name">上班打卡&nbsp;&nbsp;{{attendanceRule.atWorkTime | setClockInTime}}</p>
              <p class="txt">
                <span style="opacity: 0.5" v-if="atWorkRecord.clockInAddress">打卡时间：{{atWorkRecord.clockInTime | setClockInTime}}</span>
                <span style="opacity: 0.5" v-else>打卡时间：未打卡</span>
                &nbsp;<van-tag v-if="atWorkRecord.clockInStatus == 1" color='#DF3131'>迟到</van-tag>
                <van-tag v-else-if="atWorkRecord.clockInStatus == 2" color='#FF8921'>早退</van-tag>
                <van-tag v-else-if="atWorkRecord.clockInStatus == 3" color='#A3B3B8'>缺卡</van-tag>
                &nbsp;<van-tag v-if="atWorkRecord.isFieldwork == 1" color='#524FC9'>外勤</van-tag>
              </p>
            </div>
          </li>
          <li class="item">
            <div class="line">
              <van-icon :name="$CTXBASE + '/img/page/clockIn/ic_check_line@2x.png'" size="16" />
            </div>
          </li>
          <li class="item">
            <van-icon v-if="offWorkRecord.clockInAddress" :name="$CTXBASE + '/img/page/clockIn/ic_check_day_on@2x.png'" size="44" />
            <van-icon v-else :name="$CTXBASE + '/img/page/clockIn/ic_check_day_off@2x.png'" size="44" />
            <div class="time">
              <p class="name">下班打卡&nbsp;&nbsp;{{attendanceRule.offWorkTime | setClockInTime}}</p>
              <p class="txt">
                <span style="opacity: 0.5" v-if="offWorkRecord.clockInAddress">打卡时间：{{offWorkRecord.clockInTime | setClockInTime}}</span>
                <span style="opacity: 0.5" v-else>打卡时间：未打卡</span>
                &nbsp;<van-tag v-if="offWorkRecord.clockInStatus == 1" color='#DF3131'>迟到</van-tag>
                <van-tag v-else-if="offWorkRecord.clockInStatus == 2" color='#FF8921'>早退</van-tag>
                <van-tag v-else-if="offWorkRecord.clockInStatus == 3" color='#A3B3B8'>缺卡</van-tag>
                &nbsp;<van-tag v-if="offWorkRecord.isFieldwork == 1" color='#524FC9'>外勤</van-tag>
              </p>
            </div>
          </li>
        </ol>
        <div style="margin: 30px 30%;" v-if="isLocation || location">
          <van-button v-if="isFieldwork == 0" type="info" round color="#136CFF" block :disabled="isLocation" @click="saveRecord">签到打卡</van-button>
          <van-button v-else type="info" round color="#524FC9" block :disabled="isLocation" @click="saveRecord">外勤打卡</van-button>
        </div>
        <div v-else style="text-align: center;margin: 30px 0;opacity: .8;">定位失败，请稍后重新再试</div>
      </div>
    </template>
    <template v-else>
      <v-header :title="{ name: title }"></v-header>
      <br><br><br><br>
      <van-empty :image="$CTXBASE + '/img/page/study/bg_no_info@2x.png'" description="没有配置考勤规则，不能打卡" image-size="110" />
    </template>

    <abnormalPopup ref="abnormalPopup"></abnormalPopup>
    <rulePopup ref="rulePopup"></rulePopup>
    <AMap ref="amap"></AMap>
  </div>
</template>
<script>
import abnormalPopup from './abnormalPopup.vue'
import rulePopup from './rulePopup.vue'
import AMap from './AMap.vue'
import { mapState } from 'vuex'
export default {
  components: {
    abnormalPopup,
    rulePopup,
    AMap
  },
  computed: {
    ...mapState({
      UserInfo: state => state.my.UserInfo,
      location: state => state.clockIn.location,
      formattedAddress: state => state.clockIn.formattedAddress,
      position: state => state.clockIn.position,
      distance: state => state.clockIn.distance,
      attendanceRule: state => state.clockIn.attendanceRule,
      atWorkRecord: state => state.clockIn.atWorkRecord,
      offWorkRecord: state => state.clockIn.offWorkRecord,
    }),
    isLocation: {
      get() {
        return this.$store.state.clockIn.isLocation
      },
      set(value) {
        this.$store.commit('clockIn/updateState', [{ name: ['isLocation'], value: value }])
      }
    },
    // 是否外勤 0-否；1-外勤
    isFieldwork() {
      if ((this.attendanceRule.addressRange || this.attendanceRule.addressRange == 0) && (this.distance || this.distance == 0)) {
        // 考勤规则距离 > 打卡距离 == 正常打卡
        return this.attendanceRule.addressRange * 1 > this.distance * 1 ? 0 : 1
      } else {
        return 1
      }
    }
  },
  filters: {
    setClockInTime: ((value) => {
      if (!value) { return '' }
      return value.substr(0, 5)
    })
  },
  data() {
    return {
      title: this.$route.meta.title,
      dateTime: {}
    }
  },
  created() {
    this.parentMsg()
    this.displayTime()
    this.$store.dispatch('clockIn/getSomedayRecord', `${this.dateTime.year}-${this.dateTime.month}-${this.dateTime.day}`)
    this.$store.dispatch('clockIn/getRule')
  },
  methods: {
    parentMsg() {
      if (window.AMap && this.attendanceRule.addressLatitude && this.attendanceRule.addressLongitude) {
        this.$nextTick(() => {
          this.$refs.amap.parentMsg();
        })
      } else {
        setTimeout(() => {
          this.parentMsg()
        }, 1000)
      }
    },
    displayTime() {
      //获取系统当前的年、月、日、小时、分钟、毫秒
      let date = new Date();
      this.dateTime = {
        year: date.getFullYear(),
        month: (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1),
        day: date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
        hour: date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
        minutes: date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
        second: date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds(),
        week: date.getDay(),
      }
      setTimeout(() => {
        this.displayTime()
      }, 1000)
    },

    showRule() {
      this.$refs.rulePopup.parentMsg()
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    // 打卡
    async saveRecord() {
      // if (this.attendanceRule.todayIsRest == 1) {
      //   this.$toast('今天休息，不能打卡');
      //   return;
      // }
      const res = await this.$axios({
        url: this.$API.API_ATTENDANCESAVERECORD,
        method: 'post',
        data: {
          secondOrgCode: this.attendanceRule.secondOrgCode, // 二级机构编码
          secondOrgName: this.attendanceRule.secondOrgName, // 二级机构名称
          tertiaryOrgCode: this.attendanceRule.tertiaryOrgCode, // 三级机构编码
          tertiaryOrgName: this.attendanceRule.tertiaryOrgName, // 三级机构名称
          fourOrgCode: this.attendanceRule.fourOrgCode, // 四级机构编码
          fourOrgName: this.attendanceRule.fourOrgName, // 四级机构名称
          isDeploy: this.attendanceRule.isDeploy, // 0-否；1-是
          weekRange: this.attendanceRule.weekRange, //每周考勤期限
          atWorkTime: this.attendanceRule.atWorkTime,  //上班时间",
          offWorkTime: this.attendanceRule.offWorkTime,  //下班时间",
          todayIsRest: this.attendanceRule.todayIsRest,  // "今天是否休息 0-否；1-是",
          clockInType: !this.atWorkRecord.clockInAddress ? 0 : 1, //打卡类型；0-上班打卡；1-下班打卡
          clockInDate: `${this.dateTime.year}-${this.dateTime.month}-${this.dateTime.day}`,  // 打卡日期 yyyy-MM-dd
          clockInTime: `${this.dateTime.hour}:${this.dateTime.minutes}:${this.dateTime.second}`,  // 打卡时间 HH:mm:ss
          isFieldwork: this.isFieldwork,  // 是否外勤 0-否；1-外勤
          clockInAddress: this.formattedAddress, // 打卡地址
          addressLongitude: this.position.lng, // 经度
          addressLatitude: this.position.lat, // 纬度
        }
      });
      if (res.code == 0) {
        this.$store.dispatch('clockIn/getSomedayRecord', `${this.dateTime.year}-${this.dateTime.month}-${this.dateTime.day}`)
        this.$refs.abnormalPopup.parentMsg(res.content.id, res.content.clockInStatus, res.content.isFieldwork)
      }
    },
    developing() {
      this.$toast('功能开发中，敬请期待！');
    }
  }
}
</script>
<style lang="less">
.clockInPage {
  ._header {
    width: 100%;
    background-color: #336dea; /* 不支持线性的时候显示 */
    background-image: linear-gradient(to right, #336dea, #339ced);
    background-image: url('../../../public/img/page/clockIn/bg_day_work2@2x.png');
    background-position: right bottom;
    background-size: 50%;
    background-repeat: no-repeat;
    overflow: hidden;
    padding-bottom: 1.6rem;
    .van-nav-bar__title {
      color: white;
    }
    .van-nav-bar {
      background-color: rgba(255, 255, 255, 0);
    }
    .van-nav-bar ::after {
      display: none;
    }
    ._content {
      width: 93%;
      margin: auto;
      color: white;
      p {
        margin: 0;
      }
      .txt {
        margin-top: 1rem;
        font-size: 0.79rem;
        opacity: 0.8;
      }
      .time_box {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        .time {
          background-color: rgba(0, 0, 0, 0.2);
          padding: 0.3rem 0.5rem;
          border-radius: 0.2rem;
          margin-top: 0.6rem;
          p:nth-of-type(1) {
            font-size: 1.2rem;
          }
          p:nth-of-type(2) {
            font-size: 0.7rem;
            opacity: 0.5;
          }
        }
        .r {
          margin-right: 11vw;
          text-align: center;
          .tips {
            display: block;
            font-size: 0.7rem;
            background-color: rgba(0, 0, 0, 0.4);
            opacity: 0.6;
            padding: 0.1rem 0.3rem;
            border-radius: 2rem;
          }
        }
      }
    }
  }
  ._content {
    width: 93%;
    margin: -0.9rem auto 0;
    .class {
      display: flex;
      background-color: white;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
      border-radius: 0.3rem;
      padding: 0.82rem 0;
      .item {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.78rem;
      }
      .item:nth-of-type(1) {
        border-right: 1px solid #e5e5e5;
      }
    }
    .clockIn {
      background-color: white;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
      border-radius: 0.3rem;
      margin-top: 0.65rem;
      padding: 0.82rem 0;
      .item {
        display: flex;
        align-items: center;
        .van-icon {
          margin: 0 8%;
        }
        .time {
          p {
            margin: 0;
          }
          .name {
            margin-bottom: 0.3rem;
            font-size: 0.88rem;
          }
          .txt {
            font-size: 0.65rem;
          }
        }
        .line {
          margin: 4px 8%;
          width: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}
</style>
