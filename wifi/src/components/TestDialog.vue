<template>
  <gs-dialog title="测试全局弹层" @close='closeHandler' :visible.sync="isVisible" @corner-close="cancelHandler" @open='openHandler'>
    
  </gs-dialog>
</template>

<script>
  export default {
    name: 'TestDialog',
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        
      }
    },
    components: {
      
    },
    created() {},
    computed: {
      isVisible: {
        get() {
          return this.visible
        },
        set(visible) {
          this.$emit('update:visible', visible)
        }
      }
    },
    methods: {
      // 打开弹层
      openHandler() {
      },
      // 关闭弹层
      closeHandler() {
        this.isVisible = false
      },
      // 取消
      cancelHandler() {
        this.isVisible = false
      },

    }
  }

</script>

<style scoped>

</style>
