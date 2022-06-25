/*
 * @Author: your name
 * @Date: 2020-05-08 15:06:15
 * @LastEditTime : 2021-05-06 14:00:54
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \v1.7\src\api\realvideo\C_video.js
 */
const mixins = {
    data: function () {
        return {

        }
    },
    methods: {
        //执行C++播放器的播放方法中赋值字段
        commonCtoPlay(list, index, id) {
            let lastindex = list[index].fileSourcePath.lastIndexOf("/")
            let playvalue = list[index].fileSourcePath
            let url = sessionStorage.getItem("hdfsAgentAddr");
            let playUrl = ''
            // 修改为非大数据架构
            // playvalue = playvalue.slice(lastindex - 81, playvalue.length)
            playvalue = playvalue.slice(lastindex - 87, playvalue.length)
            playvalue = playvalue.replace('source', 'decode')
            //通过encodeURI转换特殊字符
            playUrl = encodeURI(url + playvalue)
            document.getElementById(id).value = playUrl;
        },
        commonCtoPlayPic(id, url) {
            console.log(url, 'url--------0000000')
            document.getElementById(id).value = url
        }
    }
};
export default mixins
