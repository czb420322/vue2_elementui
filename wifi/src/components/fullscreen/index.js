/*
 * @Author: chenxf
 * @Date: 2020-05-17 16:47:05
 * @LastEditTime : 2020-11-30 15:37:38
 * @LastEditors  : Please set LastEditors
 * @Description:
 * @FilePath: \vacp-wfes\src\components\fullscreen\index.js
 * @
 */
import Vue from 'vue'

window.nowHight = 0
window.nowWidth = 0
window.nowMarginTop = 0
window.isFullScreen = false

Vue.directive('dialogFull', {
    bind(el, binding, vnode, oldVnode) {

        // 初始非全屏
        // let isFullScreen = false

        // 当前宽高
        // let nowHight = 0

        // let nowWidth = 0

        // 当前顶部高度
        // let nowMarginTop = 0

        // 获取弹层头部（双击全屏部分）
        const dialogHeaderEl = el.querySelector('.fullScreen')

        // 弹层
        const dragDom = el.querySelector('.el-dialog')

        // 给弹层加上overflow auto,不然缩小时框内标签可能超出dialog
        dragDom.style.overflow = 'auto'


        // 双击头部全屏效果
        dialogHeaderEl.onclick = (e) => {
            if(window.isFullScreen == false) {  //全屏
              dragDom.style.marginTop = '0vh !important'
              el.querySelector('.el-dialog__body').style.height = 'calc(100% - 0.81rem)'
              el.querySelector('.el-dialog__body').style.marginTop = 0
              window.nowHight = dragDom.clientHeight
              window.nowWidth = dragDom.clientWidth
              window.nowMarginTop = dragDom.style.marginTop
              dragDom.style.left = 0
              dragDom.style.top= 0
              dragDom.style.height = '100VH'
              dragDom.style.width = '100VW'
              dragDom.style.marginTop = 0
              window.isFullScreen = true
              dialogHeaderEl.onmousedown = null
              vnode.context.bigfullScreen = true
              if(dragDom.parentNode.classList[1] == 'globalSearch'){//表示是全局搜索的界面
                Array.from(document.getElementById('searchImgResult').children).forEach(item => {
                    item.style.width = '24%'
                });
                document.getElementById('searchTop1').style.height = '1.8rem'
                document.getElementById('searchTop2').style.height = 'calc(100% - 1.8rem)'
              }else if(dragDom.parentNode.classList[1] == 'bodyvideoStrus'){
                vnode.context.imgscale('.imgbox')
              }else if(dragDom.parentNode.classList[1] == 'detailRetervals'){
                // vnode.context.imgscale('.snapUrl')
              }
            } else {  //非全屏
              vnode.context.bigfullScreen = false
              if(dragDom.parentNode.classList[1] == 'detailRetervals'){
                document.getElementsByClassName('detailRetervals')[1].childNodes[0].childNodes[1].style.height = '7rem';
                // vnode.context.imgscale('.snapUrl')
              }else if(dragDom.parentNode.classList[1] == 'bodyvideoStrus'){
                if(document.getElementsByClassName('bodyvideoStrus')[1].childNodes[0].childNodes[1].style == undefined){
                  document.getElementsByClassName('bodyvideoStrus')[0].childNodes[0].childNodes[1].style.height = '7.5rem'
                }else if(document.getElementsByClassName('bodyvideoStrus')[0].childNodes[0].childNodes[1].style == undefined){
                  document.getElementsByClassName('bodyvideoStrus')[1].childNodes[0].childNodes[1].style.height = '7.5rem'
                }else{
                  document.getElementsByClassName('bodyvideoStrus')[0].childNodes[0].childNodes[1].style.height = '7.5rem'
                  document.getElementsByClassName('bodyvideoStrus')[1].childNodes[0].childNodes[1].style.height = '7.5rem'
                }
                vnode.context.imgscale('.imgbox')
              }else if(dragDom.parentNode.classList[1] == 'globalSearch'){
                dragDom.childNodes[1].style.height = '7.5rem'
                // document.getElementsByClassName('globalSearch')[0].childNodes[0].childNodes[1].style.height = '7.5rem'
                // vnode.context.imgscale('.imgurl')
                Array.from(document.getElementById('searchImgResult').children).forEach(item => {
                  item.style.width = '32%'
                });
                document.getElementById('searchTop1').style.height = '2.3rem'
                document.getElementById('searchTop2').style.height =  'calc(100% - 2.3rem)'
              }
              dragDom.style.height = 'auto'
              dragDom.style.width = window.nowWidth + 'px'
              dragDom.style.marginTop = window.nowMarginTop
              window.isFullScreen = false


            }
        }

    }

})
