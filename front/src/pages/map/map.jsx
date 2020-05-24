import React, { useState, useEffect } from 'react';
import echarts from 'echarts';
import '../../assets/js/myChina';
import './map.css';
import { getCovidDataByDate } from '../../api';

export default function Map(props) {

  const [mapData, setMapData] = useState([]);
  useEffect(data => initMap(mapData), [mapData]);
  useEffect(() => {
    getCovidDataByDate()
      .then(data => {
        setMapData(formatData(data.data));

        console.log(formatData(data.data))
      })
  }, []);
  // setTimeout(() => {
  //   setMapData([{ name: '内蒙', value: 233, test: 9998 }])
  // }, 2000);
  return (
    <div id="map-div"></div>
  )
}

function formatData(data) {
  for (let i = 0; i < data.length; i++) {
    data[i].name = data[i].provinceName;
    data[i].value = data[i].province_confirmedCount - data[i].province_curedCount - data[i].province_deadCount;
  }
  return data;
}

/**
 * @description 初始化地图
 * @param {Array} data 地图数据
 */
function initMap(data) {
  if (!data) {
    data = [
      { name: '福建', value: 20, test: 9998 },
      { name: '安徽', value: 5050, },
    ]
  }
  var myChart = echarts.init(document.getElementById('map-div'));
  var option = {
    title: {//设置地图标题
      text: '疫情地图',//地图图名
      left: 'center',//地图在横向上的位置
      top: '20',//地图距其DIV上边界的距离
      textStyle: {//图名字号大小
        fontSize: 30,
      },
    },
    // < !--backgroundColor: 'lightblue',//Echarts图背景颜色 -->
    tooltip: {//地图悬浮框显示内容
      formatter: function (params, ticket, callback) {
        try {
          // console.log(params);
          const { province_deadCount, province_confirmedCount, province_curedCount, updateTime } = params.data;
          return `${params.name}<br />现存病例：${params.value}<br />累计确诊：${province_confirmedCount}<br />累计治愈：${province_curedCount}<br />累计死亡：${province_deadCount}<br />更新时间：${updateTime}`
        } catch (error) {
          return `${params.name}<br />已清零或无数据`
        }

      },
    },
    visualMap: {
      type: 'piecewise', //分段型 
      splitNumber: 6,//颜色分割数量
      align: "left",//
      pieces: [ //将不同值的地图区域赋予颜色
        {
          min: 1,
          max: 20,//以值的范围选择，也可用特定值来筛选，此时用value:表示 
          label: '1-20',//图例的标签名称
          color: '#FFDDDD'//选中区域的颜色
        },
        {
          min: 21,
          max: 100,
          label: '31.39%',
          color: '#FFAAAA'
        },
        {
          min: 101,
          max: 300,
          label: '12.41%',
          color: '#FF9999'
        },
        {
          min: 301,
          max: 1000,
          label: '9.70%',
          color: '#DD8888'
        },
        {
          min: 1000,
          max: 3000,
          label: '9.42%',
          color: '#AA5555'
        },
        {
          min: 3001,
          max: 10000000,
          label: '1.95%',
          color: '#990000'
        }],
      left: '89%',
      top: '370px',
      text: ['图例', '图例名1', '图例名2', '图例名3', '图例名4', '图例名5'],//地图图例名称
      textStyle: {//图例字号大小及颜色
        color: '#666666',
        fontSize: 12
      },
    },
    series: [{
      type: 'map',
      mapType: 'china',
      label: {
        normal: {
          show: true,//显示省份标签
          textStyle: { color: "#c71585" }//省份标签字体颜色
        },
        emphasis: {//对应的鼠标悬浮效果
          show: true,
          textStyle: { color: "#800080" }
        }
      },
      data,
    }],
  };
  myChart.setOption(option);
}