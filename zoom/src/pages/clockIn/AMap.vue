<template>
  <div class="AMap_page">
    <div id="container"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      position: state => state.clockIn.position,
      attendanceRule: state => state.clockIn.attendanceRule,
      location: state => state.clockIn.location,
    }),
    isLocation: {
      get() {
        return this.$store.state.clockIn.isLocation
      },
      set(value) {
        this.$store.commit('clockIn/updateState', [{ name: ['isLocation'], value: value }])
      }
    }
  },
  data() {
    return {
      item: {
        address: ''
      }
    }
  },
  mounted() { },
  methods: {
    parentMsg(msg) {
      this.isLocation = true
      let _this = this;
      var map = new AMap.Map('container', {
        resizeEnable: true
      });
      AMap.plugin('AMap.Geolocation', function () {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 30000, //超过10秒后停止定位，默认：5s
          buttonPosition: 'RB', //定位按钮的停靠位置
          buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
        });
        map.addControl(geolocation);

        geolocation.getCurrentPosition(function (status, result) {
          _this.isLocation = false
          if (status == 'complete') {
            onComplete(result, _this)
          } else {
            // 定位失败
            _this.$toast('失败原因排查信息:' + result.message);
            _this.$store.commit('clockIn/updateState', [
              { name: ['location'], value: false }
            ])
          }
        });
      });

      function onComplete(data, _this) {
        // 当前位置
        var p1 = data.position;
        // 打卡位置
        // var p2 = { Q: 22.56351, R: 114.10505, lng: 114.10505, lat: 22.56351 };
        let arr = []
        for (let item of _this.attendanceRule.address) {
          arr.push(Math.round(p1.distance({ Q: item.addressLatitude, R: item.addressLongitude, lng: item.addressLongitude, lat: item.addressLatitude })))
        }
        let distance = Math.min(...arr)
        _this.$store.commit('clockIn/updateState', [
          { name: ['formattedAddress'], value: data.formattedAddress },
          { name: ['position'], value: data.position },
          { name: ['distance'], value: distance },
          { name: ['location'], value: true },
        ])
      }
    }
  }
}
</script>

<style lang="less">
</style>

