// pages/player_rank/player_rank.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    rankMap: {},
    currentTab: 'east', // tab切换
    technical: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getTeamRank()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  getTeamRank: function () {
    app.api
      .getTeamRank({})
      .then(res => {
        res = res[1]
        this.setData({
          rankMap: res
        })
      })
      .catch(e => {
        console.error(e)
      })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},
  // 滑动切换tab
  bindChange: function (e) {
    this.setData({ currentTab: e.detail.current })
  },
  // 点击tab切换
  swichNav: function (e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false
    } else {
      this.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})
