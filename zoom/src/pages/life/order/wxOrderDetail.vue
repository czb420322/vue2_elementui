<template>
  <div class="orderDetailPage afe-area-inset-bottom">
    <div>
       <div class="carOrderDetail_box">
        <div class="carOrderDetail_order">
          <div class="carOrderDetail_order_mark">订单号{{pageData.insOrder.orderNo}}</div>
          <div class="carOrderDetail_order_status" v-if="pageData.insOrder.orderStatus == '00'">等待确认</div>
          <div class="carOrderDetail_order_status" v-else-if="pageData.insOrder.orderStatus == '01'">待付款</div>
          <div class="carOrderDetail_order_status" v-else-if="pageData.insOrder.orderStatus == '02'">支付中</div>
          <div class="carOrderDetail_order_status" v-else-if="pageData.insOrder.orderStatus == '03'">支付成功</div>
          <div class="carOrderDetail_order_status" v-else-if="pageData.insOrder.orderStatus == '04'">购买失败</div>
          <div class="carOrderDetail_order_status" v-else-if="pageData.insOrder.orderStatus == '05'">交易关闭</div>
          <div class="carOrderDetail_order_status" v-else-if="pageData.insOrder.orderStatus == '06'">逾期关闭</div>
          <div class="carOrderDetail_order_status" v-else-if="pageData.insOrder.orderStatus == '07'">待续保</div>
          <div class="carOrderDetail_order_status" v-else-if="pageData.insOrder.orderStatus == '09'">已超时</div>
          <div class="carOrderDetail_order_status" v-else></div>
        </div>
        <div class="carOrderDetail_list">
          <van-collapse v-model="activeNames">
            <van-collapse-item class="carOrderDetail_item" title="订单信息" name="1" :icon="$CTXBASE + '/img/carInsurance/details@2x.png'">
              <div class="carOrderDetail_list_grid mb12">
                <div class="carOrderDetail_list_grid_name">投保产品</div>
                <div class="carOrderDetail_list_grid_txt">{{pageData.insOrder.productName}}</div>
              </div>
               <div class="carOrderDetail_list_grid mb12">
                <div class="carOrderDetail_list_grid_name">投保份数</div>
                <div class="carOrderDetail_list_grid_txt">{{pageData.insOrder.mult || '1'}}</div>
              </div>
              <div class="carOrderDetail_list_grid mb12" v-if="pageData.propPoliy">
                <div class="carOrderDetail_list_grid_name">保单号</div>
                <div class="carOrderDetail_list_grid_txt">{{pageData.propPoliy}}</div>
              </div>
              <div class="carOrderDetail_list_grid mb12" v-if="pageData.insOrder.orderStatus !='01' ">
                <div class="carOrderDetail_list_grid_name">投保单号</div>
                <div class="carOrderDetail_list_grid_txt">{{pageData.policyList[0].proposalNo || ''}}</div>
              </div>
              <div class="carOrderDetail_list_grid mb12">
                <div class="carOrderDetail_list_grid_name">订单金额</div>
                <div class="carOrderDetail_list_grid_txt">{{pageData.insOrder.orderAmount || 0}}元</div>
              </div>
              <div class="carOrderDetail_list_grid mb12">
                <div class="carOrderDetail_list_grid_name">保险起期</div>
                <div class="carOrderDetail_list_grid_txt">{{pageData.policyList[0].startDate | transformDatesTimestamp()}}</div>
              </div>
            </van-collapse-item>

            <van-collapse-item class="carOrderDetail_item mt12" title="投保人信息" name="2" :icon="$CTXBASE + '/img/carInsurance/cast@2x.png'" >
              <div v-if="pageData.insOrder.productCode == 'GRMOBILE_MALL_SL026' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL041' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL044' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL045' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL046' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL077'">
                <div class="carOrderDetail_list_grid mb12">
                  <div class="carOrderDetail_list_grid_name">企业名称</div>
                  <div class="carOrderDetail_list_grid_txt">{{pageData.applicant.enterprise}}</div>
                </div>
                <div class="carOrderDetail_list_grid mb12">
                  <div class="carOrderDetail_list_grid_name">手机号</div>
                  <div class="carOrderDetail_list_grid_txt">{{pageData.applicant.mobile}}</div>
                </div>
                <div class="carOrderDetail_list_grid mb12">
                  <div class="carOrderDetail_list_grid_name">证件类型</div>
                  <div class="carOrderDetail_list_grid_txt">{{['0', '01'].includes(pageData.applicant.idType)? '身份证' : pageData.applicant.idType == '10'? '统一社会信用代码' : '' }}</div>
                </div>
                <div class="carOrderDetail_list_grid mb12" v-if="pageData.applicant.idType == '10'">
                  <div class="carOrderDetail_list_grid_name">证件号码</div>
                  <div class="carOrderDetail_list_grid_txt">{{pageData.applicant.idNo}}</div>
                </div>
              </div>
              <div v-else>
                <div class="carOrderDetail_list_grid mb12">
                  <div class="carOrderDetail_list_grid_name">姓名</div>
                  <div class="carOrderDetail_list_grid_txt">{{pageData.applicant.name}}</div>
                </div>
                <div class="carOrderDetail_list_grid mb12">
                  <div class="carOrderDetail_list_grid_name">手机号</div>
                  <div class="carOrderDetail_list_grid_txt">{{pageData.applicant.mobile}}</div>
                </div>
                <div class="carOrderDetail_list_grid mb12">
                  <div class="carOrderDetail_list_grid_name">证件类型</div>
                  <div class="carOrderDetail_list_grid_txt">{{['0', '01'].includes(pageData.applicant.idType) ? '身份证' : pageData.applicant.idType == '2' ? '户口本' : pageData.applicant.idType == '16' ? '护照' : pageData.applicant.idType == '13' ? '军人证' : pageData.applicant.idType == '24' ? '港澳通行证' : pageData.applicant.idType == '4' ? '出生证' : pageData.applicant.idType == '6' ? '身份证' : pageData.applicant.idType == '7' ? '出生证' : pageData.applicant.idType == '8' ? '其他' : pageData.applicant.idType == '9' ? '其它证件' : pageData.applicant.idType == '10' ? '统一社会信用代码' : pageData.applicant.idType == '20' ? '营业执照' : pageData.applicant.idType == '15' ? '返乡证' :pageData.applicant.idType == '10' ? '其他'  :'' }}</div>
                </div>
                <div class="carOrderDetail_list_grid mb12">
                  <div class="carOrderDetail_list_grid_name">证件号码</div>
                  <div class="carOrderDetail_list_grid_txt">{{pageData.applicant.idNo}}</div>
                </div>
                <div class="carOrderDetail_list_grid mb12" v-show="pageData.applicant.email">
                  <div class="carOrderDetail_list_grid_name">邮箱</div>
                  <div class="carOrderDetail_list_grid_txt">{{pageData.applicant.email}}</div>
                </div>
                <div class="carOrderDetail_list_grid mb12" v-if="pageData.insOrder.productCode == 'RBTMOBILE_MALL_RBT0003'">
                  <div class="carOrderDetail_list_grid_name">性别</div>
                  <div class="carOrderDetail_list_grid_txt">{{pageData.applicant.sex == '0' ? '男' : '女'}}</div>
                </div>
                <div class="carOrderDetail_list_grid mb12" v-if="pageData.insOrder.productCode == 'RBTMOBILE_MALL_RBT0003' && !!pageData.applicant.birthday">
                  <div class="carOrderDetail_list_grid_name">出生日期</div>
                  <div class="carOrderDetail_list_grid_txt">{{pageData.applicant.birthday | transformDatesTimestamp()}}</div>
                </div>

              </div>
            </van-collapse-item>

            <van-collapse-item class="carOrderDetail_item mt12" title="被保人信息" name="3" :icon="$CTXBASE + '/img/carInsurance/quilt@2x.png'">
              <div v-if="pageData.insOrder.productCode == 'GRMOBILE_MALL_SL026' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL041' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL044' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL045' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL046' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL077'">
                <div v-for="(item,index) in pageData.insured" :key="index">
                  <div class="carOrderDetail_list_grid mb12" >
                    <div class="carOrderDetail_list_grid_name">企业名称</div>
                    <div class="carOrderDetail_list_grid_txt">{{item.enterprise}}</div>
                  </div>
                  <div class="carOrderDetail_list_grid mb12" >
                    <div class="carOrderDetail_list_grid_name">证件类型</div>
                    <div class="carOrderDetail_list_grid_txt">{{['0', '01'].includes(item.idType) ? '身份证' : item.idType == '10'? '统一社会信用代码' : item.idType == '16'? '护照': item.idType == '24'? '港澳通行证' : item.idType == '15'? '返乡证' : '' }}</div>
                  </div>
                  <div class="carOrderDetail_list_grid mb12" >
                    <div class="carOrderDetail_list_grid_name">证件号码</div>
                    <div class="carOrderDetail_list_grid_txt">{{item.idNo}}</div>
                  </div>
                </div>
              </div>
              <div v-else>
                <div v-for="(item,index) in pageData.insured" :key="index">
                  <div class="carOrderDetail_list_grid mb12" >
                    <div class="carOrderDetail_list_grid_name">姓名</div>
                    <div class="carOrderDetail_list_grid_txt">{{item.name}}</div>
                  </div>
                  <div class="carOrderDetail_list_grid mb12" v-if="item.idType">
                    <div class="carOrderDetail_list_grid_name">证件类型</div>
                    <div class="carOrderDetail_list_grid_txt">{{['0', '01'].includes(item.idType) ? '身份证' : item.idType == '2' ? '户口本' : item.idType == '16' ? '护照' : item.idType == '13' ? '军人证' : item.idType == '24' ? '港澳通行证' : item.idType == '4' ? '出生证' : item.idType == '6' ? '身份证' : item.idType == '7' ? '出生证' : item.idType == '8' ? '其他' : item.idType == '9' ? '其它证件' : item.idType == '10' ? '统一社会信用代码' : item.idType == '20' ? '营业执照' : item.idType == '15' ? '返乡证' :'' }}</div>
                    <!-- <div class="carOrderDetail_list_grid_txt">{{['0', '01'].includes(item.idType)? '身份证' : item.idType == '10'? '统一社会信用代码' : item.idType == '16'? '护照': item.idType == '24'? '港澳通行证' : '' }}</div> -->
                  </div>
                  <div class="carOrderDetail_list_grid mb12" v-if="item.idNo">
                    <div class="carOrderDetail_list_grid_name">证件号码</div>
                    <div class="carOrderDetail_list_grid_txt">{{item.idNo}}</div>
                  </div>
                  <div class="carOrderDetail_list_grid mb12" v-if="pageData.insOrder.productCode == 'GRMOBILE_MALL_SL072'">
                    <div class="carOrderDetail_list_grid_name">学校地址/类别</div>
                    <div class="carOrderDetail_list_grid_txt">{{item.address}}</div>
                  </div>
                  <div class="carOrderDetail_list_grid mb12" v-if="pageData.insOrder.productCode == 'RBTMOBILE_MALL_RBT0003'">
                    <div class="carOrderDetail_list_grid_name">性别</div>
                    <div class="carOrderDetail_list_grid_txt">{{item.sex == '0' ? '男' : '女'}}</div>
                  </div>
                  <div class="carOrderDetail_list_grid mb12" v-if="pageData.insOrder.productCode == 'RBTMOBILE_MALL_RBT0003' && !!item.birthday">
                    <div class="carOrderDetail_list_grid_name">出生日期</div>
                    <div class="carOrderDetail_list_grid_txt">{{item.birthday | transformDatesTimestamp()}}</div>
                  </div>
                  <van-divider />
                </div>
              </div>
            </van-collapse-item>
            <!-- 标的信息 -->
            <div v-if="pageData.insOrder.productCode == 'GRMOBILE_MALL_SL002' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL008' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL005' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL013' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL026'|| pageData.insOrder.productCode == 'GRMOBILE_MALL_SL032' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL040'|| pageData.insOrder.productCode == 'GRMOBILE_MALL_SL041' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL044' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL045' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL046'|| pageData.insOrder.productCode == 'GRMOBILE_MALL_SL079' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL077'|| pageData.insOrder.productCode == 'GRMOBILE_MALL_SL082' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL025'|| pageData.insOrder.productCode == 'GRMOBILE_MALL_SL039'|| pageData.insOrder.productCode == 'GRMOBILE_MALL_SL028'|| pageData.insOrder.productCode == 'GRMOBILE_MALL_SL079' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL084' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL087'">
              <van-collapse-item class="carOrderDetail_item mt12" :title="pageData.insOrder.subjectMatter" name="4" :icon="$CTXBASE + '/img/carInsurance/sign@2x.png'">
                <div class="carOrderDetail_list_grid mb12" v-show="pageData.Target.licenseno">
                  <div class="carOrderDetail_list_grid_name">车牌号</div>
                  <div class="carOrderDetail_list_grid_txt">{{pageData.Target.licenseno}}</div>
                </div>
                <div class="carOrderDetail_list_grid mb12" v-show="pageData.Target.frameno">
                  <div class="carOrderDetail_list_grid_name">车架号</div>
                  <div class="carOrderDetail_list_grid_txt">{{pageData.Target.frameno}}</div>
                </div>
                <div v-if="pageData.insOrder.productCode == 'GRMOBILE_MALL_SL002'">
                  <div class="carOrderDetail_list_grid mb12">
                    <div class="carOrderDetail_list_grid_name">座位数</div>
                    <div class="carOrderDetail_list_grid_txt">{{pageData.Target.seatcount}}</div>
                  </div>
                  <div class="carOrderDetail_list_grid mb12">
                    <div class="carOrderDetail_list_grid_name">是否新车</div>
                    <div class="carOrderDetail_list_grid_txt">{{pageData.Target.backup1 == '1'? '是' : '否'}}</div>
                  </div>
                </div>
                <div v-else-if="pageData.insOrder.productCode == 'GRMOBILE_MALL_SL026'">
                  <div class="carOrderDetail_list_grid mb12">
                    <div class="carOrderDetail_list_grid_name">是否新车</div>
                    <div class="carOrderDetail_list_grid_txt">{{pageData.Target.backup1 == '1'? '是' : '否'}}</div>
                  </div>
                  <div class="carOrderDetail_list_grid mb12">
                    <div class="carOrderDetail_list_grid_name">核定载重质量</div>
                    <div class="carOrderDetail_list_grid_txt">{{pageData.Target.cnum}}吨以下</div>
                  </div>
                </div>
                <div v-else-if="pageData.insOrder.productCode == 'GRMOBILE_MALL_SL041' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL044' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL045' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL046' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL077'">
                    <div class="carOrderDetail_list_grid mb12">
                      <div class="carOrderDetail_list_grid_name">座位数</div>
                      <div class="carOrderDetail_list_grid_txt">{{pageData.Target.seatcount}}</div>
                    </div>
                    <div class="carOrderDetail_list_grid mb12">
                      <div class="carOrderDetail_list_grid_name">发动机号</div>
                      <div class="carOrderDetail_list_grid_txt">{{pageData.Target.backup9}}</div>
                    </div>
                </div>
                 <!-- 家财无忧·百万安心险 家财无忧·百万安心险（辽宁） i国任-燃气意外险 i家保-燃气安全意外险（供销专版）标的信息特殊处理 -->
                <div v-else-if="pageData.insOrder.productCode == 'GRMOBILE_MALL_SL025'|| pageData.insOrder.productCode == 'GRMOBILE_MALL_SL039'|| pageData.insOrder.productCode == 'GRMOBILE_MALL_SL028'|| pageData.insOrder.productCode == 'GRMOBILE_MALL_SL079' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL084'">
                    <div class="carOrderDetail_list_grid mb12">
                      <div class="carOrderDetail_list_grid_name">房屋所在地区</div>
                      <div class="carOrderDetail_list_grid_txt">{{pageData.Target.backup3+'/'+pageData.Target.backup5+'/'+pageData.Target.backup7}}</div>
                    </div>
                    <div class="carOrderDetail_list_grid mb12">
                      <div class="carOrderDetail_list_grid_name">房屋详细地址</div>
                      <div class="carOrderDetail_list_grid_txt">{{pageData.Target.ctgtaddr}}</div>
                    </div>
                </div>

              </van-collapse-item>
            </div>

            <van-collapse-item class="carOrderDetail_item mt12" title="保单信息" name="5" :icon="$CTXBASE + '/img/carInsurance/details@2x.png'">
              <div class="datum_box"  v-for="(item,index) in pageData.policyList" :key="index">
                <!-- <div class="detaiUser">
                  <span class="detaiUser_name">保单信息</span>
                  <van-tag type="primary">{{index+1}}</van-tag>
                </div> -->
                <div class="carOrderDetail_list_grid mb12" v-if="item.policyNo">
                  <div class="carOrderDetail_list_grid_name">保单号</div>
                  <div class="carOrderDetail_list_grid_txt">{{item.policyNo}}</div>
                </div>
                 <div class="carOrderDetail_list_grid mb12"  v-if="pageData.insOrder.orderStatus =='01' ">
                  <div class="carOrderDetail_list_grid_name">投保单号</div>
                  <div class="carOrderDetail_list_grid_txt">{{item.proposalNo || ''}}</div>
                </div>
                <div class="carOrderDetail_list_grid mb12">
                  <div class="carOrderDetail_list_grid_name">保费</div>
                  <div class="carOrderDetail_list_grid_txt">{{item.premium}}元</div>
                </div>
                <div class="carOrderDetail_list_grid mb12">
                  <div class="carOrderDetail_list_grid_name">起保时间</div>
                  <div class="carOrderDetail_list_grid_txt" v-if="pageData.insOrder.productCode == 'GRMOBILE_MALL_SL066'">{{pageData.startDate}}</div>
                  <div class="carOrderDetail_list_grid_txt" v-else>{{item.startDate | transformDatesTimestamp()}}</div>
                </div>
                <div class="carOrderDetail_list_grid mb12">
                  <div class="carOrderDetail_list_grid_name">结束时间</div>
                  <div class="carOrderDetail_list_grid_txt" v-if="pageData.insOrder.productCode == 'GRMOBILE_MALL_SL066'">{{pageData.endDate}}</div>
                  <div class="carOrderDetail_list_grid_txt" v-else>{{item.endDate | transformDatesTimestamp()}}</div>
                </div>
              </div>
            </van-collapse-item>
          </van-collapse>

          <div class="detailCheck mt12"  v-if="pageData.insOrder.orderStatus != '03'" @click.stop="checkbox()" style="display: flex;align-items: center;">
            <van-icon name="checked" size="24" color="#1989fa" v-if="checked" />
            <van-icon name="circle" size="24" color="#c8c9cc" v-else />
            <div style="margin-left: 6px;">
               我已阅读并同意签署
              <span class="detailCheck_span" v-if="insuranceUrl != ''" @click.stop="goPage('read?title='+'投保须知'+'&productCode='+pageData.insOrder.productCode+'&look='+1+'&orderNo='+$route.query.orderNo)">《投保须知》</span>
              <span class="detailCheck_span" v-if="occupationUrl != ''" @click.stop="goPage('read?title='+'职业列表'+'&productCode='+pageData.insOrder.productCode+'&look='+1+'&orderNo='+$route.query.orderNo)">《职业列表》</span>
              <span class="detailCheck_span" v-if="clauseUrl != '' " @click.stop="goPage('read?title='+'保险条款'+'&productCode='+pageData.insOrder.productCode+'&look='+1+'&orderNo='+$route.query.orderNo)">《保险条款》</span>
              <span class="detailCheck_span" v-if="liabilityUrl != '' " @click.stop="goPage('read?title='+'责任意外'+'&productCode='+pageData.insOrder.productCode+'&look='+1+'&orderNo='+$route.query.orderNo)">《责任意外》</span>
              <span class="detailCheck_span" v-if="settlement != '' " @click.stop="goPage('read?title='+'理赔服务'+'&productCode='+pageData.insOrder.productCode+'&look='+1+'&orderNo='+$route.query.orderNo)">《理赔服务》</span>
              <span class="detailCheck_span" v-if="problem != '' " @click.stop="goPage('read?title='+'常见问题'+'&productCode='+pageData.insOrder.productCode+'&look='+1+'&orderNo='+$route.query.orderNo)">《常见问题》</span>
              <span class="detailCheck_span" v-if="healthManagement != '' " @click.stop="goPage('read?title='+'健康指南'+'&productCode='+pageData.insOrder.productCode+'&look='+1+'&orderNo='+$route.query.orderNo)">《健康指南》</span>
              <span class="detailCheck_span" v-if="specialMedicine != '' " @click.stop="goPage('read?title='+'特药清单'+'&productCode='+pageData.insOrder.productCode+'&look='+1+'&orderNo='+$route.query.orderNo)">《特药清单》</span>
              <span class="detailCheck_span" v-if="healthNotification != '' " @click.stop="goPage('read?title='+'健康告知'+'&productCode='+pageData.insOrder.productCode+'&look='+1+'&orderNo='+$route.query.orderNo)">《健康告知》</span>
              <span class="detailCheck_span" v-if="productRate != '' " @click.stop="goPage('read?title='+'产品费率'+'&productCode='+pageData.insOrder.productCode+'&look='+1+'&orderNo='+$route.query.orderNo)">《产品费率》</span>
              <span class="detailCheck_span" v-if="equityNotification != ''" @click.stop="goPage('read?title='+'全天候保险代理股份有限公司客户告知书'+'&productCode='+pageData.insOrder.productCode+'&look='+1+'&orderNo='+$route.query.orderNo)">《全天候保险代理股份有限公司客户告知书》</span>
              <span class="detailCheck_span" v-if="entrustAgreementUrl != ''" @click.stop="goPage('read?title='+'经纪服务委托协议书'+'&productCode='+pageData.insOrder.productCode+'&look='+1+'&orderNo='+$route.query.orderNo)">《经纪服务委托协议书》</span>
              <span class="detailCheck_span" v-if="personInsuranceUrl !='' " @click.stop="goPage('read?title='+'个人信息处理授权协议'+'&productCode='+pageData.insOrder.productCode+'&look='+1+'&orderNo='+$route.query.orderNo)" >《个人信息处理授权协议》</span>
            </div>
          </div>

          <br>
        </div>
        <div class="payment_box">
          <div payment_grid>
            <span class="payment_grid_name">应付金额：</span>
            <span class="payment_grid_txt">￥{{pageData.insOrder.orderAmount || 0}}</span>
          </div>
          <van-button class="ubmit_btn" color="linear-gradient(to right, #2E6EF7, #029EFF)" size="small" v-if="((pageData.insOrder.orderStatus=='01' || pageData.insOrder.orderStatus=='02' || pageData.insOrder.orderStatus=='00'))" @click="toPayPage()">立即支付</van-button>
        </div>
      </div>
      <van-action-sheet class="notify_box" v-model="show" title="被保险人健康告知" :lock-scroll="false">
            <div class="notify_content">
              <!-- 百万医疗显示 百万医疗家庭版-->
              <div class="notify" v-if="pageData.insOrder.productCode == 'GRMOBILE_MALL_SL015' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL027' || pageData.insOrder.productCode == 'RBTMOBILE_MALL_RBT0008'">
                  <p>1、被保险人职业是否不属于《国任职业分类表2019版》中的1-4级人员？</p>
                  <p>2、被保险人在最近2年内投保寿险、重大疾病保险、健康保险时，是否被保险公司拒保、延期、加费或附加条件承保？</p>
                  <p>3、被保险人在最近2年内接受X光、超声波、CT、核磁共振、心电图、内窥镜、病理活检、血液、尿液等检查，检查结果是否提示异常？过去2年内是否曾有住院史（不包括剖腹产、顺产、鼻炎、急性胃肠炎、肺炎、上呼吸道感染住院）？</p>
                  <p>4、被保险人在最近1年内是否存在下列症状：</p>
                  <p>反复头痛、晕厥、胸痛、气急、紫绀、持续反复发热、抽搐、不明原因皮下出血点、咯血、反复呕吐、进食梗噎感或吞咽困难、呕血、浮肿、腹痛、黄疸、便血、血尿、蛋白尿、肿块、消瘦（非健身原因所致的体重减轻5公斤以上）？</p>
                  <p>5、被保险人目前或过往是否患有下列疾病：</p>
                  <p>良/恶性肿瘤、2级或以上高血压（收缩压大于等于160mmHg，或舒张压大于等于100mmHg）、冠心病、心肌病、心肌梗死、风湿性心脏病、肺源性心脏病、心功能不全二级（含）以上、主动脉疾病、短暂性脑缺血、脑梗死、脑出血、脑外伤后遗症、癫痫、过去2年内曾发生哮喘持续状态、肺气肿、慢性阻塞性肺病、肺动脉高压、慢性呼吸功能衰竭、支气管扩张症、间质性肺病、肺纤维化、肾髓质囊性病、慢性肾炎、肾功能不全、慢性萎缩性胃炎、肝炎（肝炎病毒携带者）、肝硬化、慢性肝功能衰竭、胆囊息肉、克罗恩病（节段性肠炎）、溃疡性结肠炎、胰腺炎、原发性硬化性胆管炎、再生障碍性贫血、血小板减少性紫癜、血友病、系统性红斑狼疮、类风湿性关节炎、强直性脊柱炎、椎间盘突出症、糖尿病、甲亢、甲状腺结节、阿尔茨海默病、痴呆、帕金森氏病、精神病、慢性酒精中毒、视网膜疾病、角膜疾病、运动神经元病变、严重残疾（包括双目失明、一肢及一肢以上断离、双耳失聪、语言能力丧失）、瘫痪、先天性疾病、遗传性疾病、法定传染病（包含甲类及乙类）、性病、艾滋病及HIV阳性、严重Ⅲ度烧伤、接受重大器官移植或造血干细胞移植术？ </p>
                  <p>6、女性被保险人目前或过往存在下列症状或疾病：</p>
                  <p>乳腺囊肿、乳腺结节、乳房皮肤及乳头有不明原因的凹陷、脱屑、变形、乳头溢液、卵巢囊肿、子宫内膜异位、子宫肌腺症、子宫肌瘤、宫颈炎、盆腔炎、宫颈上皮内瘤变（CIN）、HPV阳性、不规则的阴道流血或排液、恶性葡萄胎？</p>
                  <p>7、被保险人为2周岁以下儿童（含2周岁）：是否早产，且出生体重是否低于2500克？出生时是否有产伤、窒息史、抢救史或被置于保温箱史？是否有畸形、发育迟缓、惊厥、抽搐、脑瘫？</p>
              </div>
                <!-- 少儿学平险显示 -->
              <div class="notify" v-else-if="pageData.insOrder.productCode == 'GRMOBILE_MALL_SL016'">
                  <p>1、被保险人目前或过往是否有疾病未治愈或正接受治疗，或出院后至今未满3个月？</p>
                  <p>2、被保险人目前或过往是否患有下列疾病：</p>
                  <p>恶性肿瘤、白血病、肾炎、肾功能衰竭、肝炎（不包括乙肝小三阳和乙肝病毒携带）、慢性肠炎、脑膜炎（包括流行性脑脊髓膜炎）、脑炎（包括流行性乙型脑炎、脑损伤、III度烧伤、再生障碍性贫血、川崎病、风湿或类风湿病、人类免疫缺陷病毒（HIV）感染、糖尿病、哮喘、未治愈的肺炎、先天性梅毒、癫痫、智障、儿童多动症、遗传性疾病、畸形、脑瘫、小儿麻痹、脊髓灰质炎、麻疹、百日咳、白喉、新生儿破伤风、猩红热、流行性腮腺炎、风疹等？</p>
                  <p>3、被保险人最近一年内是否出现过以下任一症状：</p>
                  <p>不明原因的发热、反复头疼、头晕、气喘、腹痛、咯血、黑便、反复腹泻、紫癜、惊厥、反复呕吐、排尿困难、蛋白尿、抽搐、视力或者听力障碍、原因不明的身体包块或肿物、消瘦（半年内体重下降超过5公斤）？</p>
                  <p>4、最近2年内，被保险人是否做过以下任一项检查并检查结果存在异常：X光、B超、CT、彩超、核磁共振、病理活检、眼底检查、内窥镜等？</p>
                  <p>5、被保险人是否有过下列情况：</p>
                  <p>身体、智力发育情况异常，或目前不能正常饮食、活动，或最近一年内因身患疾病而连续3天以上完全不能从事日常学习或活动？</p>
                  <p>6、被保险人是否有过被保险公司解除合同或投保、复效时被拒保、延期、附加条件承保，或向保险公司索赔重大疾病保险金？</p>
                  <p>7、被保险人是否为体校、警校、武术学校、职业技工类院校在读生？</p>
              </div>
                <!-- i行销—少儿至尊宝保险 乐翻天专属医疗险-->
              <div class="notify" v-else-if="pageData.insOrder.productCode == 'GRMOBILE_MALL_SL017' || pageData.insOrder.productCode == 'GRMOBILE_MALL_SL067'">
                  <p>1. 被保险人目前及过往是否有恶性肿瘤、原位癌、类癌、手术后组织病理活检报告提示为恶性或交界性、慢性乙型肝炎、乙肝大三阳（即HBeAg、HBsAg以及HBcAb均为阳性）、丙型肝炎、肝硬化、慢性萎缩性胃炎、溃疡性结肠炎、克隆病、脑肿瘤、癫痫、免疫缺陷疾病、肾脏疾病、血液疾病、风湿性疾病、精神疾患、智能障碍？</p>
                  <p>2. 被保险人目前及过往是否在接受体格检查、超声波、X线、CT、MRI、内窥镜等检查时，发现有肿物、包块、息肉、囊肿、结节，并且良恶性质或者病因尚未确诊？目前及过往是否在接受肿瘤标志物检查时，发现结果异常？</p>
                  <p>注：</p>
                  <p>（1）如已经接受手术治疗，且术后病理报告提示为良性病变的，如血管瘤、脂肪瘤、皮脂腺囊肿或粉瘤、单纯性甲状腺肿、甲状腺腺瘤、肝囊肿，肾囊肿、错构瘤、炎性假瘤、炎性息肉、成熟畸胎瘤、卵巢良性肿瘤等，则可以投保本保险产品；</p>
                  <p>（2）肿瘤标志物是指特征性存在于恶性肿瘤细胞或由恶性肿瘤细胞异常产生的物质，或是机体对肿瘤刺激反应而产生的物质，如甲胎蛋白（AFP）、癌胚抗原（CEA）、前列腺特异性抗原（PSA）、癌抗原125（CA125）、癌抗原199（CA199）、绒毛膜促性腺激素（HCG）等。</p>
                  <p>3. 最近2年内被保险人是否患有以下不适或症状？</p>
                  <p>反复头痛、长期发热、吞咽困难、呼吸困难、贫血、紫癜、非外伤所致的反复出血（如皮肤、牙龈、鼻腔、颅内、消化道、呼吸道、泌尿道等部位的出血）、肝区不适、肝肿大、脾肿大、长期腹痛、腹水、淋巴结肿大（不包括确诊为炎症或者感染性疾病导致的淋巴结肿大）、不明原因的肢体疼痛或肿胀/关节活动受限/跛行/病理性骨折、非锻炼或节食所致的体重减轻（3个月内体重减轻超过5公斤）？</p>
                  <p>被保险人的近亲属（父母、子女、兄弟、姐妹）中是否有2名或2名以上的成员在60周岁前罹患恶性肿瘤？</p>
                  <p>5. 被保险人如为3周岁以下儿童（含3周岁），请同时告知以下事项：</p>
                  <p>是否早产，且出生体重是否低于2500克？</p>
                  <p>出生时是否有产伤、窒息史、抢救史或被置于保温箱史？</p>
                  <p>是否有畸形、发育迟缓、惊厥、抽搐、脑瘫、先天性疾病、遗传性疾病？</p>
                  <p>6. 被保险人投保重大疾病保险或者恶性肿瘤保险时，是否被拒绝投保、延期、加费或除外？</p>
              </div>
                <!-- 孕妇险显示 -->
              <div class="notify"  v-else-if="pageData.insOrder.productCode == 'GRMOBILE_MALL_SL018'">
                  <p>1.被保险人目前怀孕未超过28周，且孕期检查（血压、尿液、血液、超声检查、产前检查等）未见异常，胎儿未见先天性疾病或异常（如脊柱裂或颅裂、先天性脑积水、先天性室间隔缺损、法氏四联症、完全性大动脉转位、先天性白内障、先天性大脑发育不全、先天性食管闭锁或食管气管瘘）、唇腭裂、先天性肛门闭锁、染色体异常、胎儿畸形或感染）；</p>
                  <p>2.被保险人本次怀孕未采用辅助生殖技术（如人工授精、试管婴儿、胚胎移植等）；本次怀孕为自然怀孕且不超过双胎；</p>
                  <p>3.被保险人曾经或目前未有过下列疾病或异常症状：癌前病变、恶性肿瘤（包括原位癌）、未明确诊断的包块/肿块/结节、贫血、白血病、血友病、高血压（含妊娠高血压）、糖尿病（含妊娠糖尿病）、心脏病、脑出血、脑梗、精神疾病（含抑郁症、焦虑症）、肝硬化、肾脏疾病、妊娠剧吐、瘫痪、癫痫、阴道异常流血、子宫肌瘤、多囊卵巢综合征、子宫畸形、子宫穿孔、葡萄胎、胎盘早剥、前置胎盘、抗磷脂综合征、遗传性疾病、先天性疾病、自身免疫性疾病、智能障碍、失明、聋哑、脊柱或胸廓畸形、使用毒品或违禁药品等；</p>
                  <p>4.被保险人如曾有过剖宫产，本次怀孕距离前一次剖宫产手术间隔时间≥2年；</p>
                  <p>被保险人的近亲属（父母、子女、兄弟、姐妹）中是否有2名或2名以上的成员在60周岁前罹患恶性肿瘤？</p>
                  <p>5.被保险人妊娠前体重指数【体重（kg）/身高（m）的平方】≤23，且一级亲属（父母兄弟姐妹）中无糖尿病患者；</p>
                  <p>6.被保险人投保其他保险公司人身险或健康险产品时未被拒保、延期或附加条件承保。</p>
              </div>

                <!-- i行销—I康保女性计划 -->
              <div class="notify"  v-else-if="pageData.insOrder.productCode == 'GRMOBILE_MALL_SL019'">
                  <p>1.被保险人目前及过往是否有恶性肿瘤、原位癌、类癌、手术后组织病理活检报告提示为恶性或交界性、肥胖（体重指数BMI（体重kg/身高2m2）大于32）、慢性乙型肝炎、乙肝大三阳（即HBeAg、HBsAg以及HBcAb均为阳性）、丙型肝炎、肝硬化、慢性萎缩性胃炎、溃疡性结肠炎、克隆病、免疫缺陷疾病、风湿性疾病？</p>
                  <p>2.被保险人目前及过往是否在接受体格检查、超声波、X线、CT、MRI、内窥镜等检查时，发现有肿物、包块、息肉、囊肿、结节，并且良恶性质或者病因尚未确诊？目前及过往是否在接受肿瘤标志物检查时，发现结果异常？</p>
                  <p>注：</p>
                  <p>（1）如已经接受手术治疗，且术后病理报告提示为良性病变的，如血管瘤、脂肪瘤、皮脂腺囊肿或粉瘤、单纯性甲状腺肿、甲状腺腺瘤、肝囊肿，肾囊肿、错构瘤、炎性假瘤、炎性息肉、成熟畸胎瘤、卵巢良性肿瘤、乳腺囊性增生病（即慢性囊性乳腺病、乳腺病）、乳腺纤维腺瘤、乳管内乳头状瘤等，则可以投保本保险产品；</p>
                  <p>（2）女性被保险人，如已由妇科医师确诊的子宫肌瘤、子宫腺肌病或子宫腺肌瘤、子宫内膜异位囊肿，则可以投保本保险产品；</p>
                  <p>（3）肿瘤标志物是指特征性存在于恶性肿瘤细胞或由恶性肿瘤细胞异常产生的物质，或是机体对肿瘤刺激反应而产生的物质，如甲胎蛋白（AFP）、癌胚抗原（CEA）、前列腺特异性抗原（PSA）、癌抗原125（CA125）、癌抗原199（CA199）、绒毛膜促性腺激素（HCG）等。</p>
                  <p>3.最近2年内被保险人是否患有以下不适或症状？</p>
                  <p>反复头痛、长期发热、吞咽困难、呼吸困难、贫血、紫癜、非外伤所致的反复出血（如皮肤、牙龈、鼻腔、颅内、消化道、呼吸道、泌尿道等部位的出血）、肝区不适、肝肿大、脾肿大、长期腹痛、腹水、淋巴结肿大（不包括确诊为炎症或者感染性疾病导致的淋巴结肿大）、非锻炼或节食所致的体重减轻（3个月内体重减轻超过5公斤）</p>
                  <p>4.（女性适用）被保险人目前及过往是否有以下不适或症状？</p>
                  <p>不规则的阴道流血或排液、子宫异常增大、宫颈上皮内瘤变（CIN）、人类乳头瘤病毒（HPV）阳性、恶性畸胎瘤（即未成熟畸胎瘤）、葡萄胎、绒毛膜癌或其他妊娠滋养细胞疾病；乳头异常溢液、糜烂或回缩；乳房表面皮肤凹陷、皱褶或皮肤收缩？</p>
                  <p>被保险人的近亲属（父母、子女、兄弟、姐妹）中是否有2名或2名以上的成员在60周岁前罹患恶性肿瘤？</p>
                  <p>5.被保险人目前及过往是否每天吸烟超过40支，是否饮酒过量（饮酒过量指的是：啤酒超过1500ml/天，或者白酒超过150ml/天，或者红酒或黄酒超过350ml/天）？</p>
                  <p>6.被保险人的近亲属（父母、子女、兄弟、姐妹）中是否有2名或2名以上的成员在60周岁前罹患恶性肿瘤？</p>
                  <p>7.被保险人所从事的工作及工作环境是否与石棉生产、砷加工、镉、煤焦油、制革、制铝、品红制造、甲醛、异丙醇、石棉粉、芥子气、苯及其有机制品、氯乙烯、放射线等有关？</p>
                  <p>8.被保险人投保重大疾病保险或者恶性肿瘤保险时，是否被拒绝投保、延期、加费或除外？</p>
              </div>
              <!-- i行销—I康保少儿计划 -->
              <div class="notify"  v-else-if="pageData.insOrder.productCode == 'GRMOBILE_MALL_SL020'">
                  <p>1.被保险人目前及过往是否有恶性肿瘤、原位癌、类癌、手术后组织病理活检报告提示为恶性或交界性、慢性乙型肝炎、乙肝大三阳（即HBeAg、HBsAg以及HBcAb均为阳性）、丙型肝炎、肝硬化、慢性萎缩性胃炎、溃疡性结肠炎、克隆病、脑肿瘤、癫痫、免疫缺陷疾病、肾脏疾病、血液疾病、风湿性疾病、精神疾患、智能障碍？</p>
                  <p>2.被保险人目前及过往是否在接受体格检查、超声波、X线、CT、MRI、内窥镜等检查时，发现有肿物、包块、息肉、囊肿、结节，并且良恶性质或者病因尚未确诊？目前及过往是否在接受肿瘤标志物检查时，发现结果异常？</p>
                  <p>注：</p>
                  <p>（1）如已经接受手术治疗，且术后病理报告提示为良性病变的，如血管瘤、脂肪瘤、皮脂腺囊肿或粉瘤、单纯性甲状腺肿、甲状腺腺瘤、肝囊肿，肾囊肿、错构瘤、炎性假瘤、炎性息肉、成熟畸胎瘤、卵巢良性肿瘤、乳腺囊性增生病（即慢性囊性乳腺病、乳腺病）、乳腺纤维腺瘤、乳管内乳头状瘤等，则可以投保本保险产品；</p>
                  <p>（2）女性被保险人，如已由妇科医师确诊的子宫肌瘤、子宫腺肌病或子宫腺肌瘤、子宫内膜异位囊肿，则可以投保本保险产品；</p>
                  <p>（3）肿瘤标志物是指特征性存在于恶性肿瘤细胞或由恶性肿瘤细胞异常产生的物质，或是机体对肿瘤刺激反应而产生的物质，如甲胎蛋白（AFP）、癌胚抗原（CEA）、前列腺特异性抗原（PSA）、癌抗原125（CA125）、癌抗原199（CA199）、绒毛膜促性腺激素（HCG）等。</p>
                  <p>3.最近2年内被保险人是否患有以下不适或症状？</p>
                  <p>反复头痛、长期发热、吞咽困难、呼吸困难、贫血、紫癜、非外伤所致的反复出血（如皮肤、牙龈、鼻腔、颅内、消化道、呼吸道、泌尿道等部位的出血）、肝区不适、肝肿大、脾肿大、长期腹痛、腹水、淋巴结肿大（不包括确诊为炎症或者感染性疾病导致的淋巴结肿大）、非锻炼或节食所致的体重减轻（3个月内体重减轻超过5公斤）</p>
                  <p>4.被保险人的近亲属（父母、子女、兄弟、姐妹）中是否有2名或2名以上的成员在60周岁前罹患恶性肿瘤？</p>
                  <p>5.被保险人如为3周岁以下儿童（含3周岁），请同时告知以下事项：</p>
                  <p>（1）是否早产，且出生体重是否低于2500克？</p>
                  <p>（2）出生时是否有产伤、窒息史、抢救史或被置于保温箱史？</p>
                  <p>（3）是否有畸形、发育迟缓、惊厥、抽搐、脑瘫、先天性疾病、遗传性疾病？</p>
                  <p>6.被保险人投保重大疾病保险或者恶性肿瘤保险时，是否被拒绝投保、延期、加费或除外？</p>
              </div>
              <!-- i行销—I康保老年计划 -->
              <div class="notify"  v-else-if="pageData.insOrder.productCode == 'GRMOBILE_MALL_SL021'">
                  <p>1.被保险人目前及过往是否有恶性肿瘤、原位癌、类癌、手术后组织病理活检报告提示为恶性或交界性、肥胖（体重指数BMI（体重kg/身高2m2）大于32）、慢性乙型肝炎、乙肝大三阳（即HBeAg、HBsAg以及HBcAb均为阳性）、丙型肝炎、肝硬化、慢性萎缩性胃炎、溃疡性结肠炎、克隆病、免疫缺陷疾病、风湿性疾病？</p>
                  <p>2.被保险人目前及过往是否在接受体格检查、超声波、X线、CT、MRI、内窥镜等检查时，发现有肿物、包块、息肉、囊肿、结节，并且良恶性质或者病因尚未确诊？目前及过往是否在接受肿瘤标志物检查时，发现结果异常？</p>
                  <p>注：</p>
                  <p>（1）如已经接受手术治疗，且术后病理报告提示为良性病变的，如血管瘤、脂肪瘤、皮脂腺囊肿或粉瘤、单纯性甲状腺肿、甲状腺腺瘤、肝囊肿，肾囊肿、错构瘤、炎性假瘤、炎性息肉、成熟畸胎瘤、卵巢良性肿瘤、乳腺囊性增生病（即慢性囊性乳腺病、乳腺病）、乳腺纤维腺瘤、乳管内乳头状瘤等，则可以投保本保险产品；</p>
                  <p>（2）女性被保险人，如已由妇科医师确诊的子宫肌瘤、子宫腺肌病或子宫腺肌瘤、子宫内膜异位囊肿，则可以投保本保险产品；</p>
                  <p>（3）肿瘤标志物是指特征性存在于恶性肿瘤细胞或由恶性肿瘤细胞异常产生的物质，或是机体对肿瘤刺激反应而产生的物质，如甲胎蛋白（AFP）、癌胚抗原（CEA）、前列腺特异性抗原（PSA）、癌抗原125（CA125）、癌抗原199（CA199）、绒毛膜促性腺激素（HCG）等。</p>
                  <p>3.最近2年内被保险人是否患有以下不适或症状？</p>
                  <p>反复头痛、长期发热、吞咽困难、呼吸困难、贫血、紫癜、非外伤所致的反复出血（如皮肤、牙龈、鼻腔、颅内、消化道、呼吸道、泌尿道等部位的出血）、肝区不适、肝肿大、脾肿大、长期腹痛、腹水、淋巴结肿大（不包括确诊为炎症或者感染性疾病导致的淋巴结肿大）、非锻炼或节食所致的体重减轻（3个月内体重减轻超过5公斤）</p>
                  <p>4.（女性适用）被保险人目前及过往是否有以下不适或症状？</p>
                  <p>不规则的阴道流血或排液、子宫异常增大、宫颈上皮内瘤变（CIN）、人类乳头瘤病毒（HPV）阳性、恶性畸胎瘤（即未成熟畸胎瘤）、葡萄胎、绒毛膜癌或其他妊娠滋养细胞疾病；乳头异常溢液、糜烂或回缩；乳房表面皮肤凹陷、皱褶或皮肤收缩？</p>
                  <p>5.被保险人目前及过往是否每天吸烟超过40支，是否饮酒过量（饮酒过量指的是：啤酒超过1500ml/天，或者白酒超过150ml/天，或者红酒或黄酒超过350ml/天）？</p>
                  <p>6.被保险人的近亲属（父母、子女、兄弟、姐妹）中是否有2名或2名以上的成员在60周岁前罹患恶性肿瘤？</p>
                  <p>（3）是否有畸形、发育迟缓、惊厥、抽搐、脑瘫、先天性疾病、遗传性疾病？</p>
                  <p>7.被保险人所从事的工作及工作环境是否与石棉生产、砷加工、镉、煤焦油、制革、制铝、品红制造、甲醛、异丙醇、石棉粉、芥子气、苯及其有机制品、氯乙烯、放射线等有关？</p>
                  <p>8.被保险人投保重大疾病保险或者恶性肿瘤保险时，是否被拒绝投保、延期、加费或除外？</p>
              </div>
              <!-- i国任-一年期重疾险 -->
              <div class="notify"  v-else-if="pageData.insOrder.productCode == 'GRMOBILE_MALL_SL022'">
                  <p>1.被保险人近2年内是否因健康异常住院或手术，或被医师提出过住院或手术建议？或因其它慢性疾病需要长期（一个月以上）服药控制或手术治疗？</p>
                  <p>2.被保险人近2年内是否接受过以下检查或检验且结果异常：血常规（白细胞、红细胞、血红蛋白、血小板异常）、空腹血糖、糖化血红蛋白、肝功能、肾功能、甲状腺功能、尿常规、心电图、X线、B超、超声心动图、CT、核磁共振、脑电图、肌电图、内窥镜、肿瘤标记物、病理活检、宫颈TCT检查、眼底检查等？（不包括剖腹产/顺产/鼻炎/急性肠胃炎/肺炎/上呼吸道感染引起住院或检查结果异常）</p>
                  <p>3.被保险人发生过下列任意一项？(1)体格指数(体重 kg/身高²m²)≥32;(2)肢体残疾、只能障碍、语言、咀嚼、视力、听力等机能障碍、瘫痪、昏迷或植物人状态；(3)曾因饮酒、吸烟过度接受治疗，曾使用成瘾性药品、毒品；使用镇定剂、服用或接触有毒、有害物质;(4)正计划到有战乱的国家工作或居住。</p>
                  <p>4.被保险人近6个月内是否存在以下症状或情况：反复头晕、头痛、眩晕、晕厥、咯血、胸闷、胸痛、心慌、肝区痛疼不适、血尿、蛋白尿、便血、肌肉萎缩、复视、消瘦（非减肥或妊娠原因，3个月内体重下降超过5公斤），原因不明的持续发热/皮下出血/声音嘶哑/听力下降？</p>
                  <p>5.被保险人目前或曾经是否患有下列疾病或存在下列情况：</p>
                  <p>①.肿瘤相关疾病: 恶性肿瘤、良性肿瘤（不含子宫肌瘤、乳腺纤维瘤、皮肤良性肿瘤、脂肪瘤、血管瘤）、原位癌、癌前病变、类癌、黑痣破溃或明显增大、不明原因淋巴结肿大、性质不明的息肉、赘生物、结节、囊肿、肿块、占位或包块，包括甲状腺结节、乳腺结节、肺结节。</p>
                  <p>②.循环系统、呼吸系统疾病：高血压（收缩压＞150mmHg或舒张压＞100mmHg）、冠心病、心绞痛、心肌梗塞、心律失常（房早，偶发室早除外）、心功能不全、心脏瓣膜疾病、肺动脉高压、肺心病、川崎病（未累及冠状动脉异常的除外）、周围血管病、心肌病、心包疾病、室壁瘤、心内膜炎、主动脉疾病、先天性心脏病、冠状动脉搭桥、心脏介入或微创治疗；哮喘（中度及以上）、呼吸衰竭、肺淋巴管肌瘤病、肺泡蛋白沉积、肺栓塞、阻塞性睡眠窒息症、尘肺、慢性支气管炎、慢性阻塞性肺疾病、肺气肿、肺结核（未愈）、胸腔积液。     </p>
                  <p>③.神经系统及精神疾病：脑缺血性疾病、蛛网膜下腔出血、脑出血、颅内血管畸形、颅内血管瘤、脑炎、脑膜炎、脑积水、脑损伤、脊髓疾病、脊髓灰质炎、多发性硬化、肌营养不良、肌无力、运动神经元病、瘫痪、脑瘫、癫痫、帕金森症、痴呆、精神分裂症、人格障碍、抑郁症、精神障碍。</p>
                  <p>④.内分泌、消化系统疾病：糖尿病、高脂血症、高尿酸血症、痛风、甲亢、甲减、甲状旁腺功能亢进症、甲状旁腺功能减退症、皮质醇增多症、肾上腺皮质功能减退症、醛固酮增多症；乙型肝炎、丙型肝炎、酒精性肝炎、肝豆状核变性、肝硬化、肝功能失代偿、多囊肝、慢性萎缩性胃炎、克隆病（克罗恩病）、溃疡性结肠炎、肠梗阻、胰腺炎。</p>
                  <p>⑤.血液泌尿及生殖系统疾病：白血病、血友病、紫癜、脾大、再生障碍性贫血、骨髓异常增长综合症、地中海贫血、骨髓增生性疾病、凝血功能障碍、坏疽、中度以上贫血、象皮病；海绵肾、肾炎、肾小球肾炎、肾动脉狭窄、肾病综合征、肾结石（双侧）、肾积水、肾功能不全、肾衰竭、终末期肾病、多囊肾。</p>
                  <p>⑥.皮肤五官及结缔组织疾病：烧伤（I、II度烧伤除外）、类风湿性关节炎、风湿热、干燥综合征、混合性结缔组织病、系统性红斑狼疮、血管炎、系统性硬化病（硬皮病）、强直性脊柱炎、脊柱裂、骨生长不全、坏死性筋膜炎、严重骨质疏松。青光眼、高度近视（800度以上）、视神经或视网膜病变、视力下降或失明、听力下降或失聪、语言障碍</p>
                  <p>⑦.其他：器官移植或造血干细胞移植、残疾、昏迷、植物人状态、智能障碍、先天性疾病、遗传性疾病、头部外伤（未手术及无后遗症除外）、内脏损伤、慢性中毒、重症手足口病、性病、艾滋病或艾滋病病毒携带等。</p>
                  <p>6.（2周岁以下保险人需告知）出生时是否体重低于2.5公斤，或发生早产、窒息、发育迟缓、脑瘫的情况。</p>
                  <p>7.（女性被保险人需告知）是否曾有阴道不规则流血或排液、宫颈上皮肉瘤变(CIN)、人乳头瘤病毒(HPV)阳性、乳房皮肤及乳头不明原因的凹陷、脱屑、变形、乳头溢液？</p>
                  <p>8.被保险人是否曾被保险公司解除合同，投保时曾被拒保、延期、附加条件承保？或近2年内是否曾在其他保险公司投保或正在申请以疾病为给付保险金条件的人身保险（不含本次）累计保额超过80万元？</p>
              </div>
              <!-- 国任.学子安康学平险 -->
              <div class="notify"  v-else-if="pageData.insOrder.productCode == 'GRMOBILE_MALL_SL062'">
                  <p>1.被保险人职业是否不属于《国任职业分类表2021版》中的1-4级人员？</p>
                  <p>2.被保险人在最近2年内投保寿险、重大疾病保险、健康保险时，是否被保险公司拒保、延期、加费或附加条件承保？</p>
                  <p>3.被保险人在最近2年内接受X光、超声波、CT、核磁共振、心电图、内窥镜、病理活检、血液、尿液等检查，检查结果是否提示异常？过去2年内是否曾有住院史（不包括剖腹产、顺产、鼻炎、急性胃肠炎、肺炎、上呼吸道感染住院）？</p>
                  <p>4.被保险人在最近1年内是否存在下列症状：反复头痛、晕厥、胸痛、气急、紫绀、持续反复发热、抽搐、不明原因皮下出血点、咯血、反复呕吐、进食梗噎感或吞咽困难、呕血、浮肿、腹痛、黄疸、便血、血尿、蛋白尿、肿块、消瘦（非健身原因所致的体重减轻5公斤以上）？</p>
                  <p>5.被保险人目前或过往是否患有下列疾病：</p>
                  <p>①.良/恶性肿瘤、2级或以上高血压（收缩压大于等于160mmHg，或舒张压大于等于100mmHg）、冠心病、心肌病、心肌梗死、风湿性心脏病、肺源性心脏病、心功能不全二级（含）以上、主动脉疾病、短暂性脑缺血、脑梗死、脑出血、脑外伤后遗症、癫痫、过去2年内曾发生哮喘持续状态、肺气肿、慢性阻塞性肺病、肺动脉高压、慢性呼吸功能衰竭、支气管扩张症、间质性肺病、肺纤维化、肾髓质囊性病、慢性肾炎、肾功能不全、慢性萎缩性胃炎、肝炎（肝炎病毒携带者）、肝硬化、慢性肝功能衰竭、胆囊息肉、克罗恩病（节段性肠炎）、溃疡性结肠炎、胰腺炎、原发性硬化性胆管炎、再生障碍性贫血、血小板减少性紫癜、血友病、系统性红斑狼疮、类风湿性关节炎、强直性脊柱炎、椎间盘突出症、糖尿病、甲亢、甲状腺结节、阿尔茨海默病、痴呆、帕金森氏病、精神病、慢性酒精中毒、视网膜疾病、角膜疾病、运动神经元病变、严重残疾（包括双目失明、一肢及一肢以上断离、双耳失聪、语言能力丧失）、瘫痪、先天性疾病、遗传性疾病、法定传染病（包含甲类及乙类）、性病、艾滋病及HIV阳性、严重Ⅲ度烧伤、接受重大器官移植或造血干细胞移植术？</p>
                  <p>6.女性被保险人目前或过往存在下列症状或疾病：</p>
                  <p>①.乳腺囊肿、乳腺结节、乳房皮肤及乳头有不明原因的凹陷、脱屑、变形、乳头溢液、卵巢囊肿、子宫内膜异位、子宫肌腺症、子宫肌瘤、宫颈炎、盆腔炎、宫颈上皮内瘤变（CIN）、HPV阳性、不规则的阴道流血或排液、恶性葡萄胎？</p>
                  <p>7.是否从事潜水、滑水、滑雪、驾驶航空器、热气球、滑翔、跳水、跳伞、攀岩、蹦极、空手道、搏击、特技表演、赛车等高风险的行为和爱好。</p>
              </div>
              <!-- 宠物险 -->
              <div class="notify"  v-else-if="pageData.insOrder.productCode == 'GRMOBILE_MALL_SL073'">
                  <p>若被保险人宠物的健康/行为存在以下情况，发生保险事故的，保险公司不承担赔偿责任：</p>
                  <p>1.被保险人的宠物患有先天性疾病</p>
                  <p>2.被保险人的宠物带病投保的情形；</p>
                  <p>3.被保险人的宠物与人共同参与潜水，跳伞，攀岩，探险，滑雪，赛车，赛马，护卫，高危节目拍摄等活动；</p>
                  <p>4.被保险人的宠物在最近1个月内有便血，尿血，呕血，发热，腹胀，黄疸，抽搐，精神萎靡，突然消瘦（1个月内体重减少10％）的情况；</p>
                  <p>5.被保险人的宠物过去被诊断(包括被怀疑)为有以下列疾病：</p>
                  <p>①.肝炎、葡萄膜炎、肝硬化・肝纤维症、内分泌性疾病、胰腺炎・胰脏相关疾病、贫血（介导性溶血性）・IMHA、癫痫、甲状腺疾病、脑积水、副肾皮质疾病、脊髄疾病（椎间盘疝除外）、糖尿病、猫泛白细胞减少症、丝虫病、钩端螺旋体感染、腺病毒感染</p>
              </div>
               <!-- 新i国任·一年期重疾险 -->
              <div class="notify"  v-else-if="pageData.insOrder.productCode== 'GRMOBILE_MALL_SL081'">
                  <p>1.被保险人近2年内是否因健康异常住院或手术，或被医师提出过住院或手术建议？或因其它慢性疾病需要长期（一个月以上）服药控制或手术治疗？</p>
                  <p>2.被保险人近2年内是否接受过以下检查或检验且结果异常：血常规（白细胞、红细胞、血红蛋白、血小板异常）、空腹血糖、糖化血红蛋白、肝功能、肾功能、甲状腺功能、尿常规、心电图、X线、B超、超声心动图、CT、核磁共振、脑电图、肌电图、内窥镜、肿瘤标记物、病理活检、宫颈TCT检查、眼底检查等？（不包括剖腹产/顺产/鼻炎/急性肠胃炎/肺炎/上呼吸道感染引起住院或检查结果异常）</p>
                  <p>3.被保险人发生过下列任意一项？(1)体格指数(体重 kg/身高²m²)≥32;(2)肢体残疾、只能障碍、语言、咀嚼、视力、听力等机能障碍、瘫痪、昏迷或植物人状态；(3)曾因饮酒、吸烟过度接受治疗，曾使用成瘾性药品、毒品；使用镇定剂、服用或接触有毒、有害物质;(4)正计划到有战乱的国家工作或居住。</p>
                  <p>4.被保险人近6个月内是否存在以下症状或情况：反复头晕、头痛、眩晕、晕厥、咯血、胸闷、胸痛、心慌、肝区痛疼不适、血尿、蛋白尿、便血、肌肉萎缩、复视、消瘦（非减肥或妊娠原因，3个月内体重下降超过5公斤），原因不明的持续发热/皮下出血/声音嘶哑/听力下降？</p>
                  <p>5.被保险人目前或曾经是否患有下列疾病或存在下列情况：</p>
                  <p>①.肿瘤相关疾病: 恶性肿瘤、良性肿瘤（不含子宫肌瘤、乳腺纤维瘤、皮肤良性肿瘤、脂肪瘤、血管瘤）、原位癌、癌前病变、类癌、黑痣破溃或明显增大、不明原因淋巴结肿大、性质不明的息肉、赘生物、结节、囊肿、肿块、占位或包块，包括甲状腺结节、乳腺结节、肺结节。</p>
                  <p>②.循环系统、呼吸系统疾病：高血压（收缩压＞150mmHg或舒张压＞100mmHg）、冠心病、心绞痛、心肌梗塞、心律失常（房早，偶发室早除外）、心功能不全、心脏瓣膜疾病、肺动脉高压、肺心病、川崎病（未累及冠状动脉异常的除外）、周围血管病、心肌病、心包疾病、室壁瘤、心内膜炎、主动脉疾病、先天性心脏病、冠状动脉搭桥、心脏介入或微创治疗；哮喘（中度及以上）、呼吸衰竭、肺淋巴管肌瘤病、肺泡蛋白沉积、肺栓塞、阻塞性睡眠窒息症、尘肺、慢性支气管炎、慢性阻塞性肺疾病、肺气肿、肺结核（未愈）、胸腔积液。</p>
                  <p>③.神经系统及精神疾病：脑缺血性疾病、蛛网膜下腔出血、脑出血、颅内血管畸形、颅内血管瘤、脑炎、脑膜炎、脑积水、脑损伤、脊髓疾病、脊髓灰质炎、多发性硬化、肌营养不良、肌无力、运动神经元病、瘫痪、脑瘫、癫痫、帕金森症、痴呆、精神分裂症、人格障碍、抑郁症、精神障碍。</p>
                  <p>④.内分泌、消化系统疾病：糖尿病、高脂血症、高尿酸血症、痛风、甲亢、甲减、甲状旁腺功能亢进症、甲状旁腺功能减退症、皮质醇增多症、肾上腺皮质功能减退症、醛固酮增多症；乙型肝炎、丙型肝炎、酒精性肝炎、肝豆状核变性、肝硬化、肝功能失代偿、多囊肝、慢性萎缩性胃炎、克隆病（克罗恩病）、溃疡性结肠炎、肠梗阻、胰腺炎。</p>
                  <p>⑤.血液泌尿及生殖系统疾病：白血病、血友病、紫癜、脾大、再生障碍性贫血、骨髓异常增长综合症、地中海贫血、骨髓增生性疾病、凝血功能障碍、坏疽、中度以上贫血、象皮病；海绵肾、肾炎、肾小球肾炎、肾动脉狭窄、肾病综合征、肾结石（双侧）、肾积水、肾功能不全、肾衰竭、终末期肾病、多囊肾。</p>
                  <p>⑥.皮肤五官及结缔组织疾病：烧伤（I、II度烧伤除外）、类风湿性关节炎、风湿热、干燥综合征、混合性结缔组织病、系统性红斑狼疮、血管炎、系统性硬化病（硬皮病）、强直性脊柱炎、脊柱裂、骨生长不全、坏死性筋膜炎、严重骨质疏松。青光眼、高度近视（800度以上）、视神经或视网膜病变、视力下降或失明、听力下降或失聪、语言障碍。</p>
                  <p>⑦.其他：器官移植或造血干细胞移植、残疾、昏迷、植物人状态、智能障碍、先天性疾病、遗传性疾病、头部外伤（未手术及无后遗症除外）、内脏损伤、慢性中毒、重症手足口病、性病、艾滋病或艾滋病病毒携带等。</p>
                  <p>6.（2周岁以下保险人需告知）出生时是否体重低于2.5公斤，或发生早产、窒息、发育迟缓、脑瘫的情况。</p>
                  <p>7.（女性被保险人需告知）是否曾有阴道不规则流血或排液、宫颈上皮肉瘤变(CIN)、人乳头瘤病毒(HPV)阳性、乳房皮肤及乳头不明原因的凹陷、脱屑、变形、乳头溢液？</p>
                  <p>8.被保险人是否曾被保险公司解除合同，投保时曾被拒保、延期、附加条件承保？或近2年内是否曾在其他保险公司投保或正在申请以疾病为给付保险金条件的人身保险（不含本次）累计保额超过80万元？</p>
              </div>
               <!-- 山东学平险 只有c d方案显示 -->
              <div class="notify"  v-else-if="pageData.insOrder.productCode == 'GRMOBILE_MALL_SL075' ? (pageData.insOrder.setMealCode == 'C' || pageData.insOrder.setMealCode == 'D') : false">
                  <p>被保险人个人健康告知：</p>
                  <p>1.被保险人是否曾被保险公司拒保、延期、加费或附加条件承保？是否正在或曾经向保险公司提出过重疾或恶性肿瘤保险理赔申请？是否最近一年内累计投保重疾险保额超过100万（不含本次）？</p>
                  <p>2.被保险人过去两年内是否接受X线、CT、核磁共振、心电图、胃肠镜、病理或组织活检、血常规、尿常规、肿瘤标志物等检查，且结果提示异常？</p>
                  <p>3.被保险人过去两年内是否因健康异常住院（不包括已痊愈出院的上呼吸道感染、急性胃肠炎、生理性黄疸、四肢骨折）、手术、连续药物治疗超30天、或被医生建议住院治疗？</p>
                  <p>4.被保险人是否目前或曾经患有下列任一疾病：</p>
                  <p>①.智力障碍、精神疾病、脑外伤后遗症、脑炎后遗症或脑膜炎后遗症、癫痫、运动神经元疾病、多发性硬化、重症肌无力；</p>
                  <p>②.恶性肿瘤、原位癌、癌前病变、颅内肿瘤、脊髓肿瘤、神经系统肿瘤；</p>
                  <p>③.心肌病、心脏扩大或肥大、先天性心脏病、心功能不全、心脏瓣膜病、心包炎；</p>
                  <p>④.哮喘、肺动脉高压、肺纤维化、慢性呼吸衰竭；</p>
                  <p>⑤.肝炎病毒携带、重症肝炎、慢性肝炎、肝衰竭、克罗恩病、溃疡性结肠炎；</p>
                  <p>⑥.糖尿病、慢性肾小球肾炎、肾病综合征、肾功能不全、多囊肾；</p>
                  <p>⑦.白血病、再生障碍性贫血、血友病；</p>
                  <p>⑧.接受器官移植、艾滋病或感染艾滋病病毒；</p>
                  <p>⑨.川崎病、类风湿关节炎、红斑狼疮、肌营养不良、成骨不全症；</p>
                  <p>⑩.III度烧伤、身体或智力残疾（包括肢体残疾、失聪、失明、失语）、瘫痪。</p>
                  <p>5.被保险人最近一年内是否有以下任一症状或疾病：</p>
                  <p>①.性质不明的肿瘤、肿块、结节、息肉、肿物、占位、淋巴结肿大</p>
                  <p>②.体重不增、不明原因的发热、紫癜、贫血、鼻衄、腹痛、腹泻、黑便、黄疸、呼吸困难、血尿、蛋白尿、不明原因声音嘶哑、抽搐、骨或关节疼痛；</p>
              </div>
            </div>
            <div class="select_box">
              <van-button plain hairline type="primary" size="normal" @click="ascertain('1')">全部为“否”</van-button>
              <van-button plain hairline type="primary" size="normal"  @click="ascertain('0')">至少有一项“是”</van-button>
            </div>

      </van-action-sheet>

    </div>



  </div>
