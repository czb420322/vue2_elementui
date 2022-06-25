<template>
  <div>
    <van-nav-bar :title="title" :border="false" :fixed="true">
      <template #left>
        <van-icon name="arrow-left" color="#3B3B3B" size="20" @click="onClickLeft" />
      </template>
    </van-nav-bar>

    <div :style="{ 'margin-top': ($iosSystem + 46) + 'px' }">
      <div id="calendar">
        <!-- 年份 月份 -->
        <ul class="month">
          <li>
            <span>{{ currentYear }}年</span>
          </li>
          <li>
            <span class="choose-month" @click="pickPre(currentYear,currentMonth)">{{ !(currentMonth-1) ? 12 : currentMonth-1 }}月</span>
            <span class="choose-month">{{ currentMonth }}月</span>
            <span class="choose-month" @click="pickNext(currentYear,currentMonth)">{{ currentMonth >=12 ? 1 : currentMonth+1 }}月</span>
          </li>
          <li>
            <van-icon name="arrow-down" color="#999" @click="showYearMonthPicker" />
          </li>
        </ul>
        <!-- 星期 -->
        <ul class="weekdays">
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li style="color:red">六</li>
          <li style="color:red">日</li>
        </ul>
        <!-- 日期 -->
        <ul class="days">
          <li v-for="(dayobject, index) in days" :key="index">
            <!--本月-->
            <!--如果不是本月  改变类名加灰色-->
            <span v-if="dayobject.day.getMonth()+1 != currentMonth" class="other-month">
              <p>{{ dayobject.day.getDate() }}</p>
              <i style="background-color: white"></i>
            </span>
            <!--如果是本月  还需要判断是不是这一天-->
            <template v-else>
              <!--今天  同年同月同日-->
              <span @click="thisDay(index)" v-if="dayobject.day.getFullYear() == new Date().getFullYear() && dayobject.day.getMonth() == new Date().getMonth() && dayobject.day.getDate() == new Date().getDate()" class="currentDate" :class="dayobject.active ? 'active' : ''">
                <p>{{ dayobject.day.getDate() }}</p>
                <i :style="{ 'background-color': dayobject.isAbnormal == '0' ? '#FF8921' : dayobject.isAbnormal == '1' ? '#1e7dff' : dayobject.isAbnormal == '2' ? '#DF3131' : ''  }"></i>
              </span>
              <span @click="thisDay(index)" v-else :class="dayobject.active ? 'active' : ''">
                <p>{{ dayobject.day.getDate() }}</p>
                <i :style="{ 'background-color': dayobject.isAbnormal == '0' ? '#FF8921' : dayobject.isAbnormal == '1' ? '#1e7dff' : dayobject.isAbnormal == '2' ? '#DF3131' : ''  }"></i>
              </span>
            </template>
          </li>
        </ul>
      </div>

      <div class="record_bar">
        <h2 class="_title">当前考勤
          <p class="txt">
            <van-icon name="bell" />&nbsp;考勤异常请联系直接领导处理
          </p>
        </h2>
        <template v-if="atWorkRecord.clockInTime">
          <div class="item van-hairline--bottom">
            <div class="name">上班打卡</div>
            <div class="r">
              <p class="time">{{atWorkRecord.clockInTime || '未打卡'}}&nbsp;
                <van-tag v-if="atWorkRecord.clockInStatus == 1" color='#DF3131'>迟到</van-tag>
                <van-tag v-else-if="atWorkRecord.clockInStatus == 2" color='#FF8921'>早退</van-tag>
                <van-tag v-else-if="atWorkRecord.clockInStatus == 3" color='#A3B3B8'>缺卡</van-tag>
                <van-tag v-else-if="atWorkRecord.clockInStatus == 4" color='#A3B3B8'>休息</van-tag>
                &nbsp;<van-tag v-if="atWorkRecord.isFieldwork == 1" color='#524FC9'>外勤</van-tag>
              </p>
              <p class="address" v-if="atWorkRecord.clockInAddress">
                <van-icon name="location" />&nbsp;{{atWorkRecord.clockInAddress}}
              </p>
            </div>
          </div>
          <div class="item">
            <div class="name">下班打卡</div>
            <div class="r">
              <p class="time">{{offWorkRecord.clockInTime || '未打卡'}}&nbsp;
                <van-tag v-if="offWorkRecord.clockInStatus == 1" color='#DF3131'>迟到</van-tag>
                <van-tag v-else-if="offWorkRecord.clockInStatus == 2" color='#FF8921'>早退</van-tag>
                <van-tag v-else-if="offWorkRecord.clockInStatus == 3" color='#A3B3B8'>缺卡</van-tag>
                <van-tag v-else-if="offWorkRecord.clockInStatus == 4" color='#A3B3B8'>休息</van-tag>
                &nbsp;<van-tag v-if="offWorkRecord.isFieldwork == 1" color='#524FC9'>外勤</van-tag>
              </p>
              <p class="address" v-if="offWorkRecord.clockInAddress">
                <van-icon name="location" />&nbsp;{{offWorkRecord.clockInAddress}}
              </p>
            </div>
          </div>
        </template>
        <van-empty v-else :image="$CTXBASE + '/img/page/clockIn/bg_no_dayinfo@2x.png'" description="未到打卡日期，暂无信息" />
      </div>
      <br>
    </div>
    <yearMonthPicker ref="yearMonthPicker" @click="clickYearMonthPicker"></yearMonthPicker>
  </div>
