<template>
  <section class="gs-column-container" ref='gsColumnContainer'>
    <slot name="gsLeft"></slot>
    <slot name="gsMain"></slot>
    <slot name="gsRight"></slot>
    <div class="gs-column-default-slot">
      <slot></slot>
    </div>
  </section>
</template>

<script>
import { throttle } from 'throttle-debounce'
import { getStyle, addClass } from '@/utils/dom'
import { addResizeListener, removeResizeListener } from '@/utils/resize-event'

// 同时以指令形式注册
import Vue from 'vue'
import VColumn from './Column.js'

Vue.directive('Column', VColumn)

export default {
  name: 'Column',
  created () {
    this.throttle = throttle(300, this.calculate).bind(this)
    this.throttle = this.calculate.bind(this)
    this.$nextTick(() => {
      this.calculate()
      this.monitorResize()
    })
  },
  methods: {
    monitorResize () {
      let target = this.$refs.gsColumnContainer

      if (!target) return

      let left = this.$slots.gsLeft
      let main = this.$slots.gsMain
      let right = this.$slots.gsRight

      let handler = null

      let createHandler = slot => e => {
        this.throttle()
        this.$emit(`${slot}-resize`)
      }

      handler = createHandler('column')
      addResizeListener(target, handler)
      this.$once('hook:beforeDestroy', () => {
        removeResizeListener(target, handler)
      })

      if (left) {
        target = left[0].elm
        handler = createHandler('gsLeft')
        addResizeListener(target, handler)
        this.$once('hook:beforeDestroy', () => {
          removeResizeListener(target, handler)
        })
      }

      if (main) {
        target = main[0].elm
        handler = createHandler('gsMain')
        addResizeListener(target, handler)
        this.$once('hook:beforeDestroy', () => {
          removeResizeListener(target, handler)
        })
      }

      if (right) {
        target = right[0].elm
        handler = createHandler('gsRight')
        addResizeListener(target, handler)
        this.$once('hook:beforeDestroy', () => {
          removeResizeListener(target, handler)
        })
      }
    },
    calculate () {
      let columnContainer = this.$refs.gsColumnContainer

      if (!columnContainer) return

      let left = this.$slots.gsLeft
      let main = this.$slots.gsMain
      let right = this.$slots.gsRight

      let columnContainerWidth = columnContainer.clientWidth
      let columnPaddingWidth = parseFloat(getStyle(columnContainer, 'paddingLeft')) + parseFloat(getStyle(columnContainer, 'paddingRight'))
      let leftWidth = 0
      let leftMargin = 0
      // let mainWidth = 0
      let mainMargin = 0
      let rightWidth = 0
      let rightMargin = 0

      if (left) {
        left = left[0].elm
        addClass(left, 'gs-column-left')
        leftWidth = left.offsetWidth
        leftMargin += parseFloat(getStyle(left, 'marginLeft'))
        leftMargin += parseFloat(getStyle(left, 'marginRight'))
        left.style.float = 'left'
      }

      if (main) {
        main = main[0].elm
        addClass(main, 'gs-column-main')
        // mainWidth = main.offsetWidth
        mainMargin += parseFloat(getStyle(main, 'marginLeft'))
        mainMargin += parseFloat(getStyle(main, 'marginRight'))
      }

      if (right) {
        right = right[0].elm
        addClass(right, 'gs-column-right')
        rightWidth = right.offsetWidth
        rightMargin += parseFloat(getStyle(right, 'marginLeft'))
        rightMargin += parseFloat(getStyle(right, 'marginRight'))
        right.style.float = 'right'
      }

      main && (main.style.width = (columnContainerWidth - columnPaddingWidth - leftWidth - leftMargin - mainMargin - rightWidth - rightMargin - 1) + 'px')
    }
  }
}
</script>

<style scoped>
.gs-column-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  zoom: 1;
}
.gs-column-container > *, .gs-column-left, .gs-column-main, .gs-column-right {
  display: inline-block;
  overflow: hidden;
}

.gs-column-container .gs-column-default-slot {
  position: relative;
  width: 0 !important;
  height: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
  overflow: hidden !important;
}
</style>
