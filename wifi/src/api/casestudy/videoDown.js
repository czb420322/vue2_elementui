/*
 * @Author: your name
 * @Date: 2020-05-14 10:44:59
 * @LastEditTime : 2021-08-03 19:01:17
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.7-dev\vacp-wfes\src\api\casestudy\videoDown.js
 */
const mixins = {
  data: function () {
    return {}
  },
  methods: {
    getDownLoad() {
      let videoId = sessionStorage.getItem('isVideo');
      // console.log(videoId,"jjjj");
      // return
      if (videoId == 0) {
        layer.alert('请下载和安装最新插件!', {
          icon: 6,
          title: "消息提示",
          anim: 1,
          id: 'videoplay',
          btn: ['下载', '取消'],
          yes: function (index, layero) {
            var btn = layero.find('.layui-layer-btn');
            btn.find('.layui-layer-btn0').attr({
              href: '/static/DxPlayer.exe',
              target: '_blank',
              download: 'DxPlayer.exe'
            });
            layer.close(index);
          },
          btn2: function () {
            sessionStorage.setItem('isVideo', 0)
          },
        });
      }
    },
    //获取当前日期时间
    getCurrentDate() {
      let date = new Date();
      let seperator1 = "-";
      let seperator2 = ":";
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      let hours = date.getHours();
      let minutes =date.getMinutes()
      let seconds = date.getSeconds();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (hours >= 0 && hours <= 9) {
        hours = "0" + hours;
      }
      if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
      }
      if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds;
      }
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
        " " + hours + seperator2 + minutes +
        seperator2 + seconds;
      return currentdate;
    },
    //两个小时之前
    getEarlierDate() {
      let dates = new Date().getTime() - 3600*1000*2
      let date = new Date(dates)
      let seperator1 = "-";
      let seperator2 = ":";
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      let hours = date.getHours();
      let minutes = date.getMinutes()
      let seconds = date.getSeconds();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (hours >= 0 && hours <= 9) {
        hours = "0" + hours;
      }
      if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
      }
      if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds;
      }
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
        " " + hours + seperator2 + minutes +
        seperator2 + seconds;
      return currentdate;
    },
    //两个小时之后
    getTwoHourLater() {
        let dates = new Date().getTime() + 3600*1000*2
        let date = new Date(dates)
        let seperator1 = "-";
        let seperator2 = ":";
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes()
        let seconds = date.getSeconds();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        if (hours >= 0 && hours <= 9) {
          hours = "0" + hours;
        }
        if (minutes >= 0 && minutes <= 9) {
          minutes = "0" + minutes;
        }
        if (seconds >= 0 && seconds <= 9) {
          seconds = "0" + seconds;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
          " " + hours + seperator2 + minutes +
          seperator2 + seconds;
        return currentdate;
      },
      //x小时之后
      getXLater(time) {
        let dates = new Date().getTime() + 3600*1000*time
        let date = new Date(dates)
        let seperator1 = "-";
        let seperator2 = ":";
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes()
        let seconds = date.getSeconds();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        if (hours >= 0 && hours <= 9) {
          hours = "0" + hours;
        }
        if (minutes >= 0 && minutes <= 9) {
          minutes = "0" + minutes;
        }
        if (seconds >= 0 && seconds <= 9) {
          seconds = "0" + seconds;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
          " " + hours + seperator2 + minutes +
          seperator2 + seconds;
        return currentdate;
      },

  }
};
export default mixins
