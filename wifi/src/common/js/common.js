/*
 * @Author: your name
 * @Date: 2020-07-17 09:35:58
 * @LastEditTime : 2020-12-24 14:02:46
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit//
 * @FilePath: \vacp-wfes-v1.7-dev\vacp-wfes\src\common\js\common.js
 */
const coms = {
  //验证非空，非nulll 非undefined
  isEmpty(row){
    if(row == '' || row == null || row == undefined){
      return true
    }else{
      return false
    }
  },
 //验证特殊字符
  regtest(str) {
    let array = ['<', '&', '&']
    let flag = false;
    for (let i = 0; i <= array.length; i++) {
        if (str.indexOf(array[i]) != -1) {
            flag = true
        }
    }
    return flag
},
}

export default coms
