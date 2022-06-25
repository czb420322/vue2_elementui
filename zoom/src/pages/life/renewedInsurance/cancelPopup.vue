<template>
  <div class="cancelPopup">
    <van-popup class="xubao_pop" v-model="popupShow" round>
      <h3 class="xubao_title">为何放弃该保单？</h3>
      <div class="xubao_grid">
        <van-checkbox-group v-model="result" ref="checkboxGroup">
          <van-checkbox name="信息有误，无法联系">信息有误，无法联系</van-checkbox>
          <van-checkbox name="客户转投，弃投">客户转投，弃投</van-checkbox>
          <van-checkbox name="车辆转卖或损坏" v-show="productType == '0'">车辆转卖或损坏</van-checkbox>
          <van-checkbox name="承保规则不支持">承保规则不支持</van-checkbox>
          <van-checkbox name="e">
            <van-field
              class="txt_grid"
              v-model="messageTxt"
              rows="1"
              type="textarea"
              maxlength="140"
              placeholder="补充或其它原因，手动填写最多140字"
            />
          </van-checkbox>
        </van-checkbox-group>
      </div>
      <div class="xubao_pop_bt">
        <van-button type="default" @click="popupShow = false">取消</van-button>
        <van-button class="ensure" type="default" @click="goCancelClaim()">确定</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      popupShow: false,
      result:[],
      messageTxt:'',
      productType:'0',// 非车1 车险0
      tableId:'',//保单id
    };
  },
  computed: {
    ...mapState({
      renewalList: state => state.renewedInsurance.car.renewalList,
    })
  },
  methods: {
    parentMsg(params,tableId) {
      this.popupShow = true;
      this.productType =params;
      this.tableId = tableId
    },
     // 放弃
    async goCancelClaim() {
      if(this.result.length < 1){
        this.$toast('请至少选一项！');
        return
      }
      for(let i in this.result){
        if(this.result[i] == 'e'){
          if(!this.messageTxt){
            this.$toast('请输入补充原因或其它原因！');
            return
          }else{
            this.result.splice(i,1)
            this.result.unshift(this.messageTxt)
          }
        }
      }
       const res = await this.$store.dispatch('renewedInsurance/goCancelClaim', {
          productType: this.productType,  // 非车1 车险0
          tableId: this.tableId,
          reasonList:this.result
        })
        this.popupShow = false;
        if (res.code == 0 && res.content.result == '1') {
          this.$toast('放弃成功');
          if(this.productType == '0'){//  车险续保列表
            let arr = JSON.parse(JSON.stringify(this.renewalList)).filter(item => {
              return item.baseInfo.tableId != this.tableId
            })
            this.$store.commit('renewedInsurance/updateState', [{ name: ['car', 'renewalList'], value: arr }])
          }else{//  非车险续保列表
            let arr = JSON.parse(JSON.stringify(this.renewalList)).filter(item => {
              return item.id != this.tableId
            })
            this.$store.commit('renewedInsurance/updateState', [{ name: ['noCar', 'renewalList'], value: arr }])
          }
          setTimeout(()=>{
            this.onClickLeft()
          },1200)
        } else {
          this.$toast(res.content.resultMessage || res.message || '请求失败');
        }

    },
  }
};
</script>
<style lang="less">
.cancelPopup{
  .xubao_pop{
    width:90%;
    height: 314px;
    .xubao_title{
      text-align: center;
    }
    .xubao_grid{
      margin: 0 12%;
      font-size: 14px;
      .van-checkbox{
        margin-bottom: 12px;
      }
      .van-cell{
        padding:0;
      }
      .txt_grid{
        width: 12rem;
        border: solid 1px #f4f4f4;
      }
    }
    .xubao_pop_bt{
      display: flex;
      position: absolute;
      bottom: 0;
      width: 100%;
      .van-button{
        flex: 1;
        height: 50px;
      }
      .ensure{
        color: #ee0a24;
      }
    }
  }
}
</style>