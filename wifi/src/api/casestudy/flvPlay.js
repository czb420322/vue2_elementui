/*
 * @Author: your name
 * @Date: 2020-09-29 15:00:14
 * @LastEditTime : 2021-05-06 14:54:16
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes\src\api\casestudy\flvPlay.js
 */
import flvjs from 'flv.js'
const mixins = {
    data: function () {
        return {
            flvurl: ''
        }
    },
    methods: {
        //播放flv格式视频
        flv_load_mds(id, url) {
            console.log(url);
            //  this.getIndex()
            if (flvjs.isSupported()) {
                var flvPlayer
                var videoElement = document.getElementById(id);
                if (flvPlayer !== undefined) {
                    if (flvPlayer != null) {
                        flvPlayer.unload();
                        flvPlayer.detachMediaElement();
                        flvPlayer.destroy();
                        flvPlayer = null;
                    }
                }
                flvPlayer = flvjs.createPlayer({
                    type: 'flv',
                    isLive: false,
                    withCredentials: false,
                    hasAudio: false,
                    hasVideo: true,
                    url: url,
                    cors: true
                }, {
                    lazyLoad: true,
                    lazyLoadMaxDuration: 3 * 60, // 此处具体参数可以通过获得的视频具体时长计算
                    lazyLoadRecoverDuration: 30,
                    enableWorker: false,
                    seekType: 'range',
                });

                flvPlayer.attachMediaElement(videoElement);
                flvPlayer.load();
                setTimeout(function () {
                    flvPlayer.play();
                }, 100);
            }
        },
        // getUrl(urlpath) {
        //     console.log(urlpath);
        //     let url = ''
        //     let lastindex = urlpath.lastIndexOf('.');
        //     let playvalue = urlpath;
        //     playvalue = playvalue.slice(lastindex - 48, playvalue.length);
        //     url = window.origin + '/fastDfs' + playvalue;
        //     return url
        // },
        //非大数据版本
        getUrl(urlpath) {
            let url = ''
            let lastindex = urlpath.lastIndexOf('/');
            let playvalue = urlpath;
            playvalue = playvalue.slice(lastindex, playvalue.length);
            url = window.origin + '/fastDfs' + playvalue;
            return url
        },
    }
};
export default mixins
