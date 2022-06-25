// import { position } from 'html2canvas/dist/types/css/property-descriptors/position';
import {
  Dialog
} from 'vant'
import config from './../../../config.js';

window.GluttonContext = {
  policyHolderName: '', // 投保人姓名
  policyHolderIdNo: '', // 投保人证件号码
  policyHolderMobile: '', // 投保人手机号
  orderNo: '', // 订单号
  policyNo: '', // 保单号
  traceNo: ""
};

const glutton = new GluttonRecorder({
  firstToken: getGluttonRequestToken(),
  dataAutoPlay: false,
  disableLogs: false,
  serverHost: config.config.guorenpcic
});


function getGluttonRequestToken() {
  let t = new Date().getTime(),
    t2 = `38gDB2eGsO{guoren}`,
    t3 = sha256(encodeUtf8(t2)),
    t4 = sha256(encodeUtf8(`${t3}{${t}}`)),
    t5 = Base64.encode(`guoren:${t4}:${t}`),
    t6 = `Glutton ${t5}`
  return t6
}

function encodeUtf8(text) {
  const code = encodeURIComponent(text);
  const bytes = [];
  for (var i = 0; i < code.length; i++) {
    const c = code.charAt(i);
    if (c === '%') {
      const hex = code.charAt(i + 1) + code.charAt(i + 2);
      const hexVal = parseInt(hex, 16);
      bytes.push(hexVal);
      i += 2;
    } else bytes.push(c.charCodeAt(0));
  }
  return bytes;
}

let started = false;

const startRecording = (traceNo) => {
  if (started) {
    return
  }
  if (!window.GluttonContext.traceNo) {
    if (traceNo) {
      window.GluttonContext.traceNo = traceNo
    }
    tips();
  } else {
    console.log("开始录制1111111111111111111111!");
    if (!started) {
      started = true
      try {
        glutton.startRecord();
      } catch (error) {
        console.log(error);
      }
    }
  }
}
const stopRecording = () => {
  if (!started) {
    return
  }
  started = false
  console.log("结束录制2222222222222222222222222222!")
  try {
    glutton.stopRecord();
  } catch (error) {
    console.log(error);
  }
}
const tips = () => {
  if (!sessionStorage.getItem("hint")) {
    sessionStorage.setItem("hint", true)
    Dialog.alert({
      title: "温馨提示",
      message: '您即将进入支付流程，请仔细阅读保险条款、须知等内容，为保障您的权益，您在销售页面的操作将会被记录并加密存储。<p class="aleTxt">本产品由国任财产保险股份有限公司独家承保并负责客户服务</p>',
      theme: 'round-button',
      cancelButtonColor: 'rgb(2, 82, 255,.6)',
      confirmButtonColor: '#0252ff',
      confirmButtonText: ' 我知道了',
      className: "recallDialog",
      
    }).then(() => {
      try {
        if (!window.GluttonContext.traceNo) {
          window.GluttonContext.traceNo = new Date().getTime()
        }
        startRecording();
      } catch (error) {
        console.log(error);
      }
    });
  } else {
    try {
      if (!window.GluttonContext.traceNo) {
        window.GluttonContext.traceNo = new Date().getTime()
      }
      startRecording();
    } catch (error) {
      console.log(error);
    }
  }

}

// 当前页面是否需要关闭
const pageStopRecording = (path) => {
  if (path === '/productDetail' || // 非车
    path === '/showProductDetail' ||
    path === '/productDetailClause' ||
    path === '/insureInput' ||
    path === '/confirmInsured' ||
    path === '/productDetailPersonalInfo' ||
    path === '/personnelInfo' ||
    path === '/addressBook' ||
    path === '/carInsurance' || // 车险
    path === '/carBaseInfo' ||
    path === '/carSelect' ||
    path === '/carVehicleInsurance' ||
    path === '/carQuotedPrice' ||
    path === '/carReplenishInfo' ||
    path === '/specialSelection' ||
    path === '/carConfirmInfo' ||
    path === '/carConfirmInsured' ||
    path === '/wxOrderDetail' ||
    path === '/clause' ||
    path === '/read' ||
    path === '/dataUpload' ||
    path === '/wxCarInsurance' || // 车险公众号
    path === '/wxCarVehicleInsurance' ||
    path === '/wxCarReplenishInfo' ||
    path === '/wxConfirmInfo' ||
    path === '/wxDataUpload' ||
    path === '/wxCarOrderDetail' ||
    path === '/carClause' ||
    path === '/chargingPile' ||
    path === '/chargingPileEdit'
  ) {} else {
    stopRecording();
    window.GluttonContext.traceNo = ""
  }
}
// window.startRecording = startRecording
// window.stopRecording = stopRecording
// window.pageStopRecording = pageStopRecording
// window.glutton = glutton
export default {
  startRecording,
  stopRecording,
  pageStopRecording,
  glutton
}