<template>
 <div class="videocom">
   <div class="top">
      <span>视频设备：</span>
      <input type="text" placeholder="请输入关口名称或者关键字搜索"><i class="el-icon-search">检索</i>
   </div >
   <div class="trees">
      <el-tree
      :data="data2"
      show-checkbox
      node-key="id"
      :props="defaultProps"
      >
    </el-tree>
   </div>

 </div>
</template>

<script>
export default {
  data() {
    return {
      //测试地方数据
      data2: [
        {
          id: 1,
          label: "贵阳市",
          children: [
            {
              id: 4,
              label: "乌当区(1234/1300)",
              children: [
                {
                  id: 9,
                  label: "关山大道口之雄楚大道"
                },
                {
                  id: 10,
                  label: "关山大道口之雄楚大道"
                }
              ]
            },
            {
              id: 5,
              label: "武昌区",
              children: [
                {
                  id: 8,
                  label: "关山大道口之雄楚大道"
                },
                {
                  id: 11,
                  label: "关山大道口之雄楚大道"
                }
              ]
            },
            {
              id: 3,
              label: "汉阳区",
              children: [
                {
                  id: 6,
                  label: "关山大道口之雄楚大道"
                },
                {
                  id: 7,
                  label: "关山大道口之雄楚大道"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  components: {}
};
</script>

<style scoped>

.videocom {
  padding: 0.1rem;
  height: 100%;
}
.top {
  position: relative;
  top: 0;
  height: 0.3rem;
}
.top span {
  width: 0.8rem;
  font-size: 0.14rem;
  line-height: 0.3rem;
}
.top input {
  box-sizing: border-box;
  height: 0.3rem;
  width: 3.1rem;
  padding-left: 0.1rem;
  font-size: 0.12rem;
  vertical-align: bottom;
}
.top  i {
  width: 0.6rem;
  font-size: 0.12rem;
  color: #fff;
  text-align: center;
  line-height: 0.3rem;
  position: absolute;
  top: 0px;
  left: 3.4rem;
  background-color: #66b1ff;
}
.videocom .trees {
  margin-top: 0.2rem;
  height: calc(100% - 0.5rem);
  overflow: auto;
}
</style>

