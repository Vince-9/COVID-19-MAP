const path = require('path');
const db = require(path.join(__dirname, './pgsql'));
/**
 * 从数据库中获取数据
 */

console.log(new Date(Date.now() + 8 * 60 * 60 * 1000))
// db(`SELECT * FROM "DXYArea" LIMIT 1 OFFSET 0`)
//   .then(data => console.log(data));

/**
 * 查询某一天全国各省的疫情数据
 * @param {String} date 要查询的日期，为字符串，格式如'2020-05-24'，必须严格按照这种格式
 * @returns {Promise}
 */
function getCovidDataByDate(date) {
  const sql = `SELECT DISTINCT "provinceName", "updateTime", "province_confirmedCount", "province_suspectedCount","province_curedCount","province_deadCount" FROM "DXYArea" WHERE "countryName" = '中国' AND "updateTime" LIKE '${date}%'`;
  return db(sql).then(data => data.rows);
}

module.exports = {
  getCovidDataByDate
}