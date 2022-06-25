const mixins = {
  data: function () {
    return {

    }
  },
  methods: {
    //通过当前视频放到的绝对时间和当前视频放了多少秒来计算视频的开始时间
    getSecondTime(nowtime,secondtime){
      let nowplaytime = new Date(nowtime).getTime();
      let alltime = nowplaytime - secondtime * 1000
      let date = new Date(alltime)
      let YY = date.getFullYear();
      let MM = (date.getMonth() + 1) < 10 ? '0'+ (date.getMonth() + 1) : (date.getMonth() + 1);
      let DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      let hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
      let mi = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
      let ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      return YY + '-' + MM + '-' + DD + ' ' + hh + ':' + mi + ':' + ss;
    },

    //手工标注的时间非天网
    //通过文件开始时间加上播放器截图返回的当前播放时间的毫秒数来计算当前视频的时间
    getVideoNowTime(fileTime,nowtime){
      console.log(fileTime,nowtime,'文件的开始时间，当前播放时间');
      if(fileTime == undefined){
        fileTime = 0
      }
      let nowplaytime = new Date(fileTime).getTime();
      let alltime = Number(nowplaytime) + Number(nowtime * 1000)
      let date = new Date(alltime)
      let YY = date.getFullYear();
      let MM = (date.getMonth() + 1) < 10 ? '0'+ (date.getMonth() + 1) : (date.getMonth() + 1);
      let DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      let hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
      let mi = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
      let ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      return YY + '-' + MM + '-' + DD + ' ' + hh + ':' + mi + ':' + ss;
    },

    // 通过文件相对视频开始时间加绝对时间和设备偏移量来计算
    getTrajectory(fileTime,nowtime,deviateTime){
      if(fileTime == undefined){
        fileTime = 0
      }
      let nowplaytime = new Date(fileTime).getTime();
      let alltime = nowplaytime + nowtime + (deviateTime * 1000)
      let date = new Date(alltime)
      let YY = date.getFullYear();
      let MM = (date.getMonth() + 1) < 10 ? '0'+ (date.getMonth() + 1) : (date.getMonth() + 1);
      let DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      let hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
      let mi = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
      let ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      return YY + '-' + MM + '-' + DD + ' ' + hh + ':' + mi + ':' + ss;
    }
  }
};
export default mixins
