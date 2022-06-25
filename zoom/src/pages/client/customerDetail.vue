<template>
  <div>
    <div class="page-group">
        <div class="page page-current" id="customerDetail-page">
            <!-- <header v-if="showTitle" class="bar bar-nav" style="background: #0252ff;">
                <div class="button button-link button-nav pull-left back" @click="goback"><span class="icon icon-left" style="color:white;"></span> &nbsp; </div>
                <h1 class="title" style="color:white;">客户详情</h1>
            </header> -->
            <v-header v-if="showTitle" class="bar bar-nav" :title="{ name: '客户详情' }"></v-header>
			<div class="content customer-detail-page" :style="{ top: ($iosSystem + 46) + 'px' }" style="padding-bottom:50px;">
                <div class="content content-client-page-customer-info-detail">
                    <div class="info">
                        <div v-if="customerInfo.homeStatus!=1" class="edit" @click="toCreateHome(customerInfo, 'add')">创建家庭</div>
                        <div v-else class="edit" @click="toCreateHome(customerInfo, 'edit')">编辑家庭</div>
                        <div>
                            <div class="head">
                                <img v-if="customerInfo.avatar" :src="customerInfo.avatar">
                                <img v-else-if="customerInfo.sex===0" src="./../../../public/img/client/header_a_3x.png">
                                <img v-else-if="customerInfo.sex===1" src="./../../../public/img/client/header_b_3x.png">
                                <img v-else src="./../../../public/img/client/header_a_3x.png">
                            </div>
                        </div>
                        <div class="use">
                            <div class="useflex">
                                <div class="useitem">姓名：{{ customerInfo.customerName }}</div>
                                <div class="uselable" v-if="customerInfo.sex==0">性别：男</div>
                                <div class="uselable" v-else-if="customerInfo.sex==1">性别：女</div>
                                <div class="uselable" v-else>性别：未知</div>
                            </div>
                            <div class="useflex">
                                <div class="useitem">电话：
                                  <a v-if="customerInfo.phone != null " :href="'tel:' + customerInfo.phone">{{ customerInfo.phone || ''}}</a>
                                  <a v-else :href="'tel:' + customerInfo.phone">{{ customerInfo.phone || ''}}</a>
                                </div>
                                <!-- <div class="uselable">客户级别：{{ customerInfo.level }}</div> -->
                                <div class="uselable">年龄：{{ customerInfo.age }}</div>
                            </div>
                            <div class="useflex">
                                <div class="useitem">邮箱：{{ customerInfo.email }}</div>
                            </div>
                            <div v-if="customerInfo.cardType==0">证件类型：身份证</div>
                            <div v-else-if="customerInfo.cardType==1">证件类型：护照</div>
                            <div v-else-if="customerInfo.cardType==2">证件类型：军人证</div>
                            <div v-else-if="customerInfo.cardType==3">证件类型：异常身份证</div>
                            <div v-else-if="customerInfo.cardType==4">证件类型：户口本</div>
                            <div v-else-if="customerInfo.cardType==5">证件类型：回乡证</div>
                            <div v-else-if="customerInfo.cardType==6">证件类型：出生证</div>
                            <div v-else-if="customerInfo.cardType==7">证件类型：其他</div>
                            <div v-else-if="customerInfo.cardType==8">证件类型：港澳通行证</div>
                            <div v-else>证件类型：未知</div>
                            <div>证件号码：{{ customerInfo.cardNo }}</div>
                            <div>备注：{{ customerInfo.remark }}</div>
                        </div>
                        <div v-if="customerInfo.customerType==1" class="cancelpoint" @click="beforeChangeType(0)">取消重点客户</div>
                        <div v-if="customerInfo.customerType==0" class="cancelpoint" @click="beforeChangeType(1)">标记重点客户</div>
                    </div>
                    <div class="insurance">
                        <div class="titlest">投保记录</div>
                        <div class="insu">
                            <div>
                                <div>日期</div>
                                <p>产品</p>
                                <div>金额</div>
                                <div>投保状态</div>
                            </div> 
                            <div v-for="(item, index) in policyList" :key="index">
                                <div>{{item.createdDate | formatDate}}</div>
                                <p>{{item.productType}}</p>
                                <div>{{item.amount | curreny}}</div>
                                <div>{{item.policyStatus}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		</div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/assets/js/util/dateFmt';
export default {
  data() {
    return {
      showTitle: true,
      custId: '',
      customerInfo: {},
      policyList: {}
    }
  },
  filters:{
    // 日期格式
    formatDate (time){
      let date = new Date(time)
      return formatDate(date,'yyyy-MM-dd');
    },
    curreny:function(data){
        data = Number(data).toFixed(2);
        if(data==parseInt(data)){
            data = parseInt(data);
        }
        return data;
    }
  },
  created() {
    if(Object.keys(this.$route.query).length !== 0) {
      this.custId=this.$route.query.custId;
    }
    this.queryCustomerInfo();
  },
  methods: {
    // 返回上个页面
    goback: function () {
        history.back();
    },
    // 跳转创建家庭页面
    toCreateHome: function(customerInfo, type) {
      if(type == 'add') {
        this.$router.push({path: '/familyInfo', query:{customerName: customerInfo.customerName, id: customerInfo.id, type: type }})
      } else {
        this.$router.push({path: '/familyInfo', query:{customerName: customerInfo.customerName, id: customerInfo.id, homeId:customerInfo.homeId, type: type }})
      }
    },
    async queryCustomerInfo() {
      const res = await this.$axios({
        url: this.$API.API_CLIENT_CDETAIL,
        method: 'get',
        params: {
            id: this.custId
        }
      });
      if (res.code === 0) {
        this.customerInfo=res.content;
        if(res.content.policyList!=null) {
            this.policyList=JSON.parse(res.content.policyList);
        }
      } else {
        this.$toast(res.content.resultMessage);
      }
    },
    beforeChangeType(cusType){
      if(cusType==0){
        this.$dialog.confirm({
            title: "操作确认",
            message: "确定要取消重点客户吗？",
            confirmButtonText: "确定", //改变确认按钮上显示的文字
            cancelButtonText: "取消" //改变取消按钮上显示的文字
        }).then(()=> {
          this.changeCustomerType(cusType);
        }).catch(() => {
          this.queryCustomerInfo();
        })
      }
      if(cusType==1){
        this.$dialog.confirm({
            title: "操作确认",
            message: "确定要标记为重点客户吗？",
            confirmButtonText: "确定", //改变确认按钮上显示的文字
            cancelButtonText: "取消" //改变取消按钮上显示的文字
        }).then(()=> {
          this.changeCustomerType(cusType);
        }).catch(() => {
          this.queryCustomerInfo();
        })
      }
    },
    async changeCustomerType(cusType) {
      const res = await this.$axios({
        url: this.$API.API_CLIENT_SAVE,
        method: 'post',
        params: {
          id: this.customerInfo.id,
          customerType: cusType
        }
      });
      if (res.code === 0) {
        if(cusType==0){
          this.$toast('取消成功');
        }
        if(cusType==1){
          this.$toast('标记成功');
        }
        setTimeout(() => {
            this.queryCustomerInfo();
        }, 1000);
      } else {
        this.$toast(res.content.resultMessage);
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/less/app/client/customerDetail.less';
</style>