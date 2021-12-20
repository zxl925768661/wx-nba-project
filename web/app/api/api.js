import fetch from './fetch'
const API_DOMAIN = 'http://localhost:3000/'
/*
 * @param  {String} api 接口地址
 * @param  {Objece} params 接口参数参数
 */
function fetchApi (api, params) {
  return fetch(API_DOMAIN, api, params)
}

// NBA比赛直播
function getNBASchedule (params) {
  return fetchApi('schedule', params).then(res => res)
}

// 比赛信息
function getMatchDetail (params) {
  return fetchApi('kbs/matchDetail', params).then(res => res)
}

// 获取文字直播ID
function getTextLiveIds (params) {
  return fetchApi('textLive/index', params).then(res => res)
}

// 文字直播内容
function getTextLiveDetail (params) {
  return fetchApi('textLive/detail', params).then(res => res)
}

// 视频列表
function getMatchStatVideo (params) {
  return fetchApi('html/matchStatV37', params).then(res => res)
}

// 获取视频地址
function getVideoInfo (params) {
  return fetchApi('getVideoInfo', params).then(res => res)
}

// 球员技术统计
function getMatchStatistics (params) {
  return fetchApi('kbs/matchStat', params).then(res => res)
}

// 球员基本信息
function getPlayerBaseInfo (params) {
  return fetchApi('player/baseInfo', params).then(res => res)
}

// 球员简介信息
function getPlayerProfileInfo (params) {
  return fetchApi('player/profile', params).then(res => res)
}

// 联盟排名
function getTeamRank (params) {
  return fetchApi('rank/team', params).then(res => res)
}

// 球队赛程
function getTeamSchedule (params) {
  return fetchApi('team/schedule', params).then(res => res)
}

// 球队阵容
function getTeamPlayers (params) {
  return fetchApi('team/players', params).then(res => res)
}

// 新闻详情
function getQQNewsContent (params) {
  return fetchApi('getQQNewsContent', params).then(res => res)
}

// 新闻列表
function getNewsList (params) {
  return fetchApi('news/list', params).then(res => res)
}

// NBA新闻评论
function getComments (params) {
  return fetchApi('getComments', params).then(res => res)
}

// 球员数据排行榜
function getTopPlayer (params) {
  return fetchApi('player/top', params).then(res => res)
}

// 球员技术数据
function getPlayerStats(params){
  return fetchApi('player/stats', params).then(res => res)
}

// 赛季
function getAllSeasons(){
  return fetchApi('allSeasons', {}).then(res => res)
}

// 球队数据
function getTeamStats(params){
  return fetchApi('team/stats', params).then(res => res)
}

// 球队基本信息
function getTeamBaseInfo (params) {
  return fetchApi('team/baseInfo', params).then(res => res)
}
module.exports = {
  getNBASchedule,
  getMatchDetail,
  getTextLiveIds,
  getTextLiveDetail,
  getMatchStatVideo,
  getVideoInfo,
  getMatchStatistics,
  getPlayerBaseInfo,
  getPlayerProfileInfo,
  getTeamRank,
  getTeamPlayers,
  getQQNewsContent,
  getComments,
  getNewsList,
  getTeamSchedule,
  getTopPlayer,
  getPlayerStats,
  getAllSeasons,
  getTeamBaseInfo,
  getTeamStats
}