</template>
<script>
import compCheck from '../../assets/js/util/comp-check';
import yearMonthPicker from './../../templates/yearMonthPicker.vue'
import { mapState } from 'vuex'
export default {
  components: {
    yearMonthPicker
  },
  data() {
    return {
      title: this.$route.meta.title,
      currentDay: 1,
      currentMonth: 1,
      currentYear: 1970,
      currentWeek: 1,
      days: [],
      atWorkRecord: {},
      offWorkRecord: {},
    }
  },
  created() {  //在vue初始化时调用
    this.initData(null)
    this.getSomeMonthRecord(compCheck.transformDatestamp().substring(0, 7))
  },
  methods: {
    // 查询某月考勤记录接口
    async getSomeMonthRecord(date) {
      const res = await this.$axios({
        url: this.$API.API_GETSOMEMONTHRECORD,
        method: 'get',
        params: {
          date
        }
      })
      if (res.code == 0) {
        if (res.content.recordList && res.content.recordList.length) {
          this.days.forEach((item, index) => {
            // 添加默认处理事件
            let day = compCheck.timestampToTime(item.day, 'YYYY-MM-DD')
            if (this.currentMonth == parseInt(compCheck.transformDatestamp().substring(5, 7))) {
              // 当月
              this.atWorkRecord = this.$store.state.clockIn.atWorkRecord
              this.offWorkRecord = this.$store.state.clockIn.offWorkRecord
              if (day == compCheck.transformDatestamp()) {
                item.active = true
              }
            } else {
              // 非当月
              if (day.substring(8, 10) == '01') {
                item.active = true
                this.getSomedayRecord(`${date}-01`)
              }
            }
            // 添加接口返回参数
            for (let element of res.content.recordList) {
              if (element.date == compCheck.timestampToTime(item.day, 'YYYY-MM-DD')) {
                this.days[index] = { ...item, ...element }
              }
            }
          })
        }
        this.$forceUpdate();
      } else {
        Toast(res.resultMessage || '查询规则失败');
      }
    },

    initData(cur) {
      var date;
      if (cur) {
        date = new Date(cur);
      } else {
        var now = new Date();
        var d = new Date(this.formatDate(now.getFullYear(), now.getMonth(), 1));
        d.setDate(35);
        date = new Date(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
      }
      this.currentDay = date.getDate();
      this.currentYear = date.getFullYear();
      this.currentMonth = date.getMonth() + 1;

      this.currentWeek = date.getDay(); // 1...6,0
      if (this.currentWeek == 0) {
        this.currentWeek = 7;
      }
      var str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay);
      this.days.length = 0;
      // 今天是周日，放在第一行第7个位置，前面6个
      //初始化本周
      for (var i = this.currentWeek - 1; i >= 0; i--) {
        var d = new Date(str);
        d.setDate(d.getDate() - i);
        var dayobject = {}; //用一个对象包装Date对象  以便为以后预定功能添加属性
        dayobject.day = d;
        this.days.push(dayobject);//将日期放入data 中的days数组 供页面渲染使用
      }
      //其他周
      for (var i = 1; i <= 35 - this.currentWeek; i++) {
        var d = new Date(str);
        d.setDate(d.getDate() + i);
        var dayobject = {};
        dayobject.day = d;
        this.days.push(dayobject);
      }
    },
    pickPre(year, month) {
      // setDate(0); 上月最后一天
      // setDate(-1); 上月倒数第二天
      // setDate(dx) 参数dx为 上月最后一天的前后dx天
      var d = new Date(this.formatDate(year, month, 1));
      d.setDate(0);
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
      this.pickYear(d.getFullYear(), d.getMonth() + 1)
    },
    pickNext(year, month) {
      var d = new Date(this.formatDate(year, month, 1));
      d.setDate(35);
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
      this.pickYear(d.getFullYear(), d.getMonth() + 1)
    },
    pickYear(year, month) {
      this.getSomeMonthRecord(`${year}-${month}`)
    },

    // 返回 类似 2016-01-02 格式的字符串
    formatDate(year, month, day) {
      var y = year;
      var m = month;
      if (m < 10) m = "0" + m;
      var d = day;
      if (d < 10) d = "0" + d;
      return y + "-" + m + "-" + d
    },

    thisDay(index) {
      this.days.forEach(element => {
        element.active = false
      });
      this.days[index].active = true
      this.$forceUpdate();
      this.getSomedayRecord(compCheck.timestampToTime(this.days[index].day, 'YYYY-MM-DD'))
    },
    /**
   * 某天考勤记录
   */
    async getSomedayRecord(date) {
      const res = await this.$axios({
        url: this.$API.API_GETSOMEDAYRECORD,
        method: 'get',
        params: {
          date
        }
      })
      if (res.code == 0) {
        this.atWorkRecord = res.content.atWorkRecord || {}
        this.offWorkRecord = res.content.offWorkRecord || {}
      } else {
        Toast(res.resultMessage || '查询规则失败');
      }
    },
    showYearMonthPicker() {
      this.$refs.yearMonthPicker.parentMsg()
    },
    clickYearMonthPicker(value) {
      this.initData(value.substring(0, 7))
      this.getSomeMonthRecord(value.substring(0, 7))
    }
  }
}
</script>

