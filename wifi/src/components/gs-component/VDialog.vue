<!--
 * @Author: 李志远
 * @Date: 2020-01-13 10:51:06
 * @LastEditTime : 2020-12-24 14:09:46
 * @LastEditors  : Please set LastEditors
 * @Description:
 * @FilePath: \1.6banben\vacp-wfes\src\components\gs-component\VDialog.vue
 * @写bug苦逼，一直写bug一直苦逼
 -->
<template lang="">
  <el-dialog :title="tittle" :visible.sync="visible" width="700px" :height="height" :tagDialog="tagDialog" @close="closeDialog"
    :append-to-body="true" :close-on-press-escape="false" :close-on-click-modal="false" class="tag-dialog" id="tagDialog" style="min-width: 700px"
    @open="openDialog">
    <!--  tab切换 -->
    <div class="tab-title">
      <div class="tab-title-item" :class="{avtive: isActive == 0}" @click.stop="tabHandler1()">
        新增嫌疑目标并关联
      </div>
      <div class="tab-title-item" :class="{avtive: isActive == 1}" @click.stop="tabHandler2()" v-if="disableClick">
        已有嫌疑目标关联
      </div>
      <div class="tab-title-item" :class="{avtive: isActive == 1}" v-else @click.stop="noData()">
        已有嫌疑目标关联
      </div>
    </div>

    <div class="tab-main">
      <!--  新建嫌疑目标 -->
      <el-form class='row' ref='form1' :model='formModel' :rules="rules" status-icon label-width='120px' auto-complete='off'
        inline-message v-show="isActive == 0">
        <el-form-item label='嫌疑目标名称：' prop='susName'>
          <el-input v-model.trim="formModel.susName" maxlength="10" placeholder="请输入嫌疑人名称"></el-input>
        </el-form-item>

        <el-form-item label='嫌疑目标速度：' prop='speed'>
          <el-select v-model="formModel.speed" @change='changeSpeed'>
            <el-option v-for='(item, index) in speedList' :key="index" :label="item.speedName" :value="item.speedValue"></el-option>
          </el-select>
        </el-form-item>

         <el-form-item style="padding-top: 40px; margin-bottom: 0px;">
            <el-button type="primary" class="cancleBtn" @click.stop="closeDialog1" style="padding: 0.1rem 0.2rem;margin-left: 60px">取 消</el-button>
            <el-button type="primary" class="passBtn" v-no-more-click @click.stop="confimHandler1('form1')" style="padding: 0.1rem 0.2rem">确 定</el-button>
         </el-form-item>
      </el-form>

      <el-form class='row' ref='form2' :model='formModel2' :rules="rules2" status-icon label-width='120px' auto-complete='off' inline-message v-show="isActive == 1">
        <el-form-item label='嫌疑目标选择：' prop='suspicion'>
          <el-select v-model.trim="formModel2.suspicion" @change='changeSus'>
            <el-option v-for='(sus, index) in suspcitionList' :key="index" :label="sus.suspicionName" :value="sus.suspicionUuid"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label='嫌疑目标速度：' prop='speed'>
          <el-select v-model="formModel2.speed" :disabled="true"  @change='changeSpeed'>
            <el-option v-for='(item, index) in speedList' :key="index" :label="item.speedName" :value="item.speedValue"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item style="padding-top: 40px; margin-bottom: 0px">
            <el-button type="primary" class="cancleBtn" @click.stop="closeDialog2" style="padding: 0.1rem 0.2rem; margin-left: 60px">取 消</el-button>
            <el-button type="primary" class="passBtn" v-no-more-click @click.stop="confimHandler2('form2')" style="padding: 0.1rem 0.2rem">确 定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>

</template>

