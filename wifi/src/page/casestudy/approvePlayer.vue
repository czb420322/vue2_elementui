<!--
 * @Author: your name
 * @Date: 2020-07-17 09:36:04
 * @LastEditTime: 2020-11-02 14:47:27
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.7-dev\vacp-wfes\src\page\casestudy\approvePlayer.vue
 -->
<template>
  <!--视频播放页面-->
  <div class="wrapper">
    <div class="topNav">
      <div class="nav-item">
        <router-link :to="{path:'/casestudy',query:{menuCode:200}}">案件库</router-link>
      </div>
      <div class="nav-item nav-item-front">
        <router-link :to="{path:'/casestudy/cascadeApprove',query:{menuCode:211}}">串并案审批</router-link>
      </div>
      <div class="nav-item nav-item-search">播放</div>
    </div>

    <div class="content">
      <div class="topTitle">
        <div
          style="width: 2px; height:18px;background-color: #0a83f1; margin-top:2px;margin-left: 20px;margin-right: 10px"></div>
        <div>比对播放</div>
      </div>

      <div class="contentBody">
        <div class="contentLeft">
          <div style="margin-top: 20px; padding-left: 30px;"><img style="margin-right: 10px"
                                                                  src="../../assets/case/playeList-icon.png"
                                                                  alt=""><span style="font-size: 14px;color: #429FFF">视频列表</span>
          </div>
          <div>
            <el-tree
              :data="data"
              :props="defaultProps"
              @node-click="handleNodeClick"
              default-expand-all
              check-strictly
              :expand-on-click-node='false'
              highlight-current="false"
            >
            </el-tree>
          </div>
        </div>
        <div class="contentRight">
          <div class="videoContainer">
            <div class="videoItemContent">
              <div class="videoItem"><img  style="width: 100%;height: 100%" src="../../assets/case/approveVideoItem.png" alt=""></div>
              <div class="videoItem"><img  style="width: 100%;height: 100%" src="../../assets/case/approveVideoItem.png" alt=""></div>
              <div class="videoItem"><img  style="width: 100%;height: 100%" src="../../assets/case/approveVideoItem.png" alt=""></div>
              <div class="videoItem"><img  style="width: 100%;height: 100%" src="../../assets/case/approveVideoItem.png" alt=""></div>

            </div>
            <div class="videoItemFooter">
              <div style="display: flex;margin-right: 10px;" >
              <div  class="btnSure">确认审批</div>
              <div class="btnBack">返回上一页</div>
              </div>
            </div>
          </div>
          <div class="footer">
            <img src="../../assets/copy.jpg"/>武汉大千信息技术有限公司&copy;版权所有 2008-<span>{{ new Date().getFullYear() }}</span>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<script>

  export default {
    components: {},
    data() {
      return {
        data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
          }, {
            label: '二级 1-2',
          }
            , {
              label: '二级 1-3',
            }
            , {
              label: '二级 1-4',
            }
            , {
              label: '二级 1-5',
            }
            , {
              label: '二级 1-6',
            }]
        }, {
          label: '一级 1',
          children: [{
            label: '二级 1-1',
          }, {
            label: '二级 1-2',
          }
            , {
              label: '二级 1-3',
            }
            , {
              label: '二级 1-4',
            }
            , {
              label: '二级 1-5',
            }
            , {
              label: '二级 1-6',
            }]
        },
          {
            label: '一级 1',
            children: [{
              label: '二级 1-1',
            }, {
              label: '二级 1-2',
            }
              , {
                label: '二级 1-3',
              }
              , {
                label: '二级 1-4',
              }
              , {
                label: '二级 1-5',
              }
              , {
                label: '二级 1-6',
              }]
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }


    },

    methods: {
      handleNodeClick(data) {
        console.log(data, '树,数据');
      },
      changeTreeListStyle() {
        let node = document.getElementsByClassName("el-tree-node__content")
        for (i = 0; i < node.length; i++) {
          node[i].style.paddingLeft = '30px'
        }
      },
    },
    mounted: function () {
      let _this = this;
      _this.changeTreeListStyle()
    }

  }
</script>


