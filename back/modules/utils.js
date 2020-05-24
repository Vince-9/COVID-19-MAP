/**
 * 对数据的地名进行格式化
 */
exports.formateCovidData = function (data) {
  try {
    for (let i = 0; i < data.length; i++) {
      let pName = data && data[i] && data[i].provinceName || '';
      if (/黑龙江|内蒙古/.test(pName)) {
        pName = pName.substr(0, 3);
      } else {
        pName = pName.substr(0, 2);
      }
      data[i].provinceName = pName;
    }
    for (let i = 0; i < data.length - 1; i++) {
      let pName = data && data[i] && data[i].provinceName || '';
      if (pName === data[i + 1].provinceName) {
        data.splice(i, 1);
        i--;
      }
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}