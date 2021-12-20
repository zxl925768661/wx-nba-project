//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util')
Page({
  data: {
    allSeasons: [],
    startDate: null,
    endDate: new Date().getFullYear() + '-12-31',
    currentDate: util.formatTime(new Date(), '-', false),
    scheduleList: null
  },
  onLoad: function () {
    var allSeasons = app.globalData.allSeasons
    this.getNBASchedule(this.data.currentDate)
    if (allSeasons) {
      this.setData({
        allSeasons: allSeasons,
        startDate: allSeasons[allSeasons.length - 1].seasonId + '-01-01'
      })
    } else {
      this.getAllSeasons()
    }
  },
  getAllSeasons: function () {
    app.api.getAllSeasons().then((res)=>{
      var data = res.data
      this.setData({
        allSeasons: data,
        startDate: data[data.length - 1].seasonId + '-01-01'
      })
      app.globalData.allSeasons = data
     }).catch(e => {
       console.error(e)
     })
  },
  getNBASchedule: function (startTime) {
    var params = {
      startTime: startTime,
      endTime: util.formatTime(new Date(+new Date(startTime) + 7 * 24 * 3600 * 1000), '-', false)
    }
    app.api
      .getNBASchedule(params)
      .then(res => {
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
        this.setData({
          isShow: true,
          scheduleList: Object.keys(res.data).length ? res.data: null
        })
      })
      .catch(e => {
        console.error(e)
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      })
  },
    // 日期选择
    bindDateChange: function (e) {
      this.getNBASchedule(e.detail.value)
      this.setData({
        currentDate: e.detail.value
      })
    },
    /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    this.getNBASchedule()
  },

})
