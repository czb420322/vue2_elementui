const state = () => ({
  location: true,
  isLocation: true,
  formattedAddress: '',  // 定位地址
  position: '',  // 定们经纬度
  distance: '',  // 距离
  attendanceRule: {
    isDeploy: ''
  },  // 考勤记录
  atWorkRecord: {},  // 上班记录
  offWorkRecord: {}  // 下班记录
})

export default state
