<template>
  <div>
    <div class="page-group">
        <div class="page page-current" id="clientDetail-page">
            <!-- <header v-if="page.showTitle" class="bar bar-nav" style="background: #0252ff;">
                <a class="button button-link button-nav pull-left back" @click="goback"><span class="icon icon-left" style="color:white;"></span> &nbsp; </a>
                <h1 class="title" style="color:white;">客户详情</h1>
            </header> -->
            <v-header v-if="page.showTitle" class="bar bar-nav" :title="{ name: '客户详情' }"></v-header>
            <div class="content client-detail-page" style="padding-bottom:50px;">
                <div class="clientInfo-title">
                    <h4 class="index-content-title" style="margin: 0.2rem 0px 0.5rem;"><span></span>基础信息</h4>
                </div>
                <div class="clientInfo-div">
                    <div class="list-block">
                        <ul>
                            <li class="item-content h5-item-content">
                                <div class="item-inner h5-item-inner">
                                    <div class="item-title label">客户姓名</div>
                                    <div class="item-input">
                                        <input type="text" readonly="readonly"  value=""  dir="rtl" v-model="clientInfo.cusName">
                                    </div>
                                </div>
                            </li>
                            <li class="item-content h5-item-content">
                                <div class="item-inner h5-item-inner">
                                    <div class="item-title label">电话</div>
                                        <div class="item-input">
                                        <input type="text" readonly="readonly"  value=""  dir="rtl" v-model="clientInfo.cusMobile">
                                    </div>
                                </div>
                            </li>
                            <li class="item-content h5-item-content">
                                <div class="item-inner h5-item-inner">
                                    <div class="item-title label">性别</div>
                                    <div class="item-input">
                                        <template v-if="clientInfo.sex === 'M'">
                                            <input type="text" readonly="readonly"  value="男"  dir="rtl">
                                        </template>
                                        <template v-else-if="clientInfo.sex === 'F'" >
                                                <input type="text" readonly="readonly"  value="女"  dir="rtl">
                                        </template>
                                    </div>
                                </div>
                            </li>
                            <li class="item-content h5-item-content">
                                <div class="item-inner h5-item-inner">
                                    <div class="item-title label">出生日期</div>
                                    <div class="item-input">
                                        <input type="text" readonly="readonly" value=""  dir="rtl" v-model="clientInfo.birthday">
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="clientInfo-title">
                    <h4 class="index-content-title" style="margin: 0.2rem 0px 0.5rem;"><span></span>投保信息</h4>
                </div>
                <div class="clientInfo-div">
                    <div class="list-block">
                        <ul>
                            <li class="item-content h5-item-content">
                                <div class="item-inner h5-item-inner">
                                    <div class="item-title label">是否有社保</div>
                                    <div class="item-input">
                                        <template v-if="clientInfo.socialSecurity === '1'">
                                            <input type="text" readonly="readonly"  value="是"  dir="rtl">
                                        </template>
                                        <template v-else-if="clientInfo.socialSecurity === '0'" >
                                                <input type="text" readonly="readonly"  value="否"  dir="rtl">
                                        </template>
                                    </div>
                                </div>
                            </li>
                            <li class="item-content h5-item-content">
                                <div class="item-inner h5-item-inner">
                                    <div class="item-title label">邮箱</div>
                                        <div class="item-input">
                                        <input type="text" readonly="readonly"  value=""  dir="rtl" v-model="clientInfo.email">
                                    </div>
                                </div>
                            </li>
                            <li class="item-content h5-item-content">
                                <div class="item-inner h5-item-inner">
                                <div class="item-title label">邮政编码</div>
                                    <div class="item-input">
                                        <input type="text" readonly="readonly"  value=""  dir="rtl" v-model="clientInfo.zip">
                                    </div>
                                </div>
                            </li>
                            <li class="item-content h5-item-content">
                                <div class="item-inner h5-item-inner">
                                    <div class="item-title label">家庭住址</div>
                                    <div class="item-input">
                                        <input type="text" readonly="readonly" value=""  dir="rtl" v-model="clientInfo.address">
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="footer-fixd-bottom" style="position: absolute;bottom:1rem;width:90%;margin-left:5%;">
                <div >
                    <div class="row no-gutter no-gutter-shadow">
                        <div class="col-40 footer-btn" style="margin: 0 5%;">
                            <div class="button button-big button-customer-h5 button-total" @click="deleteClient">删	除</div>
                        </div>
                        <div class="col-40 footer-btn" style="margin: 0 5%;">
                            <div class="button button-big button-fill button-customer-h5 button-down" @click="goUpdateClient()">编	辑</div>
                        </div>
                    </div>
                </div>
            </div>
		</div>  
	</div>
	<!-- <v-footer></v-footer> -->
  </div>
</template>

<script>
// import vFooter from "@/templates/footer.vue";
// import util from '@/assets/js/util/util';
export default {
  components: {
    // vFooter: vFooter
  },
  data() {
    return {
      page: {
        autoloader: true,
        showTitle: true
      },
      showTitle: true,
      isUpdateIng: false,
      clientInfo: {
          id: 1,
          sex: '1',
          birthday: "1990-03-08"
      },
      dataEnum: {}
    }
  },
  created() {

  },
  methods: {
    // 返回上个页面
    goback: function () {
        history.back();
    },
    // 删除客户
    deleteClient: function() {
// 
    },
    goUpdateClient: function() {
        this.$router.push({path: '/customerAdd', query:{custId: this.clientInfo.id}})
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/less/app/client/clientDetail.less';
</style>