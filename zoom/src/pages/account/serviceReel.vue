<template>
  <div class="serviceReel" :style="{ 'margin-top': ($iosSystem + 45) + 'px' }" >
    <div>
      <v-header :title="{ name: '增值福利劵' }"></v-header>
      <div>
        <div class="serviceReel_cut" :style="{ 'margin-top': ($iosSystem + 45) + 'px' }">
            <div :class="current == '1' ? 'active' : ''" @click="onClick(1)">收入明细</div>
            <div :class="current == '2' ? 'active' : ''" @click="onClick(2)">核销明细</div>
        </div>
        <div class="serviceReel_list" :style="{ 'top': ($iosSystem + 78) + 'px' }">
          <div class="" v-if="current == '1'">
              <div>
                <van-cell title="单元格" label="描述信息" :key="index" v-for="(item,index) in incomeList.data" >
                  <template #title>
                    <div class="title-bar">
                      <div class="title_grid">
                        <span class="grid_name">福利劵</span>
                        <!-- <van-tag class="grid_tag" type="primary"> {{item.isFrozen == 0 ? '冻结中' : '未冻结'}}</van-tag> -->
                      </div>
                      <span>{{item.points || 0}}</span>
                    </div>
                  </template>
                  <template #label>
                    <div class="label-bar">
                      <span>保单号：{{item.policyNo}}</span>
                      <span>{{item.signDate}}</span>
                    </div>
                  </template>
                </van-cell>
                <div class="explain" v-if="UserInfo.manageCode !='28000000' && UserInfo.manageCode !='12000000' " :style="{'margin-top': (!incomeList.data.length ? '46vw' : 0)}">
                  <div>
                    <h4>兑换说明</h4>
                    <div>
                      <!-- <p>1、服务券的生效日期已起保日期为准，未达到起保时间的服务券状态为冻结中，暂时不支持兑换；</p> -->
                      <p>服务券会在工作日当天线下给到“<span>{{statusTxt}}</span>”公众号做对应的配置，次日可以去“<span>{{statusTxt}}</span>”公众号进行兑换，如遇周末或法定节假日顺延兑换时间；</p>
                    </div>
                  </div>
                  <div>
                    <h4>兑换流程</h4>
                    <div>
                      <p>1、关注“<span>{{statusTxt}}</span>”微信公众号；</p>
                      <p>2、公众号首页选择【车主服务】；</p>
                      <p>3、<span>{{statusTxt}}</span>的车主服务平台可选择对应的增值功能按照要求输入对应信息进行相应的权益兑换；或在更多服务中验证身份信息成功后选择卡券转让进行转让操作。</p>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          <div class="" v-if="current == '2'">
             <div>
              <van-cell title="单元格" label="描述信息" :key="index" v-for="(item,index) in cancelList.data" >
                <template #title>
                  <div class="title-bar">
                    <div class="title_grid">
                      <span class="grid_name">核销类型</span>
                      <van-tag class="grid_tag" type="primary">{{item.writeOffType == '1' ? '提现' : '代驾'}}</van-tag>
                    </div>
                    <span>{{item.points}}</span>
                  </div>
                </template>
                <template #label>
                  <div class="label-bar">
                    <span>交易号：{{item.tranNo}}</span>
                    <span>{{item.writeOffDate}}</span>
                  </div>
                </template>
              </van-cell>
            </div>
            <div class="explain" v-if="UserInfo.manageCode !='28000000' && UserInfo.manageCode !='12000000'" :style="{'margin-top': (!cancelList.data.length ? '46vw' : 0)}">
              <div>
                <h4>兑换说明</h4>
                <div>
                 <!-- <p>1、服务券的生效日期已起保日期为准，未达到起保时间的服务券状态为冻结中，暂时不支持兑换；</p> -->
                  <p>服务券会在工作日当天线下给到“<span>{{statusTxt}}</span>”公众号做对应的配置，次日可以去“<span>{{statusTxt}}</span>”公众号进行兑换，如遇周末或法定节假日顺延兑换时间；</p>
                </div>
              </div>
              <div>
                <h4>兑换流程</h4>
                <div>
                  <p>1、关注“<span>{{statusTxt}}</span>”微信公众号；</p>
                  <p>2、公众号首页选择【车主服务】；</p>
                  <p>3、<span>{{statusTxt}}</span>的车主服务平台可选择对应的增值功能按照要求输入对应信息进行相应的权益兑换；或在更多服务中验证身份信息成功后选择卡券转让进行转让操作。</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <my-empty description="查询无数据" v-show="current == '1' ? !incomeList.data.length : !cancelList.data.length "></my-empty>
    </div>
  </div>