<style lang="less">
#calendar {
  .month {
    padding: 0.2rem 4%;
    background-color: white;
    display: flex;
    justify-content: space-between;
    li {
      .choose-month {
        padding: 0 0.5rem;
        color: #999;
      }
      .choose-month:nth-of-type(2) {
        color: #1caaff;
      }
    }
    li:nth-of-type(1) {
      flex: 1;
    }
    li:nth-of-type(3) {
      flex: 1;
      text-align: right;
    }
  }
  .weekdays {
    display: flex;
    padding: 0 3%;
    opacity: 0.8;
    font-size: 0.75rem;
    li {
      flex: 1;
      text-align: center;
      height: 2em;
      line-height: 2em;
    }
  }
  .days {
    display: flex;
    flex-wrap: wrap;
    background-color: white;
    padding: 0 3%;
    color: #333333;
    opacity: 0.8;
    li {
      width: 14.2857%;
      height: 14.2857vw;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        width: 75%;
        height: 70%;
        display: flex;
        align-items: center;
        justify-content: center;
        align-content: center;
        flex-wrap: wrap;
        border-radius: 3px;
        // border: 1px solid #1e7dff;
        p {
          width: 100%;
          margin: 0;
          text-align: center;
        }
        i {
          width: 4px;
          height: 4px;
          border-radius: 50%;
        }
      }
    }
    .currentDate {
      background-color: #cbecff;
    }
    .active {
      border: 1px solid #1e7dff;
    }
  }
  .other-month {
    color: #ccc;
  }
}
.van-nav-bar ::after {
  background-color: white !important;
}
.record_bar {
  margin-top: 8px;
  background-color: white;
  padding: 0 3.5%;
  p {
    margin: 0;
  }
  ._title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.84rem;
    margin: 0;
    padding: 0.8rem 0;
    .txt {
      display: flex;
      align-items: center;
      opacity: 0.4;
      font-size: 0.7rem;
      font-weight: normal;
    }
  }
  .item {
    display: flex;
    font-size: 0.78rem;
    padding: 0.7rem 0;
    .name {
      margin-right: 1.4rem;
    }
    .r {
      font-size: 0.78rem;
      opacity: 0.88;
      .address {
        display: flex;
        align-items: center;
        font-size: 0.7rem;
        margin-top: 0.25rem;
      }
    }
  }
  .van-empty__image {
    width: 33px;
    height: 36px;
    margin-bottom: 10px;
  }
}
</style>