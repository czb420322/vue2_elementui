<template>
  <div class="wrapper">
    <div class="topNav">
      <router-link to="/casestudy?menuCode=200" class="nav-item">案件库</router-link>
      <div class="nav-item nav-item-search">以图搜案事件</div>
    </div>

    <div class="contentBody">
      <div class="contentLeft">
        <div class="clItem cli1">
          <div class="searchTitle">| 以图搜案事件</div>
          <ul class="searchCondition">
            <li class="conditionInput">车辆输入条件</li>
            <li class="searchImg" style="padding-left: 0.05rem;">
              <div id="search">
                <img id="sss" :src="imgUrlShow" alt="">
              </div>
              <p v-show="uploadBtn" @click="openUpload();clearall()">上传图片</p>
            </li>

            <li style="display: flex;flex-direction: column;width: 100% !important;padding-left: 5px;">
              <div style="width: 100% !important;position: relative"><span style="color:red;width: 5px">*</span><span
                style="width: 60px;text-align: left">案发时间:  </span> <input type="text" style="width: calc(100% - 85px);"
                                                                           id="beginDateTime" placeholder="请选择开始时间"> <i
                style="position:relative;right: 0.24rem;width: 10px;" class="el-icon-circle-close"></i></div>
              <div style="width: 100% !important;margin-top: 20px;position: relative"><span
                style="width: 65px; visibility: hidden">*案发时间: </span> <input type="text"
                                                                              style=" width: calc(100% - 85px)"
                                                                              id="endDateTime" placeholder="请选择结束时间"><i
                style="position:relative;right: 0.2rem;width: 10px;" class="el-icon-circle-close"></i></div>
            </li>
            <li style="line-height: 0.16rem">
              <span class="identifyResult">&nbsp;&nbsp;识别结果:</span>
            </li>
            <li>
              <div v-show="cpShow" style="display: flex;padding-left: 40px;">
                <div style="display: flex;flex-direction: column">
                  <div><span>目标类型: </span><b> {{cpData.traceTypeName}}</b></div>
                  <div><span>年&nbsp;&nbsp;龄&nbsp;段: </span><b> {{cpData.age_type}}</b></div>
                  <div><span>包&nbsp;&nbsp;款&nbsp;式: </span><b> {{cpData.bag_type}}</b></div>
                  <div><span>包&nbsp;&nbsp;颜&nbsp;色:</span><b> {{cpData.bagcolor_type}}</b></div>
                  <div><span>车&nbsp;&nbsp;颜&nbsp;色:</span><b> {{cpData.carcolor_type}}</b></div>
                  <div><span>是否携物:</span><b> {{cpData.carrying_type}}</b></div>
                  <div><span>下衣类型:</span><b> {{cpData.down_type}}</b></div>
                  <div><span>下衣颜色:</span><b> {{cpData.downcolor_type}}</b></div>
                  <div><span>骑车人数:</span><b> {{cpData.driver_count}}</b></div>
                  <div><span>眼部特征:</span><b> {{cpData.eye_part}}</b></div>
                  <div><span>发&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型:</span><b> {{cpData.head_type}}</b></div>
                </div>
                <div style="display: flex;flex-direction: column">
                  <div><span>嘴部特征:</span><b>{{cpData.mouth_part}}</b></div>
                  <div><span>种&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族:</span><b>{{cpData.nation_type}}</b></div>
                  <div><span>围&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;脖:</span><b>{{cpData.scarf}}</b></div>
                  <div><span>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别:</span><b>{{cpData.sex_type}}</b></div>
                  <div><span>体&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态:</span><b>{{cpData.shape_type}}</b></div>
                  <div><span>是否打伞:</span><b>{{cpData.umbrella_flag}}</b></div>
                  <div><span>上衣款式:</span><b>{{cpData.up_type}}</b></div>
                  <div><span>上衣颜色:</span><b>{{cpData.upcolor_type}}</b></div>
                  <div><span>上衣纹理:</span><b>{{cpData.uptext_type}}</b></div>
                  <div><span>朝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;向:</span><b>{{cpData.view_type}}</b></div>
                </div>
              </div>
              <div v-show="personShow" style="display: flex;padding-left: 40px;">

                <div style="display: flex;flex-direction: column;width: 50%;align-items: flex-start">
                  <div><span>目标类型:</span><b>{{personData.traceTypeName}}</b></div>
                  <div><span>年&nbsp;&nbsp;龄&nbsp;段:</span><b>{{personData.age_type}}</b></div>
                  <div><span>包&nbsp;&nbsp;款&nbsp;式:</span><b>{{personData.bag_type}}</b></div>
                  <div><span>包&nbsp;&nbsp;颜&nbsp;色:</span><b>{{personData.bagcolor_type}}</b></div>
                  <div><span>是否携物:</span><b>{{personData.carrying_type}}</b></div>
                  <div><span>下衣类型:</span><b>{{personData.down_type}}</b></div>
                  <div><span>下衣颜色:</span><b>{{personData.downcolor_type}}</b></div>
                  <div><span>发&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型:</span><b>{{personData.head_type}}</b></div>
                  <div><span>头发颜色:</span><b>{{personData.headcolor_type}}</b></div>

                </div>
                <div style="display: flex;flex-direction: column;width: 50%">
                  <div><span>种&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族:</span><b>{{personData.nation_type}}</b></div>
                  <div><span>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别:</span><b>{{personData.sex_type}}</b></div>
                  <div><span>体&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态:</span><b>{{personData.shape_type}}</b></div>
                  <div><span>鞋子款式:</span><b>{{personData.shoe_type}}</b></div>
                  <div><span>鞋子颜色:</span><b>{{personData.shoecolor_type}}</b></div>
                  <div><span>上衣款式:</span><b>{{personData.up_type}}</b></div>
                  <div><span>上衣颜色:</span><b>{{personData.upcolor_type}}</b></div>
                  <div><span>上衣纹理:</span><b>{{personData.uptext_type}}</b></div>
                  <div><span>朝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;向:</span><b>{{personData.view_type}}</b></div>
                </div>
              </div>
              <div v-show="carShow" style="display: flex; flex-direction: column; padding-left: 40px;">
                <div><span>目标类型:</span><b>{{carData.traceTypeName}}</b></div>
                <div><span>车牌颜色</span><b>{{carData.plate_color}}</b></div>
                <div><span>车牌号码:</span><b>{{carData.plate_number}}</b></div>
                <div><span>车身颜色:</span><b>{{carData.vehicle_color_id}}</b></div>
                <div><span>车牌类型:</span><b>{{carData.plate_class}}</b></div>
              </div>
            </li>
          </ul>
        </div>
        <div style="height: 1rem;" class="clItem cli2">
          <div class="btnContainer">
            <div class="btnReset"><i class="el-icon-refresh"></i> 重置</div>
            <div v-show="searchBtn" class="btnSearch" @click="searchCase"><i class="el-icon-search "></i> 搜索</div>
          </div>
        </div>
      </div>
      <div class="contentRight">
        <div class="contentWrapper2">
          <div class="contentWrapperbottom2">
            <div style="display: flex;width: 100%;height: calc(100% - 0.54rem)">
              <div class="contentLeft2" style="width: 85%;height: 100%;">
                <div class="content2">
                  <div class="contentTabs2">
                    <div style="margin-left: 0.1rem;font-size: 12px"><span style="color:#8C939B">搜索到相关记录 : </span><span
                      style="color: #F68888"> {{totalNum}} </span><span
                      style="color:#8C939B">条</span></div>
                    <div class="showType2">
                      <span style="font-size: 14px;margin-right: 10px;">显示方式:</span>
                      <el-radio v-model="radio" label="0" @change="changeSearchResult()">缩略图</el-radio>
                      <el-radio v-model="radio" label="1" @change="changeSearchResult()">图文显示</el-radio>
                    </div>
                  </div>

                  <div class="contentDetialWrapper2">
                    <!--<div class="searchType2">
                      <div><span style="color:#8C939B">搜索到相关记录 : </span><span style="color: #F68888"> 30 </span><span
                        style="color:#8C939B">条</span></div>
                      <div class="searchTypeRight2">
                        <span>排序: </span>
                        <span style="margin-left: 15px">上传时间 </span>
                        <div style="display: flex;flex-direction: column">
                          <div @click="changeOrderType($event)" class="el-icon-caret-top orderType2"
                               style="cursor: pointer"></div>
                          <div @click="changeOrderType($event)" class="el-icon-caret-bottom "
                               style="margin-top: -5px;cursor: pointer"></div>
                        </div>

                        <span style="margin-left: 15px">上传单位 </span>
                        <div style="display: flex;flex-direction: column">
                          <div @click="changeOrderType($event)" class="el-icon-caret-top orderType"
                               style="cursor: pointer"></div>
                          <div @click="changeOrderType($event)" class="el-icon-caret-bottom "
                               style="margin-top: -5px;cursor: pointer"></div>
                        </div>

                        <span style="margin-left: 15px">案件类型 </span>
                        <div style="display: flex;flex-direction: column">
                          <div @click="changeOrderType($event)" class="el-icon-caret-top orderType2"
                               style="cursor: pointer"></div>
                          <div @click="changeOrderType($event)" class="el-icon-caret-bottom "
                               style="margin-top: -5px;cursor: pointer"></div>
                        </div>
                      </div>
                    </div>-->
                    <!-- 缩略图视图-->
                    <div v-show="txtSearchResultFlag" class="contentDetial2">
                      <div class="detailItem2" v-for="(item,index ) in caseList" :key="index">
                        <ul>
                          <li class="itemImg2" @click="lookCase(item)">
                            <img style="width: 100%;height: 100%" :src=item.caseImgUrl alt="暂无图片">
                          </li>
                          <li style="margin-top:0.1rem;"><span style="font-size: 12px;">案件名称:</span><span
                            style="font-size: 12px;color:#6D6F72 "
                            v-text="item.caseName"></span></li>
                          <li><span style="font-size: 12px;">上传用户:</span><span
                            style="font-size: 12px;color:#6D6F72 " v-text="item.creatorName"></span></li>
                          <li><span style="font-size: 12px;">上传时间:</span><span style="font-size: 12px;color:#6D6F72 "
                                                                               v-text="item.createTime"></span>
                          </li>

                          <li style="display: flex;font-size: 12px;align-items: center">
                            <div class="addCompare2">
                              <img style="margin-top: 2px;width: 20%;height: 50%"
                                   src="../../../assets/case/caseRetrievalSearch-add-icon.png" alt="">
                              <div class="handleTxt2" @click="addToCompare(item)">添加比对</div>
                            </div>

                            <div class="itemJudged2">
                              <div class="handleTxt2" @click="showCaseNatureDialog(item)"><span class="el-icon-zoom-in"
                                                                                                style="color:#409EFF;margin-top: 0px;font-size: 12px;"></span>案件比对
                              </div>
                            </div>
                            <div class="addCollect2"><img
                              style="margin-top: 2px;margin-right: 1%;width: 20%;height: 50%"
                              src="../../../assets/case/caseRetrievalSearch-collect-icon.png"
                              alt="">
                              <div class="handleTxt2">取消收藏</div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <!--图文显示视图-->
                    <div v-show="picSearchResultFlag" class="textPicture2">
                      <div class="textPictureItem2" v-for="(item,index ) in caseList" :key="index">
                        <div class="textPictureItemImg2" @click="lookCase(item)"><img
                          style="width:100%;height: 100%;cursor: pointer"
                          :src=item.caseImgUrl alt="暂无图片"></div>
                        <div class="textPictureItemTxt2">
                          <div style="height: 16.6%"><span>案件名称 : </span><span style="color:#808285"
                                                                               v-text="item.caseName"></span>
                          </div>
                          <div style="height: 16.6%"><span>上传用户 : </span><span style="color:#808285"
                                                                               v-text="item.creatorName"> &nbsp; 李斯</span>
                          </div>
                          <div style="height: 16.6%"><span>长传时间 : </span><span
                            style="color:#808285" v-text="item.createTime">&nbsp;</span>
                          </div>
                          <div style="height: 32%;width:100%;display: flex">
                            <span style="height: 100%;width: 60px">案件描述 :</span>
                            <div v-text="item.caseAbstract"
                                 style="color:#808285;word-break: break-all; word-wrap:break-word;width:calc(90% - 67px)">

                            </div>
                          </div>
                        </div>
                        <div class="tpItemBtn">
                          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                          <div class="textPictureHandle2"><img style="margin-top:2px;margin-right: 3px;" src="../../../assets/case/caseRetrievalSearch-add-icon.png" alt="">
                            <div class="handleTxt2" @click="addToCompare(item)">添加比对</div>
                          </div>
                          <div class="textPictureHandle2">
                            <div class="handleTxt2" @click="showCaseNatureDialog(item)"><span class="el-icon-zoom-in" style="color:#409EFF;margin-top: 0px;font-size: 16px;"></span>案件比对
                            </div>
                          </div>
                          <div class="textPictureHandle2"><img style="margin-top:2px;margin-right: 3px;" src="../../../assets/case/caseRetrievalSearch-collect-icon.png" alt="">
                            <div class="handleTxt2">取消收藏</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!--暂无数据-->
                    <div v-show="searchResultFlag" class="noDataPage">
                      <div>
                        <img src="../../../assets/case/imgSearchCase-noData-icon.png" alt="">
                        <div style="width: 100%;">
                          <div class="btnReSearch" @click="searchCase()">重新搜索</div>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
              </div>
              <div class="contentRight2">
                <div class="contentTabs2" style="justify-content: center">比对栏【<span v-text="compareList.length"></span>/5】
                </div>
                <div class="rightItemList2">
                  <div class="rightItem2" v-for="(item,index) in compareList" :key="index">
                    <span class="el-icon-close" @click="deleteCompareItem(index)"></span>
                    <img style="width:100%;height:76%;" :src="item.caseImgUrl" alt="">
                    <div
                      style="display: flex;width:100%;height:24%;align-items: center;justify-content: center;font-size: 12px">
                      <span v-text="item.caseName"></span>
                    </div>
                  </div>
                </div>
                <div class="rightHandle2">
                  <div class="doCompare2" @click="showcaseMessageDialog()"><img
                    style="margin-top: 3px;margin-right: 3px"
                    src="../../../assets/case/caseRetrievalSearch-compare-icon.png" alt="">
                    <div>执行比对</div>
                  </div>
                  <div class="clearCompare2" @click="clearCompare()">清空比对栏</div>
                </div>
              </div>
            </div>
            <div class="contentBottom2">
              <div class="pageNation2">
                <el-pagination style="float: right;margin-right: 10px;"
                               :background=true
                               @size-change="handleSizeChange"
                               @current-change="handleCurrentChange"
                               :current-page="Number(this.pageNo)"
                               :page-sizes="[10, 20, 30, 40, 50, 100]"
                               :page-size="Number(this.pageSize)"
                               layout="total, sizes, prev, pager, next, jumper"
                               :total=Number(this.totalNum)>
                </el-pagination>
              </div>
            </div>
          </div>

        </div>

        <footer class="footer">
          <img src="../../../assets/logo.png"/>武汉大千信息技术有限公司&copy;版权所有 2008-<span>{{ new Date().getFullYear() }}</span>
        </footer>
      </div>
    </div>
    <!--图片上传弹框-->
    <el-dialog
      title="上传图片"
      :visible.sync="dialogVisible"
      width="50%"
      class="dialog">

      <div class="photoWrap">
        <div id="photoCvs" class="photo">
          <span class="smallT">|  图片源</span>

          <div class="showImg" id="imgBox" @click="choiceCar">
            <img id="imgItem" :src="imgUrl"/>
            <canvas id="photoCanvas" class="showPhoto" width="0" height="0"></canvas>
          </div>
          <!--<div class="magnifier" id="Magnifier">-->
          <!--<img id="magImg" :src="imgUrl">-->
          <!--<canvas id="magCanvas" width="0" height="0"></canvas>-->
          <!--</div>-->
          <el-upload
            class="uploadPhoto"
            action="vsas/searchImg/img/recognition"
            name="image"
            ref="upload"
            :before-upload="beforeAvatarUpload"
          >
            <el-button size="small" class="btnUpload" type="primary">点击上传</el-button>
          </el-upload>
        </div>
        <div class="info">
          <div class="infoItem">
            <span class="smallT">| 识别信息</span>
            <div class="vinfolist">

              <!--              <p><span class="listLeft">目标类别：</span><span>行人</span></p>
                            <p><span class="listLeft">目标性别：</span><span>男</span></p>
                            <p><span class="listLeft">目标年龄：</span><span>未知</span></p>
                            <p><span class="listLeft">目标发型：</span><span>卷发</span></p>
                            <p><span class="listLeft">背 包 否&nbsp;：</span><span>否</span></p>
                            <p><span class="listLeft">背包颜色：</span><span>无</span></p>
                            <p><span class="listLeft">上衣颜色：</span><span>红</span></p>
                            <p><span class="listLeft">下衣颜色：</span><span>白</span></p>
                            <p><span class="listLeft">上衣纹理：</span><span>未知</span></p>
                            <p><span class="listLeft">下衣颜色：</span><span>未知</span></p>
                            <p><span class="listLeft">口 罩 否&nbsp;：</span><span>是</span></p>
                            <p><span class="listLeft">骑 车 否&nbsp;：</span><span>否</span></p>
                         -->
              <ul v-show="cpShow">
                <li><span>目标类型:</span><b>{{cpData.traceTypeName}}</b></li>
                <li><span>年龄段:</span><b>{{cpData.age_type}}</b></li>
                <li><span>包款式:</span><b>{{cpData.bag_type}}</b></li>
                <li><span>包颜色:</span><b>{{cpData.bagcolor_type}}</b></li>
                <li><span>车颜色:</span><b>{{cpData.carcolor_type}}</b></li>
                <li><span>是否携物:</span><b>{{cpData.carrying_type}}</b></li>
                <li><span>下衣类型:</span><b>{{cpData.down_type}}</b></li>
                <li><span>下衣颜色:</span><b>{{cpData.downcolor_type}}</b></li>
                <li><span>骑车人数:</span><b>{{cpData.driver_count}}</b></li>
                <li><span>眼部特征:</span><b>{{cpData.eye_part}}</b></li>
                <li><span>发型:</span><b>{{cpData.head_type}}</b></li>
                <li><span>嘴部特征:</span><b>{{cpData.mouth_part}}</b></li>
                <li><span>民族:</span><b>{{cpData.nation_type}}</b></li>
                <li><span>围脖:</span><b>{{cpData.scarf}}</b></li>
                <li><span>性别:</span><b>{{cpData.sex_type}}</b></li>
                <li><span>体态:</span><b>{{cpData.shape_type}}</b></li>
                <li><span>是否打伞:</span><b>{{cpData.umbrella_flag}}</b></li>
                <li><span>上衣款式:</span><b>{{cpData.up_type}}</b></li>
                <li><span>上衣颜色:</span><b>{{cpData.upcolor_type}}</b></li>
                <li><span>上衣纹理:</span><b>{{cpData.uptext_type}}</b></li>
                <li><span>朝向:</span><b>{{cpData.view_type}}</b></li>
              </ul>
              <ul v-show="personShow">
                <li><span>目标类型:</span><b>{{personData.traceTypeName}}</b></li>
                <li><span>年龄段:</span><b>{{personData.age_type}}</b></li>
                <li><span>包款式:</span><b>{{personData.bag_type}}</b></li>
                <li><span>包颜色:</span><b>{{personData.bagcolor_type}}</b></li>
                <li><span>是否携物:</span><b>{{personData.carrying_type}}</b></li>
                <li><span>下衣类型:</span><b>{{personData.down_type}}</b></li>
                <li><span>下衣颜色:</span><b>{{personData.downcolor_type}}</b></li>
                <li><span>发型:</span><b>{{personData.head_type}}</b></li>
                <li><span>头发颜色:</span><b>{{personData.headcolor_type}}</b></li>
                <li><span>民族:</span><b>{{personData.nation_type}}</b></li>
                <li><span>性别:</span><b>{{personData.sex_type}}</b></li>
                <li><span>体态:</span><b>{{personData.shape_type}}</b></li>
                <li><span>鞋子款式:</span><b>{{personData.shoe_type}}</b></li>
                <li><span>鞋子颜色:</span><b>{{personData.shoecolor_type}}</b></li>
                <li><span>上衣款式:</span><b>{{personData.up_type}}</b></li>
                <li><span>上衣颜色:</span><b>{{personData.upcolor_type}}</b></li>
                <li><span>上衣纹理:</span><b>{{personData.uptext_type}}</b></li>
                <li><span>朝向:</span><b>{{personData.view_type}}</b></li>
              </ul>
              <ul v-show="carShow">
                <li><span>目标类型:</span><b>{{carData.traceTypeName}}</b></li>
                <li><span>车牌颜色</span><b>{{carData.plate_color}}</b></li>
                <li><span>车牌号码:</span><b>{{carData.plate_number}}</b></li>
                <li><span>车身颜色:</span><b>{{carData.vehicle_color_id}}</b></li>
                <li><span>车牌类型:</span><b>{{carData.plate_class}}</b></li>
              </ul>
            </div>
          </div>

        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="caveCanvas">确 定</el-button>
      </span>
    </el-dialog>
    <case-nature-dialog></case-nature-dialog>
    <case-message-dialog></case-message-dialog>
  </div>