</template>

<script>

import util from '../../../assets/js/util/util';
import common from '../../../assets/js/util/common';
import compCheck from '../../../assets/js/util/comp-check';
import glutton from '../../../assets/js/util/glutton';

export default {
  data() {
    return {
      show:false,
      activeNames: ['1'],
      personInsuranceUrl:"",//个人信息处理授权协议
      insuranceUrl: '',//投保需知
      occupationUrl: '',//职业类别
      clauseUrl: '',//保险条款
      liabilityUrl: '',//责任意外
      settlement:'', //理赔服务
      problem:'',//常见问题
      healthManagement:'',//健康服务指南
      specialMedicine:'',//特药清单
      healthNotification:'',//健康告知
      productRate:'',//产品费率
      equityNotification:'', // 全天候保险代理股份有限公司客户告知书
      entrustAgreementUrl:'',
      productDetailInfo: {
        "orderNo": '',
        "propPoliy": '',
        "productName": '',
        "orderStatus": '',
        "orderAmount": '',
        "appntName": '',
        "appntSex": '',
        "insuredName": '',
        "insuredSex": '',
        "benefitName": '',
        "benefitSex": ''
      },
      pageData: {
        "applicant": {},   //投保人
        "insured": {},     //被保人
        "bnf": {},         //受益人
        "payment": {},     //支付订单信息
        "insOrder": {}     //订单基础信息
      },
      checked: false,
    };
  },

 async created() {
    if (sessionStorage.orderDetailInfo) {
      this.pageData = JSON.parse(sessionStorage.orderDetailInfo);
       sessionStorage.setItem('pageData',18120574698);
      }
    this.queryOrderDetail();
    //判断健康告知已选 已阅读投保须知 已阅读保险条款 直接勾选
    window.GluttonContext.traceNo = sessionStorage.traceNo || "";
    // window.GluttonContext.orderNo = this.$route.query.orderNo;
    // window.GluttonContext.policyHolderIdNo = this.pageData.insured[0].idNo;
    // window.GluttonContext.policyHolderMobile = this.pageData.insured[0].mobile;
    // window.GluttonContext.policyHolderName = this.pageData.insured[0].name;
    glutton.startRecording(); // 回溯录制3
    if(this.pageData.insOrder.productCode == 'GRMOBILE_MALL_SL015' || this.pageData.insOrder.productCode == 'GRMOBILE_MALL_SL016' ||  this.pageData.insOrder.productCode == 'GRMOBILE_MALL_SL017' ||  this.pageData.insOrder.productCode == 'GRMOBILE_MALL_SL067' ||  this.pageData.insOrder.productCode == 'GRMOBILE_MALL_SL018' || this.pageData.insOrder.productCode == 'GRMOBILE_MALL_SL019' || this.pageData.insOrder.productCode == 'GRMOBILE_MALL_SL020' || this.pageData.insOrder.productCode == 'GRMOBILE_MALL_SL021' || this.pageData.insOrder.productCode == 'GRMOBILE_MALL_SL022'|| this.pageData.insOrder.productCode == 'GRMOBILE_MALL_SL027' || this.pageData.insOrder.productCode == 'GRMOBILE_MALL_SL062' || this.pageData.insOrder.productCode == 'GRMOBILE_MALL_SL073' || this.pageData.insOrder.productCode == 'GRMOBILE_MALL_SL081' || (this.pageData.insOrder.productCode == 'GRMOBILE_MALL_SL075' && (this.pageData.insOrder.setMealCode == 'C' || this.pageData.insOrder.setMealCode == 'D' ))){
      if(util.getSessionStorageObj("informSetBook") && util.getSessionStorageObj("noticeSetBook") && util.getSessionStorageObj("clauseSetBook") && util.getSessionStorageObj('personInsuranceUrl')){
        this.checked = true
        this.toPayPage()
      }
    }else{//已阅读投保须知 已阅读保险条款 直接勾选
      if(util.getSessionStorageObj("noticeSetBook") && util.getSessionStorageObj("clauseSetBook") && util.getSessionStorageObj('personInsuranceUrl')) {
        this.checked = true
        this.toPayPage()
      }
    }
  },
  async mounted(){
    await glutton.glutton.forceSubmit()
  },
  methods: {
    ascertain(res){
      if(res == '1'){//勾选
        this.show = false
         util.setSessionStorageObj("informSetBook", true);//健康告知已选
        if(!util.getSessionStorageObj("noticeSetBook")){
          this.checked = false
          this.goPage('read?title='+'投保须知'+'&productCode='+this.pageData.insOrder.productCode+'&orderNo='+this.$route.query.orderNo)
        }else if(!util.getSessionStorageObj("clauseSetBook")){
          this.checked = false
          this.goPage('read?title='+'保险条款'+'&productCode='+this.pageData.insOrder.productCode+'&orderNo='+this.$route.query.orderNo)
        }else{
          this.checked = true
        }
      }else{
        this.checked = false
        this.show = false
        this.$toast('抱歉，根据您的健康告知，暂不接受本次投保');
      }
    },
    //判断少儿学平险；百万医疗险；少儿全能保险；国任.学子安康学平险,孕妇险,i行销—I康保女性计划,i行销—I康保少儿计划,i行销—I康保老年计划,i国任-一年期重疾险;百万医疗险家庭版；乐翻天专属医疗险
    checkbox(){
      if(this.pageData.insOrder.productCode == 'RBTMOBILE_MALL_RBT0037' || this.pageData.insOrder.productCode == 'RBTMOBILE_MALL_RBT0035' || this.pageData.insOrder.productCode == 'RBTMOBILE_MALL_RBT0019' ||this.pageData.insOrder.productCode == 'RBTMOBILE_MALL_RBT0008'){
        if(!util.getSessionStorageObj("informSetBook")){//健康告知
          this.checked = false
          if(!util.getSessionStorageObj("numHI")){ //此提示就提示一次
            util.setSessionStorageObj("numHI", true);
            this.$dialog.alert({
              message: '为确保您的权益，请您阅读并勾选《健康告知》《投保须知》《保险条款》《个人信息处理授权协议》!',
            }).then(() => {
              // this.show = true
              this.goPage('notify?'+'productCode='+this.pageData.insOrder.productCode+'&orderNo='+this.$route.query.orderNo)
            });
          }else{
            // this.show = true
              this.goPage('notify?'+'productCode='+this.pageData.insOrder.productCode+'&orderNo='+this.$route.query.orderNo)
          }

        }else if(!util.getSessionStorageObj("noticeSetBook")){
          this.checked = false
          this.goPage('read?title='+'投保须知'+'&productCode='+this.pageData.insOrder.productCode+'&orderNo='+this.$route.query.orderNo)
        }else if(!util.getSessionStorageObj("clauseSetBook")){
          this.checked = false
          this.goPage('read?title='+'个人信息处理授权协议'+'&productCode='+this.pageData.insOrder.productCode+'&orderNo='+this.$route.query.orderNo)
        }else if(!util.getSessionStorageObj("personInsuranceUrl")){

        }else{
        this.checked = !this.checked
        }
      }else if(!util.getSessionStorageObj("noticeSetBook")){
        this.checked = false
        if(!util.getSessionStorageObj("numHI")){//此提示就提示一次
            util.setSessionStorageObj("numHI", true);
          this.$dialog.alert({
            message: '为确保您的权益，请您阅读并勾选《投保须知》《保险条款》《个人信息处理授权协议》!',
          }).then(() => {
            this.goPage('read?title='+'投保须知'+'&productCode='+this.pageData.insOrder.productCode+'&orderNo='+this.$route.query.orderNo)
          });
        }else{
          this.goPage('read?title='+'投保须知'+'&productCode='+this.pageData.insOrder.productCode+'&orderNo='+this.$route.query.orderNo)
        }

      }else if(!util.getSessionStorageObj("clauseSetBook")){
        this.checked = false
        this.goPage('read?title='+'保险条款'+'&productCode='+this.pageData.insOrder.productCode+'&orderNo='+this.$route.query.orderNo)
        
      }else if(!util.getSessionStorageObj('personInsuranceUrl')){
        this.checked = false
        this.goPage('read?title='+'个人信息处理授权协议'+'&productCode='+this.pageData.insOrder.productCode+'&orderNo='+this.$route.query.orderNo)
      }else{
        this.checked = !this.checked
      }

    },
    // 请求PDF协议
    async getpdf(productCode) {
      const res = await this.$axios({
        url: this.$API.API_INSURE_INSURANCE_CLAUSEOCCUPATION,
        method: 'get',
        params: {
          'productCode': productCode
        }
      });
      console.log(res,'个人须知');
      if (res.code === 0) {
        if (res.content) {
          // this.personInsuranceUrl=
          this.insuranceUrl = res.content.insuranceUrl || ''
          this.occupationUrl = res.content.occupationUrl || ''
          this.clauseUrl = res.content.clauseUrl || ''
          this.liabilityUrl = res.content.liabilityUrl || ''
          this.settlement = res.content.settlement || ''
          this.problem = res.content.problem || ''
          this.healthManagement = res.content.healthManagement || ''  
          this.specialMedicine = res.content.specialMedicine ||''
          this.healthNotification = res.content.healthNotification || ''
          this.productRate = res.content.productRate || ''
          this.equityNotification = res.content.equityNotification || ''
          this.entrustAgreementUrl = res.content.entrustAgreementUrl
        }
        // this.userInfo = res.content;
        // this.getInit();
      }
    },
    async queryOrderDetail() {
      this.productDetailInfo.orderNo = this.$route.query.orderNo;
      console.info('orderNo===>' + this.productDetailInfo.orderNo);
      this.isLogin = true;
      const res = await this.$axios({
        url: this.$API.API_ORDER_FINDORDERDETAILS,
        method: 'post',
        data: {
          'insuranceOrderNo': this.productDetailInfo.orderNo
        }
      });
      if (res.resultCode === 0) {
       console.log(res,'res1111111111111111 ');
        sessionStorage.traceNo = res.data[0].traceNo
        /* sessionStorage.setItem('ML',) */
        if(!this.checked ){
           console.log(res,this.productDetailInfo.orderNo,'666666666')
          glutton.startRecording(res.data[0].traceNo); // 回溯录制
        }

        this.pageData = res.data[0];
        // console.log(res.datap[0],'333333333333333333333333333333');
        for(let i in this.pageData.insured){
          if(this.pageData.insured[i].sex){
            this.pageData.insured[i].sex = compCheck.idNoChangeSex(this.pageData.insured[i].idNo)
          }
        }
        this.pageData.applicant.sex =  compCheck.idNoChangeSex(this.pageData.applicant.idNo)
        sessionStorage.orderDetailInfo = JSON.stringify(this.pageData);
        console.log(res.data[0].insOrder.productCode,'参数的虚着呢')
        this.getpdf(res.data[0].insOrder.productCode)
      } else {
        this.$toast(res.resultMsg);
      }
    },
    async toPayPage() {
       //不让支付
      if(this.pageData.allowInsure == '0'){
        this.$toast('当前产品已下架，暂不支持出单!');
        return;
      }

      if (!this.checked) {
        this.$toast('为确保您的权益，请您阅读并勾选《投保须知》《保险条款》《个人信息处理授权协议》!');
        return;
      }
      if (this.pageData.payment && this.pageData.payment.payUrl) {
        glutton.stopRecording(); // 回溯录制
        setTimeout(() => {
          window.location.href = this.pageData.payment.payUrl;
        },500)
      } else {
        const res = await this.$axios({
          url: this.$API.API_INSURE_INPUT_GETPAYURL,
          method: 'get',
          params: {
            insuranceOrderNo: this.productDetailInfo.orderNo
          }
        });
        if (res.code === 0 && res.content.result == '0') {
          glutton.stopRecording(); // 回溯录制
          setTimeout(() => {
            window.location.href = res.content.payUrl;
          },500)
        } else {
          this.$toast(res.content.resultMessage);
        }
      }
    }
  }
};
</script>

<style lang="less">
@import './../../../assets/less/app/life/order/orderDetail.less';
.orderDetailPage {
  .van-nav-bar {
    background: #0252ff;
  }
  .van-nav-bar__title {
    color: #fff;
  }
  .van-nav-bar_right_title {
    color: #fff;
  }
  .van-collapse-item--border::after {
    border-top: 0;
  }
  .carOrderDetail_list_grid_txt {
    text-align: right;
  }
}
.notify_box .select_box{
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
    margin-top: 20px;
}
.notify_box .notify_content{
    margin: auto;
    height: 100%;
    overflow:scroll;
    width: 93%;
    background: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.notify_box .notify_content .notify{
    padding: 10px;
    position: revert;
    height: 56vh;
    p{
      margin: 6px 0;
      font-size: 14px;
    }
}
// .van-dialog{
//   height: 25%;
 
// }
// .van-dialog__header{
//   margin-top: -0.17rem;
// padding-top:4px;
// }
//  .van-dialog--round-button .van-dialog__footer {
//     position: relative;
//     height: auto;
//     padding: 0 24px 0;
//     top: -27px!important;
// }
</style>
