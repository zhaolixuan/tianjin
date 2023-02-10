export default {
  state: {
    navMenu: [{
      title: '经济与产业',
      url: '',
      class: 'iconfont iconchanyefazhan',
      children: [{
        type: 'frame',
        title: '产业发展态势分析',
        url: 'https://www.maicedata.com/#/?tk=TlJOpSbXEOBMXWJc4c7JQy7jpuHSCbsJlYiV3Zq8fCsdRJCdMvBpfh8ZqkkVVDBm',
        key: 3
      },
      {
        type: 'frame',
        title: '经济运行态势监测',
        url: 'https%3A%2F%2Fwww.maicedata.com%2F#/?tk=nRmJz4CO1Ex2Ax9JZSr7BK4tF8KZuQ5mlvdCzla6N90ZjZI961MBltVyTdg08psl',
        key: 3
      },
      {
        type: 'frame',
        title: '重点产业分析服务',
        class: 'notclick',
        url: null
      },
      {
        type: 'frame',
        title: '产业指数态势监测',
        class: 'notclick',
        url: null
      },
      {
        type: 'frame',
        title: '智慧园区态势管理',
        class: 'notclick',
        url: null
      },
      {
        type: 'frame',
        title: '扶贫管理信息系统',
        class: 'notclick',
        url: null
      },
      {
        type: 'frame',
        title: '跨境电商态势监测',
        class: 'notclick',
        url: null
      },
      {
        type: 'frame',
        title: '库农天下智慧菜市场',
        url: 'http://103.44.239.226:8087/?AgeOId=1035',
        key: 3
      }
      ]
    },
    {
      title: '双招双引',
      url: '',
      class: 'iconfont iconzhaoshangyinzi',
      children: [{
        type: '',
        title: '招商引资态势监测',
        url: 'Merchants',
        key: 4
      },
      {
        type: 'frame',
        title: '招才引智态势监测',
        class: 'notclick',
        url: null
      },
      {
        type: 'frame',
        title: '人口运行态势监测',
        class: 'notclick',
        url: null
      },
      {
        type: 'frame',
        title: '重大项目管理',
        url: '/static/html/bigproject/home.html',
        key: 6
      },
      {
        title: '靶向企业管理',
        url: 'Industry',
        key: 5
      },
      {
        title: '产业链招商',
        url: 'industryInvestment',
        key: 5
      },
      {
        type: 'frame',
        title: '产业园咨询',
        class: 'notclick',
        url: null
      },
      {
        type: 'frame',
        title: '招商政策云',
        class: 'notclick',
        url: null
      }
      ]
    },
    {
      title: '城市管理',
      url: '',
      class: 'iconfont iconyuanquguanli',
      children: [{
        type: '',
        title: '养老管理服务平台',
        url: 'provideAged',
        key: 2
      },
      {
        type: 'frame',
        title: '政务服务运行监测',
        class: 'notclick',
        url: null
      },
      {
        type: 'frame',
        title: '文化旅游态势监测',
        class: 'notclick',
        url: null
      },
      {
        type: 'frame',
        title: '环境污染态势监测',
        class: 'notclick',
        url: null
      },
      {
        type: 'frame',
        title: '基础设施态势监测',
        class: 'notclick',
        url: null
      },
      {
        type: 'frame',
        title: '交通出行态势监测',
        class: 'notclick',
        url: null
      },
      {
        type: 'frame',
        title: '公共卫生态势监测',
        class: 'notclick',
        url: null
      },
      {
        type: 'frame',
        title: '公共安全态势监测',
        class: 'notclick',
        url: null
      }
      ]
    },
    {
      title: '城市体征系统',
      url: '',
      class: 'iconfont iconrencaiyinzhi',
      children: [{
        type: '',
        title: '年度重点工作',
        url: 'yearWork',
        key: 1
      },
      {
        title: '重点任务分解',
        url: 'Quota'
        // key: 2
      },
      {
        type: 'frame',
        title: '综合体征',
        class: 'notclick',
        url: null
      },
      {
        type: 'frame',
        title: '专题体征',
        class: 'notclick',
        url: null
      },
      {
        type: 'frame',
        title: '历史体征',
        class: 'notclick',
        url: null
      },
      {
        type: 'frame',
        title: '体征指标维护',
        class: 'notclick',
        url: null
      }
      ]
    },
    {
      title: '监控预警系统',
      url: '',
      class: 'iconfont iconxiangcunzhenxing',
      children: [{
        type: 'frame',
        title: '监控预警',
        class: 'notclick',
        url: null
      },
      {
        type: 'frame',
        title: '事件管理',
        class: 'notclick',
        url: null
      },
      {
        type: 'frame',
        title: '查询统计分析',
        class: 'notclick',
        url: null
      }
      ]
    },
    {
      title: '应急联动系统',
      url: '',
      class: 'iconfont iconzhihuichengshi',
      children: [{
        type: 'frame',
        title: '预案管理',
        class: 'notclick',
        url: null
      },
      {
        type: 'frame',
        title: '历史事件管理',
        class: 'notclick',
        url: null
      },
      {
        type: 'frame',
        title: '应急研判',
        class: 'notclick',
        url: null
      },
      {
        type: 'frame',
        title: '应急指挥调度',
        class: 'notclick',
        url: null
      },
      {
        type: 'frame',
        title: '应急保障',
        class: 'notclick',
        url: null
      },
      {
        type: 'goto',
        title: '大数据管理',
        url: '/manager/'
      },
      {
        type: 'goto',
        title: '督查管理信息系统',
        url: '/inspection'
      }
      ]
    }
    ]
  }
}