<script>
export default {
  name: "VDialog",
  props: {
    tittle: {
      type: String,
      default: "转标注"
    },
    tagDialog: {
      type: Boolean,
      default: false
    },
    tagDataList: {
      type: Array
    },
    width: {
      type: String,
      default: "10%"
    },
    height: {
      type: String,
      default: "700px"
    },
    fromPage: {
      type: [String, Number],
      default: "1"
    }
  },
  data() {
    return {
      visible: this.tagDialog,
      tabList: [
        {
          tabName: "新增嫌疑目标并关联"
        },
        {
          tabName: "已有嫌疑目标关联"
        }
        //   {tabName: '转入公共标注池'},
      ],
      formModel: {
        susName: "",
        speed: "",
        suspicionUuid: ""
      },
      formModel2: {
        suspicion: "",
        speed: "",
        suspicionUuid: ""
      },
      speedList: [],
      suspicion: {},
      rules: {
        susName: [
          {
            required: true,
            message: "请输入嫌疑目标名称",
            trigger: "change"
          }
        ],
        speed: [
          {
            required: true,
            message: "请选择嫌疑目标速度",
            trigger: "change"
          }
        ]
      },
      rules2: {
        suspicion: [
          {
            required: true,
            message: "请选择嫌疑目标",
            trigger: "change"
          }
        ],
        speed: [
          {
            required: true,
            message: "请选择嫌疑目标速度",
            trigger: "change"
          }
        ]
      },
      personDisabled: false,
      isShow: true,
      isActive: 0,
      suspcitionList: [],
      disableClick: true,
      loading: null
    };
  },
  watch: {
    tagDialog() {
      this.visible = this.tagDialog;
    }
  },
  created() {},
  mounted() {
    this.speedFunction();
  },
  methods: {
    // 1：行人，2：车辆，3：骑车人',
    // 打开弹层
    speedFunction() {
      if (this.tagDataList.length > 0 && this.tagDataList[0].typeFlag == 1) {
        this.speedList = [
          {
            speedName: "常速",
            speedValue: "1.39"
          },
          {
            speedName: "快速",
            speedValue: "2.22"
          },
          {
            speedName: "慢速",
            speedValue: "0.83"
          }
        ];
        this.formModel.speed = "1.39";
        this.formModel.susName = "";
        this.formModel.suspicionUuid = "";
        this.formModel2.speed = "1.39";
        this.formModel2.suspicionUuid = "";
        this.formModel2.suspicion = "";
      } else if (
        this.tagDataList.length > 0 &&
        this.tagDataList[0].typeFlag == 2
      ) {
        this.speedList = [
          {
            speedName: "常速",
            speedValue: "4.16"
          },
          {
            speedName: "快速",
            speedValue: "5.55"
          },
          {
            speedName: "慢速",
            speedValue: "2.77"
          }
        ];
        this.formModel.speed = "4.16";
        this.formModel.susName = "";
        this.formModel.suspicionUuid = "";
        this.formModel2.speed = "4.16";
        this.formModel2.suspicionUuid = "";
        this.formModel2.suspicion = "";
      } else if (
        this.tagDataList.length > 0 &&
        this.tagDataList[0].typeFlag == 3
      ) {
        this.speedList = [
          {
            speedName: "常速",
            speedValue: "8.33"
          },
          {
            speedName: "快速",
            speedValue: "13.88"
          },
          {
            speedName: "慢速",
            speedValue: "5.55"
          }
        ];
        this.formModel.speed = "8.33";
        this.formModel.susName = "";
        this.formModel.suspicionUuid = "";
        this.formModel2.speed = "8.33";
        this.formModel2.suspicionUuid = "";
        this.formModel2.suspicion = "";
      }
    },
    openDialog() {
      // this.tabHandler1()
      this.getSuspcition();
      this.speedFunction();
    },
    // 切换目标嫌疑人速度
    changeSpeed(val) {
      // this.formModel.speed = val
    },
    // tab切换
    tabHandler1() {
      this.$nextTick(() => {
        this.isActive = 0;
        this.$refs.form2.resetFields();
      });
    },
    tabHandler2() {
      this.$nextTick(() => {
        this.isActive = 1;
        this.$refs.form1.resetFields();
      });
    },
    noData() {
      this.$notify({
        type: "warning",
        message: "暂无相同类型的嫌疑目标！",
        position: "bottom-right",
        duration: 3000
      });
    },
    //已有目标嫌疑切换类型
    changeSus(val) {
      // this.suspicion = row
      if (val) {
        this.formModel2.suspicionUuid = val;
        for (let i = 0; i < this.suspcitionList.length; i++) {
          if (val == this.suspcitionList[i].suspicionUuid) {
            this.formModel2.speed = this.suspcitionList[i].speed;
          }
        }
      }
    },
    // 关闭弹层
    closeDialog() {
      if (this.$refs.form1) {
        this.$refs.form1.resetFields();
      } else {
        this.$refs.form2.resetFields();
      }
      // this.visible = false
      this.suspcitionList = [];
      // this.speedFunction()
      this.$emit("update:tagDialog", false);
      this.isActive = 0;
    },
    closeDialog1() {
      this.$refs.form1.resetFields();
      this.$emit("update:tagDialog", false);
    },
    closeDialog2() {
      this.$refs.form2.resetFields();
      this.$emit("update:tagDialog", false);
    },
    // 确认转标注
    confimHandler1(formName) {
      //   let reg = /^[A-Za-z0-9\u4e00-\u9fa5_-]*$/
      //   let reg = /^[<>&&./]/
      if (this.$commons.regtest(this.formModel.susName)) {
        this.$notify({
          type: "warning",
          message: "禁止输入特殊字符(<,&,&)",
          position: "bottom-right",
          duration: 2000
        });
        return;
      }
      let susName = this.formModel.susName;
      let speed = this.formModel.speed;
      this.$refs[formName].validate().then(isValid => {
        if (isValid) {
          let data = {
            suspicionName: susName,
            speed: speed,
            suspicionType: this.tagDataList[0].typeFlag,
            caseUuid: this.tagDataList[0].caseUuid
          };
          data = this.$qs.stringify(data);
          this.$http.post("pca/casemng/suspicion/save", data).then(res => {
            if (res.data.code == 200) {
              this.formModel.suspicionUuid = res.data.data.suspicionUuid;
              setTimeout(() => {
                this.establishTagId(res.data.data.suspicionUuid);
              }, 0);
            }
          });
        } else {
          return false;
        }
      });
    },
    // 确认转标注
    confimHandler2(formName) {
      this.$refs[formName].validate().then(isValid => {
        if (isValid) {
          this.establishTagId();
        } else {
          return false;
        }
      });
    },
    // 执行转标注
    establishTagId(id) {
      this.loading = this.$loading({
        lock: true,
        background: "rgba(255,255,255,0.4)",
        text: "转标注中"
      });
      let data = {};
      if (this.fromPage == 2) {
        data = {
          trajectoryUuid: this.tagDataList[0].trajectoryUuid,
          suspicionUuid:
            this.formModel.suspicionUuid || this.formModel2.suspicionUuid
        };
      } else if (this.fromPage == 5) {
        data = {
          targetIds: this.tagDataList.targetIds,
          suspicionUuid: this.formModel2.suspicionUuid || id,
          targetType: this.tagDataList[0].typeFlag
        };
      } else {
        data = {
          targetIds: this.tagDataList.targetIds,
          suspicionUuid: this.formModel2.suspicionUuid || id,
          targetType: this.tagDataList[0].typeFlag
        };
      }
      data = this.$qs.stringify(data);
      this.$http.post("vsas/convert/target/to/mark", data).then(res => {
        this.loading.close();
        if (res.data.code == 200) {
          this.$notify({
            type: "success",
            message: "创建转标注任务成功！",
            position: "bottom-right",
            duration: 3000
          });
          // this.$emit('update:tagDialog', false)
          this.speedFunction();
          // 成功后发射轨迹id,父组件接收,执行删除当前条
          // 这里判断是哪个页面进来的,如果是以图搜图就是1,轨迹列表就是2
          if (this.fromPage == 2) {
            this.$emit("isConvertSuccess", this.tagDataList[0].trajectoryUuid);
          }
          this.$emit("update:tagDialog", false);
          this.$parent.changeSuspicionObj(this.suspicionUuids);
          // this.$emit('update:tagDialog', false)
        } else {
          this.$notify({
            type: "warning",
            message: "创建转标注任务失败！",
            position: "bottom-right",
            duration: 3000
          });
          this.speedFunction();
        }
      });
    },
    // 获取已有嫌疑目标
    getSuspcition() {
      // console.log(this.tagDataList,'22222222');
      let data = {
        caseUuid: this.tagDataList[0].caseUuid,
        suspicionType: this.tagDataList[0].typeFlag
      };
      this.$http
        .get("pca/casemng/suspicion/list/type", {
          params: data
        })
        .then(res => {
          if (res.data.code == 200) {
            if (res.data.data.length == 0) {
              this.disableClick = false;
              return;
            } else {
              this.disableClick = true;
              this.suspcitionList = res.data.data;
            }
          }
        });
    }
  }
};
</script>

<style>
.tag-dialog .el-dialog__wrapper .el-dialog {
  min-width: 700px;
  z-index: 4000 !important;
}

.el-form-item__label {
  color: #99c9fa;
}

.row {
  width: 80%;
  margin: 0 auto;
  padding: 0.2rem 0;
  padding-bottom: 0;
}

.tab-title {
  width: 100%;
  height: 38px;
  display: flex;
  background: #142942;
}

.tab-title-item {
  flex: 1;
  text-align: center;
  line-height: 38px;
  color: #99c9fa;
  cursor: pointer;
}

.avtive {
  color: #409eff !important;
}

.tab-main textarea {
  border: 1px solid #134276 !important;
  width: 100%;
}

.tab-main-two {
  width: 80%;
  text-align: center;
  margin: 0 auto;
  height: 1.5rem;
}

.tab-main-two-el {
  margin-top: 0.3rem;
}

.tab-main-two-text {
  line-height: 1.5rem;
  color: #99c9fa;
}
.tag-dialog .el-input {
  width: 2.15rem;
}
.tag-dialog .el-button {
  border: none;
}
#tagDialog .el-dialog .el-dialog__body {
  padding: 0 !important;
}
.el-form-item--feedback .el-input__validateIcon {
  display: none;
}
</style>
