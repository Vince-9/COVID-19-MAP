const express = require('express');
const router = express.Router();
const data = require('../modules/data');
const { formateCovidData } = require('../modules/utils');

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

module.exports = router;