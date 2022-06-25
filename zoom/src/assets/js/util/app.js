import { Toast } from 'vant';
import EventBus from '@/assets/js/util/EventBus';

export default {
    // 分享
    goShare (msg) {
        console.log(msg);
        try {
            if (this.isIos()) {
                //ios
                // Native.alipay(msg);
                var req = JSON.stringify(msg);
                // window.webkit.messageHandlers.shareToThridPlatfrom(req);
                window.webkit.messageHandlers.shareToThridPlatfrom.postMessage(req);
            } else {
                //安卓
                var req = JSON.stringify(msg);
                jsOpenAndroidSystem.shareToThridPlatfrom(req);
            }
        } catch (e) {

        }
    },
    // 安卓调用摄像头
    getCamera (objParam) {
        try {
            if (!this.isIos()) {
                // 安卓
                var req = JSON.stringify(objParam)
                jsOpenAndroidSystem.intentStartCamera(req);
            }
        } catch (e) {

        }
    },
    // 安卓调用相册
    getPhoto (objParam) {
        try {
            if (!this.isIos()) {
                // 安卓
                var req = JSON.stringify(objParam)
                jsOpenAndroidSystem.intentBrowserPhotoAlbum(req);
            }
        } catch (e) {

        }
    },
    // 下载图片
    downloadPhoto (msg) {
        console.log(msg);
        try {
            if (this.isIos()) {
                //ios
                var objParam = {"callbackMethod":"saveToAlbumCallback","imgUrl": msg.PictureUrl }
                var req = JSON.stringify(objParam);
                window.webkit.messageHandlers.SavePhotoAlbum.postMessage(req)
            } else {
                //安卓
                var objParam = {"callbackMethod":"saveToAlbumCallback","imgUrl": msg.PictureUrl }
                var req = JSON.stringify(objParam)
                jsOpenAndroidSystem.imgSaveToPhoneAlbum(req);
                EventBus.$emit('GlobalLoadingTrigger', true);
            }
        } catch (e) {

        }
    },

    isIos () {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isios = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isios) {
            return true;
        } else if (isAndroid) {
            return false;
        }
        return true;//其他
    }
};
// 安卓保存照片回调
window.saveToAlbumCallback = function(result){
    EventBus.$emit('GlobalLoadingTrigger', false);
    var code = result.code;
    if(code == '0'){
        Toast('保存成功');  
    }else if(code == '401'){
        Toast('保存失败'); 
    }else if(code == '402'){
        Toast('下载失败'); 
    }else if(code == '403'){
        Toast('保存到本地文件失败'); 
    }else {
        Toast('保存失败');  
    }
}
// iOS保存照片回调
window.callbackMethod = function(){
    Toast('保存成功');  
}
