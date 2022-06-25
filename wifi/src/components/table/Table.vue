<template>
  <article
    class='gs-table-wrapper'
    :class='{"not-ie": this.isNotIE}'
  >
    <el-table
      ref="gsTable"
      v-bind="$attrs"
      v-on='$listeners'
      :border='border'
      :max-height='height'
      @header-dragend='headerDragendHandler'
      highlight-current-row
    >
    <div slot="empty">
        <div class="noImg" :isShowNoImg="isShowNoImg">
          <img src="../../assets/updataImg/NoData.png" />
        </div>
    </div>
      <slot></slot>
    </el-table>
  </article>
</template>

<script>
import BScroll from 'better-scroll'
import { addResizeListener, removeResizeListener } from '@/utils/resize-event'

export default {
  name: 'Table',
  inheritAttrs: false,
  props: {
    border: {
      type: Boolean,
      default: true
    },
    maxHeight: {
      type: [Number, String],
      default: 220
    },
    isShowNoImg: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      height: this.maxHeight
    }
  },
  created () {
    try {
      this.isNotIE = !(/Trident/gi.test(window.navigator.userAgent) || /MSIE/gi.test(window.navigator.userAgent))
    } catch (e) {
      this.isNotIE = true
    }

    this.initialize()
  },
  beforeUpdate () {
    this.refreshTable()
  },
  methods: {
    async getTable () {
      return this.$refs.gsTable
    },
    headerDragendHandler (newWidth, oldWidth, column, event) {
      this.refreshTable()
    },
    initialize () {
      this.$nextTick(() => {
        let target = this.$el
        let handler = e => {
          this.height = target.clientHeight
          this.refreshTable()
        }
        handler()

        addResizeListener(target, handler)

        this.$once('hook:beforeDestroy', () => {
          removeResizeListener(target, handler)
          // this.headScroll.destroy()
          // this.bodyScroll.destroy()
        })

        // this.initScroll()
      })
    },
    initScroll () {
      // let headTarget = window.document.querySelector('.el-table__header-wrapper')
      // let bodyTarget = window.document.querySelector('.el-table__body-wrapper')

      let headTarget = this.$el.querySelector('.el-table__header-wrapper')
      let bodyTarget = this.$el.querySelector('.el-table__body-wrapper')

      this.headScroll = new BScroll(headTarget, {
        scrollX: true,
        scrollY: false,
        bounce: false,
        probeType: 3,
        mouseWheel: true,
        preventDefault: false
      })

      this.bodyScroll = new BScroll(bodyTarget, {
        scrollX: true,
        scrollY: true,
        bounce: false,
        freeScroll: true,
        probeType: 3,
        // eventPassthrough: 'horizontal',
        mouseWheel: true,
        scrollbar: {
          interactive: true
        },
        preventDefault: false
      })

      this.scrollX = 0
      this.scrollY = 0

      this.headScroll.on('scroll', ({ x, y }) => {
        if (this.scrollX !== x) {
          this.scrollX = x
          this.bodyScroll.scrollTo(x, this.scrollY)
        }
      })

      this.bodyScroll.on('scroll', ({ x, y }) => {
        if (this.scrollX !== x) {
          this.scrollX = x
          this.scrollY = y
          this.headScroll.scrollTo(x, 0)
        }
      })
    },
    refreshTable () {
      if (this.headScroll) {
        this.$nextTick(() => {
          this.headScroll.refresh()
          this.bodyScroll.refresh()
          this.$refs.gsTable.doLayout()
        })
      }
    }
  }
}
</script>

<style scoped>
  .not-ie th.gutter:last-of-type{
      display: none !important;
  }
  .gs-table-wrapper {
    margin: 5px 5px 0;
  }
  .gs-table-wrapper .el-table {
      min-height: 100%;
      background-color: transparent;
      max-height: inherit !important;
  }
  .gs-table-wrapper .el-table tr, th {
    background-color: red;
  }
  .gs-table-wrapper .el-table .el-table__header-wrapper {
      font-size: 20px;
      overflow: hidden;
  }
  .gs-table-wrapper /deep/ .el-table .el-table__header-wrapper .el-table__header {
    background: rgba(12, 68, 135, 0.4) !important
  }
  .gs-table-wrapper .el-table .el-table__body-wrapper {
      font-size: 18px;
      overflow: hidden;
  }
  .gs-table-wrapper .el-table .el-table__body-wrapper .el-table__body .el-table__row:hover, .current-row {
    color: #051d42;
  }
  .gs-table-wrapper .el-table .el-table__footer-wrapper {
    font-size: 18px;
  }

  .el-table--striped .el-table__body tr.el-table__row--striped td {
    background-color: #0a396a;
  }

  .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #7fbbf8;
  }
  .gs-table-wrapper /deep/ .el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar {
    width: 6px
  }
  .gs-table-wrapper /deep/ .el-table--scrollable-x .el-table__body-wrapper::-webkit-scrollbar {
    height: 6px
  }
   .gs-table-wrapper /deep/ .el-table::before {
     z-index: 0
   }
</style>
