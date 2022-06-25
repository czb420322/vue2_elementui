const mixins = {
  data: function () {
    return {

    }
  },
  methods: {
     get(){
       this.$notify({
         type: 'success',
         message: '标注删除成功！',
         position: 'bottom-right',
         duration: 3000
       });
       this.$notify({
         type: 'error',
         message: '标注删除成功！',
         position: 'bottom-right',
         duration: 3000
       });
       this.$notify({
         type: 'warning',
         message: '标注删除成功！',
         position: 'bottom-right',
         duration: 3000
       });
       this.$myconfirm({
           type: '提示',
           msg: '服务器异常',
           icon: 1,
           btn: {
             ok: '确定',
             no: '取消'
           }
         }).then(() => {
           console.log(yes);
         })
         .catch(() => {
           console.log('no')
         })
     }
  }
};
export default mixins
