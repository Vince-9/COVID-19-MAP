import React, { useState, useEffect } from 'react';
import echarts from 'echarts';
import '../../assets/js/myChina';
import './map.css';

export default function Map(props) {

  const [mapData, setMapData] = useState([]);
  useEffect(data=>initMap(mapData), [mapData]);
  setTimeout(() => {
    setMapData([{ name: '广东', value: 233, test: 9998 }])
  }, 2000);
  return (
    <div id="map-div"></div>
  )
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
        console.log(params)
        return params.seriesName + '<br />' + params.name + '：' + params.value
      },
    },
    visualMap: {
      type: 'piecewise', //分段型 
      splitNumber: 6,//颜色分割数量
      align: "left",//
      pieces: [ //将不同值的地图区域赋予颜色
        {
          min: 10,
          max: 20,//以值的范围选择，也可用特定值来筛选，此时用value:表示 
          label: '35.13%',//图例的标签名称
          color: '#007979'//选中区域的颜色
        },
        {
          min: 20,
          max: 30,
          label: '31.39%',
          color: '#00AEAE'
        },
        {
          min: 30,
          max: 40,
          label: '12.41%',
          color: '#00CACA'
        },
        {
          min: 40,
          max: 50,
          label: '9.70%',
          color: '#00E3E3'
        },
        {
          min: 50,
          max: 60,
          label: '9.42%',
          color: '#00FFFF'
        },
        {
          min: 60,
          max: 1000000,
          label: '1.95%',
          color: '#80FFFF'
        }],
      left: '89%',
      top: '370px',
      text: ['图例', '图例名1'],//地图图例名称
      textStyle: {//图例字号大小及颜色
        color: '#000',
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