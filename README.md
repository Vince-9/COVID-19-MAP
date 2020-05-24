> 2020年5月24日15:46:30
>
> 这是WebGIS的一个大作业。数据是从github上下载的csv文件，并导入到了postgresql数据库。

## 启动项目

目录中有`front`和`back`两个目录，分别是前端和后端。

按照下面的步骤导入数据库，然后分别通过`npm start`来启动前后端项目，就可以看到页面了。

成果图：

![img](https://qqadapt.qpic.cn/txdocpic/0/83c5f73684e795ff167486d82de40c59/0?w=3000&h=2000)

![img](https://qqadapt.qpic.cn/txdocpic/0/4c5216b6b4123c6e2647b24e9bddb63f/0?w=2913&h=1219)

# 如何将疫情数据导入到postgresql数据库

数据在src和json这两个目录下,[数据来源](https://github.com/BlankerL/DXY-COVID-19-Data)

e![img](https://qqadapt.qpic.cn/txdocpic/0/07bb5702dd8cde056889d751fcf78b08/0?w=430&h=358)             

### **安装postgresql**

密码就随便设置个123吧，其他的默认即可

![img](https://qqadapt.qpic.cn/txdocpic/0/03fa7f993ea59d5f88c0ee48952465ff/0?w=1104&h=868)             

### **安装Navicat，然后破解**

![img](https://qqadapt.qpic.cn/txdocpic/0/2cbfb06968a97d2a808c68378b0eef4d/0?w=688&h=289)             

确保postgresql安装无误，然后打开Navicat

点击左上角的连接，选择postgresql

![img](https://qqadapt.qpic.cn/txdocpic/0/af7e3f8fbd9d4cea80323dbc28b74810/0?w=324&h=202)             

输入密码和连接名，密码就上面那个123

#### **输好后就点左下角的测试连接**

![img](https://qqadapt.qpic.cn/txdocpic/0/ad15e931d752ce826f9fd87ff04e2187/0?w=927&h=1050)             

连接测试如果有问题，自己想办法解决，可能连接信息有问题或者数据库没启动之类的，自行百度解决。

![img](https://qqadapt.qpic.cn/txdocpic/0/861771f3d66c19b46ca84c52ead1e9ea/0?w=388&h=242)      

连接好后，右键它，创建数据库

![img](https://qqadapt.qpic.cn/txdocpic/0/bf3af8a6e5aef3746597569a8662eae7/0?w=417&h=510)             

 ![img](https://qqadapt.qpic.cn/txdocpic/0/26f7f1a2927c8b623a75873fc3fb2b2e/0?w=850&h=787)             

### 右键点击表，点击【导入向导】

![img](https://qqadapt.qpic.cn/txdocpic/0/3c37874a59a2e3ae6cd632a88d537b6c/0?w=348&h=194)             

![img](https://qqadapt.qpic.cn/txdocpic/0/544bc94fae48a2d2485cfbe5deba96d0/0?w=1312&h=983)             

![img](https://qqadapt.qpic.cn/txdocpic/0/c6aa2f57c7b3f01913e615b47c301981/0?w=1460&h=1272)             

一直下一步，然后点开始，导入完后关闭对话框。

导入完后就应该可以看到这个了

![img](https://qqadapt.qpic.cn/txdocpic/0/9dd7683487ef1802555a19540497ba25/0?w=281&h=89)             

可以打开这个表看一看

![img](https://qqadapt.qpic.cn/txdocpic/0/e38fecf2d8a773cdb45cf806f6300c1b/0?w=2624&h=1447)             

每个字段是干什么的，自己研究一下就知道了，每个都点开看看。

然后右键点击查询，新建查询

![img](https://qqadapt.qpic.cn/txdocpic/0/d509cca8fefb233295f58b196b2b8ebe/0?w=377&h=421)             

我这准备了几条sql命令，都执行下看看，然后根据自己的需要来改编

```sql
SELECT DISTINCT ON ("provinceName") "provinceName", "province_confirmedCount", "province_suspectedCount","province_curedCount","province_deadCount","updateTime"  FROM "DXYArea" WHERE "countryName" = '中国'  LIMIT 10000 OFFSET 0 


SELECT DISTINCT "provinceName", "updateTime", "province_confirmedCount", "province_suspectedCount","province_curedCount","province_deadCount" FROM "DXYArea" WHERE "countryName" = '中国' AND "updateTime" LIKE '2020-01-25%'

SELECT "provinceName","updateTime","province_confirmedCount","province_curedCount","province_deadCount" FROM "DXYArea" WHERE "provinceName" = '中国'
```