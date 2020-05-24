import React, { useState, useEffect } from 'react';
import echarts from 'echarts';
import './line-chart.css';
import { getLineChartData } from '../../api';

export default function LineChart() {

  useEffect(() => {
    getLineChartData().then(data => {
      if (data.code === 0) {
        initChart(data.data);
      }
    })
  }, []);

  return (
    <div id="line-chart"></div>
  )
}

function initChart(data) {
  const lineData = data.reverse();
  const xAxisData = [];
  const seriesData = [{ data: [], name: '累计确诊', stack: '总量', type: 'line' }, { data: [], name: '累计治愈', stack: '总量', type: 'line' }, { data: [], name: '累计死亡', stack: '总量', type: 'line' }];
  for (let item of lineData) {
    const date = item.updateTime.split('-');
    xAxisData.push(date[1] + '.' + date[2]);
    seriesData[0].data.push(item.province_confirmedCount);
    seriesData[1].data.push(item.province_curedCount);
    seriesData[2].data.push(item.province_deadCount);
  }
  const dom = document.getElementById("line-chart");
  const myChart = echarts.init(dom);
  const option = {
    title: {
      text: '疫情变化'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['累计确诊', '累计治愈', '累计死亡']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xAxisData
    },
    yAxis: {
      type: 'value'
    },
    series: seriesData
  };
  ;
  if (option && typeof option === "object") {
    myChart.setOption(option, true);
  }
}
