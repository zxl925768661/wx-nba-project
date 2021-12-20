// pages/news_info/news_info.js
var WxParse = require('../wxParse/wxParse.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsContent: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    this.getQQNewsContent({
      newsId: e.newsId
    })
  },

  getQQNewsContent: function (params) {
    app.api
    .getQQNewsContent(params)
    .then(res => {
      var _data = res.data || {}
      if (_data && _data.CntAttribute && _data.CntAttribute.ImgAll) {
        var imgAll = _data.CntAttribute.ImgAll
        for (var i in imgAll) {
          var replaceStr = '<img src=' + imgAll[i].img.imgurl641.imgurl + '>'
          _data.CntHtml = _data.CntHtml.replace(`<!--${i}-->`, replaceStr)
        }
      }
      WxParse.wxParse('article', 'html', _data.CntHtml, this, 5)
      this.setData({
        newsContent: _data
      })
    })
    .catch(e => {
      console.error(e)
      var article = '文章已经删除'
      WxParse.wxParse('article', 'html', article, that, 5)
    })
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