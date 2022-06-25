/*
 * @Author: chenxf
 * @Date: 2020-05-17 16:45:19
 * @LastEditTime : 2021-08-03 20:09:47
 * @LastEditors  : Please set LastEditors
 * @Description:
 * @FilePath: \vacp-wfes\src\api\realvideo\BenEedTime.js
 * @
 */
import moment from 'moment'
const mixins = {
    data: function () {
        return {
            timeBegin: '',
            timeEnd: '',
            timeBegin1: '',
            timeEnd1: '',
            timeBegin2: '',
            timeEnd2: '',
            TimeminObj: {
                year: new Date().getFullYear(),
                month: new Date().getMonth(), //关键
                date: new Date().getDate(),
                hours: new Date().getHours(),
                minutes: new Date().getMinutes(),
                seconds: new Date().getSeconds()
            }

        }
    },
    mounted() {

    },
    methods: {
        getSize() {
            if (this.endTime == null) {
                return
            }
            if (this.beginTime != '' && this.endTime != '') {
                let thisTime = this.beginTime.replace(/-/g, '/');
                let thisTime2 = this.endTime.replace(/-/g, '/');
                var time = new Date(thisTime);
                var time2 = new Date(thisTime2);
                time = time.getTime();
                time2 = time2.getTime();
                if (time > time2) {
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
        getTimeSize(begin, end) {
            if (end == null) {
                return
            }
            if (begin != '' && end != '') {
                let thisTime = begin.replace(/-/g, '/');
                let thisTime2 = end.replace(/-/g, '/');
                var time = new Date(thisTime);
                var time2 = new Date(thisTime2);
                time = time.getTime();
                time2 = time2.getTime();
                if (time > time2) {
                    this.$notify({
                        type: 'warning',
                        message: '请输入正确的时间段！',
                        position: 'bottom-right',
                        duration: 3000
                    });
                    begin = ''
                    // this.endTime = ''
                }
            }
        },
        resetTime() {
            let maxDate = this.TimeminObj
            this.timeBegin.config.max = maxDate;
            this.timeEnd.config.min = '1900-01-01 00:00:00'
        },
        resetTimetwo() {
            let maxDate = this.TimeminObj
            this.timeBegin1.config.max = maxDate;
            this.timeEnd1.config.min = '1900-01-01 00:00:00'
        },

        OpenTheTime(text1, text2) {
            this.timeBegin = laydate.render({
                elem: text1,
                type: "datetime",
                trigger: "click",
                // min: -90, //90天前
                max: Date.parse(new Date()), //0天后
                done: (value, date, endDate) => {
                    this.beginTime = value;
                    this.timeEnd.config.min = {
                        year: date.year,
                        month: date.month - 1, //关键
                        date: date.date,
                        hours: date.hours,
                        minutes: date.minutes,
                        seconds: date.seconds
                    }
                }
            })
            this.timeEnd = laydate.render({
                elem: text2,
                type: "datetime",
                trigger: "click",
                max: 1,
                // min: this.beginTime,
                value: new Date(),
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
                    // this.timeBegin.config.min = {
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

        OpenTheTime99(text1, text2) {
            this.timeBegin = laydate.render({
                elem: text1,
                type: "datetime",
                trigger: "click",
                // min: -90, //90天前
                max: Date.parse(new Date()), //0天后
                done: (value, date, endDate) => {
                    this.formModel.startDate = value;
                    //   let endTime = new Date(this.formModel.endDate).getTime();
                    //   let benTimes = new Date(value).getTime();
                    //   if(benTimes > endTime){
                    //     this.formModel.startDate = ""
                    //     this.formModel.endDate = ""
                    // }
                    this.timeEnd.config.min = {
                        year: date.year,
                        month: date.month - 1, //关键
                        date: date.date,
                        hours: date.hours,
                        minutes: date.minutes,
                        seconds: date.seconds
                    };
                }

            });

            this.timeEnd = laydate.render({
                elem: text2,
                type: "datetime",
                trigger: "click",
                max: 1,
                done: (value, date, endDate) => {
                    var datetime = new Date();
                    this.formModel.endDate = value;
                    this.timeBegin.config.max = {
                        year: date.year == undefined ? datetime.getFullYear() : date.year,
                        month: date.month == undefined ? datetime.getMonth() : date.month - 1, //关键
                        date: date.date == undefined ? datetime.getDate() : date.date,
                        hours: date.hours == undefined ? datetime.getHours() : date.hours,
                        minutes: date.minutes == undefined ? datetime.getMinutes() : date.minutes,
                        seconds: date.seconds == undefined ? datetime.getSeconds() : date.seconds
                    };
                }
            });

        },
        OpenTheTime2(text1, text2) {
            this.timeBegin1 = laydate.render({
                elem: text1,
                type: "datetime",
                trigger: "click",
                //min: -90, //90天前
                max: Date.parse(new Date()), //0天后
                // btns: ['now', 'confirm'],
                done: (value, date, endDate) => {
                    this.beginData = value;
                    this.timeEnd1.config.min = {
                        year: date.year,
                        month: date.month - 1, //关键
                        date: date.date,
                        hours: date.hours,
                        minutes: date.minutes,
                        seconds: date.seconds
                    }
                }
            })

            this.timeEnd1 = laydate.render({
                elem: text2,
                type: "datetime",
                trigger: "click",
                // min: this.beginData,
                max: 1,
                // btns: ['now', 'confirm'],
                done: (value, date, endDate) => {
                    var datetime = new Date;
                    this.endData = value;
                    this.timeBegin1.config.max = {
                        year: date.year == undefined ? datetime.getFullYear() : date.year,
                        month: date.month == undefined ? datetime.getMonth() : date.month - 1, //关键
                        date: date.date == undefined ? datetime.getDate() : date.date,
                        hours: date.hours == undefined ? datetime.getHours() : date.hours,
                        minutes: date.minutes == undefined ? datetime.getMinutes() : date.minutes,
                        seconds: date.seconds == undefined ? datetime.getSeconds() : date.seconds,
                    };
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

        //7天限制
        OpenTheTime3(text1, text2) {
            this.timeBegin1 = laydate.render({
                elem: text1,
                type: "datetime",
                trigger: "click",
                //min: -90, //90天前
                max: this.endData, //0天后
                btns: ['now', 'confirm'],
                done: (value, date) => {
                    let mindate = {
                        year: date.year,
                        month: date.month - 1, //关键
                        date: date.date,
                        hours: date.hours,
                        minutes: date.minutes,
                        seconds: date.seconds
                    };
                    let maxdate = {
                        year: date.year,
                        month: date.month - 1, //关键
                        date: date.date + 7,
                        hours: date.hours,
                        minutes: date.minutes,
                        seconds: date.seconds
                    };
                    //给当前时间赋值
                    this.beginData = value;
                    //获取开始时间和当前时间的时间搓
                    // let nowTime = new Date().getTime()
                    //1. 如果当前时间减去结束时间大于0，并且小于2，则表示是在2个小时之内，则更新结束时间
                    //2. 如果当前时间减去结束时间大于7天，则更新结束时间到开始时间的第七天
                    //3. 如果开始时间大于结束时间，则增加判断，如果开始时间小于当前时间两个小时，并且小于7天则，更新为2个小时，否则更新为7天
                    let endTime = new Date(this.endData).getTime();
                    let benTimes = new Date(value).getTime();
                    //判断当前时间和开始时间相比，如果大于7天，则更新结束时间为开始时间的7天，否则结束时间为当前时间
                    if (endTime - benTimes <= 7 * 24 * 60 * 60 * 1000 && endTime - benTimes > 0) {
                        if (benTimes + 7 * 24 * 60 * 60 * 1000 > new Date().getTime()) {
                            this.timeEnd1.config.min = mindate
                            this.timeEnd1.config.max = this.TimeminObj
                        } else {
                            this.timeEnd1.config.min = mindate
                            this.timeEnd1.config.max = maxdate
                        }
                    } else {
                        let alltime = new Date(value).getTime() + 7 * 24 * 60 * 60 * 1000
                        if (alltime > new Date().getTime()) {
                            this.endData = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss")
                            this.timeEnd1.config.min = mindate
                            this.timeEnd1.config.max = this.TimeminObj
                        } else {
                            this.endData = moment(alltime).format("YYYY-MM-DD HH:mm:ss")
                            this.timeEnd1.config.min = mindate
                            this.timeEnd1.config.max = maxdate
                        }


                    }
                }
            });
            this.timeEnd1 = laydate.render({
                elem: text2,
                type: "datetime",
                trigger: "click",
                min: this.beginData,
                max: this.endData,
                btns: ['confirm'],
                done: (value, date, endDate) => {
                    this.endData = value;
                    // this.timeBegin1.config.max = {
                    //   year: date.year,
                    //   month: date.month - 1, //关键
                    //   date: date.date,
                    //   hours: date.hours,
                    //   minutes: date.minutes,
                    //   seconds: date.seconds
                    // };
                }
            });
        },


        setTwoTime(text1, text2) {
            this.timeBegin1 = laydate.render({
              elem: text1,
              type: "datetime",
              trigger: "click",
              min:0,
              max: this.endData, //0天后
              btns: ["now", "confirm"],
              done: (value, date) => {
                let mindate = {
                  year: date.year,
                  month: date.month - 1, //关键
                  date: date.date,
                  hours: date.hours,
                  minutes: date.minutes,
                  seconds: date.seconds
                };
                let maxdate = {
                  year: date.year,
                  month: date.month - 1, //关键
                  date: date.date,
                  hours: date.hours,
                  minutes: date.minutes,
                  seconds: date.seconds
                };
                //给当前时间赋值
                this.beginData = value;
                let endTime = new Date(this.endData).getTime();
                let benTimes = new Date(value).getTime();
                if (
                  endTime - benTimes <= 7 * 24 * 60 * 60 * 1000 &&
                  endTime - benTimes > 0
                ) {
                  if (benTimes + 7 * 24 * 60 * 60 * 1000 > new Date().getTime()) {
                    this.timeEnd1.config.min = mindate;
                    this.timeEnd1.config.max = this.TimeminObj;
                  } else {
                    this.timeEnd1.config.min = mindate;
                    this.timeEnd1.config.max = maxdate;
                  }
                } else {
                  let alltime = new Date(value).getTime() + 7 * 24 * 60 * 60 * 1000;
                  if (alltime > new Date().getTime()) {
                    this.endData = moment(new Date().getTime()).format(
                      "YYYY-MM-DD HH:mm:ss"
                    );
                    this.timeEnd1.config.min = mindate;
                    this.timeEnd1.config.max = this.TimeminObj;
                  } else {
                    this.endData = moment(alltime).format("YYYY-MM-DD HH:mm:ss");
                    this.timeEnd1.config.min = mindate;
                    this.timeEnd1.config.max = maxdate;
                  }
                }
              }
            });
            this.timeEnd1 = laydate.render({
              elem: text2,
              type: "datetime",
              trigger: "click",
              min: this.beginData,
              max: this.endData,
              btns: ["confirm"],
              done: (value, date, endDate) => {
                this.endData = value;
              }
            });
          },






        //以图搜图时间
        OpenTheTime4(text1, text2) {
            this.timeBegin1 = laydate.render({
                elem: text1,
                type: "datetime",
                trigger: "click",
                //min: -90, //90天前
                max: this.endData, //0天后
                btns: ['now', 'confirm'],
                done: (value, date, endDate) => {
                    this.beginData = value;
                    this.timeEnd1.config.min = {
                        year: date.year,
                        month: date.month - 1, //关键
                        date: date.date,
                        hours: date.hours,
                        minutes: date.minutes,
                        seconds: date.seconds
                    };
                }
            });
            this.timeEnd1 = laydate.render({
                elem: text2,
                type: "datetime",
                trigger: "click",
                min: this.beginData,
                max: 1,
                btns: ['now', 'confirm'],
                done: (value, date, endDate) => {
                    this.endData = value;
                    this.timeBegin1.config.max = {
                        year: date.year,
                        month: date.month - 1, //关键
                        date: date.date,
                        hours: date.hours,
                        minutes: date.minutes,
                        seconds: date.seconds
                    };
                }
            });
        },
        //以图搜图时间
        OpenTheTime5(text1, text2) {
            this.timeBegin2 = laydate.render({
                elem: text1,
                type: "datetime",
                trigger: "click",
                //min: -90, //90天前
                max: this.endDataTime, //0天后
                btns: ['now', 'confirm'],
                done: (value, date, endDate) => {
                    this.benginDataTime = value;
                    let endTime = new Date(this.endDataTime).getTime();
                    let benTimes = new Date(value).getTime();
                    if (endTime < benTimes) {
                        this.endDataTime = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss")
                    }
                    this.timeEnd2.config.min = {
                        year: date.year,
                        month: date.month - 1, //关键
                        date: date.date,
                        hours: date.hours,
                        minutes: date.minutes,
                        seconds: date.seconds
                    };
                }
            });
            this.timeEnd2 = laydate.render({
                elem: text2,
                type: "datetime",
                trigger: "click",
                min: this.benginDataTime,
                max: 1,
                btns: ['now', 'confirm'],
                done: (value, date, endDate) => {
                    this.endDataTime = value;
                    this.timeBegin2.config.max = {
                        year: date.year,
                        month: date.month - 1, //关键
                        date: date.date,
                        hours: date.hours,
                        minutes: date.minutes,
                        seconds: date.seconds
                    };
                }
            });
        },
        // 寻迹追踪时间
        OpenRangeTime(text1, text2) {
            this.timeBegin1 = laydate.render({
                elem: text1,
                type: "datetime",
                trigger: "click",
                //min: -90, //90天前
                max: this.endData, //0天后
                btns: ['now', 'confirm'],
                done: (value, date, endDate) => {
                    this.beginData = value;
                    this.timeEnd1.config.min = {
                        year: date.year,
                        month: date.month - 1, //关键
                        date: date.date,
                        hours: date.hours,
                        minutes: date.minutes,
                        seconds: date.seconds
                    };
                    $('#text1').blur(
                        this.lostTime()
                    )
                }
            });
            this.timeEnd1 = laydate.render({
                elem: text2,
                type: "datetime",
                trigger: "click",
                min: this.beginData,
                max: 1,
                btns: ['now', 'confirm'],
                done: (value, date, endDate) => {
                    this.endData = value;
                    this.timeBegin1.config.max = {
                        year: date.year,
                        month: date.month - 1, //关键
                        date: date.date,
                        hours: date.hours,
                        minutes: date.minutes,
                        seconds: date.seconds
                    };
                    $('#text2').blur(
                        this.lostTime()
                    )
                }
            });
        },

        getDateString(date) {
            //date 为毫秒数
            let d = new Date(date);
            let mm = (d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1);
            let dd = d.getDate() >= 10 ? d.getDate() : '0' + d.getDate();
            let hh = d.getHours() >= 10 ? d.getHours() : '0' + d.getHours();
            let MM = d.getMinutes() >= 10 ? d.getMinutes() : '0' + d.getMinutes();
            let ss = d.getSeconds() >= 10 ? d.getSeconds() : '0' + d.getSeconds();
            return d.getFullYear() + '-' + mm + '-' + dd + ' ' + hh + ':' + MM + ':' + ss;
        },
        gety(value) {
            let year = new Date(value).getFullYear()
            let month = (new Date(value).getMonth() + 1) < 10 ? '0' + (new Date(value).getMonth() + 1) : new Date(value).getMonth() + 1
            let date = new Date(value).getDate() < 10 ? '0' + new Date(value).getDate() : new Date(value).getDate()
            let hours = new Date(value).getHours() < 10 ? '0' + new Date(value).getHours() : new Date(value).getHours()
            let minutes = new Date(value).getMinutes() < 10 ? '0' + new Date(value).getMinutes() : new Date(value).getMinutes()
            let seconds = new Date(value).getSeconds() < 10 ? '0' + new Date(value).getSeconds() : new Date(value).getSeconds()
            return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds
        },
    }
};
export default mixins
