export default {
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  legend: {
    data: ['未接通', '接通数', '呼出人数'],
    textStyle: {
      color: '#4FD0FF'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      axisLabel: {
        color: '#4FD0FF'
      },
      axisLine: {
        lineStyle: {
          color: '#4FD0FF'
        }
      },
      axisTick: {
        show: false
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      axisLabel: {
        color: '#4FD0FF'
      },
      axisLine: {
        lineStyle: {
          color: '#4FD0FF'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(79,208,255,0.4)'
        }
      },
      axisTick: {
        show: false
      }
    }
  ],
  series: [
    {
      name: '接通数',
      type: 'bar',
      stack: '广告',
      data: [120, 132, 101, 134, 90, 230, 210],
      barWidth: '50%',
      color: '#1893fe'
    },
    {
      name: '呼出人数',
      type: 'bar',
      stack: '广告',
      data: [220, 182, 191, 234, 290, 330, 310],
      barWidth: '50%',
      color: '#45EB9D'
    },
    {
      name: '未接通',
      type: 'bar',
      stack: '广告',
      data: [150, 232, 201, 154, 190, 330, 410],
      barWidth: '50%',
      color: '#62FEEF'
    }
  ]
}
