const path = require('path');
const express = require('express');
const router = require('./router/router');
const bodyParser = require('body-parser');

const app = express();

app.use('/node_modules/', express.static('./node_modules/'));//映射静态资源
app.use('/public/', express.static('./public/'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);

const port = 9000;
app.listen(port, () => {
  console.log('疫情地图后端服务运行在' + port + '端口...');
});