</template>

<script>
  import caseNatureDialog from './caseNatureDialog'
  import caseMessageDialog from './caseMessageDialog'
  //日期选择
  import '../../../common/laydate/laydate.js'
  import vehicle from '../../../api/vehicle/vehicle.js'
  import footerThird from '../../../components/footer_third'

  export default {
    mixins: [vehicle],
    components: {
      footerThird, caseNatureDialog, caseMessageDialog
    },
    data() {
      return {
        uploadBtn: this.$storage.getSession("348") != null ? true : false,
        searchBtn: this.$storage.getSession("305") != null ? true : false,
        dialogVisible: false,
        searchResultFlag: false,
        txtSearchResultFlag: false,
        picSearchResultFlag: false,
        radio: "0",
        beginDateTime: '',
        endDateTime: '',
        pageNo: 1,
        pageSize: 10,
        totalNum: 0,
        /*图片识别*/
        checkList: [],
        imgUrl: null,   //图片地址
        centerDialogVisible: false,
        showaddress: false,  //地图的显示隐藏
        checkList: [],
        treeList: [],
        defaultProps: {
          children: 'apes',
          label: 'name'
        },
        category: 0,  //在线离线
        maxpage: 20,
        cpShow: false,   //骑车人的显示和隐藏
        personShow: false,  //行人的显示和隐藏
        carShow: false,    //汽车的显示和隐藏
        unit: 1,  //图片宽度适应比例尺
        imgWidth: '',   //图片的宽度
        imgHeight: '',  //图片的高度
        uploadloading: '',
        imgData: [],  //所有的数据
        personData: {},  //行人的信息
        cpData: {},      //骑车人的信息
        carData: {},     // 车的信息
        currentCar: null,
        imgUrlShow: null,  //保存的图片
        tollgateIdsArr: [],  //总体选中的卡口列表
        tollArr: [],  //地图选中的卡口列表
        tollTreeArr: [], // 菜单选中的卡口列表
        searchOk: '', // 搜索结果
        /*案件比对*/
        compareList: [],
        caseList: [],

      }

    },
    watch: {},
    mounted() {
      this.changeSearchResult()
      let _this = this
      let beginDateTime = laydate.render({
        elem: '#beginDateTime',
        type: 'datetime',
        max: this.getCurrentDate(),
        done: function (value, date) {
          _this.beginDateTime = value;
        },
        ready: function () {

        }
      });
      let endDateTime = laydate.render({
        elem: '#endDateTime',
        type: 'datetime',
        max: this.getCurrentDate(),
        done: function (value, date) {
          _this.endDateTime = value;
        },
        ready: function () {
        }
      });

    },
    computed: {
      carList() {
        let cList = [];
        if (this.imgData.length) {
          for (let i = 0; i < this.imgData.length; i++) {
            cList.push({
              obj_bootom: this.imgData[i].obj_bootom,
              obj_top: this.imgData[i].obj_top,
              obj_right: this.imgData[i].obj_right,
              obj_left: this.imgData[i].obj_left
            });
          }
        }
        return cList;
      },
    },
    methods: {
      //翻页
      handleSizeChange(val) {
        this.pageSize = val
        this.searchCase()
      },
      //选条数
      handleCurrentChange(val) {
        this.pageNo = val
        this.searchCase()
      },
      changeSearchResult() {
        if (this.caseList.length !== 0 && this.radio == '0') {
          this.txtSearchResultFlag = true;
          this.picSearchResultFlag = false;
          this.searchResultFlag = false;
        } else if (this.caseList.length !== 0 && this.radio == '1') {
          this.txtSearchResultFlag = false;
          this.picSearchResultFlag = true;
          this.searchResultFlag = false;
        } else {
          this.txtSearchResultFlag = false;
          this.picSearchResultFlag = false;
          this.searchResultFlag = true;
        }
      },
      //案件属性比对弹出框显示
      showCaseNatureDialog(item) {
        this.caseObj = item
        this.$store.state.caseNatureDialogFlag = true;
      },
      //特征属性比对弹出框显示
      showcase3DNatureDialog() {
        this.$store.state.case3DNatureDialogFlag = true;
      },
      //视频标注比对弹出框显示
      showcaseVideoMarkDialog() {
        this.$store.state.caseVideoMarkDialogFlag = true;
      },

//右边执行比对弹出框
      showcaseMessageDialog() {
        if (this.compareList.length < 2) {
          this.$alert('请至少再添加一个案件')
          return;
        }
        let caseId = []
        for (let i = 0; i < this.compareList.length; i++) {
          caseId.push(this.compareList[i].caseUuid)
        }
        this.$http({
          url: 'pca/search/advanced/caseCompare',
          method: 'get',
          params: {
            caseIds: caseId.join(',')
          }
        }).then(res => {
          console.log(res)
          if (res.data.code === 200) {
            this.compareResultList = res.data.data
            this.$store.state.caseMessageDialogFlag = true;
          } else {
            this.$alert("服务异常")
          }
        })

      },
//打开图片上传弹框
      openUpload() {
        this.dialogVisible = true;
        this.imgUrl = null
      },
//上传图片,成功之后得到图片信息
      uploadSuccess(res, file, fileList) {
        console.log(file.url, "file")
        this.imgUrl = file.url
      },
//文件长传
      beforeAvatarUpload(file) {
        if (file.type != "image/jpg" && file.type != "image/jpeg" && file.type != "image/bmp" && file.type != "image/png" && file.type != "image/gif" && file.type != "image/tiff" && file.type != "image/bmf") {
          this.$alert("只能上传bmp/jpg/jpeg/png/gif/tiff/bmf格式图片！", "消息提示");
          return false;
        }
        let _this = this;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (theFile) => {
          var image = new Image();
          image.src = theFile.target.result;
          image.onload = (e) => {
            this.imgWidth = image.width;
            this.imgHeight = image.height
          };
        };
        let formData = new FormData();
        formData.append('image', file);
        formData.append('taskSource', 2)
        this.$http({
          url: 'vsas/searchImg/img/recognition',
          method: 'post',
          data: formData,
          onUploadProgress: function (progressEvent) {
            if (progressEvent.loaded != progressEvent.total) {
              if (!_this.uploadloading) {
                _this.uploadloading = _this.$loading({
                  text: '正在上传...',
                  spinner: 'el-icon-loading',
                  target: "#imgBox"
                });
              }
            }
          }
        }).then(res => {
          if (_this.uploadloading) {
            _this.uploadloading.close();
          }
          if (res.data.code == 200) {
            console.log(res, 63366969);
            this.imgUrl = reader.result;
            // this.imgUrlShow = reader.result;
            this.imgData = res.data.data
            this.imgWH();
            this.drawAllCar()
            if (this.imgData[0].type_index == 0) {
              this.personData = this.imgData[0]
              this.personShow = true;
              this.drawBorder(0)
              this.cpShow = this.carShow = false;
            }
            if (this.imgData[0].type_index == 1 || this.imgData[0].type_index == 2 || this.imgData[0].type_index == 3) {
              this.cpData = this.imgData[0]
              this.cpShow = true;
              console.log(this.carList, 444444444);
              this.drawBorder(0)
              this.personShow = this.carShow = false;
            }
            if (this.imgData[0].type_index == 4 || this.imgData[0].type_index == 5 || this.imgData[0].type_index == 6 ||
              this.imgData[0].type_index == 7 || this.imgData[0].type_index == 8) {
              this.carData = this.imgData[0]
              this.carShow = true;
              this.drawBorder(0)
              console.log(this.carList, 444444444);
              this.personShow = this.cpShow = false;
            }
          }
          if (res.data.code === 999) {
            this.personShow = this.cpShow = this.carShow = false;
            this.imgWH();
            this.$alert("图片识别失败", "消息提示");
            this.imgUrl = reader.result
          }

        });
        return false;
      },
      //图片的自适应
      imgWH() {
        let imgBox = document.getElementById("imgBox");
        let imgs = document.getElementById("imgItem");
        let photoCanvas = document.getElementById("photoCanvas");
        let imgw = this.imgWidth;
        let imgh = this.imgHeight;
        let retw = imgBox.clientWidth;
        let reth = imgBox.clientHeight;
        if (retw / reth < imgw / imgh) {
          imgs.style.width = "100%";
          imgs.style.height = "auto"
          this.unit = imgw / retw;
        } else {
          imgs.style.height = "100%";
          imgs.style.width = "auto"
          this.unit = imgh / reth;
        }
        console.log(this.unit, 366999);
        photoCanvas.width = imgw / this.unit;
        photoCanvas.height = imgh / this.unit;
      },
      caveCanvas() {
        // this.centerDialogVisible = false;
        let photoCanvas = document.getElementById("photoCanvas");
        let png = photoCanvas.toDataURL("image/png");
        let searchImg = document.getElementById("search");
        let simg = document.getElementById("simg");
        if (!simg) {
          simg = document.createElement("img");
        }
        simg.src = png;
        simg.id = "simg";
        simg.style.position = "absolute";
        simg.style.top = 0;
        simg.style.left = 0;
        simg.style.bottom = 0;
        simg.style.right = 0;
        simg.style.margin = "auto";
        simg.style.height = "100%";
        searchImg.appendChild(simg);
        this.imgUrlShow = this.imgUrl;
        this.dialogVisible = false;
      },
      //花红色的边框
      drawBorder(pIndex) {
        console.log(this.carList[pIndex], 3363);
        let pos = this.carList[pIndex];
        let photoCanvas = document.getElementById("photoCanvas");
        let pCtx = photoCanvas.getContext("2d");
        let x = pos.obj_left / this.unit;
        let y = pos.obj_top / this.unit;
        let w = (pos.obj_right - pos.obj_left) / this.unit;
        let h = (pos.obj_bootom - pos.obj_top) / this.unit;
        pCtx.strokeStyle = "red";
        pCtx.strokeRect(x, y, w, h);
      },
      // 话黄色的边框
      drawAllCar() {
        for (let i = 0; i < this.carList.length; i++) {
          let pos = this.carList[i];
          let photoCanvas = document.getElementById("photoCanvas");
          let pCtx = photoCanvas.getContext("2d");
          let x = pos.obj_left / this.unit;
          let y = pos.obj_top / this.unit;
          let w = (pos.obj_right - pos.obj_left) / this.unit;
          let h = (pos.obj_bootom - pos.obj_top) / this.unit;
          pCtx.strokeStyle = "yellow";
          pCtx.strokeRect(x, y, w, h);
        }
      },
      //清除canvas画布
      clearRect() {
        let photoCanvas = document.getElementById("photoCanvas");
        let pCtx = photoCanvas.getContext("2d");
        pCtx.clearRect(0, 0, this.imgWidth, this.imgHeight);
      },

      //点击当前的div获取当前点击的位置
      choiceCar(ev) {
        if (this.carList.length > 0) {
          for (let i = 0; i < this.carList.length; i++) {
            if ((this.carList[i].obj_left / this.unit) < ev.offsetX && (this.carList[i].obj_right / this.unit) > ev.offsetX && (this.carList[i].obj_top / this.unit) < ev.offsetY && (this.carList[i].obj_bootom / this.unit) > ev.offsetY) {
              this.currentCar = i;
              console.log(this.currentCar, 33336666);
            }
          }
        } else {
          return null;
        }
        this.personData=[]
        this.cpData=[]
        this.carData=[]
        if (this.imgData[this.currentCar].type_index === 0) {
          this.personData = this.imgData[this.currentCar]
          this.personShow = true;
          this.cpShow = this.carShow = false;
        }
        if (this.imgData[this.currentCar].type_index == 1 || this.imgData[this.currentCar].type_index == 2 || this.imgData[this.currentCar].type_index == 3) {
          this.cpData = this.imgData[this.currentCar]
          this.cpShow = true;
          this.personShow = this.carShow = false;
        }
        if (this.imgData[this.currentCar].type_index == 4 || this.imgData[this.currentCar].type_index == 5 || this.imgData[this.currentCar].type_index == 6 ||
          this.imgData[this.currentCar].type_index == 7 || this.imgData[this.currentCar].type_index == 8) {
          this.carData = this.imgData[this.currentCar]
          this.carShow = true;
          this.personShow = this.cpShow = false;
        }
        this.clearRect();
        this.drawAllCar()
        this.drawBorder(this.currentCar);
      },

      cancle() {
        this.centerDialogVisible = false
        if (document.getElementById("simg")) {
          document.getElementById("simg").remove();
        }
        if (document.getElementById("photoCanvas")) {
          document.getElementById("photoCanvas").width = 0;
          document.getElementById("photoCanvas").height = 0;
        }
        this.imgUrl = this.imgUrlShow = '';
        this.carShow = this.personShow = this.cpShow = false;
      },

      //清除
      clearall() {
        if (document.getElementById("simg")) {
          document.getElementById("simg").remove();
        }
        if (document.getElementById("photoCanvas")) {
          document.getElementById("photoCanvas").width = 0;
          document.getElementById("photoCanvas").height = 0;
        }
        this.imgUrl = this.imgUrlShow = null;
        this.time1 = this.time2 = this.setion = '';
        this.carShow = this.personShow = this.cpShow = false;
      },
      /* 案件比对 */

// 添加比对
      addToCompare(obj) {
        console.log(obj)
        if (this.compareList.length < 5) {
          for (let i = 0; i < this.compareList.length; i++) {
            if (obj.caseUuid === this.compareList[i].caseUuid) {
              this.$alert("该案件已在比对栏")
              return
            }
          }
          this.compareList.push(obj)
        } else {
          this.$alert("比对案件不能超过5个")
        }
      },
//删除比对
      deleteCompareItem(index) {
        this.compareList.splice(index, 1)
      },
//清空比对
      clearCompare() {
        this.compareList = []
      },

//案件搜索
      searchCase() {
        this.$http({
          url: 'pca/search/advanced/newList',
          method: 'post',
          params: {
            pageNum: this.pageNo,
            pageSize: this.pageSize,
            orderBy: "createTime",
            orderType: "desc",
            /*人员信息personData*/
            ageType: this.personData.age_type,   // 年龄段
            tpbagStyle: this.personData.bag_type,   // 包款式
            tpbagColor: this.personData.bagcolor_type,   // 包颜色
            // "carrying_type" : 8,    // 是否携物
            ptrousersStyle: this.personData.down_type,       //  下衣款式
            ptrousersColor: this.personData.downcolor_type,   // 下衣颜色
            tphairStyle: this.personData.head_type,       // 发型
            hairColor: this.personData.headcolor_type,    // 头发颜色
            ethicCode: this.personData.nation_type,      // 民族
            genderCode: this.personData.sex_type,      // 性别
            bodyType: this.personData.shape_type,    // 体态
            shoesStyle: this.personData.shoe_type,     //鞋子款式
            shoesColor: this.personData.shoecolor_type,   // 鞋子颜色
            pcoatStyle: this.personData.up_type,        // 上衣款式
            pcoatColor: this.personData.upcolor_type,   //  上衣颜色
            tpcoatTexture: this.personData.uptext_type,    //  上衣纹理
            viewType: this.personData.view_type,     // 朝向

            /**骑车人信息cpData**/
            tbageType: this.cpData.age_type,        // 年龄段
            bagStyle: this.cpData.bag_type,     // 包款式
            bagColor: this.cpData.bagcolor_type,  // 包颜色
            vehicleColor: this.cpData.carcolor_type,  // 车颜色
            carryingType: this.cpData.carrying_type,    // 是否携物
            trousersStyle: this.cpData.down_type,        // 下衣类型
            trousersColor: this.cpData.downcolor_type,   // 下衣颜色
            driverCount: this.cpData.driver_count,      // 骑车人数
            eyePart: this.cpData.eye_part,         // 眼部特征
            hairStyle: this.cpData.head_type,        // 发型
            mouthPart: this.cpData.mouth_part,       //  嘴部特征
            tbethicCode: this.cpData.nation_type,       // 民族
            scarf: this.cpData.scarf,          // 围巾，围脖
            tbgenderCode: this.cpData.sex_type,     // 性别
            tbbodyType: this.cpData.shape_type,   // 体态
            umbrellaFlag: this.cpData.umbrella_flag,   // 是否打伞
            coatStyle: this.cpData.up_type,       // 上衣款式
            coatColor: this.cpData.upcolor_type,  // 上衣颜色
            coatTexture: this.cpData.uptext_type,    // 上衣纹理
            tbviewType: this.cpData.view_type,      // 朝向

            /*车辆信息 carData*/
            mvehicleColor: this.carData.plate_color,   // 车牌颜色
            mplateNo: this.carData.plate_number,    // 车牌号码
            mvehicleColor: this.carData.vehicle_color_id,// 车身颜色
            vehicleModel: this.carData.vehicle_model, //车辆型号
            mvehicleBrand: this.carData.vehicle_brand,    //车辆品牌
            tmplateClass: this.carData.plate_class,      //-- 新增：车牌类型
          }
        }).then(res => {
          console.log(res, "===============")
          if (res.data.code === 200) {
            this.caseList = res.data.data.list
            this.totalNum = res.data.data.totalCount
            this.changeSearchResult()
          }
        })
      },


//跳转查看案件
      lookCase(obj) {
        this.$router.push({
          path: '/casestudy/casePicture_look', query: {
            caseUuid: obj.caseUuid
          }
        })
      },


    },
    beforeCreate() {
      Date.prototype.Format = function (fmt) {
        var o = {
          "M+": this.getMonth() + 1,                 //月份
          "d+": this.getDate(),                    //日
          "h+": this.getHours(),                   //小时
          "m+": this.getMinutes(),                 //分
          "s+": this.getSeconds(),                 //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          "S": this.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
      }
    },
  }


</script>


<style scoped>
  @import "../../../assets/css/carJudged_third.css";

  .searchCondition {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .dialog /deep/ .el-dialog__header {
    background: #f3f6f8;
    border-bottom: 1px solid #d5dade;
  }

  .dialog /deep/ .el-dialog__body {
    padding: 0.2rem;
    color: #606266;
    line-height: 0.24rem;
    font-size: 0.14rem;
  }

  .dialog /deep/ .el-dialog__footer {
    border-top: 1px solid #d5dade;
    text-align: center;
  }

  .dialog /deep/ .el-button + .el-button {
    margin-left: 0.5rem;
  }

  .dialog /deep/ .el-button {
    padding: 0.1rem 0.45rem;
    font-size: 0.16rem;
  }

  .uploadPhoto /deep/ .el-upload-list {
    display: none;
  }

  .searchImg div {
    width: 3.76rem;
    height: 1.77rem;
    border: 1px solid #409eff;
    position: relative;
  }

  .searchImg img {
    /*width: 100%;*/
    display: block;
    height: 100%;
    margin: 0 auto;
  }

  .searchImg input {
    width: 100%;
    height: 0.3rem;
    position: absolute;
    bottom: 0;
    z-index: 2;
    opacity: 0;
  }

  .searchImg p {
    width: 3.76rem;
    line-height: 0.3rem;
    color: #fff;
    text-align: center;
    background-color: #409eff;
    cursor: pointer;
  }

  .photoWrap {
    display: flex;
    justify-content: space-between;
  }

  .photoWrap .photo {
    position: relative;
    width: 7.28rem;
  }

  .photoWrap .photo .showImg {
    position: relative;
    height: 4rem;
    border: 1px solid #d5dade
  }

  .photoWrap .photo .showImg img {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }

  .showPhoto {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    opacity: 1;
  }

  .photoWrap .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 2.74rem;

  }

  .photoWrap .info .infoItem {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .photoWrap .info .infoItem .vinfolist, .photoWrap .info .infoItem .carItemInfo {
    padding-left: 0.1rem;
    background-color: #F6F7FB;
  }

  .photoWrap .info .infoItem .carItemInfo {
    height: 2.35rem;
    overflow-y: auto;
  }

  .photoWrap .uploadPhoto {
    margin-top: 0.1rem;
    text-align: center;
  }

  .photoWrap .smallT {
    display: block;
    margin-bottom: 0.1rem;
    color: #409eff;
    font-size: 0.16rem;
    line-height: 0.24rem;
    font-weight: bold;
  }

  .carItemInfo .carItem {
    padding-left: 0;
    margin-top: 0.1rem;
    color: #409eff;
    line-height: 0.19rem;
    font-size: 0.14rem;
  }

  .carItemInfo .carItem /deep/ .el-checkbox__label {
    display: inline-block;
    padding-left: 0.1rem;
    line-height: 0.19rem;
    font-size: 0.14rem;
  }

  .carItemInfo .carItem span {
    color: #409eff;
  }

  .carItemInfo .carItem.unde {
    color: #999;
  }

  .carItemInfo .carItem label {
    margin-right: 0.1rem;
  }

  .carItemInfo .carItem span:last-child {
    float: right;
    width: 1rem;
    text-align: center;
  }

  .vinfolist p {
    color: #606266;
    font-size: 0.14rem;
    line-height: 0.22rem;
    margin-top: 0.1rem;
  }

  .vinfolist {
    overflow-y: auto;
  }

  .magnifier {
    position: absolute;
    display: none;
    width: 3rem;
    height: 3rem;
    z-index: 2;
    border: 1px solid #F6F7FB;
    background: #fff;
    box-sizing: border-box;
    overflow: hidden;
  }

  .magnifier img {
    position: absolute;
  }

  .magnifier canvas {
    position: absolute;
  }

  .mask {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    /*background:rgba(255,255,255,0.5);*/
    /*cursor: move;*/
  }

  .showImg:hover .mask {
    display: block;
  }

  .markCarDialog {
    position: absolute;
    top: 15vh;
    left: 0;
    right: 0;
    bottom: 0;
    width: 10.6rem;
    height: 6.8rem;
    margin: 0 auto;
    background: #fff;
    z-index: 9999;
  }

  .markCarDialog .title {
    padding: 20px 20px 10px;
    background: #f3f6f8;
    border-bottom: 1px solid #d5dade;
    line-height: 24px;
    font-size: 18px;
    color: #303133;
  }

  .markCarDialog .close {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    font-size: 16px;
  }

  .markCarFooter {
    padding: 0.1rem;
    display: flex;
    justify-content: center;
    border-top: 1px solid #d5dade;
  }

  .markCarFooter .el-button {
    padding: 0.1rem 0.45rem;
    font-size: 0.16rem;
  }

  .markCarFooter .el-button + .el-button {
    margin-left: 0.5rem;
  }

  .markCarContent {
    width: 100%;
    padding: 0.1rem;
    overflow: hidden;
  }

  .markCar {
    /*float: left;*/
    position: relative;
    width: 10.06rem;
    cursor: crosshair;
    height: 5.2rem;
    margin: 0 auto;
    border: 1px solid #d5dade;
    overflow: hidden;
  }

  .markCar img {
    position: absolute;
  }

  .markCar canvas {
    position: absolute;
  }

  .markCarInfo {
    float: right;
    width: 2.76rem;
    height: 5.2rem;
    display: flex;
    flex-direction: column;
  }

  .markCarInfo .infoItem {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .markCarInfo .infoItem .carItemInfo {
    padding-left: 0.1rem;
    background-color: #F6F7FB;
  }

  .markCarInfo .infoItem .carItemInfo {
    height: 4.6rem;
    overflow-y: auto;
  }

  .markCarInfo .smallT {
    display: block;
    margin-bottom: 0.1rem;
    color: #409eff;
    font-size: 0.16rem;
    line-height: 0.24rem;
    font-weight: bold;
    padding-left: 0.1rem;
  }

  .el_btn {
    padding: 0.14rem 0;
    display: flex;
    justify-content: space-around;
  }

  .el_btn .el-button {
    padding: 0.1rem 0.2rem;
    font-size: 0.14rem;
  }

  .identifyResult {
    color: #63abfe;
    text-align: left !important;
  }

  /*  .resultList {
      display: flex;
      flex-direction: column;
      padding-right: 15px;
      overflow-x: hidden;
    }*/

  .showImg:hover .mask {
    display: block;
  }

  .listItem {
    display: flex;
    margin-top: 0.1rem;
  }

  .listItemWrapper {
    display: flex;
  }

  .listItemContainerLeft {
    display: flex;
    flex-direction: column;
    width: 50%;
  }

  .listItemContainerRight {
    display: flex;
    flex-direction: column;
    width: 50%;
    align-items: flex-end;
  }

  .listItem span {
    text-align: right;
  }

  .listSelect {
    width: 1rem !important;
  }

  .contentRight {
    width: calc(100% - 22% - 2px);
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  /*搜索详情页面*/

  .contentWrapper2 {
    width: calc(100% - 32px);
    height: calc(100% - 10px - 60px);
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 10px;
    border: 1px solid #E9EBEF;
    display: flex;
    flex-direction: column;
  }

  .contentWrapperTop2 {
    width: calc(100% - 32px);
    height: 30px;
    margin-left: 15px;
    margin-right: 15px;
    display: flex;
    align-items: center;
  }

  .contentWrapperbottom2 {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .contentWrapperTop2 span {
    font-size: 12px;
    color: white;
    background-color: #FE8A01;
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 10px 4px 10px;
    border-radius: 3px;
  }

  .contentWrapperTop2 p {
    margin-left: 5px;
    margin-top: 2px;
    cursor: pointer;
  }

  .content2 {
    width: 100%;
    height: 100%;
    border: 1px solid #E9EBEF;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .contentTabs2 {
    width: 100%;
    height: 0.54rem;
    background-color: #F7F8F6;
    border-bottom: 1px solid #E9EBEF;
    display: flex;
    align-items: center;
    position: relative;
  }

  .showType2 {
    position: absolute;
    right: 20px;
  }

  .tabsItem2 {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    height: 26px;
    color: #7A7C86;
    padding: 5px 5px 5px 5px;
  }

  .searchCondition2 {
    position: absolute;
    z-index: 2;
    width: 100%;
    top: 0.54rem;
    font-size: 12px;
    background-color: #F2F4F3;
    display: flex;

  }
  .tpItemBtn{
    float: left;
    width: 30%;
    /* margin-top: 0.12rem; */
  }

  .searchCondition2 div {
    padding-left: 10px;
    padding-top: 2px;
    padding-bottom: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #808285;
    cursor: pointer;
  }

  .conditionName2:hover {
    color: #63abfe;
  }

  .conditionIcon2 {
    color: #828282;
    margin-left: 10px;
    margin-bottom: 2px;
  }

  .orderType2 {
    color: #FF6600;
  }

  .contentDetialWrapper2 {
    height: calc(100% - 0.54rem);
    width: 100%;
  }

  .contentDetial2 {
    width: 100%;
    height: 100%;
    padding-top: 5px;
    overflow-y: auto;
  }

  .textPicture2 {
    width: 100%;
    padding-left: 0.1rem;
    padding-right: 0.1rem;
    padding-top: 5px;
    overflow-y: auto;
    height: 100%;
  }

  .noDataPage {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .noDataPage div {
    display: flex;
    flex-direction: column;
  }

  .textPictureItem2 {
    width: 49%;
    height: 1.9rem;
    display: inline-block;
    margin-top: 0.1rem;
    /* display: flex; */
    padding: 0.1rem;
    background-color: #F1F1F1;
  }
  .textPictureItem2::after{
    display: block;
    content: " ";
    clear: both;
  }
  .textPictureItem2:nth-child(even){
    margin-left: 1%;
  }

  .detailItem2 {
    display: inline-block;
    margin: 2px;
    width: calc(25% - 2px - 2px);
    background-color: #F1F1F1;
    border: 1px solid #e1e5ea;
    vertical-align: top;
    user-select: none;
  }

  .detailItem2 ul {
    padding: 2%;
    width: 100%;
    height: 3rem;
  }

  .detailItem2 ul li {
    width: 100%;
    margin-bottom: -1%;
  }

  .itemImg2 {
    height: 60%;
  }

  .searchType2 {
    position: relative;
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    font-size: 12px;
    border-bottom: 1px solid #EDEFF2;
    padding-left: 20px;
  }

  .searchTypeRight2 {
    position: absolute;
    right: 10px;
    display: flex;
    align-items: center;
  }

  .contentBottom2 {
    width: 100%;
    height: 0.54rem;
    background-color: #FAF9F5;
    border: 1px solid #EDEFF2;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .btnBack2 {
    width: 1rem;
    height: 0.36rem;
    background-color: #E6A23C;
    margin-right: 3.5%;
    border-radius: 3px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .nav-item2 {
    display: inline-block;
    height: 0.54rem;
    width: 140px;
    line-height: 0.54rem;
    text-align: center;
    font-size: 18px;
  }

  .nav-item-search2 {
    height: 100%;
    width: 154px;
    background: url(../../../assets/images/sysmanage/bg.png);
    color: #63abfe;
    text-align: center;
    background-size: 100% 100%;
    margin-left: -14px;
  }

  .pageNation2 {
    width: 100%;
    margin-top: 0.1rem;
  }

  .addCompare2 {
    background-color: #FCFCFC;
    margin-top: 2%;
    color: #848588;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1%;
    font-size: 0.1rem;
    cursor: pointer;
  }

  .itemJudged2 {
    background-color: #FCFCFC;
    margin-top: 2%;
    color: #848588;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1%;
    cursor: pointer;
  }

  .addCollect2 {
    background-color: #FCFCFC;
    margin-top: 2%;
    color: #848588;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1%;
    cursor: pointer;
  }

  .contentTabs2 /deep/ .el-radio + .el-radio {
    margin-left: 0;
  }

  .contentRight2 {
    width: 13%;
    height: 100%;
    border: 1px solid #EDEFF2;
    margin-left: 2%;
    display: flex;
    flex-direction: column;
  }

  .rightItemList2 {
    width: 100%;
    height: calc(100% - 0.54rem - 1rem);
    border-bottom: 1px solid #EDEFF2;
    display: flex;
    flex-direction: column;
  }

  .rightHandle2 {
    width: 100%;
    height: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }

  .rightItem2 {
    display: flex;
    flex-direction: column;
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
    height: 20%;
    margin-top: 3px;
    position: relative;
  }

  .doCompare2 {
    padding: 5px 15% 5px 15%;
    background-color: #F7F7F7;
    border-radius: 3px;
    color: #5b5656;
    cursor: pointer;
    display: flex;
  }

  .clearCompare2 {
    text-decoration: underline;
    color: #63abfe;
    margin-top: 3%;
    cursor: pointer;
  }

  .textPictureItemImg2 {
    width: 20%;
    height: 100%;
    float: left;
  }

  .textPictureItemTxt2 {
    width: 50%;
    height: 100%;
    /* display: flex; */
    float: left;
    flex-direction: column;
    padding-left: 20px;
    font-size: 12px;
  }

  .textPictureItemTxt2 div {
    display: flex;

  }

  /* .textPictureHandle2 {
    display: flex;
    background-color: #FBFBFB;
    padding: 1px 7px 1px 7px;
    margin-right: 5px;
    border-radius: 3px;
    margin-top: 2px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  } */
  .textPictureHandle2 {
    display: flex;
    width: 1.2rem;
    margin-top: 0.1rem;
    background-color: #FBFBFB;
    padding: 2px 0.05rem;
    margin-right: 5px;
    border-radius: 3px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    -webkit-box-shadow: 1px 1px 5px 2px #ccc;
    box-shadow: 1px 1px 5px 2px #ccc;
  }
  .textPictureHandle2 img{
    display: flex;
  }
  .handleTxt2{
    font-size: 0.1rem;
  }

  .judgedItem2 {
    display: flex;
    justify-content: center;
    cursor: pointer;
    margin-top: 3px;
  }

  .judgedItem2:hover {
    color: #63abfe;
  }

  .handleTxt2:hover {
    color: #63abfe;
  }

  .footer {
    width: 100%;
    height: 60px;
    padding-top: 0.1rem;
    font-size: 0.14rem;
    line-height: 1.5;
    color: #909399;
    text-align: center;
  }

  .footer img {
    margin-right: 0.05rem;
  }

  .btnUpload {
    background-color: #67C23A;
    border: none;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
    border-radius: 3px;
  }

  .wrapper /deep/ .el-dialog__footer {
    padding: 10px 20px 20px;
    text-align: right;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
  }

  .wrapper /deep/ .el-button + .el-button {
    margin-left: 40px;
  }

  .uploadPhoto >>> .el-upload-list {
    display: none;
  }

  .listLeft {
    text-align: right;
    margin-right: 20px;
  }

  #imgItem {
    width: 100%;
    height: 100%;
  }

  .btnReSearch {
    width: 100px;
    height: 30px;
    background-color: #F26F55;
    color: white;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px auto;
    cursor: pointer;
  }

  .rightItem2 .el-icon-close {
    position: absolute;
    top: 0;
    right: 0;
    background-color: black;
    color: white;
    font-size: 12px;
    cursor: pointer;
  }

  .vinfolist ul {
    height: 4rem;
    overflow-y: auto;
  }

</style>

