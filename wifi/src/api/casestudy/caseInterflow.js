// 案情交流逻辑
const mixins = {
    data() {
        return {
            communicationList: [], // 任务交流列表
            UploadArray: [], // 存放图片
            videoArray: [], // 存放视频
            parentId: '0', // 回复对象的id
            replyPerson: '', // 选择的回复对象
            childMsgs: [], // 回复的列表
            imgUrls: '', // 图片回复
            videoUrls: '', // 视频回复
            MsgUserName: '',
            playerVide: '',
            isshowVideo: false,
            isshowvideoflv: false,
            iscomment: false,
            commentFlag: 2,
            isWrapContent: true,
            aculceCount: '', // 发布内容
            storemsgUuid: '', // 存放公告id
            isAnnounce: true, // 默认禁用
            isEditAnnounce: false, // 编辑公告
        }
    },
    watch: {

    },
    methods:{
       // 加载任务关系图
        // 查询公告
        queryContent() {
            if (this.dataCaseInfo.isSpecial == 1) {
                let data = {
                    caseUuid: this.caseUuid
                };
                this.$http.get('vsas/friend/query/notice', {
                    params: data
                }).then((res) => {
                    this.storemsgUuid = res.data.data.msgUuid;
                    this.aculceCount = res.data.data.msgInfo;
                });
            }
        },
        // 发布公告
        issueCount(isone) {
            if (!this.aculceCount) {
                this.$notify({
                    type: 'warning',
                    message: '请输入公告内容',
                    position: 'bottom-right',
                    duration: 3000
                });
                return;
            }
            if (isone == 1) {
                let data = {
                    msgUuid: this.storemsgUuid,
                    msgInfo: this.aculceCount,
                    imgUrl: '',
                    videoUrl: ''
                };
                this.$http.get('vsas/friend/update/msg', {
                    params: data
                }).then((res) => {
                    if (res.data.code == 200) {
                        this.$notify({
                            type: 'success',
                            message: '编辑公告成功',
                            position: 'bottom-right',
                            duration: 3000
                        });
                        this.isWrapContent = true;
                    } else {
                        this.$notify({
                            type: 'error',
                            message: '编辑公告失败',
                            position: 'bottom-right',
                            duration: 3000
                        });
                    }
                });
            }
        },
        // 编辑公告
        editContent() {
            this.isWrapContent = false;
            this.isAnnounce = false;
        },
        hitsCut() {
            if (this.spaceVideoArrowFlag == 2 || this.spaceVideoArrowFlag == 1) {
                this.iscomment = false;
            }
            this.commentFlag = 2
        },
        // 播放案情交流视频
        playsFlvVideo(item) {
            this.isshowvideoflv = true;
            this.isshowVideo = true;
            this.playerVide = item;
        },
        // 关闭案情交流视频
        exit() {
            this.isshowvideoflv = false;
            this.isshowVideo = false;
        },
        // 提交发布交流内容
        replyTask(replyOne, replyTwo) {
            let contentBar = this.ReleaseTaskContent.replace(/\s+/g, '');
            if (contentBar == '' && !this.UploadArray.length && !this.videoArray.length) { // 判断是否上传
                this.$notify({
                    type: 'warning',
                    message: '请输入案情交流内容',
                    position: 'bottom-right',
                    duration: 3000
                });
                return;
            }
            let strList = Number(this.UploadArray.length) + Number(this.videoArray.length); // 存放图片 + 视频
            if (strList > 9) {
                this.$notify({
                    type: 'warning',
                    message: '上传数量不得超过9张',
                    position: 'bottom-right',
                    duration: 3000
                });
                return;
            }
            this.commentFlag = 1;
            this.announce(); // 调用回复消息
            if (replyOne == 1 || replyTwo == 2) { // 是否发布
                let data = {
                    caseUuid: this.caseUuid,
                    msgUser: this.replyPerson,
                    parentId: this.parentId,
                    msgInfo: this.ReleaseTaskContent,
                    imgUrl: this.imgUrls,
                    videoUrl: this.videoUrls,
                    msgType: '0'
                };
                this.$http.get('vsas/friend/add/msg', {
                    params: data
                }).then((res) => {
                    if (res.data.code == 200) {
                        this.getCommunicationList(); // 加载发布数据列表
                        this.ReleaseTaskContent = '';
                        this.UploadArray = [];
                        this.videoArray = [];
                    } else {
                        this.$notify({
                            type: 'error',
                            message: '回复失败',
                            position: 'bottom-right',
                            duration: 3000
                        });
                    }
                });
            } else {
                let data = {
                    caseUuid: this.caseUuid,
                    msgUser: this.trueName,
                    parentId: this.parentId,
                    msgInfo: this.ReleaseTaskContent,
                    imgUrl: this.UploadArray.join(','),
                    videoUrl: this.videoArray.join(','),
                    msgType: '0'
                };
                this.$http.get('vsas/friend/add/msg', {
                    params: data
                }).then((res) => {
                    if (res.data.code == 200) {
                        document.getElementById('spaceCommentId').style.display = 'none';
                        this.commentFlag = 2;
                        this.iscomment = false;
                        this.getCommunicationList();
                        this.ReleaseTaskContent = '';
                        this.UploadArray = [];
                        this.videoArray = [];
                    } else {
                        this.$notify({
                            type: 'error',
                            message: '提交失败',
                            position: 'bottom-right',
                            duration: 3000
                        });
                    }
                });
            }
        },
        // 加载发布数据列表
        getCommunicationList() {
            let data = {
                caseUuid: this.caseUuid
            };
            data = this.$qs.stringify(data);
            this.$http.post('vsas/friend/query/msg', data).then((res) => {
                this.communicationList = res.data.data;
            });
        },
        // 超出文件个数的回调
        handExceed(files) {
            this.$notify({
                type: 'error',
                message: '当前限制个数9个，请重新上传',
                position: 'bottom-right',
                duration: 3000
            });
        },
        // 上传图片
        beforeAvatarUpload(file) {
            if (
                file.type != 'image/jpg' &&
                file.type != 'image/jpeg' &&
                file.type != 'image/bmp' &&
                file.type != 'image/png' &&
                file.type != 'image/gif' &&
                file.type != 'video/mp4'
            ) {
                this.$notify({
                    type: 'warning',
                    message: '只能上传bmp/jpg/jpeg/png/gif格式图片和MP4视频！',
                    position: 'bottom-right',
                    duration: 3000
                });
                return false;
            }
            let isLt2M = file.size / 1024 / 1024;
            if (isLt2M > 10) {
                this.$notify({
                    type: 'warning',
                    message: '上传图片或视频大小限制10M',
                    position: 'bottom-right',
                    duration: 3000
                });
                return false;
            }
            this.loading = this.$loading({
                lock: true,
                background: 'rgba(255,255,255,0.4)',
                text: '上传中...'
            });
            let reader = new FileReader();
            reader.readAsDataURL(file);
            let formData = new FormData();
            formData.append('files', file);
            this.$http({
                url: '/sms/uploadFile/upload',
                method: 'post',
                data: formData
            }).then(res => {
                if (res.data.code == 200) {
                    // this.loading.close();
                    // this.UploadArray.push(res.data.data);
                    // if (res.data.data[0].indexOf('.jpg') != -1 || res.data.data[0].indexOf('.png') != -1 || res.data.data[0].indexOf('.jpeg') != -1 || res.data.data[0].indexOf('.bmp') != -1 ||
                    //   res.data.data[0].indexOf('.gif') != -1 || res.data.data[0].indexOf('.bmf') != -1) {
                    //   this.UploadArray.push(res.data.data);
                    //   this.loading.close();
                    // }
                    if (res.data.data[0].indexOf('.mp4') != -1) {
                        this.videoArray.push(res.data.data);
                    } else {
                        this.UploadArray.push(res.data.data);
                    }
                    this.loading.close();
                } else {
                    this.loading.close();
                    this.$notify({
                        type: 'error',
                        message: '上传失败',
                        position: 'bottom-right',
                        duration: 3000
                    });

                }
            });
            return false;
        },
        // 移除图片
        del(index, type) {
            if (type == 'videoFile') {
                this.videoArray.splice(index, 1);
            } else {
                this.UploadArray.splice(index, 1);
            }
        },
        // 点击回复按钮
        getreplylist(msgUser, msgUuid, caseUuid, replyOne) {
            this.replyPerson = msgUser;
            this.parentId = msgUuid;
            this.caseUuid = caseUuid;
            this.announce(replyOne);
        },
        // 回复二级帖子
        replyIcop_second(msgUser, msgUuid, caseUuid, replyTwo) {
            this.replyPerson = msgUser;
            this.parentId = msgUuid;
            this.caseUuid = caseUuid;
            this.announce(replyTwo);
        },
        // 清除回复对象
        textDel() {
            this.replyPerson = '';
            this.replyPersonId = '';
            this.parentId = 0;
            this.getAllData();
        },
        // 回复消息模态框
        announce() {
            this.iscomment = true;
            document.getElementById('spaceCommentId').style.display = 'block';
            // 让发表框隐藏
            if (this.commentFlag == 1) {
                this.$nextTick(() => {
                    document.getElementById('spaceCommentId').style.height = '0';
                    this.textDel();
                    this.replyPerson = false;
                    document.getElementById('spaceCommentId').style.display = 'none';
                    document.getElementById('WrapOpen').style.maxHeight = '4.8rem';
                });
            } else if (this.commentFlag == 2) {
                this.$nextTick(() => {
                    document.getElementById('spaceCommentId').style.height = '235px';
                    if (document.getElementById('WrapOpen').clientHeight > 200) {
                        document.getElementById('WrapOpen').style.maxHeight = '2.28rem';
                    }
                    if (document.getElementById('spaceCommentId').height == 0) {
                        document.getElementById('commentId').style.top = document.getElementById('WrapOpen').clientHeight + 'px';
                    }
                });
            }
            this.commentFlag == 1 ? this.commentFlag = 2 : this.commentFlag = 1
        }
    }
}
export default mixins
