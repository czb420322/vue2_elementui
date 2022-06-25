/*
 * @Author: chenxf
 * @Date: 2020-05-17 16:45:19
 * @LastEditTime : 2020-09-03 16:31:32
 * @LastEditors  : Please set LastEditors
 * @Description:
 * @FilePath: \vacp-wfes\src\api\common\scale.js
 * @
 */
const mixins = {
    data: function () {
        return {
            isimg: false
        }
    },
    methods: {
        //获取图片的宽高
        getscale(id) {
            this.$nextTick(() => {
                // setTimeout(()=>{
                let imgList = document.querySelectorAll(id);
                // 获取父元素宽高
                let parentWh = imgList[0].parentNode;
                let wid = this.getWidHei(parentWh, 'width');
                let hei = this.getWidHei(parentWh, 'height');
                this.AutoSize(imgList, wid, hei);
            })
        },
        AutoSize(listImg, maxWidth, maxHeight) {
            //原图片原始地址（用于获取原图片的真实宽高，当<img>标签指定了宽、高时不受影响）

            // setTimeout(()=>{
            for (let i = 0; i < listImg.length; i++) {
                let image = new Image();
                // 获取每一个图片的宽高
                image.onload = () => {
                    if (maxWidth / maxHeight <= image.width / image.height) {
                        listImg[i].width = maxWidth; //以框的宽度为标准
                        listImg[i].height = maxWidth * (image.height / image.width);
                    } else {
                        listImg[i].width = maxHeight * (image.width / image.height);
                        listImg[i].height = maxHeight; //以框的高度为标准
                    }
                }
                image.src = listImg[i].src;
            }
            this.isimg = true

        },
        imgscale(id) {
            this.getscale(id);
        },
        // 考虑 IE 的兼容性
        getStyle(el) {
            if (window.getComputedStyle) {
                return window.getComputedStyle(el, null);
            } else {
                return el.currentStyle;
            }
        },
        // 通过当前元素获取宽高
        getWidHei(el, name) {
            let val = name === "width" ? el.clientWidth : el.clientHeight,
                which = name === "width" ? ["Left", "Right"] : ["Top", "Bottom"];
            // display is none
            if (val === 0) {
                return 0;
            }
            let style = this.getStyle(el);
            // 左右或上下两边的都减去
            for (let i = 0, a;
                (a = which[i++]);) {
                val -= parseFloat(style["border" + a + "Width"]) || 0;
                val -= parseFloat(style["padding" + a]) || 0;
            }
            return val;
        },

    }
};
export default mixins
