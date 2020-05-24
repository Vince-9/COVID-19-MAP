const pg = require('pg');
//数据库配置
const conString = "tcp://postgres:123@localhost/COVID_19_map"; //tcp://用户名：密码@localhost/数据库名
const client = new pg.Client(conString);
// SELECT DISTINCT ON ("provinceName") "provinceName", "province_confirmedCount", "province_suspectedCount","province_curedCount","province_deadCount","updateTime"  FROM "DXYArea" WHERE "countryName" = '中国'  LIMIT 10000 OFFSET 0 

// var tem = 33;
//sql语句
selectSQLString = `SELECT DISTINCT "provinceName",  "province_confirmedCount", "province_suspectedCount","province_curedCount","province_deadCount" FROM "DXYArea" WHERE "countryName" = '中国' AND "updateTime" LIKE '2020-01-25%'`;
//客户端连接，进行数据插入
// client.connect(function (error, results) {
//   if (error) {
//     console.log('clientConnectionReady Error:' + error.message);
//     client.end();
//     return;
//   }
//   console.log('数据库连接成功...\n');

//   // client.query(selectSQLString, function (error, results) {
//   //   console.log(error);
//   //   console.log(results);
//   // })

//   // 每10分钟发一次心跳查询，防止连接断开
//   setInterval(() => {
//     client.query(`SELECT * FROM "DXYArea" LIMIT 1 OFFSET 0`, function (error, results) {
//       console.log(error);
//       console.log(results);
//     })
//   }, 10 * 60 * 1000);
// });

module.exports = sql => {
  return new Promise((resolve, reject) => {
    client.connect(function (error, results) {
      if (error) {
        client.end();
        reject(error);
        return;
      }

      client.query(sql, function (error, results) {
        if (error) reject(error);
        resolve(results);
      })
    });
  })
    .catch(err => {
      console.log('数据库查询失败：', err.message);
    })
}