</template>

<script>
import configJs from '../../config.js';
import common from '../../assets/js/util/common';
import { mapState } from 'vuex'
export default {
  data() {
    return {
      current:1,
      statusTxt:'晨驾生活',//区分是否河南
      incomeList:{
        data:[],
        count_page: 1,//加载页数
        records:1,//总条数
      },
      cancelList:{
        data:[],
        count_page: 1,//加载页数
        records:1,//总条数
      },
      
    };
  },
  computed:{
    ...mapState({
      UserInfo: state => state.my.UserInfo
    })
  },
  created() {
    if(this.UserInfo.OrgCode.substring(0,2) == '06'){ //代表河南
      this.statusTxt = '车后链';
    }
    this.queryOrderList(1);

    //监听滚动条到最底部
    window.addEventListener('scroll',this.handleScroll,true);
  },
  methods: {
     handleScroll(e){
            //变量scrollTop是滚动条滚动时，距离顶部的距离
            var scrollTop = e.target.scrollTop;
            //变量windowHeight是可视区的高度
            var windowHeight = e.target.clientHeight;
            //变量scrollHeight是滚动条的总高度
            var scrollHeight = e.target.scrollHeight;
            var currentPage =''
            //滚动条到底部的条件
            if(scrollTop+windowHeight+100 > scrollHeight){
               if(this.current == '1'){
                  currentPage = this.incomeList.count_page
                  if(this.incomeList.data.length >= this.incomeList.records){
                  }else{
                    this.queryOrderList(currentPage)
                  }
                }else{
                  currentPage = this.cancelList.count_page
                  if(this.cancelList.data.length >= this.cancelList.records){
                  }else{
                    this.queryOrderList(currentPage)
                  }
                }

            }
        },
   
    onClick(res) {
      this.current = res
      var currentPage = 1
      if(this.current == '1'){
        if(this.incomeList.data.length >= this.incomeList.records){//代表全部请求完不需要在请求
        }else{
          this.queryOrderList(currentPage)
        }
      }else{
        if(this.cancelList.data.length >= this.cancelList.records){
        }else{
          this.queryOrderList(currentPage)
        }
      }
    },
    async queryOrderList(currentPage) {
        const res = await this.$axios({
          url:this.$API.API_MY_SERVICEVOUCHERLIST,
          method: 'post',
          data: {
            pointsType:this.current,
            // agentCode:"X202011051759020524512514313",
            pageSize:10,
            currentPage:currentPage,//页码
            agentCode:localStorage.getItem('agentCode'),
          }
        });
        if (res.code === 0 && res.content) {
          if(this.current == '1'){
            if(this.incomeList.count_page == res.content.pageGrid.page){
              this.incomeList.count_page ++
              this.incomeList.records = res.content.pageGrid.records
              for(let i in res.content.pageGrid.data){
                this.incomeList.data.push(res.content.pageGrid.data[i])
              }
            }
          }else{
            if(this.cancelList.count_page == res.content.pageGrid.page){
              this.cancelList.count_page ++
              this.cancelList.records = res.content.pageGrid.records
              for(let i in res.content.pageGrid.data){
                this.cancelList.data.push(res.content.pageGrid.data[i])
              }
            }
            
          }
          
        // } else {
        //   this.$toast(res.message);
        }
    },

    // 查看详情
    gotoDetail(orderNo, productName) {
      console.info('gotoDetail:' + orderNo);
      this.$router.push({ name: 'orderDetail', params: { 'orderNo': orderNo, 'productName': productName } });
      //this.goPage('orderDetail',?orderNo='+orderNo+"&productName="+productName);
    }
  }
};
</script>

<style lang="less">
@import './../../assets/less/app/account/serviceReel.less';
.serviceReel{
  .serviceReel_cut{
    display: flex;
    background: #0252FF;
    color: #fff;
    text-align: center;
    padding-bottom: 20px;
    .active{
      color: #fff;
    }
    div{
      font-size: 14px;
      color: #B2C9FA;
      flex: 1;
    }
  }
  .serviceReel_list{
    position: fixed;
    width: 100%;
    left: 0;
    right: 0;
    overflow-y: scroll;
    bottom: 0;
    -webkit-overflow-scrolling: touch;
  }
  
  .title_grid{
      display: flex;
      align-items: center;
  }
  .title-bar{
    display: flex;
    justify-content: space-between;
  }
  .label-bar{
    display: flex;
    justify-content: space-between;
  }
  .grid_tag{
    margin-left: 12px;
  }
  .explain{
    padding: 10px 16px;
    font-size: 14px;
    h4{margin: 0;}
    p{margin: 0;}
  }
}
</style>
