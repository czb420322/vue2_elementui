let moment = require('moment')
const mixins = {
  data: function () {
    return {
      timeBegin: '',
      timeEnd: '',
      timeBegin1: '',
      timeEnd1: '',
      timeBegin2: '',
      timeEnd2: '',
      maxDate: ''
    }
  },
  mounted() {

  },
  methods: {
    getSize(){
      if(this.endTime == null){
        return
      }
      if (this.beginTime != '' && this.endTime != ''){
        let thisTime = this.beginTime.replace(/-/g, '/');
        let thisTime2 = this.endTime.replace(/-/g, '/');
        var time = new Date(thisTime);
        var time2 = new Date(thisTime2);
        time = time.getTime();
        time2 = time2.getTime();
        if (time > time2){
          this.$notify({
            type: 'warning',
            message: '请输入正确的时间段！',
            position: 'bottom-right',
            duration: 3000
          });
          this.beginTime = ''
          // this.endTime = ''
        }
      }

    },
    resetTime(){
      let maxDate =  {
        year: new Date().getFullYear(),
        month: new Date().getMonth(), //关键
        date: new Date().getDate(),
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
        seconds: new Date().getSeconds()
      };
      this.timeBegin.config.max = maxDate;
      this.timeEnd.config.min = '1900-01-01 00:00:00'
    },
    resetTimetwo(){
      let maxDate =  {
        year: new Date().getFullYear(),
        month: new Date().getMonth(), //关键
        date: new Date().getDate(),
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
        seconds: new Date().getSeconds()
      };
      this.timeBegin1.config.max = maxDate;
      this.timeEnd1.config.min = '1900-01-01 00:00:00'
    },

    OpenTheTime(text1,text2){
      this.timeBegin = laydate.render({
        elem: text1,
        type: "datetime",
        format: 'yyyy-MM-dd HH:mm:ss',
        min: -90, //90天前
        max:  Date.parse(new Date()), //0天后
        btns: ['now','confirm'],
        done: (value, date, endDate) => {
          this.beginTime = value;
          this.timeEnd.config.min = date;
          this.timeEnd.config.min.month = date.month - 1 ;
          this.timeEnd.config.min = {
            year: date.year,
            month: date.month - 1, //关键
            date: date.date,
            hours: date.hours,
            minutes: date.minutes,
            seconds: date.seconds
          };
          // this.beginTime = value;
          // if(value !== '') {
          //   date.month = date.month - 1
          //   this.timeEnd.config.min = date
          // }
        }
      })

      this.timeEnd = laydate.render({
        elem: text2,
        type: "datetime",
        // format: 'yyyy-MM-dd HH:mm:ss',
        min: this.beginTime == '' ? -90 : this.beginTime,
        max: moment().format('YYYY-MM-DD HH:hh:ss'),
        btns: ['now','confirm'],
        done: (value, date, endDate) => {
          var datetime = new Date;
          this.endTime = value;
          this.timeBegin.config.max = {
            year: date.year == undefined ? datetime.getFullYear() : date.year,
            month: date.month == undefined ? datetime.getMonth() : date.month - 1, //关键
            date: date.date == undefined ? datetime.getDate() : date.date,
            hours: date.hours == undefined ? datetime.getHours() : date.hours,
            minutes: date.minutes == undefined ? datetime.getMinutes() : date.minutes,
            seconds: date.seconds == undefined ? datetime.getSeconds() : date.seconds,
          };
          this.timeBegin.config.min = {
            year: date.year == undefined ? datetime.getFullYear() : date.year,
            month: date.month == undefined ? datetime.getMonth() - 3 : date.month - 3, //关键
            date: date.date == undefined ? datetime.getDate() : date.date,
            hours: date.hours == undefined ? datetime.getHours() : date.hours,
            minutes: date.minutes == undefined ? datetime.getMinutes() : date.minutes,
            seconds: date.seconds == undefined ? datetime.getSeconds() : date.seconds
          };
          // this.endTime = value;
          // if(value !== '') {
          //   date.month = date.month - 1
          //   this.timeBegin.config.max = date
          // }
        }
      });
    },

    //标注池专用
    OpenTheTime2(text1,text2) {
      this.timeBegin1 = laydate.render({
        elem: text1,
        type: "datetime",
        format: 'yyyy-MM-dd HH:mm:ss',
        //min: -90, //90天前
        max: Date.parse(new Date()), //0天后
        // btns: ['now', 'confirm'],
        done: (value, date, endDate) => {
          // this.beginData = value;
          // this.timeEnd1.config.min = {
          //   year: date.year,
          //   month: date.month - 1, //关键
          //   date: date.date,
          //   hours: date.hours,
          //   minutes: date.minutes,
          //   seconds: date.seconds
          // }
          this.beginData = value;
          if(value !== '') {
            date.month = date.month - 1
            this.timeEnd1.config.min = date
          }
        }
      })
      this.timeEnd1 = laydate.render({
        elem: text2,
        type: "datetime",
        format: 'yyyy-MM-dd HH:mm:ss',
        // min: this.beginData,
        max: 1,
        // btns: ['now', 'confirm'],
        done: (value, date, endDate) => {
          this.endData = value;
          if(value !== '') {
            date.month = date.month - 1
            this.timeBegin1.config.max = date
          }
          // var datetime = new Date;
          // this.endData = value;
          // this.timeBegin1.config.max = {
          //   year: date.year == undefined ? datetime.getFullYear() : date.year,
          //   month: date.month == undefined ? datetime.getMonth() : date.month - 1, //关键
          //   date: date.date == undefined ? datetime.getDate() : date.date,
          //   hours: date.hours == undefined ? datetime.getHours() : date.hours,
          //   minutes: date.minutes == undefined ? datetime.getMinutes() : date.minutes,
          //   seconds: date.seconds == undefined ? datetime.getSeconds() : date.seconds,
          // };
          // this.timeBegin1.config.min = {
          //   year: date.year == undefined ? datetime.getFullYear() : date.year,
          //   month: date.month == undefined ? datetime.getMonth() - 3 : date.month - 3, //关键
          //   date: date.date == undefined ? datetime.getDate() : date.date,
          //   hours: date.hours == undefined ? datetime.getHours() : date.hours,
          //   minutes: date.minutes == undefined ? datetime.getMinutes() : date.minutes,
          //   seconds: date.seconds == undefined ? datetime.getSeconds() : date.seconds
          // };

        }
      });
    },
    OpenTheTime3(text1,text2) {
      this.timeBegin1 = laydate.render({
        elem: text1,
        type: "datetime",
        format: 'yyyy-MM-dd HH:mm:ss',
        //min: -90, //90天前
        max:  this.endData, //0天后
        btns: ['now','confirm'],
        done:(value, date, endDate)=> {
          this.beginData = value;
          if(value !== '') {
            date.month = date.month - 1
            this.timeEnd1.config.min = date
            this.timeEnd1.config.max = {
              year: date.year,
              month: date.month, //关键
              date: date.date + 6,
              hours: date.hours,
              minutes: date.minutes,
              seconds: date.seconds
            };
            this.endData = moment(value).add(6, 'days').format('YYYY-MM-DD HH:hh:ss')
          }

          // let maxDate = new Date(value).getTime() + 7*24*60*60*1000;
          // if(new Date().getTime() > maxDate){
          //   this.endData = this.getDateString(maxDate);
          //   this.timeEnd1.config.min = {
          //     year: new Date(maxDate).getFullYear(),
          //     month: new Date(maxDate).getMonth(), //关键
          //     date: new Date(maxDate).getDate(),
          //     hours:  new Date(maxDate).getHours(),
          //     minutes: new Date(maxDate).getMinutes(),
          //     seconds: new Date(maxDate).getSeconds()
          //   };
          // }else{
          //   this.endData = this.getDateString(new Date().getTime());
          //   this.timeEnd1.config.min = {
          //     year: new Date().getFullYear(),
          //     month: new Date().getMonth(), //关键
          //     date: new Date().getDate(),
          //     hours:  new Date(maxDate).getHours(),
          //     minutes: new Date(maxDate).getMinutes(),
          //     seconds: new Date(maxDate).getSeconds()
          //   };
          // }
        }
      });
      this.timeEnd1 = laydate.render({
        elem: text2,
        type: "datetime",
        format: 'yyyy-MM-dd HH:mm:ss',
        min: this.beginData,
        // max: this.maxDate,
        btns: ['now','confirm'],
        done: (value, date, endDate)=> {
          this.endData = value;
          if(value !== '') {
            date.month = date.month - 1
            this.timeBegin1.config.max = date
          }

          // this.timeBegin1.config.max = {
          //   year: date.year,
          //   month: date.month, //关键
          //   date: date.date,
          //   hours: date.hours,
          //   minutes: date.minutes,
          //   seconds: date.seconds
          // };
        }
      });
    },

    //以图搜图时间
    OpenTheTime4(text1,text2) {
      this.timeBegin1 = laydate.render({
        elem: text1,
        type: "datetime",
        format: 'yyyy-MM-dd HH:mm:ss',
        //min: -90, //90天前
        max:  this.endData, //0天后
        btns: ['now','confirm'],
        done:(value, date, endDate)=> {
          this.beginData = value;
          if(value !== '') {
            date.month = date.month - 1
            this.timeEnd1.config.min = date
          }
          // let maxDate = new Date().getTime()
          // if(new Date().getTime() > maxDate){
          //   this.endData = this.getDateString(maxDate);
          //   this.timeEnd1.config.max = {
          //     year: new Date().getFullYear(),
          //     month: new Date().getMonth(), //关键
          //     date: new Date().getDate(),
          //     hours:  new Date().getHours(),
          //     minutes: new Date().getMinutes(),
          //     seconds: new Date().getSeconds()
          //   };
          // }else{
          //   this.endData = this.getDateString(new Date().getTime());
          //   this.timeEnd1.config.max = {
          //     year: new Date().getFullYear(),
          //     month: new Date().getMonth(), //关键
          //     date: new Date().getDate(),
          //     hours:  new Date().getHours(),
          //     minutes: new Date().getMinutes(),
          //     seconds: new Date().getSeconds()
          //   };
          // }
        }
      });
      this.timeEnd1 = laydate.render({
        elem: text2,
        type: "datetime",
        format: 'yyyy-MM-dd HH:mm:ss',
        min: this.beginData,
        max:0,
        btns: ['now','confirm'],
        done: (value, date, endDate)=> {
          this.endData = value;
          if(value !== '') {
            date.month = date.month - 1
            this.timeBegin1.config.max = date
          }
        }
      });
    },



    getMaxDate(date) {
      var currentdate = date
      currentdate.date = currentdate.date + 7
      return currentdate
    },
    getDateString(date){
      //date 为毫秒数
      let d = new Date(date);
      let mm = (d.getMonth()+1) >= 10?(d.getMonth()+1): '0'+(d.getMonth()+1);
      let dd = d.getDate() >= 10?d.getDate():'0'+d.getDate();
      let hh = d.getHours()>= 10?d.getHours():'0'+d.getHours();
      let MM = d.getMinutes()>= 10?d.getMinutes(): '0'+d.getMinutes();
      let ss = d.getSeconds()>= 10? d.getSeconds():'0'+d.getSeconds();
      return d.getFullYear()+'-'+mm+'-'+dd+' '+ hh+':' + MM+':'+ss ;
    },
    gety(value){
      let year = new Date(value).getFullYear()
      let month = (new Date(value).getMonth() + 1) < 10 ? '0' + (new Date(value).getMonth() + 1) : new Date(value).getMonth() + 1
      let date = new Date(value).getDate() < 10 ? '0' + new Date(value).getDate() : new Date(value).getDate()
      let hours = new Date(value).getHours() < 10 ? '0' + new Date(value).getHours() : new Date(value).getHours()
      let minutes = new Date(value).getMinutes() < 10 ? '0' + new Date(value).getMinutes() : new Date(value).getMinutes()
      let seconds = new Date(value).getSeconds() < 10 ? '0' + new Date(value).getSeconds() : new Date(value).getSeconds()
      // console.log(year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds,8899);
      return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds
    },
  }
};
export default mixins
