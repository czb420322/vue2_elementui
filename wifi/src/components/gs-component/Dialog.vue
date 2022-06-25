<template>
  <el-dialog class='gs-dialog-wrapper' ref="gsDialogWrapper" :class='{small}' custom-class='gs-dialog' :width='width'
    :visible.sync='dialogVisible' v-bind="$attrs" @open='dialogOpenHandler' v-on='$listeners' :close-on-click-modal='closeOnClickModal'
    :modal-append-to-body='modalAppendToBody' :append-to-body='appendToBody' :show-close='showClose' :top='top'>
    <slot name="title" slot="title">
      <h1 class='gs-dialog-title'>{{title}}</h1>
      <i class='gs-dialog-corner-close el-icon-close' @click.stop='$emit("corner-close")'></i>
    </slot>
    <slot></slot>
    <slot name="footer" slot="footer"></slot>
  </el-dialog>
</template>

<script>
  import {
    throttle
  } from 'throttle-debounce'
  import {
    getStyle
  } from '@/utils/dom'
  import {
    addResizeListener,
    removeResizeListener
  } from '@/utils/resize-event'

  export default {
    name: 'Dialog',
    inheritAttrs: false,
    props: {
      small: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      },
      visible: {
        type: Boolean,
        default: false
      },
      modalAppendToBody: {
        type: Boolean,
        default: true
      },
      appendToBody: {
        type: Boolean,
        default: true
      },
      showClose: {
        type: Boolean,
        default: false
      },
      closeOnClickModal: {
        type: Boolean,
        default: false
      },
      top: {
        type: String,
        default: ''
      },
      width: {
        type: [String, Number],
        default: '9rem'
      },
      height: {
        type: [String, Number],
        default: '6.8rem'
      }
    },
    computed: {
      dialogVisible: {
        get() {
          return this.visible
        },
        set(currentVisible) {
          this.$emit('update:visible', currentVisible)
        }
      }
    },
    created() {
      this.throttle = throttle(300, this.refresh).bind(this)
      this.$nextTick(() => {
        let target = this.$refs.gsDialogWrapper.$el
        let dialog = target.querySelector('.gs-dialog')

        if (typeof this.height === 'string') {
          dialog.style.height = this.height
        } else {
          dialog.style.height = this.height + 'px'
        }

        let handler = e => {
          this.throttle()
          this.$emit('dialog-resize')
        }
        addResizeListener(target, handler)
        this.$once('hook:beforeDestroy', () => {
          removeResizeListener(target, handler)
        })

        this.refresh()
      })
    },
    methods: {
      dialogOpenHandler() {
        this.$nextTick(this.refresh)
      },
      refresh() {
        let dialogWrapper = this.$refs.gsDialogWrapper.$el
        let dialog = dialogWrapper.querySelector('.gs-dialog')
        let dialogHeader = dialogWrapper.querySelector('.el-dialog__header')
        let dialogBody = dialogWrapper.querySelector('.el-dialog__body')
        let dialogFooter = dialogWrapper.querySelector('.el-dialog__footer')


        let dialogHeight = dialog.clientHeight
        let dialogPaddingHeight = parseFloat(getStyle(dialog, 'paddingTop')) + parseFloat(getStyle(dialog,'paddingBottom'))
        let dialogHeaderHeight = dialogHeader.offsetHeight
        let dialogFooterHeight = 0
        if(dialogFooter) {
          dialogFooterHeight = dialogFooter.offsetHeight
        }


        let dialogHeaderMargin = 0
        dialogHeaderMargin += parseFloat(getStyle(dialogHeader, 'marginTop'))
        dialogHeaderMargin += parseFloat(getStyle(dialogHeader, 'marginBottom'))

        let dialogBodyMargin = 0
        dialogBodyMargin += parseFloat(getStyle(dialogBody, 'marginTop'))
        dialogBodyMargin += parseFloat(getStyle(dialogBody, 'marginBottom'))

        let dialogFooterMargin = 0
        if(dialogFooter) {
          dialogFooterMargin = 0
          dialogFooterMargin += parseFloat(getStyle(dialogFooter, 'marginTop'))
          dialogFooterMargin += parseFloat(getStyle(dialogFooter, 'marginBottom'))
        }

        dialogBody && (dialogBody.style.height = (dialogHeight - dialogPaddingHeight - dialogHeaderHeight -
        dialogHeaderMargin - dialogBodyMargin - dialogFooterHeight - dialogFooterMargin) + 'px')
      }
    }
  }

