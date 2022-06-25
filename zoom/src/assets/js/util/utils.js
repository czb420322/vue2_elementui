exports.install = function (Vue) {
    // 页面返回
    Vue.prototype.onClickLeft = function () {
        window.history.go(-1);
    }

    // 页面跳转
    Vue.prototype.goPage = function (page) {
        this.$router.push({ path: '/' + page })
    }

    // 手机号验证
    Vue.prototype.isMobileNumber = function (phone) {
        var flag = false;
        var message = "";
        var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
        if (phone == "") {
            // console.log("手机号码不能为空");
            message = "手机号码不能为空！";
        } else if (phone.length != 11) {
            //console.log("请输入11位手机号码！");
            message = "请输入11位手机号码！";
        } else if (!myreg.test(phone)) {
            //console.log("请输入有效的手机号码！");
            message = "请输入有效的手机号码！";
        } else {
            flag = true;
        }
        if (message != "") {
            // alert(message);
        }
        return flag;
    }

    // 判断登录
    Vue.prototype.isLogin = function () {
        if (!localStorage.token) {
            this.$router.push("/login");
            this.$toast("请先登录！");
            return false;
        }
        return true;
    }

    // 页面跳转
    Vue.prototype.goWxPay = function (order_ids) {
        console.log('order_ids', order_ids);
        wx.miniProgram.navigateTo({
            url: `/pages/pay/pay?order_ids=${order_ids}`,
            fail: function (res) {
                alert("fail" + res);
            }
        });
    }
};