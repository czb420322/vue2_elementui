<template>
  <div class="approvalPage">
    <v-header :title="{ name: '成为代理人' }"></v-header>
    <div :style="{ 'margin-top': ($iosSystem + 48) + 'px' }">
      <!-- <van-steps :active="active" class="mystep" active-color="#1989fa">
        <van-step>收集资料</van-step>
        <van-step>在线考试</van-step>
        <van-step>签署合同</van-step>
      </van-steps> -->
      <div style="position: relative;">
        <img width="100%" style="display: block;" :src="$CTXBASE + '/img/account/approval_nav.png'" alt="">
        <img style="display: block; position: absolute; top: 3vw; left: 3vw; width: 40%;" :src="$CTXBASE + '/img/account/approval_nav_logo.png'" alt="">
      </div>
      <van-notice-bar
        wrapable
        :scrollable="false"
        text="依照行业监管要求，为了保障您的利益，请准确填写以下实名信息。我们郑重承诺以下信息仅用于为您申请保险执业证且严格保密。"
        mode="closeable"
      />
      <div>
        <H2 class="title_bar">基本信息</H2>
        <div v-for="(item, index) in BaseInfo" :key="index" class="van-hairline--bottom">
          <template v-if="item.type === 'input'">
            <van-field :disabled="item.forbidden ? true : false " :label="item.name" :placeholder="item.holder" v-on:blur="appntInfoEvent('input', item, $event.target.value)" v-model.trim='data[item.code]' :class="item.isNeed === '1' ? 'required' : ''">
              <div v-if="item.code==='agentIdNo' && !item.forbidden" slot="right-icon" class="scanid">
                <input v-if="isIos" type="file" accept="image/*" @change="afterRead($event, 'A')" />
                <img @click="isIos ? null : showPicChoose('A')" src="./../../../public/img/client/ic_scanid.png">
              </div>
              <div v-if="item.code==='bankNo' && !item.forbidden" slot="right-icon" class="scanid">
                <input v-if="isIos" type="file" accept="image/*" @change="afterReadBankCard($event)" />
                <img @click="isIos ? null : showPicChoose('C')" src="./../../../public/img/client/ic_scanid.png">
              </div>
            </van-field>
          </template>
          <template v-else-if="item.type === 'number'">
            <van-field :label="item.name" :placeholder="item.holder" v-on:blur="appntInfoEvent('number', item, $event.target.value)" v-model.trim='data[item.code]' :class="item.isNeed === '1' ? 'required' : ''" />
          </template>
          <template v-else-if="item.type === 'select'">
            <van-field v-if="item.forbidden && item.code =='agentSex' " :disabled="true" :label="item.name" :placeholder="item.holder" v-model.trim="data.agentSex == '0' ? '男' : '女'" />
            <van-field v-else-if="item.forbidden && item.code =='agentIdType' " :disabled="true" :label="item.name" :placeholder="item.holder" v-model.trim="item.edit == '0' ? '身份证' : '' " />
            <van-field v-else-if="data.agentDegree == '其它' && item.code == 'agentDegree' " :label="item.name" v-on:blur="appntInfoEvent('inputEducation', item, educationValue)" v-model.trim='educationValue' placeholder="请输入最高学历" :class="item.isNeed === 'Y' ? 'required' : ''" />
            <eg-data-picker v-else :value="data[item.code]" :placeholder="item.holder" :params="item" :edit="item.edit" @input="data[item.code] = $event.value" @change="appntInfoEvent('select', item, $event)">
            </eg-data-picker>
          </template>
          <template v-else-if="item.type === 'radio'">
            <eg-data-checker :check-val="data[item.code]" :data="item.data" @input="data[item.code] = $event.value" @change="appntInfoEvent('radio', item, $event)">
            </eg-data-checker>
          </template>
          <template v-else-if="item.type === 'date'">
            <van-field v-if="item.forbidden && item.code =='agentBirthday' " :disabled="true" :label="item.name" :placeholder="item.holder" v-model.trim="data[item.code]" />
            <eg-date-picker v-else :type="'date'" :placeholder="item.holder" class="birthdayDate" :params="item" :value="data[item.code]" :min-date="item.data.minDate" :max-date="item.data.maxDate" :edit="item.edit" @input="data[item.code] = $event.value" @change="appntInfoEvent('date', item, $event)">
            </eg-date-picker>
          </template>
          <template v-else-if="item.type === 'stack'">
            <eg-stack-picker :value="data[item.code]" :params="item.data" :title="item.holder" :placeholder="item.holder" @input="data[item.code] = $event.value" @change="appntInfoEvent('stack', item, $event)">
            </eg-stack-picker>
          </template>

        </div>
        <div class="van-hairline--bottom">
          <van-field class="required" readonly clickable name="picker" @click="showPicker = true" :disabled="false" v-model="data.bankName.text" center label="银行名" placeholder="请选择银行名" />

        </div>
        <div class="van-hairline--bottom">
          <van-field class="required" @input="data.mbankNo = ''" v-model="data.openingBank" :disabled="data.bankName.text ? false : true"  center clearable label="开户行行名" placeholder="支持模糊搜索">
            <template #button>
              <span style="color: #0252ff" @click="onOpeningBank">搜索</span>
            </template>
          </van-field>
        </div>  
        <div class="van-hairline--bottom">
          <van-field v-model="data.mbankNo" :disabled="false" center clearable label="开户行行号" placeholder="根据行名自动带出行号" />
        </div>

        <H2 class="title_bar">附件信息</H2>
        <div v-for="(item, index) in AnnexInfo" :key="index+100" class="van-hairline--bottom">
          <template v-if="item.type === 'input'">
            <van-field :label="item.name" :placeholder="item.holder" v-on:blur="appntInfoEvent('input', item, $event.target.value)" v-model.trim='data[item.code]' />
          </template>
          <template v-else-if="item.type === 'number'">
            <van-field :label="item.name" :placeholder="item.holder" v-on:blur="appntInfoEvent('number', item, $event.target.value)" v-model.trim='data[item.code]' />
          </template>
          <template v-else-if="item.type === 'select'">
            <eg-data-picker :value="data[item.code]" :placeholder="item.holder" :params="item" :edit="item.edit" @input="data[item.code] = $event.value" @change="appntInfoEvent('select', item, $event)"></eg-data-picker>
          </template>
          <template v-else-if="item.type === 'radio'">
            <eg-data-checker :check-val="data[item.code]" :data="item.data" @input="data[item.code] = $event.value" @change="appntInfoEvent('radio', item, $event)"></eg-data-checker>
          </template>
          <template v-else-if="item.type === 'date'">
            <eg-date-picker :type="'date'" :placeholder="item.holder" class="birthdayDate" :params="item" :value="data[item.code]" :min-date="item.data.minDate" :max-date="item.data.maxDate" :edit="item.edit" @input="data[item.code] = $event.value" @change="appntInfoEvent('date', item, $event)"></eg-date-picker>
          </template>
          <template v-else-if="item.type === 'stack'">
            <eg-stack-picker :value="data[item.code]" :params="item.data" :title="item.holder" :placeholder="item.holder" @input="data[item.code] = $event.value" @change="appntInfoEvent('stack', item, $event)"></eg-stack-picker>
          </template>
          
          <template v-else-if="item.type === 'img'">
             <div class="education_box" v-if="item.fileGroup==='degree'" :style="{'border-bottom':'solid 0.5rem #eeeeee'}">
              <van-cell center title="学历是否丢失">
                <template #right-icon>
                  <van-switch v-model="educationChecked" size="24" />
                  <div class="education_grid" @click="educationHit()"> <img width="20" height="20" src="./../../../public/img/account/ask.jpg"></div>
                </template>
              </van-cell>
            </div>
            <!-- <uploader-img :value="data[item.code]" :params="item" :title="item.holder" :placeholder="item.holder" @input="data[item.code] = $event.value" @change="appntInfoEvent('stack', item, $event)"></uploader-img> -->
            <!-- <div v-if="!educationChecked || item.name != '高中及以上学历证'"> -->
              <p>{{ item.name }}<span style="color:red;font-size:1rem;">*</span></p>
              <div class="upload upload-form">
                <div v-if="item.fileGroup==='idCardFront'" class="upload-item">
                  <input v-if="isIos" type="file" accept="image/*" @change="afterReadUpload($event, item.fileGroup)" ref="refIdInput" />
                  <img v-if="item.filePicUrl" @click="isIos ? null : showPicChoose(item.fileGroup)" class="ic" :src="item.filePicUrl">
                  <img v-else @click="isIos ? null : showPicChoose(item.fileGroup)" class="ic" src="./../../../public/img/account/carda.png">
                  <i class="bg" @click="reminder()" v-if="item.forbidden"></i>
                  <!-- 控制查看上传样例显示和隐藏 -->
                  <i class="rule" @click="hintExample()" v-show="!controlCss"></i>
                </div>
                <div v-else-if="item.fileGroup==='idPhoto'" class="upload-item">
                  <input v-if="isIos" type="file" accept="image/*" @change="afterReadUpload($event, item.fileGroup)" ref="refIdInput" />
                  <img v-if="item.filePicUrl" @click="isIos ? null : showPicChoose(item.fileGroup)" class="photo" :src="item.filePicUrl">
                  <img v-else @click="isIos ? null : showPicChoose(item.fileGroup)" class="photo" src="./../../../public/img/account/photo.png">
                  <i class="bg" @click="reminder()" v-if="item.forbidden"></i>
                  <!-- 控制查看上传样例显示和隐藏 -->
                  <i class="rule" @click="hintExample()"  v-show="!controlCss"></i>
                </div>
                <!-- 上传银行卡「2张改一张」 -->
                <div v-else-if="item.fileGroup==='bankCardFront'" class="upload-item">
                  <input v-if="isIos" type="file" accept="image/*" @change="afterReadUpload($event, item.fileGroup)" ref="refIdInput" />
                  <img v-if="item.filePicUrl" @click="isIos ? null : showPicChoose(item.fileGroup)" class="ic" :src="item.filePicUrl">
                  <img v-else @click="isIos ? null : showPicChoose(item.fileGroup)" class="ic" src="./../../../public/img/client/img_car.png">
                  <i class="bg" @click="reminder()" v-if="item.forbidden"></i>
                  <!-- 控制查看上传样例显示和隐藏 -->
                  <i class="rule" @click="hintExample()"  v-show="!controlCss"></i>
                </div>
              
                <div v-else-if="item.fileGroup==='degree'" class="upload-item">
                  <input v-if="isIos" type="file" accept="image/*" @change="afterReadUpload($event, item.fileGroup)" ref="refIdInput" />
                  <img v-if="item.filePicUrl" @click="isIos ? null : showPicChoose(item.fileGroup)" class="ic" :src="item.filePicUrl">
                  <img v-else @click="isIos ? null : showPicChoose(item.fileGroup)" class="ic" src="./../../../public/img/client/img_car.png">
                  <i class="bg" @click="reminder()" v-if="item.forbidden"></i>
                  <!-- 控制查看上传样例显示和隐藏 -->
                  <i class="rule" @click="hintExample()"  v-show="!controlCss"></i>
                </div>
              
                <div v-if="item.fileGroup=='idCardFront'" class="upload-item">
                  <input v-if="isIos" type="file" accept="image/*" @change="afterReadUpload($event, 'idCardBack')" ref="refIdInput" />
                  <img v-if="item.fileSecPicUrl" @click="isIos ? null : showPicChoose('idCardBack')" class="ic" :src="item.fileSecPicUrl">
                  <img v-else @click="isIos ? null : showPicChoose('idCardBack')" class="ic" src="./../../../public/img/account/cardb.png">
                  <!-- <img v-else @click="isIos ? null : showPicChoose(item.fileGroup)" class="ic" src="./../../../public/img/account/cardb.png"> -->
                  <i class="bg" @click="reminder()" v-if="item.forbidden"></i>
                  <!-- 控制查看上传样例显示和隐藏 -->
                  <i class="rule" @click="hintExample()" v-show="!controlCss"></i>
                </div>
                <!-- <div v-if="item.fileGroup==='bankCardFront'" class="upload-item">
                  <input v-if="isIos" type="file" accept="image/*" @change="afterReadUpload($event, 'bankCardBack')" ref="refIdInput" />
                  <img v-if="item.fileSecPicUrl" @click="isIos ? null : showPicChoose('bankCardBack')" class="ic" :src="item.fileSecPicUrl">
                  <img v-else @click="isIos ? null : showPicChoose('bankCardBack')" class="ic" src="./../../../public/img/client/img_car.png">
                  <i class="bg" @click="reminder()" v-if="item.forbidden"></i>

                  <i class="rule" @click="hintExample()" v-show="!controlCss"></i>
                </div> -->
              </div>
            <!-- </div> -->
          </template>
          <template v-else-if="item.type === 'file'">
            <!-- <uploader-file :value="data[item.code]" :params="item" :title="item.holder" :placeholder="item.holder" @input="data[item.code] = $event.value" @change="appntInfoEvent('stack', item, $event)"></uploader-file> -->
            <div class="upload-file-flex">
              <div class="upload-file-label">{{ item.name }}</div>
              <div class="upload-file-flexitem">
                <input v-if="isIos" type="file" @change="afterReadUpload($event, item.fileGroup)" ref="refIdInput" />
                <van-button @click="isIos ? null : showPicChoose(item.fileGroup)" type="primary">
                  <van-icon name="plus" />上传文件
                </van-button>
              </div>
            </div>
            <!-- <img @click="isIos ? null : showPicChoose(item.fileGroup)" class="ic" src="./../../../public/img/client/img_car.png"> -->
          </template>
        </div>
        <van-checkbox class="approval_checked" v-model="checked" icon-size="24px">本人确认以上信息真实有效</van-checkbox>

        <div class="afe-area-inset-bottom" style="padding: 16px;">
          <van-button round block type="info" @click="onSubmit">{{hitTxt}}</van-button>
        </div>
      </div>
      <!-- 选择拍照相册选择 -->
      <van-dialog v-model="showDialog" :title="null" :showConfirmButton="false" :closeOnClickOverlay="true">
        <van-cell-group title="请选择图片来源">
          <van-cell @click="goGetPic(cardFaceType)" title="相册" />
          <van-cell @click="goGetCamera(cardFaceType)" title="拍照" />
        </van-cell-group>
      </van-dialog>
        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="BankClass"
            @confirm="onConfirm"
            @cancel="showPicker = false"
          />
        </van-popup>

      <van-popup v-model="show" closeable position="bottom">
        <div class="hint_box">
            <van-swipe class="my-swipe"  indicator-color="#0252ff">
              <van-swipe-item>
                <div class="hint">
                  <h4 class="hint_title">身份证上传示例</h4>
                  <div class="hint_grid_top">
                    <img class="img_max" src="./../../../public/img/account/zc.jpg" alt="">
                    <div class="interior_grid">
                        <div class="group">
                          <van-icon name="success" />
                          <span>四角完整</span>
                        </div>
                        <div>
                        <van-icon name="success" />
                          <span>亮度均匀</span>
                        </div>
                        <div>
                          <van-icon name="success" />
                          <span>照片清晰</span>
                        </div>
                    </div>
                  </div>
                  <van-divider />
                  <div class="hint_grid_bottom">
                    <div class="bottom_interior">
                      <div>
                        <img class="bottom_interior_img" src="./../../../public/img/account/cw-qb.jpg" alt="">
                        <div class="bottom_grid">
                          <van-icon class="bottom_icon" name="cross" />
                          <span>缺边</span>
                        </div>
                      </div>
                      <div>
                        <img  class="bottom_interior_img" src="./../../../public/img/account/cw-mf.jpg" alt="">
                        <div  class="bottom_grid">
                          <van-icon  class="bottom_icon" name="cross" />
                          <span>模糊</span>
                        </div>
                      </div>
                      <div>
                        <img  class="bottom_interior_img" src="./../../../public/img/account/cw-fg.jpg" alt="">
                        <div class="bottom_grid">
                          <van-icon  class="bottom_icon" name="cross" />
                          <span>反光</span>
                        </div>
                      </div>
                    </div>
                    <div class="tips_box">
                      <p class="tips_box_name">小贴士：</p>
                      身份证请上传有效期内的二代身份证原件照片（复印件、翻拍件、临时身份证等均不能通过验证）。确保身份证四角边框完整，文字图案清晰可见，背景简洁、无遮挡、无反光。
                    </div>
                  </div>
                </div>
              </van-swipe-item>
              <van-swipe-item>
                <div class="hint">
                  <h4 class="hint_title">银行卡上传示例</h4>
                  <div class="hint_grid_top">
                    <img class="img_max" src="./../../../public/img/account/yhk-zq.jpg" alt="">
                    <div class="interior_grid">
                        <div class="group">
                          <van-icon name="success" />
                          <span>四角完整</span>
                        </div>
                        <div>
                        <van-icon name="success" />
                          <span>亮度均匀</span>
                        </div>
                        <div>
                          <van-icon name="success" />
                          <span>照片清晰</span>
                        </div>
                    </div>
                  
                  </div>
                  <van-divider />
                  <div class="hint_grid_bottom">
                    <div class="bottom_interior">
                      <div>
                        <img class="bottom_interior_img" src="./../../../public/img/account/yhk-cw-qj.jpg" alt="">
                        <div class="bottom_grid">
                          <van-icon class="bottom_icon" name="cross" />
                          <span>缺边</span>
                        </div>
                      </div>
                      <div>
                        <img  class="bottom_interior_img" src="./../../../public/img/account/yhk-cw-mf.jpg" alt="">
                        <div  class="bottom_grid">
                          <van-icon  class="bottom_icon" name="cross" />
                          <span>模糊</span>
                        </div>
                      </div>
                      <div>
                        <img  class="bottom_interior_img" src="./../../../public/img/account/yhk-cw-fg.jpg" alt="">
                        <div class="bottom_grid">
                          <van-icon  class="bottom_icon" name="cross" />
                          <span>反光</span>
                        </div>
                      </div>
                    </div>
                    <div class="tips_box">
                      <p class="tips_box_name">小贴士：</p>
                      银行卡请上传有效期内的原件照片（复印件、翻拍件均不能通过验证）。确保银行卡四角边框完整，文字图案清晰可见，背景简洁、无遮挡、无反光。
                    </div>
                  </div>
                </div>
              </van-swipe-item>
              <van-swipe-item>
                <div class="hint">
                  <h4 class="hint_title">证件照上传示例</h4>
                  <div class="hint_grid_top">
                    <img class="img_max" src="./../../../public/img/account/zjz-zq.jpg" alt="">
                    <div class="interior_grid">
                        <div class="group">
                          <van-icon name="success" />
                          <span>背景简洁</span>
                        </div>
                        <div>
                        <van-icon name="success" />
                          <span>五官清晰</span>
                        </div>
                        <div>
                          <van-icon name="success" />
                          <span>去掉配饰</span>
                        </div>
                    </div>
                  
                  </div>
                  <van-divider />
                  <div class="hint_grid_bottom">
                    <div class="bottom_interior">
                      <div>
                        <img class="bottom_interior_img" src="./../../../public/img/account/zjz-cw-bjzl.jpg" alt="">
                        <div class="bottom_grid">
                          <van-icon class="bottom_icon" name="cross" />
                          <span>背景杂乱</span>
                        </div>
                      </div>
                      <div>
                        <img  class="bottom_interior_img" src="./../../../public/img/account/zjz-cw-rxbq.jpg" alt="">
                        <div  class="bottom_grid">
                          <van-icon  class="bottom_icon" name="cross" />
                          <span>人像不全</span>
                        </div>
                      </div>
                      <div>
                        <img  class="bottom_interior_img" src="./../../../public/img/account/zjz-cw-zbgd.jpg" alt="">
                        <div class="bottom_grid">
                          <van-icon  class="bottom_icon" name="cross" />
                          <span>装扮过度</span>
                        </div>
                      </div>
                    </div>
                    <div class="tips_box">
                      <p class="tips_box_name">小贴士：</p>
                      请现场拍摄上传入网人正面免冠照片，关闭各类美颜特效，切勿所以证件照翻拍上传；照片务必保证五官清晰，背景简洁、无遮挡、无反光。
                      <!-- <p class="know_bt" @click="show = false">我知道了</p> -->
                      <div class="know_bt" >
                        <van-button round type="info"  size="small" @click="roger()">我知道了</van-button>
                      </div>
                    </div>
                  </div>
                </div>
              </van-swipe-item>
            </van-swipe>
        </div>

      </van-popup>

    </div>

    <selectPicker ref="selectPicker" @click="updataSelectPicker"></selectPicker>
    <educationRule-rules ref="educationRule"></educationRule-rules>
  </div>
