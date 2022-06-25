/*
 * @Author: your name
 * @Date: 2020-10-21 11:16:59
 * @LastEditTime : 2020-12-22 14:49:41
 * @LastEditors  : Please set LastEditors
 * @Description: 以图搜图，以车搜车，已脸搜脸
 * @FilePath: \vacp-wfes\src\api\casestudy\searchRunline.js
 */

import _ from 'lodash'
let pink = require('@/assets/images/device/pick.png')
let videoIco = require('@/assets/images/device/video.png')
let carIco = require('@/assets/images/device/car.png')
let kakouIco = require('@/assets/images/device/kakou.png')
let RFIDIco = require('@/assets/images/device/RFID.png')
let cased = require('@/assets/images/device/duang.png')
let linshi = require('@/assets/images/device/temporary.png')
let info = require('@/assets/images/device/info.png')
let light = require('@/assets/images/device/pick.png')
const mixins = {
    data() {
        return {
            searchRunAllList: [], //以图搜图后获取的当前所有数组
            checkMarkList: [], //当前选中的marker中的list,取自searchRunAllList中的数据
            runSearchList: [], //以图搜图，以车搜车，已脸搜脸当前轨迹的标注图
            mapTopList: [], // 展示在点位上的所有图片,
            mapInfoList: [], // 展示在点位上的图片,
        };
    },
    watch: {

    },
    methods: {
        /**
         * @description:以图搜图传过来的值
         *
         * @param {val,type}
         * //val数组传过来的数组，type表示是是以图搜图过来的还是以车搜车过来的值接受img
         * （以图搜图）和car（以车搜车）,和tarck（轨迹列表）
         * @return:
         *
         */
        childBySearch(val, type) {
            this.rangeList = []
            // //对原数据进行排序
            val = val.sort((a, b) => (new Date(b.list[0].fileStartTime).getTime() + b.list[0].appearTime + b.offset * 1000) < (
                new Date(a.list[0].fileStartTime).getTime() + a.list[0].appearTime + a.offset * 1000) ? 1 : -1);
            this.searchRunAllList = val
            // 轨迹列表
            if (type == 'track') {
                //拿到后台的数据之后先将第一个list改成true,默认被选中，
                for (let i = 0; i < this.searchRunAllList.length; i++) {
                    for (let j = 0; j < this.searchRunAllList[i].list.length; j++) {
                        this.searchRunAllList[i].list[j].type = "track"
                        this.searchRunAllList[i].list[j].flagIdx = true
                    }
                }
                // 是否展示以图搜图下方轨迹或者嫌疑目标轨迹
                this.spaceSkyArrow = false;
                this.skynetFlag = null;
                this.spaceVideoArrowFlag = 2;
                this.showdeleteLine = false; //是否展示删除按钮
            } else if (type == 'img') { //以图搜图
                for (let i = 0; i < this.searchRunAllList.length; i++) {
                    for (let j = 0; j < this.searchRunAllList[i].list.length; j++) {
                        this.searchRunAllList[i].list[j].similarity = this.searchRunAllList[i].list[j].similarity * 100
                        this.searchRunAllList[i].list[j].type = "img"
                        this.searchRunAllList[i].list[j].flagIdx = false
                        this.searchRunAllList[i].list[0].flagIdx = true
                    }
                }
                this.spaceSkyArrow = true;
                this.skynetFlag = 2;
                this.spaceVideoArrowFlag = 2;
                this.showdeleteLine = true; //是否展示删除按钮
            } else if (type == 'car') { //以车搜车
                for (let i = 0; i < this.searchRunAllList.length; i++) {
                    for (let j = 0; j < this.searchRunAllList[i].list.length; j++) {
                        this.searchRunAllList[i].list[j].similarity = this.searchRunAllList[i].list[j].similarity * 100
                        this.searchRunAllList[i].list[j].type = "car"
                        this.searchRunAllList[i].list[j].flagIdx = false
                        this.searchRunAllList[i].list[0].flagIdx = true
                    }
                }
                this.spaceSkyArrow = true;
                this.skynetFlag = 2;
                this.spaceVideoArrowFlag = 2;
                this.showdeleteLine = true; //是否展示删除按钮
            }
            this.checkMarkList = this.searchRunAllList[0].list
            this.showarrPoisArr = true;
            // 处理数据并画轨迹
            this.handleMarklist(type)
        },
        //处理轨迹展示的原始数据
        handleMarklist(type) {
            // 轨迹的数组
            this.runSearchList = []
            this.mapInfoList = []
            if (this.searchRunAllList.length) {
                for (let i = 0; i < this.searchRunAllList.length; i++) {
                    let obj = {
                        cameraType: this.searchRunAllList[i].cameraType,  //点位类型
                        latitude: this.searchRunAllList[i].latitude,     //点位经度
                        longitude: this.searchRunAllList[i].longitude,   // 点位维度
                        offset: this.searchRunAllList[i].offset,        //点位offset
                        typeFlag: this.searchRunAllList[i].typeFlag,    //轨迹类型 人  车  骑   人脸
                        type: type                                     // 以图搜图类型img  轨迹列表查看track  以车搜图car
                    }
                    for (let j = 0; j < this.searchRunAllList[i].list.length; j++) {
                        if (this.searchRunAllList[i].list[j].flagIdx) {
                            this.runSearchList.push(Object.assign(this.searchRunAllList[i].list[j], obj))
                        }
                    }
                }
                // console.log(this.runSearchList,5555666);
                //每次执行轨迹之前，先清空路数和轨迹
                // console.log(this.map.getOverlays(),1144);
                let maplist = this.map.getOverlays()
                for (let i = 0; i < maplist.length; i++) {
                    if (maplist[i].list == undefined && maplist[i].listType == undefined) {
                        this.map.removeOverlay(maplist[i])
                    } else {
                        // 先还原点位颜色
                        if (maplist[i].list != undefined) {
                            if (maplist[i].list.type == 1) {
                                maplist[i].setIcon(new BMap.Icon(videoIco, new BMap.Size(33, 36), {}))
                            }
                            if (maplist[i].list.type == 4) {
                                maplist[i].setIcon(new BMap.Icon(RFIDIco, new BMap.Size(33, 36), {}))
                            }
                            if (maplist[i].list.type == 5) {
                                maplist[i].setIcon(new BMap.Icon(linshi, new BMap.Size(33, 36), {}))
                            }
                            if (maplist[i].list.type == 6) {
                                maplist[i].setIcon(new BMap.Icon(info, new BMap.Size(33, 36), {}))
                            }
                            if (maplist[i].list.type == 8) {
                                maplist[i].setIcon(new BMap.Icon(kakouIco, new BMap.Size(33, 36), {}))
                            }

                        }
                        for (let j = 0; j < this.searchRunAllList.length; j++) {
                            if (maplist[i].point.lng == this.searchRunAllList[j].longitude && maplist[i].point.lat == this.searchRunAllList[j].latitude) {
                                if (type != 'car') {
                                    maplist[i].setIcon(new BMap.Icon(pink, new BMap.Size(33, 36), {}))
                                }

                            }
                        }
                    }
                }
                // 对当前选中的数据按照点位ID进行分类，组成二维数组
                this.mapTopList = Object.values(this.runSearchList.reduce((res, item) => {
                    res[item.deviceUuid] ? res[item.deviceUuid].push(item) : res[item.deviceUuid] = [item]
                    return res;
                }, {}))
                // console.log(this.mapTopList,'对应的数组');
                let obj = {}
                // 将数组去重，取出其中的deviceUuid的当前项目
                this.mapInfoList = this.runSearchList.reduce((cur, next) => {
                    obj[next.deviceUuid] ? '' : obj[next.deviceUuid] = true && cur.push(next)
                    return cur
                }, [])
                // console.log(this.mapInfoList,'地图上方轨迹展示');
                // console.log(this.runSearchList);
                // 目前先针对以图搜图排序
                this.runSearchList = this.runSearchList.sort((a, b) => (new Date(b.fileStartTime).getTime() + b.appearTime + b.offset * 1000) < (
                    new Date(a.fileStartTime).getTime() + a.appearTime + a.offset * 1000) ? 1 : -1);
                // console.log(this.runSearchList,99666);

                if (this.mapInfoList.length) {
                    //处理数据的经纬度
                    let datas = []
                    let num = ''
                    for (let i = 0; i < this.runSearchList.length; i++) {
                        num = new BMap.Point(Number(this.runSearchList[i].longitude), Number(this.runSearchList[i].latitude));
                        datas.push(num);
                    }
                    // 如果经纬度一样，则随机把经纬度添加一点
                    for (let i = 0; i < datas.length - 1; i++) {
                        if (datas[i].lng == datas[i + 1].lng && datas[i].lat == datas[i + 1].lat) {
                            datas[i].lat = datas[i].lat + Math.random() / 10000
                            datas[i].lng = datas[i].lng + Math.random() / 10000
                        }
                    }
                    this.brokenline(datas, this.runSearchList[0].typeFlag);
                } else {
                    this.clearDrawing()
                }

            }

            if (this.runSearchList.length) {
                setTimeout(() => {
                    this.loadArrPoisArr(this.mapInfoList)
                }, 500)
                // 缩放地图开始
                this.map.addEventListener('zoomstart', (evt) => {
                    this.iszoom = true;
                    this.loadArrPoisArr(this.mapInfoList);
                });
                // 缩放地图结束
                setTimeout(() => {
                    this.map.addEventListener('zoomend', (evt) => {
                        this.loadArrPoisArr(this.mapInfoList);
                    });
                }, 200);
                this.map.addEventListener('dragging', (evt) => {
                    this.loadArrPoisArr(this.mapInfoList);
                });
                // 拖拽地图结束
                this.map.addEventListener('dragend', (evt) => {
                    this.loadArrPoisArr(this.mapInfoList);
                });
            }

        },
        // 判断是否执行嫌疑目标轨迹快照渲染
        loadArrPoisArr(arrPoisArr) {
            this.isTrajectory = false;
            if (arrPoisArr.length > 0) {
                for (let i = 0; i < arrPoisArr.length; i++) {
                    let getLongitude = arrPoisArr[i].longitude; // 获取经度
                    let getLatitude = arrPoisArr[i].latitude; // 获取纬度
                    this.pointPixel('strickPic' + i, getLongitude, getLatitude);
                }
            }
        },
        //定位坐标
        pointPixel(classname, lng, lat) {
            var point = new BMap.Point(lng, lat);
            var pixel = this.map.pointToPixel(point);
            this.$nextTick(() => {
                setTimeout(() => {
                    document.getElementById(classname).style.left = (pixel.x - 15) + 'px';
                    document.getElementById(classname).style.top = (pixel.y - 155) + 'px';
                }, 100)

            });
        },

        // 图片选中
        checkSelectPic(index, item) {
            this.$nextTick(() => {
                this.$refs.searchImg.showLinecurrent = false
                item.flagIdx = !item.flagIdx;
                let temp = this.checkMarkList.splice(index, 1)
                // 如果是选中状态，则把数据提升到第一个
                if (item.flagIdx) {
                    this.checkMarkList.splice(0, 0, ...temp)
                } else {
                    //如果是取消，则把数据降低到最后一个
                    this.checkMarkList.splice(this.checkMarkList.length, 0, ...temp)
                }
                document.getElementById('spacePic').scrollLeft = 0;
                this.handleMarklist(item.type)
            })
        },
        // 删除快照点位轨迹
        deleteLine(row) {
            console.log(row, 5465456)
            this.skynetFlag = 2
            for (let i = 0; i < this.searchRunAllList.length; i++) {
                if (row.deviceUuid == this.searchRunAllList[i].deviceUuid) {
                    for (let j = 0; j < this.searchRunAllList[i].list.length; j++) {
                        this.searchRunAllList[i].list[j].flagIdx = false
                    }
                }
            }
            this.handleMarklist(row.type)
        },

        //地图点位上方的图片++
        addimg(row, index) {
            console.log(row, 333);
            // let x = _.findIndex(this.mapTopList, item => {
            //     return item[0].deviceUuid == row.deviceUuid;
            // });
            // console.log(x);
            // return
            // 先通过点位找到当前点击的点位，处于二维数组中的第几项
            let clickindex = _.findIndex(this.mapTopList, item => {
                return item[0].deviceUuid == row.deviceUuid;
            });
            console.log(clickindex);
            console.log(this.mapTopList[clickindex].length);
            if (this.mapTopList[clickindex].length > 1) {
                //判断数组长度之后，再判断当前的信息ID，通过personUuid，
                let uuindex
                if (row.personUuid) {
                    uuindex = _.findIndex(this.mapTopList[clickindex], item => {
                        return item.personUuid == row.personUuid;
                    });
                } else if (row.vehicleUuid) {
                    uuindex = _.findIndex(this.mapTopList[clickindex], item => {
                        return item.vehicleUuid == row.vehicleUuid;
                    });
                } else if (row.bicycleUuid) {
                    uuindex = _.findIndex(this.mapTopList[clickindex], item => {
                        return item.vehicleUuid == row.vehicleUuid;
                    });
                }
                uuindex++
                if (uuindex >= this.mapTopList[clickindex].length) {
                    uuindex--
                }
                let nowindex = _.findIndex(this.mapInfoList, item => {
                    return item.deviceUuid == row.deviceUuid;
                });
                this.mapInfoList.splice(nowindex, 1, this.mapTopList[clickindex][uuindex])
            }
        },
        // 图片减
        removeimg(row, index) {
            // 先通过点位找到当前点击的点位，处于二维数组中的第几项
            let clickindex = _.findIndex(this.mapTopList, item => {
                return item[0].deviceUuid == row.deviceUuid;
            });
            if (this.mapTopList[clickindex].length > 1) {
                //判断数组长度之后，再判断当前的信息ID，通过personUuid，
                let uuindex
                if (row.personUuid) {
                    uuindex = _.findIndex(this.mapTopList[clickindex], item => {
                        return item.personUuid == row.personUuid;
                    });
                } else if (row.vehicleUuid) {
                    uuindex = _.findIndex(this.mapTopList[clickindex], item => {
                        return item.vehicleUuid == row.vehicleUuid;
                    });
                } else if (row.bicycleUuid) {
                    uuindex = _.findIndex(this.mapTopList[clickindex], item => {
                        return item.vehicleUuid == row.vehicleUuid;
                    });
                }
                uuindex--
                if (uuindex < 0) {
                    uuindex = 0
                }
                let nowindex = _.findIndex(this.mapInfoList, item => {
                    return item.deviceUuid == row.deviceUuid;
                });
                this.mapInfoList.splice(nowindex, 1, this.mapTopList[clickindex][uuindex])
            }
        },
    }
}
export default mixins