</script>

<style>
  .gs-dialog-wrapper {
    overflow: hidden;
  }

  .gs-dialog-wrapper .gs-dialog {
    width: 9rem;
    height: 6.8rem;
    position: absolute;
    top: 50%;
    right: auto;
    bottom: auto;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0 auto;
    background-color: transparent;
    font-size: 0.15rem
  }

  .gs-dialog-wrapper .el-dialog__header {
    position: relative;
    height: 34px;
    padding: 0;
    color: #5be2de;
    font-size: 0.15rem
  }

  .gs-dialog-wrapper .el-dialog__header .gs-dialog-title {
    position: absolute;
    top: 50%;
    left: 2%;
    transform: translateY(-50%);
    /* letter-spacing: 5px; */
    color: #fff;
    font-size: 0.16rem;
  }

   .gs-dialog-wrapper .el-dialog__header .gs-dialog-title .el-dialog__headerbtn {
     display: none;
   }

  .gs-dialog-wrapper .el-dialog__header .gs-dialog-corner-close {
    position: absolute;
    top: 50%;
    right: 20px;
    cursor: pointer;
    transform: translateY(-50%);
    color: #fff
  }

  .gs-dialog-wrapper .el-dialog__header

  .gs-dialog-wrapper .el-dialog__body {
    position: relative;
    padding: 16px;
    color: #5be2de;
  }

  .gs-dialog-wrapper .el-dialog__body .el-form {
    width: 80%;
    margin: 0 auto;
    overflow: hidden;
  }

  .gs-dialog-wrapper .el-dialog__body .el-table th,
  .el-table tr {
    background: transparent;
  }

  .gs-dialog-wrapper .el-dialog__body .el-table__empty-block {
    min-height: 3rem
  }

  .gs-dialog-wrapper .el-dialog__footer {
    position: relative;
    padding: 0.02rem 0.2rem;
  }

  .gs-dialog-wrapper .small .gs-dialog {
    background: red;
  }

  .gs-dialog-wrapper .small .gs-dialog .el-dialog__header {
    background: none;
  }

  .gs-dialog-wrapper .small .gs-dialog .el-dialog__header .gs-dialog-title {
    display: none;
  }

  .gs-dialog-wrapper .small .gs-dialog .el-dialog__body {
    background: none;
    padding: 10px 20px 30px;
  }
  .el-table>>>th {
  background: rgba(12, 68, 135, 0.4) !important;
}

.el-table>>>tr:nth-child(2n) {
  background: rgba(24, 39, 59, 0.5) !important
}

.gs-dialog-wrapper .el-dialog__body .el-table>>>th>.cell,
.el-table>>>.cell,
.titleColor {
  color: #99c9fa !important
}
.gs-dialog-wrapper .el-dialog__body .el-table .cell{
  text-align: center;
  color: #99c9fa !important
}

.gs-dialog-wrapper .el-dialog__body .el-table--border {
  border: 2px solid rgba(12, 68, 135, 0.3) !important;
}

.gs-dialog-wrapper .el-dialog__body .el-table--border td,
.el-table th.is-leaf {
  border: 1px solid rgba(12, 68, 135, 0.3) !important;
  background: rgba(24, 39, 59, 0.5) !important
}

.gs-dialog-wrapper .el-dialog__body .el-table--border th.gutter:last-of-type {
  border: 1px solid rgba(12, 68, 135, 0.3) !important;
}

.gs-dialog-wrapper .el-dialog__body .el-table--border::after,
.el-table--group::after,
.el-table::before {
  background-color: rgba(12, 68, 135, 0.3) !important;
}

.gs-dialog-wrapper .el-table td {
  padding: 0.07rem 0;
}

</style>