</template>

<script>
import EventBus from '../../assets/js/util/EventBus';
import compCheck from '../../assets/js/util/comp-check';
import app from '../../assets/js/util/app';
import BankClass from '../../assets/json/BankClass';
import selectPicker from './../../templates/selectPicker.vue';

export default {
  components: {
    selectPicker
  },
  data() {
    return {
      educationChecked:false,
      showPicker:false, 
      show:false,
      hitTxt:'下一步，线上考试',
      reviewCode:'',
      educationValue:'',
      controlCss:false,
      BankClass:BankClass,
      BaseInfo: [
        {
          "val": "",
          "isCalcParam": null,
          "code": "agentName",
          "data": null,
          "edit": "0",
          "isNeed": "1",
          "name": "姓名",
          "elementNo": "01",
          "holder": "请输入姓名",
          "type": "input",
          "isShow": "0",
          "forbidden": false
        },
        {
          "val": "",
          "isCalcParam": null,
          "code": "agentSex",
          "data": [
            {
              "text": "男",
              "value": "0"
            },
            {
              "text": "女",
              "value": "1"
            }
          ],
          "edit": "0",
          "isNeed": "1",
          "name": "性别",
          "elementNo": "07",
          "holder": "请选择性别",
          "type": "select",
          "isShow": "0",
          "forbidden": false
        },
        {
          "val": "1",
          "isCalcParam": null,
          "code": "agentIdType",
          "data": [
            {
              "text": "身份证",
              "value": "0"
            },
            // {
            //   "text": "护照",
            //   "value": "1"
            // },
            // {
            //   "text": "军人证",
            //   "value": "2"
            // },
            // {
            //   "text": "异常身份证",
            //   "value": "3"
            // },
            // {
            //   "text": "户口本",
            //   "value": "4"
            // },
            // {
            //   "text": "回乡证",
            //   "value": "5"
            // },
            // {
            //   "text": "出生证",
            //   "value": "6"
            // },
            // {
            //   "text": "其他",
            //   "value": "7"
            // },
            // {
            //   "text": "港澳通行证",
            //   "value": "8"
            // },
          ],
          "edit": "0",
          "isNeed": "1",
          "name": "证件类型",
          "elementNo": "03",
          "holder": "请选择证件类型",
          "type": "select",
          "isShow": "0",
          "forbidden": false
        },
        {
          "val": "",
          "isCalcParam": null,
          "code": "agentIdNo",
          "data": null,
          "edit": "0",
          "isNeed": "1",
          "name": "证件号码",
          "elementNo": "05",
          "holder": "请输入证件号码",
          "type": "input",
          "isShow": "0",
          "forbidden": false
        },
        {
          "val": "",
          "isCalcParam": null,
          "code": "nationality",
          "data": null,
          "edit": "0",
          "isNeed": "1",
          "name": "民族",
          "elementNo": "01",
          "holder": "请输入民族",
          "type": "input",
          "isShow": "0",
          "forbidden": false
        },
        {
          "val": "",
          "isCalcParam": null,
          "code": "agentBirthday",
          "data": {
            "minDate": "1900-01-01",
            "maxDate": "2099-12-31"
          },
          "edit": "0",
          "isNeed": "1",
          "name": "出生日期",
          "elementNo": "09",
          "holder": "请选择出生日期",
          "type": "date",
          "isShow": "0",
          "forbidden": false
        },
        {
          "val": "",
          "isCalcParam": null,
          "code": "mobile",
          "data": null,
          "edit": "0",
          "isNeed": "1",
          "name": "电话号码",
          "elementNo": "11",
          "holder": "请输入电话号码",
          "type": "input",
          "isShow": "0",
          'forbidden': true
        },
        // {
        //   "val": "",
        //   "isCalcParam": null,
        //   "code": "agentDegree",
        //   "data": null,
        //   "edit": "0",
        //   "isNeed": "1",
        //   "name": "最高学历",
        //   "elementNo": "11",
        //   "holder": "请输入最高学历",
        //   "type": "input",
        //   "isShow": "0",
        //   "forbidden":false
        // },
        {
          "val": "",
          "isCalcParam": null,
          "code": "agentDegree",
          "data": [
            {
              "text": "高中及以下",
              "value": "高中及以下"
            },
            {
              "text": "大专",
              "value": "大专"
            },
            {
              "text": "本科",
              "value": "本科"
            },
            {
              "text": "硕士",
              "value": "硕士"
            },
            {
              "text": "博士及以上",
              "value": "博士及以上"
            },
            {
              "text": "其它",
              "value": "其它"
            },
          ],
          "edit": "0",
          "isNeed": "Y",
          "name": "最高学历",
          "elementNo": "11",
          "holder": "请选择最高学历",
          "type": "select",
          "isShow": "0",
          "forbidden": false
        },
        {
          "val": "",
          "isCalcParam": null,
          "code": "graduateSchool",
          "data": null,
          "edit": "0",
          "isNeed": "",
          "name": "毕业学校",
          "elementNo": "11",
          "holder": "请输入毕业学校",
          "type": "input",
          "isShow": "0",
          "forbidden": false
        },
        {
          "val": "",
          "isCalcParam": null,
          "code": "bankNo",
          "data": null,
          "edit": "0",
          "isNeed": "1",
          "name": "卡号",
          "elementNo": "11",
          "holder": "请输入卡号",
          "type": "input",
          "isShow": "0",
          "forbidden": false
        },
        // {
        //   "val": "",
        //   "isCalcParam": null,
        //   "code": "bankName",
        //   "data": null,
        //   "edit": "0",
        //   "isNeed": "1",
        //   "name": "银行",
        //   "elementNo": "11",
        //   "holder": "请输入银行",
        //   "type": "input",
        //   "isShow": "0",
        //   "forbidden": false
        // },
        // {
        //   "val": "",
        //   "isCalcParam": null,
        //   "code": "openingBank",
        //   "data": null,
        //   "edit": "0",
        //   "isNeed": "1",
        //   "name": "开户行",
        //   "elementNo": "11",
        //   "holder": "请输入开户行",
        //   "type": "input",
        //   "isShow": "0",
        //   "forbidden": false
        // }
      ],
      AnnexInfo: [
        {
          "val": "",
          "isCalcParam": null,
          "code": "name",
          "data": null,
          "edit": "0",
          "isNeed": "Y",
          "name": "身份证正反面",
          "elementNo": "01",
          "holder": "请输入姓名",
          "type": "img",
          "isShow": "0",
          fileGroup: 'idCardFront',
          filePicUrl: null,
          fileSecPicUrl: null,
          "forbidden": false
        },
        {
          "val": "",
          "isCalcParam": null,
          "code": "name",
          "data": null,
          "edit": "0",
          "isNeed": "Y",
          "name": "银行卡",
          "elementNo": "01",
          "holder": "四大行一类卡",
          "type": "img",
          "isShow": "0",
          fileGroup: 'bankCardFront',
          filePicUrl: null,
          // fileSecPicUrl: null,
          "forbidden": false
        },
        {
          "val": "",
          "isCalcParam": null,
          "code": "name",
          "data": null,
          "edit": "0",
          "isNeed": "Y",
          "name": "高中及以上学历证",
          "elementNo": "01",
          "holder": "请输入姓名",
          "type": "img",
          "isShow": "0",
          fileGroup: 'degree',
          filePicUrl: null,
          "forbidden": false
        },
        {
          "val": "",
          "isCalcParam": null,
          "code": "name",
          "data": null,
          "edit": "0",
          "isNeed": "Y",
          "name": "一寸证件照",
          "elementNo": "01",
          "holder": "请输入姓名",
          "type": "img",
          "isShow": "0",
          fileGroup: 'idPhoto',
          filePicUrl: null,
          "forbidden": false
        }
        // ,
        // {
        //   "val": "",
        //   "isCalcParam": null,
        //   "code": "name",
        //   "data": null,
        //   "edit": "0",
        //   "isNeed": "Y",
        //   "name": "应聘登记表",
        //   "elementNo": "01",
        //   "holder": "",
        //   "type": "file",
        //   "isShow": "0",
        //   fileGroup: 'regForm',
        //   fileUrl: null
        // }
      ],
      data: {
        agentName: '', //代理人姓名
        agentIdType: '', //代理人证件类型编码
        agentIdNo: '', //代理人证件号码
        agentBirthday: '',//代理人出生日期
        nationality: '',//代理人民族
        agentSex: '', //代理人性别编码
        bankName: {
          text: '',
          value: ''
        }, //银行
        bankNo: '', //银行卡号
        openingBank: '', //开户行
        agentDegree: '',//最高学历 （必填）
        graduateSchool: '', //毕业院校 （非必填）
        mobile: '', // 手机号
        businessNo: '',
        cardFaceType: '',
        isIos: false,
        mbankNo: ''
      },
      active: 0,
      showDialog: false,
      checked: false,
      mistakeData: [],
      bankInfoList: []
    };
  },
  created() {
    this.isIos = app.isIos();
    this.getInit();

  },
  mounted() {
    window.openAndroidCameraCallback = this.openAndroidCameraCallback;
    this.mistakeData = this.$route.query.mistakeData || []
    // this.mistakeData =["I","B"]
    console.log('mistakeData', this.mistakeData);
    //如果有值说明是退回问题进入页面的
    if (this.mistakeData.length > 0) {
      //处理基本信息禁止填写
      for (let i in this.BaseInfo) {
        //民族可以让他修改
        if (this.BaseInfo[i].code != "nationality") {
          this.BaseInfo[i].forbidden = true
        }
      }
      //说明签名有问题，下一步到签署合同页
      if (this.mistakeData.indexOf('S') != -1) {
        this.hitTxt = '下一步，签署合同'
      } else {
        this.hitTxt = '完成'
      }
      //根据条件处理附件禁止信息上传
      for (let a in this.AnnexInfo) {
        if (this.AnnexInfo[a].fileGroup == 'idCardFront' && this.mistakeData.indexOf('I') == -1) { //如果没有身份证退回问题
          this.AnnexInfo[a].forbidden = true
        }
        if (this.AnnexInfo[a].fileGroup == 'bankCardFront' && this.mistakeData.indexOf('B') == -1) { //如果没有银行卡退回问题
          this.AnnexInfo[a].forbidden = true
        }
        if (this.AnnexInfo[a].fileGroup == 'degree' && this.mistakeData.indexOf('D') == -1) { //如果没有学历退回问题
          this.AnnexInfo[a].forbidden = true
        }
        if (this.AnnexInfo[a].fileGroup == 'idPhoto' && this.mistakeData.indexOf('P') == -1) { //如果没有证件照退回问题
          this.AnnexInfo[a].forbidden = true
        }
      }

    }

  },
  methods: {
    educationHit(){
      this.$refs.educationRule.educationRuleMsg(true);
    },
    //我知道了按钮
    roger(){
      this.controlCss = true;//控制上传提示只显示一次
      this.show = false;
    },
    hit(){
      this.$toast('学历丢失无需上传');
    },
    //控制查看显示上传样例
    hintExample(){
      this.show = true;
    },
    //选择银行名
    onConfirm(valueList) {
      this.data.bankName = valueList;
      this.showPicker = false;
    },
    // 返回上个页面
    goback: function () {
      history.back();
    },
    async getInit() {
      const res = await this.$axios({
        url: this.$API.API_APPLYAGENT_OWNINFO,
        method: 'get',
      });
      if (res.code === 0 && res.content) {
        this.reviewCode = res.content.reviewCode;
        //学历是否丢失按钮状态
        this.educationChecked = res.content.degreeLostFlag == '1' ? true : false
        this.data = {
          agentName: res.content.agentName, //代理人姓名
          agentIdType: res.content.agentIdType, //代理人证件类型编码
          agentIdNo: res.content.agentIdNo, //代理人证件号码
          nationality: res.content.nationality || '',//代理人民族
          agentBirthday: res.content.agentBirthday ? res.content.agentBirthday.substring(0, 10) : '',//代理人出生日期
          agentSex: res.content.agentSex, //代理人性别编码
          bankNo: res.content.bankNo, //银行卡号
          openingBank: res.content.openingBank, //开户行
          agentDegree: '',//最高学历 （必填）
          graduateSchool: res.content.graduateSchool, //毕业院校 （非必填）
          mobile: res.content.mobile, // 手机号 
          mbankNo: res.content.mbankNo,
          bankName: {
            text: '',
            value: ''
          }
        };
        this.appntInfoEvent('', { code: 'bankNo'}, res.content.bankNo);

        //最高学历单独处理
        if (res.content.agentDegree !== '高中及以下' && res.content.agentDegree !== '大专' && res.content.agentDegree !== '本科' && res.content.agentDegree !== '硕士' && res.content.agentDegree !== '博士及以上' && res.content.agentDegree != '' && res.content.agentDegree != null) {
          this.data.agentDegree = '其它'
          this.educationValue = res.content.agentDegree
        } else {
          this.data.agentDegree = res.content.agentDegree
        }
        if (res.content.agentIdNo != null && res.content.agentIdNo != '') {
          if (this.data.agentSex === undefined || this.data.agentSex === null || this.data.agentSex === '') {
            this.data.agentSex = this.idNoChangeSex(res.content.agentIdNo);
          }
          if (this.data.agentBirthday === undefined || this.data.agentBirthday === null || this.data.agentBirthday === '') {
            this.data.agentBirthday = this.idNoChangeBirthday(res.content.agentIdNo);
          }
        }
        var fileList = res.content.fileUploadInfoList;
        if (fileList) {
          for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            this.data.businessNo = file.businessNo;
            if (file.fileGroup === 'idCardFront') {
              this.AnnexInfo[0].filePicUrl = file.fileUrl;
            }
            if (file.fileGroup === 'idCardBack') {
              this.AnnexInfo[0].fileSecPicUrl = file.fileUrl;
            }
            if (file.fileGroup === 'bankCardFront') {
              this.AnnexInfo[1].filePicUrl = file.fileUrl;
            }
            // if (file.fileGroup === 'bankCardBack') {
            //   this.AnnexInfo[1].fileSecPicUrl = file.fileUrl;
            // }
            if (file.fileGroup === 'degree') {
              this.AnnexInfo[2].filePicUrl = file.fileUrl;
            }
            if (file.fileGroup === 'idPhoto') {
              this.AnnexInfo[3].filePicUrl = file.fileUrl;
            }
          }
        }
      }
    },
    async appntInfoEvent(type, item, obj) {
      if (item.code == "bankNo") {
        const bankName = await this.$store.dispatch('common/getCardBin', { cardNo: obj })
        console.log('bankName', bankName);
        this.BankClass.forEach((it, index) => {
          // console.log('it', it);
          // console.log('it.text', it.text);
          if( bankName.indexOf(it.text) != -1 ){
            console.log('it', it);
            console.log('it.text', it.text);
            this.data['bankName'] = it
          }
        })
      }else if (type === 'select') {
        this.data[item.code] = obj.value;
      } else if (type === 'inputEducation') { //学历选择其它专用
      } else {
        this.data[item.code] = obj;
      }
    },
    // 图片识别
    afterRead(src, type) {
      EventBus.$emit('GlobalLoadingTrigger', true);
      let file
      if (this.isIos) {
        file = src.target.files[0]
      } else {
        // let base64 = this.getBase64Image(src)
        file = this.btof(src, "upfile")
      }
      let formdata = new FormData();
      formdata.append('type', "01");
      formdata.append('file', file);
      this.instance.post('/file/upload/readFileInfo', formdata).then((res) => {
        EventBus.$emit('GlobalLoadingTrigger', false);
        // 信息读取
        let data = JSON.parse(res.data.content.content);
        if (data.resultCode == 0) {
          this.data.agentName = data.name;
          this.data.agentIdType = '0';
          this.data.agentIdNo = data.idCard;
          this.data.nationality = data.nationality //民族
          this.data.agentSex = this.idNoChangeSex(data.idCard);
          this.data.agentBirthday = this.idNoChangeBirthday(data.idCard);
        } else {
          this.$toast(data.resultMsg);
        }
      });
    },
    // 银行卡识别
    afterReadBankCard(src) {
      let file
      if (this.isIos) {
        file = src.target.files[0]
      } else {
        // let base64 = this.getBase64Image(src)
        file = this.btof(src, "upfile")
      }
      EventBus.$emit('GlobalLoadingTrigger', true);
      let formdata = new FormData();
      formdata.append('type', "16");
      formdata.append('file', file);
      this.instance.post('/file/upload/readFileInfo', formdata).then((res) => {
        EventBus.$emit('GlobalLoadingTrigger', false);
        // 信息读取
        if (res.data.code === 0) {
          if (res.data.content.code === 0) {
            let data = JSON.parse(res.data.content.content);
            if (data.resultCode == 0) {
              this.data.bankNo = data.idCard;
              this.data.bankName = data.bank_name;
              this.data.openingBank = data.bank_name;
            } else {
              this.$toast(data.resultMsg);
            }
          } else {
            this.$toast('图片上传失败');
          }
        } else {
          this.$toast('图片上传失败');
        }
      });
      // 此时可以自行将文件上传至服务器
      // file.status = 'uploading';
      //file.message = '上传中...';
    },
    // 图片上传
    afterReadUpload(src, type) {
      EventBus.$emit('GlobalLoadingTrigger', true);
      let file
      if (this.isIos) {
        file = src.target.files[0]
      } else {
        // let base64 = this.getBase64Image(src)
        file = this.btof(src, "upfile")
      }
      let formdata = new FormData();
      var uploadFileInfoStr = {};
      if (this.data.businessNo != null) {
        uploadFileInfoStr = {
          businessNo: this.data.businessNo,
          fileGroup: type
        }
      } else {
        uploadFileInfoStr = {
          fileGroup: type
        }
      }
      formdata.append('uploadFileInfoStr', JSON.stringify(uploadFileInfoStr));
      formdata.append('file', file);
      this.instance.post('/applyAgent/uploadFiles', formdata).then((res) => {
        EventBus.$emit('GlobalLoadingTrigger', false);
        // 信息读取
        if (res.data.code === 0) {
          var content = res.data.content;
          if (content.code === 0) {
            this.data.businessNo = content.message;
            var result = content.content.body;
            var resJson = JSON.parse(result);
            if (type === 'idCardFront') {
              this.AnnexInfo[0].filePicUrl = resJson.data[0].fileUrl;
            }
            if (type === 'idCardBack') {
              this.AnnexInfo[0].fileSecPicUrl = resJson.data[0].fileUrl;
            }
            if (type === 'bankCardFront') {
              this.AnnexInfo[1].filePicUrl = resJson.data[0].fileUrl;
            }
            if (type === 'bankCardBack') {
              this.AnnexInfo[1].fileSecPicUrl = resJson.data[0].fileUrl;
            }
            if (type === 'degree') {
              this.AnnexInfo[2].filePicUrl = resJson.data[0].fileUrl;
            }
            if (type === 'idPhoto') {
              this.AnnexInfo[3].filePicUrl = resJson.data[0].fileUrl;
            }
          } else {
            this.$toast('图片上传失败');
          }
        } else {
          this.$toast('图片上传失败');
        }
      });
    },
    //通过身份证更改生日
    idNoChangeBirthday(idNo) {
      var _this = this;
      var birthday = idNo.substring(6, 10) + "-" + idNo.substring(10, 12) + "-" + idNo.substring(12, 14);
      return birthday;
    },
    //通过身份证更改性别
    idNoChangeSex(idNo) {
      var _this = this;
      var sexChange = idNo.substring(16, 17);
      var sex = '';
      if (sexChange % 2 == 0) {//女
        sex = '1';
      } else {
        //男
        sex = '0';
      }
      return sex;
    },
    // 提交
    async onSubmit() {
      console.info('this.data:' + JSON.stringify(this.data))
      if (
        (this.data.agentName === null || this.data.agentName === '') ||
        (this.data.agentIdType === null || this.data.agentIdType === '') ||
        (this.data.agentIdNo === null || this.data.agentIdNo === '') ||
        (this.data.nationality === null || this.data.nationality === '') ||
        (this.data.agentBirthday === null || this.data.agentBirthday === '') ||
        (this.data.agentSex === null || this.data.agentSex === '') ||
        (this.data.bankName === null || this.data.bankName === '') ||
        (this.data.bankNo === null || this.data.bankNo === '') ||
        (this.data.agentDegree === null || this.data.agentDegree === '') ||
        (this.data.mobile === null || this.data.mobile === '') ||

        (this.data.bankName.text === null || this.data.bankName.text === '') ||
        (this.data.openingBank === null || this.data.openingBank === '') 
        // (this.data.mbankNo === null || this.data.mbankNo === '')
      ) {
        this.$toast('必填项不能为空');
        return;
      }
      if (!compCheck.isIdno(this.data.agentIdNo)) {
        this.$toast('身份证号码不合法');
        return;
      }
     
      if (
        (this.AnnexInfo[0].filePicUrl === null || this.AnnexInfo[0].filePicUrl === '') ||
        (this.AnnexInfo[0].fileSecPicUrl === null || this.AnnexInfo[0].fileSecPicUrl === '') ||
        (this.AnnexInfo[1].filePicUrl === null || this.AnnexInfo[1].filePicUrl === '') ||
        (this.AnnexInfo[1].fileSecPicUrl === null || this.AnnexInfo[1].fileSecPicUrl === '') ||
        (this.AnnexInfo[2].filePicUrl === null || this.AnnexInfo[2].filePicUrl === '') ||
        (this.AnnexInfo[3].filePicUrl === null || this.AnnexInfo[3].filePicUrl === '')
      ) {
        this.$toast('请确认是否已上传所有附件');
        return;
      }
      
      if (!this.checked) {
        this.$toast('请勾选确认以上信息真实有效');
        return;
      }
      //处理最高学历选择其它
      if (this.data.agentDegree === '其它') {
        if (this.educationValue == '') {
          this.$toast('必填项不能为空');
          return;
        }
        this.data.agentDegree = this.educationValue
      }
      var paramJson = JSON.parse(JSON.stringify(this.data))
      paramJson.bankName = this.data.bankName.text
      paramJson.degreeLostFlag = this.educationChecked ? 1 : 0
      const res = await this.$axios({
        url: this.$API.API_MY_APPLY,
        method: 'get',
        params: paramJson
      });
      console.info('paramJson:' + JSON.stringify(paramJson))
      if (res.code === 0 && res.content.result === '0') {
        this.$toast.success(res.content.resultMessage);
        setTimeout(() => {
          // this.goback();
          //如果等于6并且带有S就跳转到签署合同页（说明退回有资料和签名问题）
          if (this.reviewCode === '6' && this.mistakeData.indexOf('S') != -1) {
            this.$router.push({ path: '/sign' });
          } else if (this.reviewCode === '6' && this.mistakeData.indexOf('S') == -1) {
            //如果等于6并且不带有S就跳转到签署合同页（说明退回只是资料问题）
            this.$router.push({ path: '/applySuccess' });
          } else {
            //否则就是正常流程
            this.$router.push({ path: '/exam' });
          }
        }, 2000);
      } else {
        this.$toast(res.content.resultMessage || '请求失败');
      }
    },
    showPicChoose(type) {
      console.log('this.cardFaceType：' + this.cardFaceType)
      this.cardFaceType = type;
      this.showDialog = true;
    },
    // 调用安卓系统
    goGetCamera(type) {
      console.log('this.cardFaceType：' + this.cardFaceType)
      this.cardFaceType = type;
      this.showDialog = false;
      console.log('安卓调用摄像头')
      app.getCamera({ 'callbackMethod': 'openAndroidCameraCallback' })
    },
    goGetPic(type) {
      console.log('this.cardFaceType：' + this.cardFaceType)
      this.cardFaceType = type;
      this.showDialog = false;
      console.log('安卓调用相册')
      app.getPhoto({ 'callbackMethod': 'openAndroidCameraCallback' })
    },
    // 摄像头回调函数
    openAndroidCameraCallback(result) {
      let code = result.code;
      if (code == 0) {
        if (this.cardFaceType === 'A') {
          this.afterRead('data:image/jpg;base64,' + result.object.base64Datas, this.cardFaceType)
        } else if (this.cardFaceType === "C") {
          this.afterReadBankCard('data:image/jpg;base64,' + result.object.base64Datas)
        } else {
          this.afterReadUpload('data:image/jpg;base64,' + result.object.base64Datas, this.cardFaceType)
        }
      }
    },
    // 换为base64格式
    getBase64Image(src) {
      var img = new Image();
      // 加载完成执行
      img.onload = function () {
        // 打印
        console.log('width:' + img.width + ',height:' + img.height)
      }
      img.src = src;
      console.log('width:' + img.width + ',height:' + img.height)
      var c = document.createElement("canvas");
      //设置canvas宽高为图片宽高
      c.width = 80;
      c.height = 80;
      //将图片绘制到canvas
      var cxt = c.getContext("2d");
      cxt.drawImage(img, 0, 0);
      //得到图片的base64编码数据
      var base64 = c.toDataURL();
      return base64;
    },
    // base64 转file
    btof(data, fileName) {
      const dataArr = data.split(",");
      const byteString = atob(dataArr[1]);

      const options = {
        type: "image/jpeg",
        endings: "native"
      };
      const u8Arr = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        u8Arr[i] = byteString.charCodeAt(i);
      }
      return new File([u8Arr], fileName + ".jpg", options);
    },
    reminder() {
      this.$toast('资料正在审核，禁止修改');
    },
    // 搜索开户行
    async onOpeningBank() {
      const res = await this.$axios({
        url: this.$API.API_QUERYBANKLIST,
        method: 'get',
        params: {
          bankType: this.data.bankName.value,
          bankName: this.data.openingBank
        }
      });
      if(res && res.content && res.content.bankInfoList && res.content.bankInfoList.length ){
        for( let item of res.content.bankInfoList ){
          item.text = item.bank
          item.value = item.bankNo
        }
        this.bankInfoList = res.content.bankInfoList
        this.$refs.selectPicker.parentMsg({ name: '', struct: {data: this.bankInfoList }});
      }else{
        this.$toast('暂无匹配开户行');
      }
    },
    updataSelectPicker(params){
      this.data.openingBank = params.struct.value.bank
      this.data.mbankNo = params.struct.value.bankNo
      // this.$store.commit( params.name, params.struct.value);
      // if( params.struct.value.value == '1' && !this.agreementList.length ){
      //   this.$store.dispatch('car/getAgreement');
      // }
    }
  }
};
</script>
<style lang="less" scoped>
.approvalPage {
  .van-popup{
      z-index: 999999!important;
  }
  margin-top: 46px;
  .title_bar {
    margin: 0;
    padding: 16px;
    color: rgba(69, 90, 100, 0.6);
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
  }
  .uploader_read {
    width: 10rem;
    height: 6rem;
    border-radius: 10px;
    display: block;
    margin: 66px auto 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f7f8fa;
    color: #999;
    font-size: 14px;
    .van-icon {
      color: white;
      background-color: rgba(0, 0, 0, 0.2);
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      margin: 0 auto 3px;
    }
  }
  .approval_checked {
    padding: 0.6rem;
    background: #fff;
  }
  .hint_box {
    .hint {
      font-weight: 600;
      margin: 0 12px;
      .hint_title {
        text-align: center;
      }
      .hint_grid_top {
        display: flex;
        font-size: 14px;
        .img_max {
          width: 187px;
          height: 130px;
        }
        .interior_grid {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          margin-left: 10px;
        }
      }
      .hint_grid_bottom {
        font-size: 14px;
        .bottom_interior {
          display: flex;
          justify-content: space-between;
          .bottom_interior_img{
            width: 94%; 
          }
          .bottom_grid {
            margin-top: 6px;
            display: flex;
            .bottom_icon {
              font-size: 18px;
            }
          }
        }
        .tips_box {
          padding-bottom: 30px;
          .tips_box_name {
            margin: 8px 0 4px 0;
          }
          .know_bt{
            position: relative;
            z-index: 999999;
            text-align: center;
            margin-top: 4px;
            .van-button{
              width: 86%;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
  .education_box{
    .van-cell{
      padding: 0.6rem;
      font-size: 16px;
      color: #3d4145;
    }
    .education_grid{
      display: flex;
      padding-left: 10px;
    }
  }
}
.van-hairline--bottom {
  background: #fff;
  margin-bottom: 0.5rem;
  p {
    padding: 0.6rem;
    margin: 0;
  }
}
.upload {
  height: 6.5rem;
  display: flex;
  padding: 0 1rem;
  .upload-item {
    flex: 1;
    padding: 0 0.2rem;
    position: relative;
    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 8rem;
      height: 5.5rem;
      z-index: 999;
      opacity: 0;
    }
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 8rem;
      height: 5.5rem;
      display: block;
      margin: 0 !important;
      &.photo {
        width: 4rem;
      }
    }
  }
}
.upload-file-flex {
  display: flex;
  align-items: center;
  .upload-file-label {
    width: 5.5rem;
    text-align: right;
    margin-right: 0.5rem;
  }
  .upload-file-flexitem {
    flex: 1;
    position: relative;
    height: 3.3rem;
    input {
      width: 6rem;
      height: 2.3rem;
      position: absolute;
      left: 0;
      top: 0.5rem;
      z-index: 999;
      opacity: 0;
    }
    button {
      width: 6rem;
      height: 2.3rem;
      position: absolute;
      left: 0;
      top: 0.5rem;
    }
  }
}
.scanid {
  display: inline-block;
  position: relative;
  width: 2.6rem;
  height: 1.2rem;
  input {
    position: absolute;
    width: 2.6rem;
    height: 1.2rem;
    left: 0;
    right: 0;
    opacity: 0;
    z-index: 999;
  }
  img {
    position: absolute;
    display: block;
    width: 1.2rem;
    height: 1.2rem;
    left: 0;
    right: 0;
    margin: 0 0.7rem;
  }
}
.mystep {
  padding: 1rem 2rem 0.6rem 2rem;
  .van-step__icon {
    font-size: 1.2rem;
  }
  .van-step__circle-container {
    padding: 0;
  }
}
.bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.5);
  z-index: 999;
}
.rule{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255,255,255,0);
    z-index: 1001;
}
</style>