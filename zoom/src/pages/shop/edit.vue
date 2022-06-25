<template>
  <div class="setUpPage" :style="{ 'margin-top': ($iosSystem + 58) + 'px' }">
    <van-nav-bar :title="title" :border="false" :fixed="true">
      <template #left>
        <van-icon name="arrow-left" color="#fff" size="20" @click="onClickLeft" />
      </template>
      <template #right>
        <span style="color: white;font-size: .83rem; opacity: .85;" @click="editShopInfo" v-if="type != 7" >保存</span>
      </template>
    </van-nav-bar>

    <div>
      <!-- 微店名称 -->
      <van-cell-group v-if="type == 1" style="margin-bottom: 12px;">
        <van-field v-model.trim="shopInfo.msName" label="微店名称" placeholder="请输入微店名称" clearable />
      </van-cell-group>
      <!-- 微店详情 -->
      <van-cell-group v-else-if="type == 2" style="margin-bottom: 12px;">
        <van-field v-model.trim="shopInfo.ownerName" label="微店主人" disabled />
        <van-field v-model.trim="shopInfo.ownerMobile" oninput="value=value.replace(/[^\d]/g,'')" maxlength="11" label="手机号码" placeholder="请输入短信验证码" disabled />
        <van-field v-model.trim="shopInfo.company" label="所属公司" placeholder="请输入所属公司">
          <template #button>
            <van-switch :value="shopInfo.showCompany == '1' ? true : false" @change="shopInfo.showCompany = !shopInfo.showCompany" size="20px" style="margin-bottom: -6px;" />
          </template>
        </van-field>
        <van-field v-model.trim="shopInfo.serviceCustomer" oninput="value=value.replace(/[^\d]/g,'')" label="服务客户数" placeholder="请输入服务客户数">
          <template #button>
            <van-switch :value="shopInfo.showServiceCustomer == '1' ? true : false" @change="shopInfo.showServiceCustomer = !shopInfo.showServiceCustomer" size="20px" style="margin-bottom: -6px;" />
          </template>
        </van-field>
        <van-field v-model.trim="shopInfo.workingYears" oninput="value=value.replace(/[^\d]/g,'')" maxlength="2" label="从业年限" placeholder="请输入从业年限">
          <template #button>
            <van-switch :value="shopInfo.showWorkingYears == '1' ? true : false" @change="shopInfo.showWorkingYears = !shopInfo.showWorkingYears" size="20px" style="margin-bottom: -6px;" />
          </template>
        </van-field>
        <van-field v-model.trim="shopInfo.selfIntroduction" rows="2" autosize label="个人介绍" type="textarea" maxlength="50" placeholder="请输入个人介绍">
          <template #button>
            <van-switch :value="shopInfo.showSelfIntroduction == '1' ? true : false" @change="shopInfo.showSelfIntroduction = !shopInfo.showSelfIntroduction" size="20px" style="margin-bottom: -6px;" />
          </template>
        </van-field>
      </van-cell-group>
      <!-- 微店产品库 -->
      <ol class="tree-item" v-else-if="type == 3">
        <template v-if="productInfoList && productInfoList.length">
          <li class="item" v-for="(item, index) in productInfoList" :key="index">
            <van-checkbox :value="item.checkbox ? true : false" @click="setProductType(item, index)">
              <span style="font-weight: bold;">{{item.channelName}}</span>
            </van-checkbox>
            <van-checkbox v-for="(it, i) in item.items" :key="i" :value="it.isSelected == '1' ? true : false" @click="setProductInfoList(it.isSelected, index, i)">{{it.productName}}</van-checkbox>
          </li>
        </template>
      </ol>
      <!-- 产品分类设置 -->
      <van-cell-group v-else-if="type == 4" style="margin-bottom: 12px;">
        <template v-if="productTypeList && productTypeList.length">
          <van-cell v-for="(item, index) in productTypeList" :key="index" :title="item.typeName">
            <template #right-icon>
              <van-icon name="arrow-up" size="20px" v-if="index" @click.stop="setTypePosition(item, index, (index-1))" />&nbsp;
              <van-icon name="arrow-down" size="20px" v-if="(index + 1) < productTypeList.length" @click.stop="setTypePosition(item, index, (index+1))" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <van-switch :value="item.isOpen == '1' ? true : false" @change="productTypeList[index].isOpen = ( item.isOpen == '1' ? '0' : '1')" size="20px" style="margin-bottom: -6px;" />
            </template>
          </van-cell>
        </template>
      </van-cell-group>
      <!-- 产品设置 -->
      <ol class="tree-item" v-else-if="type == 5">
        <template v-if="productTypeList && productTypeList.length">
          <template v-for="(item, index) in productTypeList">
            <li class="item" :key="index" v-if="item.productDTOList && item.productDTOList.length">
              <h4>{{item.typeName}}</h4>
              <div v-for="(it, i) in item.productDTOList" :key="i">
                <p style="margin: 1.2em 0 .8em">&nbsp;{{(i+1) + '、' + it.productName}}</p>
                <ul class="operate">
                  <li class="btn" @click.stop="setIstop(it, index, i)">
                    <van-icon name="back-top" size="20px" />&nbsp;置顶
                  </li>
                  <li class="btn">
                    <van-icon name="arrow-up" v-if="i" size="20px" @click.stop="setProductPosition(it, index, i, (i-1))" />&nbsp;
                    <van-icon name="arrow-down" v-if="(i + 1) < item.productDTOList.length" size="20px" @click.stop="setProductPosition(it, index, i, (i+1))" />&nbsp;移动
                  </li>
                  <li class="btn" @click.stop="setProductTypeList(it.isOpen, index, i)">
                    <van-switch :value="it.isOpen == '1' ? true : false" size="20px" />&nbsp;{{ it.isOpen == '1' ? '下架' : '上架'}}
                  </li>
                </ul>
              </div>
              <br>
            </li>
          </template>
        </template>
      </ol>
      <!-- 资讯设置 -->
      <ol class="tree-item" v-else-if="type == 6">
        <van-cell title="是否展示资讯" style="background-color: rgba(0,0,0,0);">
          <template #right-icon>
            <van-switch v-model="showNews" inactive-color="rgba(0,0,0,0)" size="20px" style="margin-bottom: -6px;" />
          </template>
        </van-cell>
        <li class="item">
          <van-checkbox v-model="checked" @click="checkAll(checked)">
            <span style="font-weight: bold;">保险咨讯</span>
          </van-checkbox>
          <van-checkbox-group v-model="articleActive" ref="checkboxGroup">
            <van-checkbox v-for="(item, index) in articleList" :key="index" :name="item">{{item.title}}</van-checkbox>
          </van-checkbox-group>
        </li>
      </ol>
      <!-- 微店开关 -->
      <van-cell-group v-else-if="type == 7" style="margin-bottom: 12px;">
        <van-cell title="微店开关">
          <template #right-icon>
            <van-switch v-model="shopIsOpen" size="20px" style="margin-bottom: -6px;" />
          </template>
        </van-cell>
      </van-cell-group>

      <!-- <div style="padding: 30px 20%;"> -->
        <!-- <van-button type="info" block >保存</van-button> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      title: this.$route.meta.title,
      showDialog: false,
      isIos: false,
      agentProfile: '',
      checked: '',
      value: '',
      type: this.$route.query.type,
      result: [],
      shopInfo: {},
      productInfoList: [],
      productTypeList: [],
      articleList: [],
      articleActive: []
    };
  },
  computed: {
    shopIsOpen: {
      get() {
        return this.$store.state.shop.shopInfo.isOpen == '1' ? true : false
      },
      set(value) {
        this.$store.dispatch('shop/editShopInfo', { isOpen: value ? '1' : '0' })
      }
    },
    showNews: {
      get() {
        return this.$store.state.shop.shopInfo.showNews == '1' ? true : false
      },
      set(value) {
        this.$store.dispatch('shop/editShopInfo', { showNews: value ? '1' : '0' })
      }
    }
  },
  created() {
    this.shopInfo = this.$store.state.shop.shopInfo
    this.setTitle()
  },
  methods: {
    // 标题设置
    async setTitle() {
      let title
      if (this.type == 1) {
        title = '微店名称'
      } else if (this.type == 2) {
        title = '微店详情'
      } else if (this.type == 3) {
        title = '微店产品库'
        this.productInfoList = this.$store.state.shop.productInfoList
        await this.$store.dispatch('shop/queryMircoShopProductLibrary', { msId: this.shopInfo.id })
        this.productInfoList = this.$store.state.shop.productInfoList
      } else if (this.type == 4) {
        title = '产品分类设置'
        this.productTypeList = this.$store.state.shop.shopInfo.productTypeList
      } else if (this.type == 5) {
        title = '产品设置'
        this.productTypeList = this.$store.state.shop.shopInfo.productTypeList
      } else if (this.type == 6) {
        title = '资讯设置'
        this.articleList = this.$store.state.shop.articleList
        await this.$store.dispatch('shop/getSelStudyArticleList', { msId: this.shopInfo.id })
        this.articleList = this.$store.state.shop.articleList
        this.articleActive = this.articleList.filter(item => {
          return item.isSelected == '1'
        })
      } else if (this.type == 7) {
        title = '微店开关'
      }
      this.title = title
      document.title = title
    },
    editShopInfo() {
      if (this.type == 1) {
        if (!this.shopInfo.msName) {
          this.$toast('请输入微店名称');
          return;
        }
        // 微店名称
        this.$store.dispatch('shop/editShopInfo', { msName: this.shopInfo.msName })
      } else if (this.type == 2) {
        if (this.shopInfo.showCompany == '1' && !this.shopInfo.company) {
          this.$toast('请输入所属公司');
          return;
        }
        if (this.shopInfo.showServiceCustomer == '1' && !this.shopInfo.serviceCustomer) {
          this.$toast('请输入服务客户');
          return;
        }
        if (this.shopInfo.showWorkingYears == '1' && !this.shopInfo.workingYears) {
          this.$toast('请输入从业年限');
          return;
        }
        if (this.shopInfo.showSelfIntroduction == '1' && !this.shopInfo.selfIntroduction) {
          this.$toast('请输入个人介绍');
          return;
        }
        // 微店详情
        this.$store.dispatch('shop/editShopInfo', {
          ownerMobile: this.shopInfo.ownerMobile,
          company: this.shopInfo.company,
          serviceCustomer: this.shopInfo.serviceCustomer,
          workingYears: this.shopInfo.workingYears,
          selfIntroduction: this.shopInfo.selfIntroduction,
          showMobile: this.shopInfo.showMobile && this.shopInfo.showMobile != '0' ? '1' : '0',
          showCompany: this.shopInfo.showCompany && this.shopInfo.showCompany != '0' ? '1' : '0',
          showServiceCustomer: this.shopInfo.showServiceCustomer && this.shopInfo.showServiceCustomer != '0' ? '1' : '0',
          showWorkingYears: this.shopInfo.showWorkingYears && this.shopInfo.showWorkingYears != '0' ? '1' : '0',
          showSelfIntroduction: this.shopInfo.showSelfIntroduction && this.shopInfo.showSelfIntroduction != '0' ? '1' : '0',
        })
      } else if (this.type == 3) {
        // 微店产品库
        let arr = []
        for (let item of this.productInfoList) {
          for (let it of item.items) {
            if (it.isSelected == '1') {
              arr.push({
                msId: this.shopInfo.id,
                typeCode: it.channelType,
                productCode: it.productCode,
                productName: it.productName,
                isOpen: it.isOpen
              })
            }
          }
        }
        this.$store.dispatch('shop/modifyMircoShopProductList', {
          msId: this.shopInfo.id,
          mircoShopProductList: arr
        })
      } else if (this.type == 4) {
        // 产品分类设置
        this.$store.dispatch('shop/modifyMircoShopProductTypeList', {
          msId: this.shopInfo.id,
          mircoShopProductTypeList: this.productTypeList.map(item => {
            return {
              typeCode: item.typeCode,
              typeName: item.typeName,
              isOpen: item.isOpen
            }
          })
        })
      } else if (this.type == 5) {
        // 产品设置
        let arr = []
        for (let item of this.productTypeList) {
          for (let it of item.productDTOList) {
            arr.push({
              msId: this.shopInfo.id,
              typeCode: it.channelType,
              productCode: it.productCode,
              productName: it.productName,
              isOpen: it.isOpen
            })
          }
        }
        this.$store.dispatch('shop/modifyMircoShopProductList', {
          msId: this.shopInfo.id,
          mircoShopProductList: arr
        })
      } else if (this.type == 6) {
        // 资讯设置
        let arr = this.articleActive.map(item => {
          return {
            studyId: item.id
          }
        })
        this.$store.dispatch('shop/modifyMircoShopNewsList', {
          msId: this.shopInfo.id,
          mircoShopNewsList: arr
        })
      }
    },
    // 微店产品库
    setProductInfoList(isSelected, index, i) {
      this.productInfoList[index].items[i].isSelected = isSelected == '1' ? '0' : '1'
    },
    // 产品设置
    setProductType(item, index) {
      item.checkbox = item.checkbox ? false : true
      item.items.forEach((element, index) => {
        item.items[index].isSelected = (item.checkbox ? '1' : '0')
      })
      this.$set(this.productInfoList, index, item)
    },
    // 置顶
    setIstop(it, index, i) {
      let item = JSON.parse(JSON.stringify(this.productTypeList[index]))
      item.productDTOList = item.productDTOList.filter((item, j) => {
        return i != j
      })
      item.productDTOList.unshift(it)
      this.$set(this.productTypeList, index, item)
    },
    // 产品位置
    setProductPosition(it, index, i, obj) {
      let item = JSON.parse(JSON.stringify(this.productTypeList[index]))
      item.productDTOList = item.productDTOList.filter((item, j) => {
        return i != j
      })
      item.productDTOList.splice(obj, 0, it);
      this.$set(this.productTypeList, index, item)
    },
    // 分类位置
    setTypePosition(item, index, obj) {
      let it = this.productTypeList[obj]
      this.$set(this.productTypeList, index, it)
      this.$set(this.productTypeList, obj, item)
    },
    // 产品设置
    setProductTypeList(isOpen, index, i) {
      this.productTypeList[index].productDTOList[i].isOpen = isOpen == '1' ? '0' : '1'
    },
    checkAll(checked) {
      this.$refs.checkboxGroup.toggleAll(checked);
    }
  }
};
</script>

<style lang="less">
.setUpPage {
  .van-nav-bar {
    background: #0252ff;
  }
  .van-nav-bar__title {
    color: #fff;
  }
  .tree-item {
    .item {
      margin: 3%;
      background-color: white;
      border-radius: 4px;
      padding: 0.4rem;
      .van-checkbox {
        padding: 0.4rem;
      }
      h4 {
        text-align: center;
        margin: 1em 0;
      }
    }
  }
  .operate {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .btn {
      display: flex;
      align-items: center;
      font-size: 14px;
    }
  }
}
</style>
