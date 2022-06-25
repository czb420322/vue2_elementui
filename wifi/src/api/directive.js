import Vue from 'vue'
// v-dialogDrag: 弹窗拖拽属性
Vue.directive('dialogDrag', {
    bind(el, binding, vnode, oldVnode) {
        const dialogHeaderEl = el.querySelector('.el-dialog__header');
        const dragDom = el.querySelector('.el-dialog');
        //dialogHeaderEl.style.cursor = 'move';
        dialogHeaderEl.style.cssText += ';cursor:move;'
        dragDom.style.cssText += ';top:0px;'

        // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
        const sty = (function() {
                if (window.document.currentStyle) {
                        return (dom, attr) => dom.currentStyle[attr];
                } else{
                        return (dom, attr) => getComputedStyle(dom, false)[attr];
                }
        })()

        dialogHeaderEl.onmousedown = (e) => {
            // 鼠标按下，计算当前元素距离可视区的距离
            const disX = e.clientX - dialogHeaderEl.offsetLeft;
            const disY = e.clientY - dialogHeaderEl.offsetTop;

            const screenWidth = document.body.clientWidth; // body当前宽度
                const screenHeight = document.documentElement.clientHeight; // 可见区域高度(应为body高度，可某些环境下无法获取)

                const dragDomWidth = dragDom.offsetWidth; // 对话框宽度
                const dragDomheight = dragDom.offsetHeight; // 对话框高度

                const minDragDomLeft = dragDom.offsetLeft;
                const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth;

                const minDragDomTop = dragDom.offsetTop;
                const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight;


            // 获取到的值带px 正则匹配替换
            let styL = sty(dragDom, 'left');
            let styT = sty(dragDom, 'top');

            // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
            if(styL.includes('%')) {
                styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100);
                styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100);
            }else {
                styL = +styL.replace(/\px/g, '');
                styT = +styT.replace(/\px/g, '');
            };

            document.onmousemove = function (e) {
                // 通过事件委托，计算移动的距离
                                let left = e.clientX - disX;
                                let top = e.clientY - disY;

                                // 边界处理
                                if (-(left) > minDragDomLeft) {
                                        left = -(minDragDomLeft);
                                } else if (left > maxDragDomLeft) {
                                        left = maxDragDomLeft;
                                }

                                if (-(top) > minDragDomTop) {
                                        top = -(minDragDomTop);
                                } else if (top > maxDragDomTop) {
                                        top = maxDragDomTop;
                                }

                // 移动当前元素
                                dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`;
            };

            document.onmouseup = function (e) {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }
    }
})
//防止元素重复点击
Vue.directive('preventReClick', {
  inserted (el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 2000)
      }
    })
  }
})
// 注册el-table 滚动条事件的全局组件
Vue.directive('tabelLoadmore', {
  bind(el, binding) {
    const SELECTWRAP_DOM = el.querySelector('.el-table__body-wrapper');
    SELECTWRAP_DOM.addEventListener('scroll', function () {
      let sign = 80; // 定义默认的向上滚于乡下滚的边界
      const CONDITION = ((this.scrollHeight - this.scrollTop === this.clientHeight) &&
        this.scrollTop > sign) // 注意: && this.scrollTop
      if (this.scrollTop > sign) {
        sign = this.scrollTop;
      }
      if (this.scrollTop < sign) {
        sign = this.scrollTop;
      }

      if (CONDITION) {
        binding.value();
      }
    });
  }
})
// 防重复点击
Vue.directive('noMoreClick', {
  inserted(el, binding) {
    el.addEventListener('click', e => {
      el.classList.add('is-disabled');
      el.disabled = true;
      setTimeout(() => {
        el.disabled = false;
        el.classList.remove('is-disabled');
      }, 2000)
    })
  }
});


