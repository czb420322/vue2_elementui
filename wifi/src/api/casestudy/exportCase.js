import html2canvas from 'html2canvas';
import canvg from 'canvg';
const mixins = {
    data() {
        return {

        }
    },
    methods: {
        // 导出卷宗
        exportCase(flag) {
            this.spaceVideoArrowFlag = 1
            this.skynetFlag = null;
            this.trajectoryList(); // 先调接口获取最新所有的轨迹
            if(flag == 1) {
                this.closeSearchImg();
                this.closeSearchCarImg();
            }

            //这个参数来确定用户是第几次导出卷宗
            this.exportSusNum = 0
            //是否有轨迹转标注的操作还没完成
            setTimeout(() => {
                this.getLableIsOK().then(res => {
                    if (res.code == 200) {
                        if (res.data) {
                            // 先清空轨迹列表
                            this.exportPicList = [];
                            this.loading = this.$loading({
                                lock: true,
                                background: 'rgba(255,255,255,0.4)',
                                text: '导出中'
                            });
                            //对数据进行处理
                            this.exportImgList = []
                            for (let i = 0; i < this.allTrackData.length; i++) {
                                let newArr = []
                                let obj = {}
                                if (this.allTrackData[i].length > 1) {
                                    if (this.allTrackData[i][0][0].imei) {
                                        obj.dw = this.allTrackData[0][0]
                                        obj.gj = this.allTrackData[0][1]
                                    } else if (this.allTrackData[i][1][0].imei) {
                                        obj.dw = this.allTrackData[i][0]
                                        obj.gj = this.allTrackData[i][1]
                                    }
                                    newArr.push(obj)
                                    this.exportImgList.push(newArr)
                                } else {
                                    if (this.allTrackData[i][0].length > 1) {
                                        this.exportImgList.push(this.allTrackData[i])
                                    }
                                }
                            }
                            if (this.exportImgList.length) {
                                this.hideMap.clearOverlays();
                                //如果绑定了电围数据的
                                if (this.exportImgList[0][0].gj) {
                                    this.hideShowTrajectory(this.exportImgList[0][0].dw, this.exportImgList[0][0].gj); // 执行嫌疑目标方法和执行电围方法
                                } else { //没有电围轨迹
                                    this.hideShowTrajectory(this.exportImgList[0][0])
                                }
                                this.exportSusNum++
                            } else {
                                this.loading.close();
                                this.exportimgUrlid();
                            }
                        } else {
                            this.$notify({
                                type: 'warning',
                                message: '标注未转完成，请稍等！',
                                position: 'bottom-right',
                                duration: 3000
                            });
                        }
                    } else {
                        this.$notify({
                            type: 'warning',
                            message: '标注未转完成，请稍等！',
                            position: 'bottom-right',
                            duration: 3000
                        });
                    }
                });
            }, 500)
        },
        // 创建下载文档的函数
        exportimgUrlid() {
            // 取出本地sessionStorage存储的地址
            let pcaModuleUrl = sessionStorage.getItem('pcaModuleUrl');
            // 创建一个a标签
            let link = document.createElement('a');
            // 设置a标签的href属性
            link.href = `http://${pcaModuleUrl}/casemng/dossier/export?caseUuid=${this.caseUuid}&trajectoryUrls=${this.exportPicList}`;
            link.click();
        },
        //  地图截取方法
        handleGenerator(data) {
            var currentSusId = data[0].suspicionUuid
            var containner = document.getElementById('sbd');
            //获取隐藏地图
            var treeElem = document.getElementById('hideMapContent');
            //克隆一份隐藏地图，然后在克隆的地图上进行操作
            var tempElem = treeElem.cloneNode(true);
            tempElem.id = 'temp-tree';
            tempElem.className = 'fff';
            // tempElem.style.display = 'none'
            tempElem.style.width = treeElem.clientWidth + 'px';
            tempElem.style.height = treeElem.clientHeight + 'px';
            containner.appendChild(tempElem);
            // svg元素需特殊处理
            var svgElem = tempElem.querySelectorAll('svg');
            svgElem.forEach((node) => {
                // 移除百度初始化svg元素的自定义属性x和y坐标，这一点很重要，不然元素不会显示
                node.removeAttribute('x');
                node.removeAttribute('y');

                var parentNode = node.parentNode;
                var svg = node.outerHTML.trim();
                var canvas = document.createElement('canvas');
                canvg(canvas, svg);
                canvas.style.zIndex = 250;
                if (node.style.position) {
                    canvas.style.position += node.style.position;
                    canvas.style.left += node.style.left;
                    canvas.style.top += node.style.top;
                }
                parentNode.removeChild(node);
                parentNode.appendChild(canvas);
            });
            // html2canvas插件方法，元素转canvas
            setTimeout(() => {
                html2canvas(tempElem, {
                    useCORS: true,
                    async: true
                }).then(canvas => {
                    var base64Codes = canvas.toDataURL('image/png');
                    let files = this.dataURLtoBlob(base64Codes);
                    let formData = new FormData();
                    let file = new File([files], new Date().getTime() + '.jpg');
                    formData.append('files', file);
                    this.$http({
                        url: '/sms/uploadFile/upload',
                        method: 'post',
                        data: formData
                    }).then(res => {
                        // 截完图后对this.exportPicList进行push
                        if (res.data.code == 200) {
                            this.exportPicList.push(res.data.data[0] + '?' + 'suspicionUuid' + '=' + currentSusId);
                            if (this.exportSusNum >= this.exportImgList.length) {
                                setTimeout(() => {
                                    this.loading.close();
                                }, 1000)
                                this.exportimgUrlid();
                            } else {
                                if (this.exportImgList.length) {
                                    this.hideMap.clearOverlays();
                                    //如果绑定了电围数据的
                                    if (this.exportImgList[this.exportSusNum][0].gj) {
                                        this.hideShowTrajectory(this.exportImgList[this.exportSusNum][0].dw, this.exportImgList[this.exportSusNum][0].gj); // 执行嫌疑目标方法和执行电围方法
                                    } else { //没有电围轨迹
                                        this.hideShowTrajectory(this.exportImgList[this.exportSusNum][0])
                                    }
                                    this.exportSusNum++
                                }
                            }
                        }
                        // this.exportPicList有长度而且和去重后的数组d长度相等时,就代表有轨迹，
                        // if (this.exportPicList.length == this.uniqArr.length) {
                        //     setTimeout(() => {
                        //         this.loading.close();
                        //     }, 1000)
                        //     this.exportimgUrlid();
                        // }
                    });
                });
            }, 500)
        },
        // Base64转Blob对象
        dataURLtoBlob(dataurl) {
            var arr = dataurl.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], {
                type: mime
            });
        },
    }
}
export default mixins
