/*
 * @Author: your name
 * @Date: 2020-09-10 11:18:11
 * @LastEditTime : 2021-08-02 16:19:28
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edi
 * @FilePath: \vacp-wfes\src\api\casestudy\personFace.js
 */
import { recImage } from '@/api/discernserve/discernSearch'
const mixins = {
  data: function () {
    return {
        isflag:false,
      isflag2:false,
      currentCar:0,
      currentCar2:0,
      imgUrl:'',
      imgUrlFace:'',
      imgUrl2:'',
      imgUrlFace2:'',
      imgData: {
          code: "",
          message: "",
          data: {}
      }, // 识别出来的信息
      imgData2: {
          code: "",
          message: "",
          data: {}
      }, // second识别出来的信息

      imageWidth:'', // 图片的宽度
      imageHeight:'', // 图片的高度
      imageWidth2:'',
      imagHeight2:'',
      unit: 1, // 图片宽度适应比例尺
      unit2:1,
      loading:null,  //加载
      imgFaceData:{},
      faceLyst:{},//当前选中的人脸展示
      faceLyst2:{},
      percentage:0,
      feature1:'',//人脸特征码1
      feature2:'',//人脸特征码2
      facelist:[], //第一个facelist
    }
  },
  computed:{
    //图片上所有人脸的位置坐标列表
    // carList (){
    //   let cList = [];
    //   // 后台返回的人脸数据有值
    //   if(this.imgData.data.faceOutputInfoList != undefined){
    //     // 返回的人脸数据有长度
    //     if(this.imgData.data.faceOutputInfoList.length){
    //       // 循环对clist进行赋值
    //       for(let i=0;i<this.imgData.data.faceOutputInfoList.length;i++){
    //         cList.push({
    //           leftTopX: this.imgData.data.faceOutputInfoList[i].facePos.leftTopX,
    //           leftTopY: this.imgData.data.faceOutputInfoList[i].facePos.leftTopY,
    //           rightBtmX: this.imgData.data.faceOutputInfoList[i].facePos.rightBtmX,
    //           rightBtmY: this.imgData.data.faceOutputInfoList[i].facePos.rightBtmY
    //         });
    //       }
    //     }
    //   }
    //   return cList;
    // },
    carList() {
        let cList = [];
        // 后台返回的人脸数据有值
        if (this.facelist != undefined) {
            // 返回的人脸数据有长度
            if (this.facelist.length) {
                // 循环对clist进行赋值
                for (let i = 0; i < this.facelist.length; i++) {
                    cList.push({
                        leftTopX: this.facelist[i].RegionLeft,
                        leftTopY: this.facelist[i].RegionTop,
                        rightBtmX: this.facelist[i].RegionLeft + this.facelist[i].RegionWidth,
                        rightBtmY: this.facelist[i].RegionTop + this.facelist[i].RegionHeight
                    });
                }
            }
        }
        return cList;
    },
    // second图片上所有人脸的位置坐标列表
     carList2 (){
      let cList2 = [];
      if(this.imgData2.data.faceOutputInfoList != undefined){
        if(this.imgData2.data.faceOutputInfoList.length){
          for(let i=0;i<this.imgData2.data.faceOutputInfoList.length;i++){
            cList2.push({
              leftTopX: this.imgData2.data.faceOutputInfoList[i].facePos.leftTopX,
              leftTopY: this.imgData2.data.faceOutputInfoList[i].facePos.leftTopY,
              rightBtmX: this.imgData2.data.faceOutputInfoList[i].facePos.rightBtmX,
              rightBtmY: this.imgData2.data.faceOutputInfoList[i].facePos.rightBtmY
            });
          }
        }
      }
      return cList2;
    },
  },
  methods:{
    // 左边区域上传人脸按钮
    //  img1AvatarUpload(file,a,b){
    //     // 首先对上传的文件进行格式校验
    //     if(file.type != "image/jpg" && file.type != "image/jpeg" && file.type != "image/bmp" && file.type != "image/png"){
    //       this.$notify({
    //         type: 'warning',
    //         message: '上传图片只能是 png/jpg/jpeg/bmp格式！',
    //         position: 'bottom-right',
    //         duration: 3000
    //       });
    //       return false;
    //     };
    //     // 然后对上传的文件大小进行校验
    //     if(file.size/1024/1024 >= 10){
    //         this.$notify({
    //           type:"warning",
    //           message:"上传图片不能大于10M",
    //           position:"bottom-right",
    //           duration:3000
    //         })
    //         return false;
    //       }

    //     // 创建一个文件对象
    //     let reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     let formData = new FormData();
    //     formData.append('uploadImage',file);
    //     let _this = this;
    //     _this.uploadloading = null;
    //     _this.uploadloading = _this.$loading({
    //       text: '正在上传...',
    //       spinner: 'el-icon-loading',
    //       target: "#imgBoxsearch",
    //     });
    //     this.$http({
    //       url:'/pca/targetRecognition/recognitionFace',
    //       method:'post',
    //       data:formData
    //     }).then(res=>{
    //       _this.uploadloading.close();
    //       _this.uploadloading = null;
    //       // 将大图的src设置为当前上传图片的src，使其显示出来
    //       this.imgUrl = reader.result;
    //       if(res.data.code == 200){
    //         // 如果返回的人脸数据长度为0，则代表上传的图片中没有人脸
    //         if(res.data.data.faceOutputInfoList.length == 0) {
    //           this.$notify({
    //             type: 'warning',
    //             message: '未能识别出人脸信息，请重新上传！',
    //             position: 'bottom-right',
    //             duration: 3000
    //           });
    //           // 执行清除画框函数
    //           // this.clearRect()
    //           // 执行自适应函数
    //           this.badImgWh()
    //           // 清空选中人脸数据
    //           this.imgUrlFace = '';
    //         }else{
    //           // 显示出上传的图片
    //           this.imgUrl = reader.result;
    //           //上方显示出小人脸
    //           this.imgUrlFace = reader.result;
    //           // this.imgUrlShow = "";
    //           this.imgData = res.data
    //           // 执行这个函数，框选出上传图片里面的第一张人脸
    //           this.initCanvas();
    //         }
    //       }else if(res.data.code == 801){
    //         // 执行图片自适应
    //         this.badImgWh()
    //         // 清除canvas绘制的画框
    //         this.clearRect()
    //         this.$notify({
    //           type: 'error',
    //           message: '图片识别失败！',
    //           position: 'bottom-right',
    //           duration: 3000
    //         });
    //       } else if(res.data.code == 802){
    //         // 执行图片自适应
    //          this.badImgWh()
    //          // 清除canvas绘制的画框
    //          this.clearRect()
    //          this.$notify({
    //           type: 'error',
    //           message: '图片上传失败！',
    //           position: 'bottom-right',
    //           duration: 3000
    //         });
    //       } else if(res.data.code == 803){
    //         // 执行图片自适应
    //         this.badImgWh()
    //         // 清除canvas绘制的画框
    //         this.clearRect()
    //         this.$notify({
    //           type: 'error',
    //           message: '图片格式不正确！',
    //           position: 'bottom-right',
    //           duration: 3000
    //         });
    //       }else{
    //         // 执行图片自适应
    //         this.badImgWh()
    //          // 清除canvas绘制的画框
    //         this.clearRect()
    //         this.$notify({
    //           type: 'error',
    //           message: '图片识别失败！',
    //           position: 'bottom-right',
    //           duration: 3000
    //         });
    //       }
    //         // 将当前选中的第一张人脸赋值给this.faceLyst
    //        this.faceLyst  = this.imgData.data.faceOutputInfoList[this.currentCar]
    //       //  将选中的人脸特征码赋值给this.feature1
    //        this.feature1 = res.data.data.faceOutputInfoList[0].feature;
    //       // 框选出当前的人脸
    //        this.drawCarInfo(this.currentCar);
    //         // 框选出的人脸在上方显示
    //        this.faceShow(this.faceLyst)
    //     });
    //     return false;
    //   },


    img1AvatarUpload(file, a, b) {
        // 首先对上传的文件进行格式校验
        if (file.type != "image/jpg" && file.type != "image/jpeg" && file.type != "image/bmp" && file.type != "image/png") {
            this.$notify({
                type: 'warning',
                message: '上传图片只能是 png/jpg/jpeg/bmp格式！',
                position: 'bottom-right',
                duration: 3000
            });
            return false;
        };
        // 然后对上传的文件大小进行校验
        if (file.size / 1024 / 1024 >= 10) {
            this.$notify({
                type: "warning",
                message: "上传图片不能大于10M",
                position: "bottom-right",
                duration: 3000
            })
            return false;
        }
        // 创建一个文件对象
        let reader = new FileReader();
        reader.readAsDataURL(file);
        let formData = new FormData();
        formData.append('files', file);
        this.uploadloading = null;
        this.uploadloading = this.$loading({
            text: '正在上传...',
            spinner: 'el-icon-loading',
            target: "#imgBoxsearch",
        });
        this.$http({
            url: "/sms/uploadFile/upload",
            method: "post",
            data: formData
        }).then(res => {
            this.imgUrl = reader.result;
            this.badImgWh()
            if (res.data.code == 200) {
                this.zkyImgPicrecog(res.data.data[0]);
                this.uploadloading.close()
            } else if (res.data.code == 300) {
              this.clearRect();
              this.$notify({
                type: "error",
                message: "图片上传异常",
                position: "bottom-right",
                duration: 3000
              });
            }
        });
        return false;
    },


    zkyImgPicrecog(url){
        let data = {
            imageUrl: url, //图片的url地址
            recFlag: 3, //1:识别人，非机动车，车辆，2：识别人脸 3、识别人脸+人车骑
            detectMode: 0 //0：大图（默认用这个），1：小图，2：大图小图都识别（性能差）
        };
        // data = this.$qs.stringify(data);
        recImage(data).then(reponse => {
            if(reponse.data.code == 200){
                this.facelist = JSON.parse(reponse.data.data).AllResult.Result[0].Faces
                if(this.facelist.length){
                    this.initCanvas()
                    this.imgUrlFace = url
                    this.feature1 = this.facelist[0].Feature;
                    this.faceShow(this.facelist[0])
                }else{
                    this.imgUrlFace = ''
                    this.$notify({
                        type: "warning",
                        message: "图片识别失败！",
                        position: "bottom-right",
                        duration: 3000
                    });
                }
            }else{
                this.imgUrlFace = ''
            }
        })
    },


















    // 上传第二张图片的按钮
     img2AvatarUpload(file,a,b){
        // 先对上传的文件进行格式校验
        if(file.type != "image/jpg" && file.type != "image/jpeg" && file.type != "image/bmp" && file.type != "image/png"){
          this.$notify({
            type: 'warning',
            message: '上传图片只能是 png/jpg/jpeg/bmp格式！',
            position: 'bottom-right',
            duration: 3000
          });
          return false;
        }
        // 然后对上传的文件进行大小校验
         if(file.size/1024/1024 >= 10){
            this.$notify({
              type:"warning",
              message:"上传图片不能大于10M",
              position:"bottom-right",
              duration:3000
            })
            return false;
          }
        // 创建一个文件对象
        let reader = new FileReader();
        reader.readAsDataURL(file);
        let formData = new FormData();
        formData.append('uploadImage',file);
        let _this = this;
        _this.uploadloading = null;
        _this.uploadloading = _this.$loading({
          text: '正在上传...',
          spinner: 'el-icon-loading',
          target: "#imgBoxsearch2",
        });
        this.$http({
          url:'/pca/targetRecognition/recognitionFace',
          method:'post',
          data:formData
        }).then(res=>{
          // console.log(this.feature2,"人脸特征码2");
          _this.uploadloading.close();
          _this.uploadloading = null;
          this.imgUrl2 = reader.result;
          if(res.data.code == 200){
            // 如果人脸数据长度为0，则代表上传的图片没有人脸
            if(res.data.data.faceOutputInfoList.length == 0) {
              this.$notify({
                type: 'warning',
                message: '未能识别出人脸信息，请重新上传！',
                position: 'bottom-right',
                duration: 3000
              });
              // 清除画框
              // this.clearRect2()
              // 执行图片自适应
              this.badImgWh2()
              // this.badImgWh()
              // 清空图片地址
              this.imgUrlFace2 = '';
            }else{
              this.imgUrl2 = reader.result;
              this.imgUrlFace2 = reader.result
              this.imgData2 = res.data
              this.initCanvas2();
            }
          }else if(res.data.code == 801){
            this.badImgWh2()
            this.clearRect2()
            this.$notify({
              type: 'error',
              message: '图片识别失败！',
              position: 'bottom-right',
              duration: 3000
            });
          } else if(res.data.code == 802){
            this.badImgWh2()
            this.clearRect2()
             this.$notify({
              type: 'error',
              message: '图片上传失败！',
              position: 'bottom-right',
              duration: 3000
            });
          } else if(res.data.code == 803){
            this.badImgWh2()
            this.clearRect2()
            this.$notify({
              type: 'error',
              message: '图片格式不正确！',
              position: 'bottom-right',
              duration: 3000
            });
          }else{
            this.badImgWh2()
            this.clearRect2()
            this.$notify({
              type: 'error',
              message: '图片识别失败！',
              position: 'bottom-right',
              duration: 3000,
            });
          };
           // 将当前选中的第一张人脸赋值给this.faceLyst2
          this.faceLyst2  = this.imgData2.data.faceOutputInfoList[this.currentCar2]
          //  将选中的人脸特征码赋值给this.feature2
          this.feature2 = res.data.data.faceOutputInfoList[0].feature;
           // 框选出当前的人脸
          this.drawCarInfo2(this.currentCar2);
          // 选中的人脸在上方显示
          this.faceShow2(this.faceLyst2)
        });
        return false;
      },


      // 识别失败后执行图片自适应
      badImgWh(){
        // 创建一个图片文件
        let img = new Image();
        img.onload = ()=>{
          this.imageWidth = img.naturalWidth
          this.imageHeight = img.naturalHeight
          this.imgWH();
          let photoCanvas = document.getElementById("PCanvas");
          photoCanvas.width = 0
          photoCanvas.height = 0
        }
        img.src = this.imgUrl
        this.imgData = {
          code: "",
          message: "",
          data: {}
        } // 识别出来的信息
      },
      // second之别失败执行自适应
      badImgWh2(){
        let img = new Image();
        img.onload = ()=>{
          this.imageWidth2 = img.naturalWidth
          this.imageHeight2 = img.naturalHeight
          this.imgWH2();
          let photoCanvas = document.getElementById("PCanvas2");
          photoCanvas.width = 0
          photoCanvas.height = 0
        }
        img.src = this.imgUrl2
        this.imgData2 = {
          code: "",
          message: "",
          data: {}
        } // 识别出来的信息
      },



      // 识别成功后框选第一个人脸识别
    //    initCanvas(){
    //     if(this.imgData.data.faceOutputInfoList.length){
    //       //默认选中第一个人
    //       this.currentCar = 0;//显示第一张人脸的标识信息
    //       this.imageWidth = this.imgData.data.faceOutputInfoList[0].width;
    //       this.imageHeight = this.imgData.data.faceOutputInfoList[0].height;
    //       this.imgWH();
    //       //画出所有人脸的方框
    //       this.drawCarInfo(0);
    //     }
    //   },
    initCanvas() {
        //默认选中第一个人
        this.currentCar = 0; //显示第一张人脸的标识信息
        this.imageWidth = this.facelist[0].SrcImageWidth;
        this.imageHeight = this.facelist[0].SrcImageHeight;
        this.imgWH();
        //画出所有人脸的方框
        this.drawCarInfo(0);
    },
      // secong识别成功后框选第一个人脸
       initCanvas2(){
        if(this.imgData2.data.faceOutputInfoList.length){
          //默认选中第一个人
          this.currentCar2 = 0;//显示第一张人脸的标识信息
          this.imageWidth2= this.imgData2.data.faceOutputInfoList[0].width;
          this.imageHeight2 = this.imgData2.data.faceOutputInfoList[0].height;
          this.imgWH2();
          //画出所有人脸的方框
          this.drawCarInfo2(0);

        }
      },


      // 计算上传图片的宽高比和盒子的宽高比
      imgWH(){
        let imgBox = document.getElementById('imgBoxsearch');
        let imgs = document.getElementById('imgItemsearch');
        let photoCanvas = document.getElementById('PCanvas');
        let imgw = this.imageWidth;
        let imgh = this.imageHeight;
        let retw = imgBox.clientWidth;
        let reth = imgBox.clientHeight;
        if (retw / reth < imgw / imgh) {
          imgs.style.width = "100%";
          imgs.style.height = 'auto';
          this.unit = imgw / retw;
        }
        else{
          imgs.style.height = "100%"
          imgs.style.width = 'auto'
          this.unit = imgh / reth;
        }

        photoCanvas.width = imgw /this.unit;
        photoCanvas.height = imgh /this.unit;

      },

      // second计算上传图片的宽高比和盒子的宽高比
      imgWH2(){
        let imgBox = document.getElementById("imgBoxsearch2");
        let imgs = document.getElementById("imgItemsearch2");
        let photoCanvas = document.getElementById("PCanvas2");
        let imgw = this.imageWidth2;
        let imgh = this.imageHeight2;
        let retw = imgBox.clientWidth;
        let reth = imgBox.clientHeight;
        if (retw / reth < imgw / imgh) {
          imgs.style.width = "100%";
          imgs.style.height = 'auto';
          this.unit2 = imgw / retw;
        }
        else{
          imgs.style.height = "100%"
          imgs.style.width = 'auto'
          this.unit2 = imgh / reth;
        }

        photoCanvas.width = imgw /this.unit2;
        photoCanvas.height = imgh /this.unit2;

      },


      // 当前选中的人脸用红框标出
       drawCarInfo (pIndex){
        //  先执行清除画框
        this.clearRect();
        // 获取所有的人脸
        this.drawAllCar();
        // 框选当前选中的人脸用红框
        this.drawCar(pIndex,"red");
      },

      // 当前选中的人脸用红框标出
       drawCarInfo2 (pIndex){
         //  先执行清除画框
        this.clearRect2();
         // 获取所有的人脸
        this.drawAllCar2();
         // 框选当前选中的人脸用红框
        this.drawCar2(pIndex,"red");
      },


        // 画出所有的框
    //    drawAllCar(){
    //     //  如果没有长度，直接return
    //     if(!this.imgData.data.faceOutputInfoList.length){
    //       return false;
    //     }
    //     // 用一个变量来接受所有的人脸数据
    //     var allImgData = this.imgData.data.faceOutputInfoList
    //     for(let i=0;i<allImgData.length;i++){
    //       // 执行这个函数，对所有人脸画框，用黄色的边框标出
    //       this.drawRect("root",allImgData[i], "yellow");
    //     }
    //   },
    drawAllCar() {
        if(this.facelist.length > 1){
            // 用一个变量来接受所有的人脸数据
            var allImgData = this.facelist
            for (let i = 0; i < allImgData.length; i++) {
                // 执行这个函数，对所有人脸画框，用黄色的边框标出
                this.drawRect("root", allImgData[i], "yellow");
            }
        }
    },

      // second画出所有框
      drawAllCar2(){
        //  如果没有长度，直接return
        if(!this.imgData2.data.faceOutputInfoList.length){
          return false;
        }
        // 用一个变量来接受所有的人脸数据
        var allImgData = this.imgData2.data.faceOutputInfoList
        for(let i=0;i<allImgData.length;i++){
           // 执行这个函数，对所有人脸画框，用黄色的边框标出
          this.drawRect2("root",allImgData[i], "yellow");
        }
      },


      // 画框,需要传一个参数和一个颜色
    //    drawCar(pIndex,color){
    //     //  没有长度，直接ruturn
    //     if(!this.imgData.data.faceOutputInfoList.length){
    //       return false;
    //     }
    //     // 当前选中的人脸的索引
    //     let parent = this.imgData.data.faceOutputInfoList[pIndex];
    //     // 框出当前的人脸，需要传一个索引和一个颜色
    //     this.drawRect("root",this.imgData.data.faceOutputInfoList[pIndex],color);
    //   },
    drawCar(pIndex, color) {
        // 当前选中的人脸的索引
        // let parent = this.imgData.data.faceOutputInfoList[pIndex];
        // 框出当前的人脸，需要传一个索引和一个颜色
        this.drawRect("root", this.facelist[pIndex], color);
    },

      // second画框,需要传一个参数和一个颜色
       drawCar2(pIndex,color){
         //  没有长度，直接ruturn
        if(!this.imgData2.data.faceOutputInfoList.length){
          return false;
        }
        // 当前选中的人脸的索引
        let parent = this.imgData2.data.faceOutputInfoList[pIndex];
         // 框出当前的人脸，需要传一个索引和一个颜色
        this.drawRect2("root",this.imgData2.data.faceOutputInfoList[pIndex],color);
      },




      // 清除画框
       clearRect(){
        //  获取canvas
        let photoCanvas = document.getElementById('PCanvas');
        let pCtx = photoCanvas.getContext("2d");
        // 执行canvas的原生方法进行画框
        pCtx.clearRect(0, 0, photoCanvas.clientWidth, photoCanvas.clientHeight);
      },

      // second清除画框
      clearRect2(){
        // 获取canvas
        let photoCanvas = document.getElementById("PCanvas2");
        let pCtx = photoCanvas.getContext("2d");
        // 执行canvas的原生方法进行画框
        pCtx.clearRect(0, 0, photoCanvas.clientWidth, photoCanvas.clientHeight);
      },



      // 根据坐标和宽高画框
    //    drawRect (parent, pos,color){
    //     if(!pos){
    //       return;
    //     }
    //     // 获取canvas
    //     let photoCanvas = document.getElementById('PCanvas');
    //     let pCtx = photoCanvas.getContext("2d");

    //     let x = pos.facePos.leftTopX / this.unit;
    //     let y = pos.facePos.leftTopY  / this.unit;
    //     let w = (pos.facePos.rightBtmX - pos.facePos.leftTopX) / this.unit;
    //     let h = (pos.facePos.rightBtmY - pos.facePos.leftTopY) / this.unit;
    //     if(parent !== "root"){
    //       x = x + parent.leftTopX / this.unit;
    //       y = y + parent.leftTopY / this.unit;
    //     }
    //     pCtx.strokeStyle = color;
    //     pCtx.strokeRect(x,y,w,h);
    //   },
    drawRect(parent, pos, color) {
        if (!pos) {
            return;
        }
        // 获取canvas
        let photoCanvas = document.getElementById('PCanvas');
        let pCtx = photoCanvas.getContext("2d");

        let x = pos.RegionLeft / this.unit;
        let y = pos.RegionTop / this.unit;
        let w = pos.RegionWidth / this.unit;
        let h = pos.RegionHeight / this.unit;
        if (parent !== "root") {
            x = x + parent.leftTopX / this.unit;
            y = y + parent.leftTopY / this.unit;
        }
        pCtx.strokeStyle = color;
        pCtx.strokeRect(x, y, w, h);
    },


      // second根据坐标和宽高画框
       drawRect2 (parent, pos,color){
        if(!pos){
          return;
        }
        let photoCanvas = document.getElementById("PCanvas2");
        let pCtx = photoCanvas.getContext("2d");
      //  获取上传图片中所有人脸在图片中出现的坐标位置和宽高
        let x = pos.facePos.leftTopX / this.unit2;
        let y = pos.facePos.leftTopY  / this.unit2;
        let w = (pos.facePos.rightBtmX - pos.facePos.leftTopX) / this.unit2;
        let h = (pos.facePos.rightBtmY - pos.facePos.leftTopY) / this.unit2;
        if(parent !== "root"){
          x = x + parent.leftTopX / this.unit2;
          y = y + parent.leftTopY / this.unit2;
        }
        pCtx.strokeStyle = color;
        // 原生方法画框,传四个参数，
        pCtx.strokeRect(x,y,w,h);
      },



      // 获取鼠标在盒子的位子
      getPageMag(e) {
        let pageX = e.pageX || e.clientX + this.getScrollMag().scrollLeft;
        let pageY = e.pageY || e.clientY + this.getScrollMag().scrollTop;
        return {
          pageX: pageX,
          pageY: pageY
        }
      },


      // second获取鼠标在盒子的位子
       getPageMag2(e) {
        let pageX2 = e.pageX || e.clientX + this.getScrollMag().scrollLeft;
        let pageY2 = e.pageY || e.clientY + this.getScrollMag().scrollTop;
        return {
          pageX2: pageX2,
          pageY2: pageY2
        }
      },
      getScrollMag() {
        let scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        return {
          scrollLeft: scrollLeft,
          scrollTop: scrollTop
        }
      },

      // 点击人脸选中
    //   choiceCar (ev){
    //     if(this.imgUrl){
    //     this.isflag = false;
    //     let imgItem = document.getElementById('imgItemsearch');
    //     // 获取人脸位置在图片上的偏移量
    //     let offsetX = this.getPageMag(ev).pageX - $(imgItemsearch).offset().left;
    //     let offsetY = this.getPageMag(ev).pageY - $(imgItemsearch).offset().top;
    //     if(this.carList.length > 0 ){
    //       // 遍历所有的人脸数据
    //       for(let i = 0;i<this.carList.length;i++){
    //         if( (this.carList[i].leftTopX / this.unit) < offsetX && (this.carList[i].rightBtmX / this.unit) > offsetX && (this.carList[i].leftTopY / this.unit) < offsetY && (this.carList[i].rightBtmY/ this.unit) > offsetY){
    //           this.currentCar = i;
    //         }
    //       }
    //     }else{
    //       return null;
    //     }
    //     // 展示当前选中的人脸
    //    this.faceLyst  = this.imgData.data.faceOutputInfoList[this.currentCar]
    //   //  将选中的人脸特征码给feature1
    //    this.feature1 = this.imgData.data.faceOutputInfoList[this.currentCar].feature,
    //   // 当前选中的人脸标红
    //    this.drawCarInfo(this.currentCar);
    //    this.faceShow(this.faceLyst)
    //   }else {
    //     this.$notify({
    //       type:'warning',
    //       message:'请先上传图片！',
    //       position:'bottom-right',
    //       duration:2000
    //     })
    //   }
    // },

    choiceCar(ev) {
        if (this.imgUrl) {
            this.isflag = false;
            let imgItem = document.getElementById('imgItemsearch');
            // 获取人脸位置在图片上的偏移量
            let offsetX = this.getPageMag(ev).pageX - $(imgItemsearch).offset().left;
            let offsetY = this.getPageMag(ev).pageY - $(imgItemsearch).offset().top;
            if (this.carList.length > 0) {
                // 遍历所有的人脸数据
                for (let i = 0; i < this.carList.length; i++) {
                    if ((this.carList[i].leftTopX / this.unit) < offsetX && (this.carList[i].rightBtmX / this.unit) > offsetX && (this.carList[i].leftTopY / this.unit) < offsetY && (this.carList[i].rightBtmY / this.unit) > offsetY) {
                        this.currentCar = i;
                    }
                }
            } else {
                return null;
            }
            // 展示当前选中的人脸
            this.faceLyst = this.facelist[this.currentCar]
            //  将选中的人脸特征码给feature1
            this.feature1 = this.facelist[this.currentCar].Feature,
                // 当前选中的人脸标红
            this.drawCarInfo(this.currentCar);
            this.faceShow(this.faceLyst)
        } else {
            this.$notify({
                type: 'warning',
                message: '请先上传图片！',
                position: 'bottom-right',
                duration: 2000
            })
        }
    },

      // second点击人脸选中
      choiceCar2 (ev){
        if(this.imgUrl2){
        this.isflag2 = false;
        let imgItem = document.getElementById("imgItemsearch2");
        let offsetX = this.getPageMag2(ev).pageX2 - $(imgItemsearch2).offset().left;
        let offsetY = this.getPageMag2(ev).pageY2 - $(imgItemsearch2).offset().top;
        if(this.carList2.length > 0 ){
          for(let i = 0;i<this.carList2.length;i++){
            if( (this.carList2[i].leftTopX / this.unit2) < offsetX && (this.carList2[i].rightBtmX / this.unit2) > offsetX && (this.carList2[i].leftTopY / this.unit2) < offsetY && (this.carList2[i].rightBtmY/ this.unit2) > offsetY){
              this.currentCar2 = i;
            }
          }
        }else{
          return null;
        }
       this.faceLyst2  = this.imgData2.data.faceOutputInfoList[this.currentCar2]
       this.feature2 = this.imgData2.data.faceOutputInfoList[this.currentCar2].feature
       this.drawCarInfo2(this.currentCar2);
       this.faceShow2(this.faceLyst2)
      }else{
        this.$notify({
          type:'warning',
          position:'bottom-right',
          message:'请先上传图片',
          duration:2000
        })
      }
    },


      // 选中的人脸在上方显示
    //   faceShow(lyst){
    //     this.isflag = true;
    //       this.$nextTick(() => {
    //         // 获取选中的人脸大小，然后对它进行一个计算，来自适应展示人脸区域
    //           let img = document.getElementById('imgItemsearch-show')    // 图片大小
    //           let imgBox = document.getElementById('Faceshow')   // 展示盒子的大小
    //           img.style.top = 0;
    //           img.style.left = 0;
    //           let leftTopX = lyst.facePos.leftTopX;
    //           let leftTopY = lyst.facePos.leftTopY;
    //           let rightBtmX =  lyst.facePos.rightBtmX;
    //           let rightBtmY = lyst.facePos.rightBtmY;
    //           let imgw = rightBtmX - leftTopX;
    //           let imgh = rightBtmY - leftTopY;
    //           let retw = imgBox.clientWidth;
    //           let reth = imgBox.clientHeight;
    //           let unit = 1;
    //           let posLeft = 0;
    //           let posTop = 0;
    //           let Width1 = lyst.width;
    //           let Height1 = lyst.hegiht;
    //           if (retw / reth < imgw / imgh) {
    //               unit = imgw / retw;
    //               posLeft = 0;
    //               posTop = (reth - imgh/unit)/2;
    //           }else {
    //               unit = imgh / reth;
    //               posTop = 0;
    //               posLeft = (retw - imgw/unit)/2;
    //           }
    //           // 设置展示人脸的各种样式
    //           img.style.width = (Width1 / unit )+"px";
    //           img.style.height = (Height1 / unit)+"px";
    //           img.style.top =(-(leftTopY / unit) + posTop) +"px";
    //           img.style.left = (-(leftTopX / unit) + posLeft )+"px";
    //       })
    //   },
    faceShow(lyst) {
        this.isflag = true;
        this.$nextTick(() => {
            // 获取选中的人脸大小，然后对它进行一个计算，来自适应展示人脸区域
            let img = document.getElementById('imgItemsearch-show') // 图片大小
            let imgBox = document.getElementById('Faceshow') // 展示盒子的大小
            img.style.top = 0;
            img.style.left = 0;
            let leftTopX = lyst.RegionLeft;
            let leftTopY = lyst.RegionTop;
            let imgw = lyst.RegionWidth;
            let imgh = lyst.RegionHeight;
            let retw = imgBox.clientWidth;
            let reth = imgBox.clientHeight;
            let unit = 1;
            let posLeft = 0;
            let posTop = 0;
            let Width1 = lyst.SrcImageWidth;
            let Height1 = lyst.SrcImageHeight;
            if (retw / reth < imgw / imgh) {
                unit = imgw / retw;
                posLeft = 0;
                posTop = (reth - imgh / unit) / 2;
            } else {
                unit = imgh / reth;
                posTop = 0;
                posLeft = (retw - imgw / unit) / 2;
            }
            // 设置展示人脸的各种样式
            img.style.width = (Width1 / unit) + "px";
            img.style.height = (Height1 / unit) + "px";
            img.style.top = (-(leftTopY / unit) + posTop) + "px";
            img.style.left = (-(leftTopX / unit) + posLeft) + "px";
        })
    },


      // secong选中的人脸在上方显示
       faceShow2(lyst2){
        this.isflag2 = true;
          this.$nextTick(() => {
              let img = document.getElementById("imgItemsearch-show2")    // 图片大小
              let imgBox = document.getElementById("Faceshow2")   // 展示盒子的大小
              img.style.top = 0;
              img.style.left = 0;
              let leftTopX = lyst2.facePos.leftTopX;
              let leftTopY = lyst2.facePos.leftTopY;
              let rightBtmX =  lyst2.facePos.rightBtmX;
              let rightBtmY = lyst2.facePos.rightBtmY;
              let imgw = rightBtmX - leftTopX;
              let imgh = rightBtmY - leftTopY;
              let retw = imgBox.clientWidth;
              let reth = imgBox.clientHeight;
              let unit2 = 1;
              let posLeft = 0;
              let posTop = 0;
              let Width1 = lyst2.width;
              let Height1 = lyst2.hegiht;
              if (retw / reth < imgw / imgh) {
                  unit2 = imgw / retw;
                  posLeft = 0;
                  posTop = (reth - imgh/unit2)/2;
              }else {
                  unit2 = imgh / reth;
                  posTop = 0;
                  posLeft = (retw - imgw/unit2)/2;
              }
              img.style.width = (Width1 / unit2 )+"px";
              img.style.height = (Height1 / unit2)+"px";
              img.style.top =(-(leftTopY / unit2) + posTop) +"px";
              img.style.left = (-(leftTopX / unit2) + posLeft )+"px";
          })
      },

      // 清空上传的图片
      clearPhoto(){
        // 清空图片地址
        this.imgUrl = '';
        // 清空展示人脸地址
        this.imgUrlFace = '';
        // 清空特征码
        this.feature1 = '';
        // 清空比对数据
        this.percentage = 0;

        this.currentPage = 1;
        this.pageSize = 12;
        this.newfaceList = []
        this.totalCount = 0;

        // 清空画框
        this.clearRect();




      },

      // 清空上传的图片
      clearPhoto2(){
        // 清空图片地址
        this.imgUrl2 = '';
         // 清空展示人脸地址
        this.imgUrlFace2 = '';
         // 清空特征码
        this.feature2 = '';
        // 清空比对数据
        this.percentage = 0,
        // 清空画框
        this.clearRect2()
      },

      // 人脸比对按钮
      faceAligement(){
        // 如果没有先上传两张图片，就给提示,return
        if(!this.imgUrlFace || !this.imgUrlFace2){
          this.$notify({
            type:'warning',
            message:'请分别上传两张人脸！',
            duration:'3000',
            position: 'bottom-right',
          })
          return
        }
        // 定义一个对象，保存两个特征码
        let data = {
          featrure1 : this.feature1,
          feature2 : this.feature2,
          featureType : 4,
        }
        data = this.$qs.stringify(data)
        this.$http.post("vsas/face/1v1",data).then(res=>{
         if(res.data.code == 200){
           console.log(typeof res.data.data,"jjjjjjjjjjjjjjj");
          //  if(res.data.data.typeof != Number){
          //    this.percentage = 0
          //  }else {
          //    this.percentage = Number(res.data.data);
          //  }
          this.percentage = res.data.data


          }else {
           this.$notify({
             type:"warning",
             message:"暂无结果！",
             duration:"2000",
             position:'bottom-right'
           })
           this.percentage = 0;
         };
        })
      }
  }
};
export default mixins
