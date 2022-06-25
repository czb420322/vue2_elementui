<template>
  <section class="gs-panel-container" ref='gsPanelContainer'>
    <slot name="gsHeader"></slot>
    <slot name="gsMain"></slot>
    <slot name="gsFooter"></slot>
    <div class="gs-panel-default-slot">
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
import VPanel from './Panel.js'

Vue.directive('Panel', VPanel)

export default {
  name: 'Panel',
  created () {
    this.throttle = throttle(300, this.calculate).bind(this)
    this.throttle = this.calculate.bind(this)
    this.$nextTick().then(vm => {
      this.calculate()
      this.monitorResize()
    })
  },
  beforeUpdate () {
    this.throttle()
  },
  methods: {
    monitorResize () {
      let target = this.$refs.gsPanelContainer

      if (!target) return

      let header = this.$slots.gsHeader
      let main = this.$slots.gsMain
      let footer = this.$slots.gsFooter

      let handler = null

      let createHandler = slot => e => {
        this.throttle()
        this.$emit(`${slot}-resize`)
      }

      handler = createHandler('panel')
      addResizeListener(target, handler)
      this.$once('hook:beforeDestroy', () => {
        removeResizeListener(target, handler)
      })

      if (header) {
        target = header[0].elm
        handler = createHandler('gsHeader')
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

      if (footer) {
        target = footer[0].elm
        handler = createHandler('gsFooter')
        addResizeListener(target, handler)
        this.$once('hook:beforeDestroy', () => {
          removeResizeListener(target, handler)
        })
      }
    },
    calculate () {
      this.$nextTick(() => {
        let panelContainer = this.$refs.gsPanelContainer

        if (!panelContainer) return

        let header = this.$slots.gsHeader
        let main = this.$slots.gsMain
        let footer = this.$slots.gsFooter

        let panelContainerHeight = panelContainer.clientHeight
        let panelPaddingHeight = parseFloat(getStyle(panelContainer, 'paddingTop')) + parseFloat(getStyle(panelContainer, 'paddingBottom'))
        let headerHeight = 0
        let headerMargin = 0
        // let mainHeight = 0
        let mainMargin = 0
        let footerHeight = 0
        let footerMargin = 0

        if (header) {
          header = header[0].elm
          addClass(header, 'gs-panel-header')
          headerHeight = header.offsetHeight
          headerMargin += parseFloat(getStyle(header, 'marginTop'))
          headerMargin += parseFloat(getStyle(header, 'marginBottom'))
        }

        if (main) {
          main = main[0].elm
          addClass(main, 'gs-panel-main')
          // mainHeight = main.offsetHeight
          mainMargin += parseFloat(getStyle(main, 'marginTop'))
          mainMargin += parseFloat(getStyle(main, 'marginBottom'))
        }

        if (footer) {
          footer = footer[0].elm
          addClass(footer, 'gs-panel-footer')
          footerHeight = footer.offsetHeight
          footerMargin += parseFloat(getStyle(footer, 'marginTop'))
          footerMargin += parseFloat(getStyle(footer, 'marginBottom'))
        }

        main && (main.style.height = (panelContainerHeight - panelPaddingHeight - headerHeight - headerMargin - mainMargin - footerHeight - footerMargin - 1) + 'px')
      })
    }
  }
}
</script>

<style scoped>
  .gs-panel-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .gs-panel-container > *, .gs-panel-header, .gs-panel-main, .gs-panel-footer {
    overflow: hidden;
  }
  .gs-panel-container .gs-panel-default-slot {
      position: relative;
      width: 0 !important;
      height: 0 !important;
      padding: 0 !important;
      margin: 0 !important;
      overflow: hidden !important;
    }
</style>
