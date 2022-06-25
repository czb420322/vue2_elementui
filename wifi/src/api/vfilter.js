/*
 * @Author: your name
 * @Date: 2019-12-06 10:43:53
 * @LastEditTime : 2020-10-28 17:01:47
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.6-dev\vacp-wfes\src\api\vfilter.js
 */
const vfilter = {
    //计算文件开始时间加上相对时间组成的值
    computedTime(val){
        if(val == ''){
            return ''
        }
      if(val != undefined){
        let nowplaytime
        let alltime
        if(val.absoluteTime){
          nowplaytime = new Date(val.absoluteTime).getTime();
          alltime = Number(nowplaytime) +  Number(val.offset * 1000) // 开始时间+相对时间+设备时间
        }else if(val.videoStartTime){
          nowplaytime = new Date(val.videoStartTime).getTime();
          alltime = Number(nowplaytime) + Number(val.relativeTime) + Number(val.offset * 1000) // 开始时间+相对时间+设备时间
        }else if(val.videoStartTime == null){
          nowplaytime = new Date(val.startTime).getTime();
          alltime = Number(nowplaytime) +  Number(val.offset * 1000) // 开始时间+相对时间+设备时间
        }
        let date = new Date(alltime)
        let YY = date.getFullYear();
        let MM = (date.getMonth() + 1) < 10 ? '0'+ (date.getMonth() + 1) : (date.getMonth() + 1);
        let DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        let hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        let mi = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        let ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return YY + '-' + MM + '-' + DD + ' ' + hh + ':' + mi + ':' + ss;
      }
    },
    nowTimes(val){
      if(val == ''){
        return ''
      }else if(val == 0){
          return '1970-01-01 01:01:01'
      }
      else{
        let date = new Date(Number(val))
        let YY = date.getFullYear();
        let MM = (date.getMonth() + 1) < 10 ? '0'+ (date.getMonth() + 1) : (date.getMonth() + 1);
        let DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        let hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        let mi = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        let ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return YY + '-' + MM + '-' + DD + ' ' + hh + ':' + mi + ':' + ss;
      }

    },

  //定义一个全局当前年份的过滤器
    currentdate(value){
      value = new Date().getFullYear();
      return value
    }
  }

  export default vfilter
