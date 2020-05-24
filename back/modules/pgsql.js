var pg = require('pg');
//数据库配置
var conString = "tcp://postgres:123@localhost/COVID_19_map"; //tcp://用户名：密码@localhost/数据库名
var client =  new pg.Client(conString);
// SELECT DISTINCT ON ("provinceName") "provinceName", "province_confirmedCount", "province_suspectedCount","province_curedCount","province_deadCount","updateTime"  FROM "DXYArea" WHERE "countryName" = '中国'  LIMIT 10000 OFFSET 0 

var tem = 33;
//sql语句
selectSQLString = `SELECT DISTINCT "provinceName", "updateTime", "province_confirmedCount", "province_suspectedCount","province_curedCount","province_deadCount" FROM "DXYArea" WHERE "countryName" = '中国'`;
//客户端连接，进行数据插入
client.connect(function(error, results){
  if (error) {
    console.log('clientConnectionReady Error:'+error.message);
    client.end();
    return;
  }
  console.log('connection success...\n');
  client.query(selectSQLString,function(error,results){
    console.log(error);
    console.log(results);
  })
});