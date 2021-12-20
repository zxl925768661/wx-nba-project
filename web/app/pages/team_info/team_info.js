// pages/team_info/team_info.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    competitionId: '',
    teamColor: '',
    teamId: '',
    allSeasons: [],
    currentSeasonIdType: '',
    currentTab: 0,
    page: 0,
    newsList: null,
    baseInfo: null,
    gameInfo:{},
    currentGameInfo: {},
    teamPlayers:null,
    dateArray: [],
    yearMonthText: '',
    scheduleMap: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    this.setData({
      teamId: e.teamId
    })
    this.getAllSeasons()
    this.getTeamBaseInfo()
  },

  getAllSeasons: function () {
    var allSeasons = app.globalData.allSeasons
    if (allSeasons) {
      var first = allSeasons[0]
      this.setData({
        allSeasons: allSeasons
      })
      this.getTeamStats(first.seasonId, first.seasonType)
      return
    }
    app.api.getAllSeasons().then((res)=>{
      var data = res.data, first = data[0]
      this.setData({
        allSeasons: data
      })
      this.getTeamStats(first.seasonId, first.seasonType)
     }).catch(e => {
       console.error(e)
     })
  },
  getTeamPlayers: function () {
    app.api.getTeamPlayers({
      teamId: this.data.teamId
    }).then((res)=>{
      this.setData({
        teamPlayers: res.data
      })
     }).catch(e => {
       console.error(e)
     })
  },
  getTeamStats: function (id, type) {
    var cst = id + '-' + type,
      gameInfo = this.data.gameInfo
    if (!gameInfo[cst]) {
      var params = {
        teamId: this.data.teamId,
        seasonId: id,
        seasonType: type
      }
      app.api.getTeamStats(params).then((res)=>{
        gameInfo[cst] = res.data
       this.setData({
         gameInfo: gameInfo,
         currentGameInfo: res.data,
         currentSeasonIdType: cst
       })
       if (!this.data.teamColor) {
        this.setData({
          teamColor: res.data.teamColor
        })
       }
      }).catch(e => {
        console.error(e)
      })
    }
    
  },
  getNewsList: function () {
    app.api
      .getNewsList({
        page: this.data.page,
        teamId: this.data.teamId
      })
      .then(res => {
        var _list = this.data.newsList
        this.setData({
          newsList: _list ? _list.concat(res.data || [] ): res.data || []
        })
      })
      .catch(e => {
        console.error(e)
      })
  },
  getTeamBaseInfo: function () {
    app.api
      .getTeamBaseInfo({
        teamId: this.data.teamId
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
  getTeamSchedule: function (mouth) {
    var params = {
      teamId: parseInt(this.data.teamId),
      mouth: mouth
    }
    app.api
      .getTeamSchedule(params)
      .then(res => {
        var data = res.data, dateArray = Object.keys(data).reverse()
        this.setData({
          yearMonthText: dateArray[0],
          dateArray: dateArray,
          scheduleMap: data
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
      if (this.data.currentTab == 1 && !this.data.newsList) {
        this.getNewsList()
      } else if (this.data.currentTab == 2 && this.data.dateArray && !this.data.dateArray.length) {
        this.getTeamSchedule()
      } else if (this.data.currentTab == 3 && !this.data.teamPlayers) {
        this.getTeamPlayers()
      }
    }
  },
  tabExpand: function (e) {
    var dataset = e.currentTarget.dataset
    var cst = dataset.seasonid + '-' + dataset.seasontype,
      gameInfo = this.data.gameInfo
    if (!gameInfo[cst]) {
      this.getTeamStats(dataset.seasonid, dataset.seasontype)
    } else {
      this.setData({
        currentSeasonIdType: cst
      })
    }
  },
  // 月份赛程选择
  bindPickerChange: function (e) {
    var value = this.data.dateArray[e.detail.value]
    if (this.data.yearMonthText != value) {
      this.setData({
        yearMonthText: value
      })
    }
  },

  scrollToLower: function (e) {
    this.setData({
      page: this.data.page + 1
    })
    this.getNewsList()
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