// pages/live_detail/live_detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    matchId: null,
    competitionId: null,
    matchDetail: {},
    mid: null,
    stats: [],
    matchStatistics: null,
    teamInfo: {},
    textLiveIds: [],
    textLiveContent: [],
    commentsInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var matchId = e.mid.split(':')[1]
    this.setData({
      matchId: matchId,
      competitionId: e.competitionId,
      mid: e.mid
    })
    this.getMatchDetail(e.mid)
    this.getMatchStatVideo(e.mid)
  },
  getMatchStatVideo: function (mid) {
    app.api
      .getMatchStatVideo({
        mid: mid || this.data.mid
      })
      .then(res => {
        var _res = res[1] || {}
        // 过滤集锦、回放、相关新闻
        var stats = _res.stats && _res.stats.filter(function(ele) {
          return ['9', '10', '5'].indexOf(ele.type) > -1
        }) || []
        this.setData({
          stats: stats,
          teamInfo: _res.teamInfo || {}
        })
      })
      .catch(e => {
        console.error(e)
      })
  },
  getMatchStatistics: function (mid) {
    app.api
      .getMatchStatistics({
        mid: mid || this.data.mid
      })
      .then(res => {
        this.setData({
          matchStatistics: res.data || {}
        })
      })
      .catch(e => {
        console.error(e)
      })
  },
  getMatchDetail: function (mid) {
    var params = {
      mid: mid
    }
    app.api
      .getMatchDetail(params)
      .then(res => {
        var _data = res.data
        this.setData({
          matchDetail: _data
        })
        this.getComments(_data.targetId)
        wx.setNavigationBarTitle({
          title: _data.matchInfo.leftName + ' VS ' + _data.matchInfo.rightName // 页面标题为路由参数
        })
      })
      .catch(e => {
        console.error(e)
      })
  },
  // 获取直播内容数据
  getTextLiveIds: function (matchId, competitionId) {
    var params = {
      matchId: matchId || this.data.matchId,
      competitionId: competitionId || this.data.competitionId
    }
    app.api
      .getTextLiveIds(params)
      .then(res => {
        var ids = res && res[1] || [];
        var _ids = ids.splice(0, 20);
        this.getTextLiveDetail(_ids.join(','));
        this.setData({
          textLiveIds: ids
        })
      })
      .catch(e => {
        console.error(e)
      })
  },
  // 获取文字直播
  getTextLiveDetail: function (ids, isPush) {
    var params = {
      matchId: this.data.matchId,
      ids: ids
    }
    app.api
      .getTextLiveDetail(params)
      .then(res => {
        var data = res && res[1] && Object.values(res[1]) || [];
        if (isPush) {
          data = this.data.textLiveContent.concat(data);
        }
        this.setData({
          textLiveContent: data
        })
      })
      .catch(e => {
        console.error(e)
      })
  },
  getComments: function (targetId) {
    app.api
      .getComments({
        targetId: targetId
      })
      .then(res => {
        this.setData({
          commentsInfo: res.data
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
    var current = e.currentTarget.dataset.current
    this.setData({ currentTab: current })
    if (current == 1 && !this.data.textLiveIds.length) {
      this.getTextLiveIds()
    } else if (current == 2 && !this.data.matchStatistics) {
      this.getMatchStatistics()
    } 
  },

  showPopup(e) {
    var index = e.currentTarget.id, i = e.currentTarget.dataset.i
    this.popup = this.selectComponent("#popup")
    var item = this.data.stats[i].list[index]
    if (item.videoUrl) {
      this.popup.showPopup(item.videoUrl)
    } else {
      app.api
        .getVideoInfo({
          vid: item.vid 
        })
        .then(res => {
          var videoUrl = '';
          try {
            var tmp = /tvp_request_getinfo_callback\((.*)\)/.exec(res)[1];
            tmp = JSON.parse(tmp);
            var vi = tmp.vl.vi[0];
            videoUrl = vi.ul.ui[0].url + vi.fn + '?vkey=' + vi.fvkey;
          } catch (error) {
            
          }
          item.videoUrl = videoUrl
          this.popup.showPopup(videoUrl)
        })
        .catch(e => {
          console.error(e)
        })
    }
  },
 
  //取消事件
  _error() {
    this.popup.hidePopup()
    // this.videoContext.pause()
    // this.videoContext.stop()
  },
  //确认事件
  _success() {
    this.popup.hidePopup()
  },
  scrollToLower: function (e) {
    var ids = this.data.textLiveIds || [];
    if (ids && ids.length) {
      var _ids = ids.splice(0, 20);
      this.setData({
        textLiveIds: ids
      });
      this.getTextLiveDetail(_ids.join(','), true); 
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoContext = wx.createVideoContext('video', this)
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