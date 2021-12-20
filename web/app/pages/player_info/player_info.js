// pages/player_info/player_info.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playerId: '',
    allSeasons: [],
    currentSeasonIdType: '',
    currentTab: 0,
    baseInfo: {},
    profileInfo: {},
    gameInfo:{},
    currentGameInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    this.setData({
      playerId: e.playerId
    })
    this.getAllSeasons()
    this.getPlayerBaseInfo()
    this.getPlayerProfileInfo()
      
  },
  getAllSeasons: function () {
    var allSeasons = app.globalData.allSeasons
    if (allSeasons) {
      var first = allSeasons[0]
      this.setData({
        allSeasons: allSeasons
      })
      this.getPlayerStats(first.seasonId, first.seasonType)
      return
    }
    app.api.getAllSeasons().then((res)=>{
      var data = res.data, first = data[0]
      this.setData({
        allSeasons: data
      })
      this.getPlayerStats(first.seasonId, first.seasonType)
     }).catch(e => {
       console.error(e)
     })
  },
  getPlayerStats: function (id, type) {
    var cst = id + '-' + type,
      gameInfo = this.data.gameInfo
    if (!gameInfo[cst]) {
      var params = {
        playerId: this.data.playerId,
        seasonId: id,
        seasonType: type
      }
      app.api.getPlayerStats(params).then((res)=>{
        gameInfo[cst] = res.data
       this.setData({
         gameInfo: gameInfo,
         currentGameInfo: res.data,
         currentSeasonIdType: cst
       })
      }).catch(e => {
        console.error(e)
      })
    }
    
  },
  getPlayerBaseInfo: function () {
    app.api
      .getPlayerBaseInfo({
        playerId: this.data.playerId
      })
      .then(res => {
        this.setData({
          baseInfo: res.data
        })
      })
      .catch(e => {
        console.error(e)
      })
  },
  getPlayerProfileInfo: function () {
    app.api
    .getPlayerProfileInfo({
      playerId: this.data.playerId
    })
    .then(res => {
      this.setData({
        profileInfo: res.data
      })
    })
    .catch(e => {
      console.error(e)
    })
  },
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
  tabExpand: function (e) {
    var dataset = e.currentTarget.dataset
    var cst = dataset.seasonid + '-' + dataset.seasontype,
      gameInfo = this.data.gameInfo
    if (!gameInfo[cst]) {
      this.getPlayerStats(dataset.seasonid, dataset.seasontype)
    } else {
      this.setData({
        currentSeasonIdType: cst
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