<style scoped>
  @import '../../assets/css/global.css';

  select {
    width: 69%;
    height: 28px;
    border: 1px solid #E6E8ED;
    padding-left: 5px;
  }

  input {
    width: 6rem;
    height: 28px;
    border: 1px solid #E6E8ED;
    padding-left: 5px;
  }

  textarea {
    border: 1px solid #E6E8ED;
    resize: none
  }

  input:focus {
    border: 1px solid #409EFF;
  }

  .wrapper {
    position: absolute;
    width: 100%;
    top: 0.6rem;
    height: calc(100% - 0.6rem);
    box-sizing: border-box;
    user-select: none;
    overflow: hidden;
    background-color: #FFFFFF;
  }

  .topNav {
    height: 0.54rem;
    background-color: #FFFFFF;
    width: 100%;
    border-bottom: 2px solid #E2E3E3;
  }

  .nav-item {
    display: inline-block;
    height: 0.54rem;
    width: 100px;
    line-height: 0.54rem;
    text-align: center;
    font-size: 18px;
  }

  .itemIcon img {
    width: 100%;
    height: 100%;
  }

  .content {
    height: calc(100% - 0.54rem - 20px);
    position: relative;
    width: calc(100% - 30px);
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    border: 1px solid #ECF0F3;
  }

  .nav-item-front {
    height: 100%;
    width: 162px;
    background: url(../../assets/images/sysmanage/bg-02.png);
    text-align: center;
    background-size: 100% 100%;
    margin-left: -10px;
  }

  table {
    width: calc(100% - 40px);
    text-align: center;
    border-collapse: collapse;;
    font-size: 14px;
    color: #606266;
    -webkit-border-horizontal-spacing: 0px;
    -webkit-border-vertical-spacing: 0px;
    border-top-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 0px;
    border-left-width: 0px;
    border-color: grey;
    margin-bottom: 10px;
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
  }

  thead {
    border: 1px solid #ebeef5;
    color: #909399;
    font-size: 15px;
    font-weight: 500;
    text-align: center;
  }

  tr:hover {
    background-color: #ECF5FF;
  }

  td {
    border: 1px solid #ebeef5;
    box-sizing: border-box;
    white-space: normal;
    word-break: break-all;
    line-height: 30px;
  }

  th {
    display: table-cell;
    border-right: 1px solid #ebeef5;
    white-space: nowrap;
    overflow: hidden;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding: 12px 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
    background-color: #EEF2F5;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    color: #767778;
  }

  tr:nth-child(odd) {
    background-color: #F6F8F9;
  }

  .footer {
    width: 100%;
    font-size: 0.14rem;
    color: #909399;
    text-align: center;
    position: absolute;
    bottom: 20px;
  }

  .footer img {
    margin-right: 0.05rem;
  }

  .nav-item {
    display: inline-block;
    height: 0.54rem;
    width: 140px;
    line-height: 0.54rem;
    text-align: center;
    font-size: 18px;
  }

  .nav-item-search {
    height: 100%;
    width: 154px;
    background: url(../../assets/images/sysmanage/bg.png);
    color: #63abfe;
    text-align: center;
    background-size: 100% 100%;
    margin-left: -12px;
  }

  .topTitle {
    width: 100%;
    display: flex;
    height: 36px;
    background-color: #ECF0F3;
    align-items: center;
  }

  .contentBody {
    width: 100%;
    height: calc(100% - 36px);
    display: flex;
  }

  .contentLeft {
    width: 250px;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: #F6F6F6;
    height: calc(100% - 20px);
    display: flex;
    flex-direction: column;
    border: 1px solid #E1E2E2;
  }

  .contentRight {
    width: calc(100% - 250px);
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .contentLeft >>> .el-tree {
    background: #F6F6F6;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .contentLeft >>> .el-tree-node__content {
    padding-left: 20px !important;
  }

  .contentLeft >>> .el-tree-node__content:hover {
    background-color: #E0EEFB;
  }

  .contentLeft >>> .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
    background-color: rgba(49,86,131,.2);
    border-left: 2px solid #58A9FF;
    /*color:#58A9FF;*/
  }

  .contentLeft >>> .el-tree-node__label:before {
    /*content:url(../../assets/case/tresList-icon2.ico);*/
    content: url(../../assets/case/treeList-icon.png);
    margin-right: 7px;
  }

  .videoContainer {
    width: calc(100% - 60px);
    height: calc(100% - 70px);
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 10px;
    border: 1px solid #E1E2E2;
    background-color: #F9FAFB;
    display: flex;
    flex-direction: column;
  }

  .videoItemContent {
    width: calc(100% - 80px);
    height: calc(100% - 70px);
    margin-left: 40px;
    margin-right: 40px;
    margin-top: 10px;
  }
  .videoItem{
    width:calc(50% - 10px);
    height:calc(50% - 10px);
    margin:3px;
    float: left;
  }
  .videoItemFooter{
    width: 100%;
    height: 60px;
    background-color: #ECF0F3;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .btnSure{
    width: 100px;
    height: 30px;
    display: flex;
    text-align: center;
    justify-content: center;
    border-radius: 3px;
    background-color: #67C23A;
    color: white;
    font-size: 14px;
    line-height: 30px;
    margin-right: 15px;
    cursor: pointer;
  }
  .btnBack{
    width: 100px;
    height: 30px;
    display: flex;
    line-height: 30px;
    text-align: center;
    justify-content: center;
    border-radius: 3px;
    background-color: #409EFF;
    color: white;
    font-size: 14px;
    margin-left: 15px;
    cursor: pointer;
  }
</style>

