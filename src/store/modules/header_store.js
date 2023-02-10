export default {
  state: {
    leftBtns: [
      { name: '年度重点工作', contentTitle: '年度重点工作', icon: 'cyfz', key: 1, activeClass: '', type: '', url: 'yearWork' },
      // { name: '智慧养老', contentTitle: '智慧养老', icon: 'xczx', key: 2, activeClass: '', type: '', url: 'provideAged' },
      { name: '智慧养老', contentTitle: '智慧养老', icon: 'xczx', activeClass: '', key: 2, type: '', url: 'olderDistribution' }, // 系12月3修改
      { name: '经济产业分析', contentTitle: '经济产业分析', icon: 'szsy', key: 3, activeClass: '', type: 'frame', url: 'https://www.maicedata.com/#/?tk=4mcbyP2viw7Utr0DX7mCmloNwrts3cavq91rxAqTDxzbFOUvOMZQnrQ1rGvyMiaB' }
    ],
    rightBtns: [
      // { name: '招商态势', contentTitle: '招商态势', icon: 'cyfz', key: 4, activeClass: '', type: '', url: 'Merchants' },
      { name: '产业链招商', contentTitle: '产业链招商', icon: 'whjy', key: 5, activeClass: '', type: '', url: 'industryInvestment' },
      { name: '重大项目', contentTitle: '重大项目', icon: 'hjzl', key: 6, activeClass: '', type: 'frame', url: '/static/html/bigproject/home.html' }
    ]
  }
}
