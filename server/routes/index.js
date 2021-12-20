var request = require('../utils/request');
var express = require('express');
var router = express.Router();

/**
 * 获取赛事直播列表
 * @method GET请求
 * @desc 获取赛事直播列表
 * @param startTime 开始日期
 * @param endTime 结束日期
 */
// https://matchweb.sports.qq.com/kbs/list?columnId=100000&startTime=2020-09-11&endTime=2020-09-18&from=h5
router.get('/schedule', function(req, res, next) {
    var startTime = req.query.startTime || new Date().toLocaleDateString().replace(/\//g,'-'),
        endTime = req.query.endTime || new Date().toLocaleDateString().replace(/\//g,'-');
    var r = request(`https://matchweb.sports.qq.com/kbs/list?columnId=100000&startTime=${startTime}&endTime=${endTime}&from=h5`, function(result) {
        res.send(result);
    });
    r.on('error', function(e) {
        console.error('请求遇到问题:'+ e.message);
    });
    r.end();
});

/**
 * 比赛详情信息
 * @method GET请求
 * @desc 获取比赛详情信息
 * @param mid 
 * 
 */
// https://matchweb.sports.qq.com/kbs/matchDetail?mid=100000:55068833&from=sportsh5
router.get('/kbs/matchDetail', function(req, res, next) {
    var mid = req.query.mid;
    var r = request(`https://matchweb.sports.qq.com/kbs/matchDetail?mid=${mid}&from=sportsh5`, function(result) {
        res.send(result);
    });
    r.on('error', function(e) {
        console.error('请求遇到问题:'+ e.message);
    });
    r.end();
});

/**
 * 视频列表
 * @method GET请求
 * @desc 视频列表
 * @param mid
 */
// https://matchweb.sports.qq.com/html/matchStatV37?mid=100000%3A55068833
router.get('/html/matchStatV37', function(req, res, next) {
    var mid = req.query.mid;
    var r = request(`https://matchweb.sports.qq.com/html/matchStatV37?mid=${mid}`, function(result) {
        res.send(result);
    });
    r.on('error', function(e) {
        console.error('请求遇到问题:'+ e.message);
    });
    r.end();
});

/**
 * 获取视频URL
 * @method GET请求
 * @desc 获取视频URL
 * @param vid
 */
// https://h5vv.video.qq.com/getinfo?platform=11001&charge=0&otype=json&ehost=https%3A%2F%2Fsports.qq.com&sphls=1&sb=1&nocache=0&_rnd=1600246631&guid=e01c0879af563e011f930ff22495de9f&appVer=V2.0Build9502&vids=f0034gt264t&defaultfmt=auto&&_qv_rmt=HYF/H4gNA10263H1w=&_qv_rmt2=cp+JMw0K160461RNw=&sdtfrom=v5010
router.get('/getVideoInfo', function(req, res, next) {
    var vid = req.query.vid;
    var r = request(`https://h5vv.video.qq.com/getinfo?platform=11001&charge=0&otype=json&ehost=https%3A%2F%2Fsports.qq.com&sphls=1&sb=1&nocache=0&_rnd=1600246631&guid=e01c0879af563e011f930ff22495de9f&appVer=V2.0Build9502&vids=${vid}&defaultfmt=auto&&_qv_rmt=HYF/H4gNA10263H1w=&_qv_rmt2=cp+JMw0K160461RNw=&sdtfrom=v5010&callback=tvp_request_getinfo_callback`, function(result) {
        res.send(result);
    });
    r.on('error', function(e) {
        console.error('请求遇到问题:'+ e.message);
    });
    r.end();
});

/**
 * 球员基本信息
 * @method GET请求
 * @desc 球员基本信息
 * @param playerId
 */
// https://matchweb.sports.qq.com/player/baseInfo?&callback=playerBaseInfo&playerId=4725&from=web&_=1600175739020
router.get('/player/baseInfo', function(req, res, next) {
    var playerId = req.query.playerId;
    var r = request(`https://matchweb.sports.qq.com/player/baseInfo?playerId=${playerId}&from=h5`, function(result) {
        res.send(result);
    });
    r.on('error', function(e) {
        console.error('请求遇到问题:'+ e.message);
    });
    r.end();
});

/**
 * 球员profile
 * @method GET请求
 * @desc 球员profile
 * @param playerId
 */
//https://matchweb.sports.qq.com/player/profile?playerId=4725&from=h5
router.get('/player/profile', function(req, res, next) {
    var playerId = req.query.playerId;
    var r = request(`https://matchweb.sports.qq.com/player/profile?playerId=${playerId}&from=h5`, function(result) {
        res.send(result);
    });
    r.on('error', function(e) {
        console.error('请求遇到问题:'+ e.message);
    });
    r.end();
});

/**
 * @method GET请求
 * @desc 球队基本信息详情
 * @param teamId
 * @param competitionId
 */
// https://matchweb.sports.qq.com/team/baseInfo?teamId=12&competitionId=100000&from=h5
router.get('/team/baseInfo', function(req, res, next) {
    var teamId = req.query.teamId, competitionId = req.query.competitionId || 100000;
    var r = request(`https://matchweb.sports.qq.com/team/baseInfo?teamId=${teamId}&competitionId=${competitionId}&from=h5`, function(result) {
        res.send(result);
    });
    r.on('error', function(e) {
        console.error('请求遇到问题:'+ e.message);
    });
    r.end();
});

/**
 * 赛季
 * @method GET请求
 * @desc 球队赛季
 */
// https://matchweb.sports.qq.com/nbaUnion/allSeasons
router.get('/allSeasons', function(req, res, next) {
    var r = request(`https://matchweb.sports.qq.com/nbaUnion/allSeasons`, function(result) {
        res.send(result);
    });
    r.on('error', function(e) {
        console.error('请求遇到问题:'+ e.message);
    });
    r.end();
});

/**
 * 联盟排名
 * @method GET请求
 * @desc 30只球队联盟排名
 */
router.get('/rank/team', function(req, res, next) {
    var r = request(`https://matchweb.sports.qq.com/rank/team?columnId=100000&from=NBA`, function(result) {
        res.send(result);
    });
    r.on('error', function(e) {
        console.error('请求遇到问题:'+ e.message);
    });
    r.end();
});

/**
 * 获取文字直播IDS
 * @method GET请求
 * @desc 获取文字直播IDS
 * @param matchId
 * @param competitionId
 */
// https://matchweb.sports.qq.com/textLive/index?competitionId=100000&matchId=55068833
router.get('/textLive/index', function(req, res, next) {
    var matchId = req.query.matchId;
    var r = request(`https://matchweb.sports.qq.com/textLive/index?matchId=${matchId}&competitionId=100000&from=h5`, function(result) {
        res.send(result);
    });
    r.on('error', function(e) {
        console.error('请求遇到问题:'+ e.message);
    });
    r.end();
});

/**
 * 获取文字直播内容
 * @method GET请求
 * @desc 获取文字直播内容
 * @param matchId
 * @param ids
 */
// https://matchweb.sports.qq.com/textLive/detail?competitionId=100000&matchId=55068833&ids=6710995922111756634_3126558223
router.get('/textLive/detail', function(req, res, next) {
    var matchId = req.query.matchId,
        ids = req.query.ids;
    var r = request(`https://matchweb.sports.qq.com//textLive/detail?ids=${ids}&matchId=${matchId}&competitionId=100000`, function(result) {
        res.send(result);
    });
    r.on('error', function(e) {
        console.error('请求遇到问题:'+ e.message);
    });
    r.end();
});

/**
 * 比赛数据
 * @method GET请求
 * @desc 球队比赛数据
 * @param mid
 */
// https://matchweb.sports.qq.com/kbs/matchStat?mid=100000%3A55068833
router.get('/kbs/matchStat', function(req, res, next) {
    var mid = req.query.mid;
    var r = request(`https://matchweb.sports.qq.com/kbs/matchStat?mid=${mid}`, function(result) {
        res.send(result);
    });
    r.on('error', function(e) {
        console.error('请求遇到问题:'+ e.message);
    });
    r.end();
});

/**
 * 球队赛程
 * @method GET请求
 * @desc 球队每月赛程
 * @param teamId
 */
// https://matchweb.sports.qq.com/team/matchList?teamId=15&competitionId=100000&_=1539156446423
router.get('/team/schedule', function(req, res, next) {
    var teamId = req.query.teamId,
        mouth = req.query.mouth;
    var r = request(`https://matchweb.sports.qq.com/team/matchList?teamId=${teamId}&competitionId=100000&_=1539156446423`, function(result) {
        res.send(result);
    });
    r.on('error', function(e) {
        console.error('请求遇到问题:'+ e.message);
    });
    r.end();
});

/**
 * 球队阵容
 * @method GET请求
 * @desc 球队阵容球员列表
 * @param teamId
 * @param competitionId
 */
// https://matchweb.sports.qq.com/team/players?teamId=12&competitionId=100000
router.get('/team/players', function(req, res, next) {
    var teamId = req.query.teamId, competitionId = req.query.competitionId|| 100000;
    var r = request(`https://matchweb.sports.qq.com/team/players?teamId=${teamId}&competitionId=${competitionId}`, function(result) {
        res.send(result);
    });
    r.on('error', function(e) {
        console.error('请求遇到问题:'+ e.message);
    });
    r.end();
});

/**
 * 得分篮板助攻抢断三分等等排名
 * @desc 球队阵容球员列表
 * @param dimId 53,54,55,56,57,58 查询6个维度得分、篮板、助攻、抢断、盖帽、失误
 * @params: t2:2019|t3:1 
 */
// https://ziliaoku.sports.qq.com/cube/index?limit=30&cubeId=10&dimId=53%2C54%2C55%2C56%2C57%2C58&params=t2%3A2019%7Ct3%3A1&from=sportsdatabase&callback=__jpcb0
router.get('/player/top', function(req, res, next) {
    var r = request(`https://ziliaoku.sports.qq.com/cube/index?limit=30&cubeId=10&dimId=53%2C54%2C55%2C56%2C57%2C58&params=t2%3A2019%7Ct3%3A1&from=sportsdatabase`, function(result) {
        res.send(result);
    });
    r.on('error', function(e) {
        console.error('请求遇到问题:'+ e.message);
    });
    r.end();
});

/**
 *  球员最近五场比赛数据
 * @method GET请求
 * @desc 球员最近五场比赛数据
 */
// https://matchweb.sports.qq.com/player/stats?&callback=playerStats&playerId=4725&from=web&_=1600175739021
router.get('/player/stats', function(req, res, next) {
    var playerId = req.query.playerId,
        seasonId = req.query.seasonId,
        seasonType = req.query.seasonType;
    var opt = {
        protocol: 'https:',
        hostname:'matchweb.sports.qq.com',
        path: `/player/stats?playerId=${playerId}&seasonId=${seasonId}&seasonType=${seasonType}&from=h5`,
        port: '443',
        method:'get'
    }
    var r = request(opt, function(result) {
        res.send(result);
    });
    r.on('error', function(e) {
        console.error('请求遇到问题:'+ e.message);
    });
    r.end();
});

/**
 *  球队最近五场比赛数据
 * @method GET请求
 * @desc 球队最近五场比赛数据
 * @param teamId
 * @param competitionId
 * @param seasonId
 * @param seasonType
 */
// https://matchweb.sports.qq.com/team/stats?teamId=12&competitionId=100000&from=h5&seasonId=2019&seasonType=2
router.get('/team/stats', function(req, res, next) {
    var teamId = req.query.teamId,
        competitionId = req.query.competitionId || 100000,
        seasonId = req.query.seasonId,
        seasonType = req.query.seasonType;
    var r = request(`https://matchweb.sports.qq.com/team/stats?teamId=${teamId}&competitionId=${competitionId}&seasonId=${seasonId}&seasonType=${seasonType}&from=h5`, function(result) {
        res.send(result);
    });
    r.on('error', function(e) {
        console.error('请求遇到问题:'+ e.message);
    });
    r.end();
});

/**
 *  新闻列表
 * @method GET请求
 * @desc 新闻列表
 * @param teamId
 * @param page
 */
// https://pacaio.match.qq.com/irs/index?flag=article&d1=irs%3Aarticle%3Aindex%3Anba&d2=0&idx1=irs%3Aarticle%3Aindex%3Anba&idx2=15&num=20&expIds=&page=0&_t=1601031429
router.get('/news/list', function(req, res, next) {
    var teamId = req.query.teamId, 
        page = req.query.page || 0;
    var r = request(`https://pacaio.match.qq.com/irs/index?flag=article&d1=irs%3Aarticle%3Aindex%3Anba&d2=0&idx1=irs%3Aarticle%3Aindex%3Anba&idx2=${teamId}&num=20&expIds=&page=${page}&_t=1601031429`, function(result) {
        res.send(result);
    });
    r.on('error', function(e) {
        console.error('请求遇到问题:'+ e.message);
    });
    r.end();
});
/**
 *  新闻详情
 * @method GET请求
 * @param newsId
 */
// https://pacaio.match.qq.com/openapi/getQQNewsContentBat?id=20200924A06KL700&newSource=1
router.get('/getQQNewsContent', function(req, res, next) {
    var newsId = req.query.newsId;
    var r = request(`https://pacaio.match.qq.com/openapi/getQQNewsContentBat?id=${newsId}&newSource=1`, function(result) {
        res.send(result);
    });
    r.on('error', function(e) {
        console.error('请求遇到问题:'+ e.message);
    });
    r.end();
});

/**
 *  评论
 * @method GET请求
 * @param targetId
 */

// https://coral.qq.com/article/5912939908/comment?commentid=0&reqnum=50&tag=&source=5
router.get('/getComments', function(req, res, next) {
    var targetId = req.query.targetId;
    var r = request(`https://coral.qq.com/article/${targetId}/comment?commentid=0&reqnum=50&tag=&source=5`, function(result) {
        res.send(result);
    });
    r.on('error', function(e) {
        console.error('请求遇到问题:'+ e.message);
    });
    r.end();
});


module.exports = router;