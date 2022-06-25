/*
 * @Author: your name
 * @Date: 2020-11-10 10:08:06
 * @LastEditTime : 2021-07-01 10:21:43
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes\src\api\VideoStructPlatform\resourceManage.js
 */
//地图操作
let videoIco = require('@/assets/images/device/video.png')
let RFIDIco = require('@/assets/images/device/RFID.png')
import _ from 'lodash';
const mixins = {
    data: function () {
        return {
            resourcemap: '', //地图
        }
    },
    methods: {
        // 加载地图
        InitMap: function (id) {
            let map = new BMap.Map(id, {
                enableMapClick: false
            })
            this.resourcemap = map
            map.centerAndZoom(new BMap.Point(sessionStorage.getItem('longitude'), sessionStorage.getItem('latitude')), sessionStorage.getItem('bmapLevel'))
            // map.centerAndZoom(new BMap.Point('114.284334', '30.613987'), sessionStorage.getItem('bmapLevel'))
            map.enableScrollWheelZoom() //设置滚轮
            map.disableContinuousZoom(); //禁用连续放大、
            map.disableDoubleClickZoom();
            map.disableInertialDragging(); //禁止了惯性拖拽
            map.addControl(new BMap.ScaleControl({ // 地图比例尺控件
                offset: new BMap.Size(10, 50)
            }))
            ////地图的层级图标
            map.addControl(new BMap.NavigationControl({
                anchor: BMAP_ANCHOR_TOP_RIGHT,
                offset: new BMap.Size(10, 50)
            }))

        },
        //加载点位
        showdevice(list) {
            //将二维变成以为
            let arr = list.reduce((pre, next) => {
                return pre.concat(next)
            })
            // 去掉非点位数组
            arr = _.filter(arr, (item) => {
                return !item.apes
            })
            //加载点位
            this.addMarker(arr)
        },
        addMarker(arr) {
            let list = this.resourcemap.getOverlays()
            if(!arr.length){
                this.resourcemap.clearOverlays();
                return
            }
            //先获取地图上有的点位信息
            //在获取当前需要渲染的点位
            //如果地图上的marker多了，则清除，否则添加marker
            this.resourcemap.clearOverlays();
            for (let i = 0; i < arr.length; i++) {
                let img
                if (arr[i].gbsType == 6) {
                    img = videoIco
                }
                if (arr[i].isSociety == 1) {
                    img = RFIDIco
                }
                let point = new BMap.Point(arr[i].longitude, arr[i].latitude);
                let myIcon = new BMap.Icon(img, new BMap.Size(33, 36), {});
                var label = new BMap.Label(arr[i].name, {
                    offset: new BMap.Size(10, 32)
                });
                let marker = new BMap.Marker(point, {
                    offset: new BMap.Size(6, -13),
                    icon: myIcon
                })
                this.resourcemap.addOverlay(marker)
                marker.setLabel(label);
                marker.id = arr[i].shebeiId;
                marker.list = arr[i]
            }
        },
    },


};
export default mixins
