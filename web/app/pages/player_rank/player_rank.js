// pages/player_rank/player_rank.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navs: [{
      type: 'Points',
      name: '得分'
    }, {
      type: 'Rebounds',
      name: '篮板'
    }, {
      type: 'Assists',
      name: '助攻'
    }, {
      type: 'Steals',
      name: '抢断'
    }, {
      type: 'Blocks',
      name: '盖帽'
    }, {
      type: 'Turnovers',
      name: '失误'
    }],
    current: 'Points',
    dataset: {},
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.api
    .getTopPlayer({})
    .then(res => {
      this.setData({
        dataset: res.data,
        list: res.data.nbaPlayerSeasonPointsRank
      })
    })
    .catch(e => {
      console.error(e)
    })
  },
/**
 * 点击tab切换
 */
tabNav: function (e) {
  var type = e.target.dataset.type;
  if (type !== this.data.current) {
    this.setData({
      list: this.data.dataset['nbaPlayerSeason' + type + 'Rank'],
      current: type
    })
  }
},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})