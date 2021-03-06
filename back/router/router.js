const express = require('express');
const router = express.Router();
const data = require('../modules/data');
const { formateCovidData, formatLineData } = require('../modules/utils');

router.get('/api/v1/getCovidDataByDate', async (req, res) => {
  try {
    console.log(req.query);
    const date = req.query.date;
    const covData = await data.getCovidDataByDate(date);
    res.send({ code: 0, data: formateCovidData(covData) });
    // res.send({ code: 0, data: covData });
  } catch (error) {
    res.status(500).end({ code: 1, msg: '服务器错误，请稍后再试' });
  }
});

router.get('/api/v1/getLineChartData', async (req, res) => {
  try {
    const lineData = await data.getLineChartData();
    res.send({ code: 0, data: formatLineData(lineData) });
    // res.send({ code: 0, data: covData });
  } catch (error) {
    res.status(500).end({ code: 1, msg: '服务器错误，请稍后再试' });
  }
})

router.post(`/api/v1/login`, async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    if (username === 'admin' && password === '123456') {
      res.send({ code: 0, data: { status: 0, msg: '登录成功' } });
    } else {
      res.send({ code: 0, data: { status: 1, msg: '登录失败' } });
    }
  } catch (error) {
    res.status(500).end({ code: 1, msg: '服务器错误，请稍后再试' });
  }
})

module.exports = router;