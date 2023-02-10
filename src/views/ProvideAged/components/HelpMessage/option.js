var spirit = 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAA51BMVEVHcEz+d3DmUPv0ZbL+dnDrV+D+dm/nUvTmUPzrV+P/c5T3a5j/gID/Zpn3aaD1Z6nqVar0ZqnVVar4aKX/dYD6b4fyYrr1ZLT8dHj8coH/d2/vX8L/eHD3a5n5bpHvXcryYrr/bW35cIj9c4H/eHD/dnbuW9TwYMLnUvT/VarnUPztWdzsV+DwXcruXNP/VdXoUvXnUfvrWNr4bZDtW9L0ZqnxYrn3a5juXcr9dHf7coDyZLHzZLH6cIjrWdr1aaHrWNr2aaDwX8H7cn/5b4jwYMH8dHfwYML2aaH6b4j1aaDwX8LsWdqHB2X/AAAAM3RSTlMA7e1d7XXt3u11H+QCCnziDNYGRxg1+GnD/uzhQOSw8MUHsODERTvtuAO2winYmAavvkuBPysnAAAAs0lEQVQY042PxxKCQBBERwVzzjnnrGQUAyiK+v/f4+wCSnmyL1v1qru3BzZrWG2Xi1G7lAWqDoRDwB54+SruMjlCBn0PEs6NZrenMARFEOniXjhK3EU1GfAjOvHyDdFd4jTV9FHX6+syFIpYx/WQOEu1uwjSST0GDSVIg4iebtf3RzICuyzHhbtataIddF2zIUA6kLJ3Vcmu+YQel0jGOK1SrhPXR/FoIY+PFzn6D03Hv+QNJB0iyNo9kIIAAAAASUVORK5CYII='

var maxData = 3000

export default {
  title: {
    left: 'center'
  },
  xAxis: {
    max: maxData,
    splitLine: { show: false },
    show: false
  },
  yAxis: {
    type: 'category',
    data: [],
    inverse: true,
    axisTick: { show: false },
    axisLine: { show: false },
    nameTextStyle: {
      align: 'left'
    },
    axisLabel: {
      margin: 100,
      align: 'right',
      textStyle: {
        color: 'rgba(123, 151, 177, 1)',
        fontSize: 12,
        align: 'left'
      }
    }
  },
  grid: {
    top: 0,
    height: '95%',
    left: 120,
    right: 50,
    width: 230
  },
  series: [{
    // current data
    type: 'pictorialBar',
    symbol: spirit,
    symbolRepeat: 'fixed',
    symbolMargin: '25%',
    symbolClip: true,
    symbolSize: 18,
    symbolBoundingData: maxData,
    data: [891, 1220, 660, 1670],
    // markLine: {
    //     symbol: 'none',
    //     label: {
    //         normal: {
    //             formatter: 'max: {c}',
    //             position: 'start'
    //         }
    //     },
    //     lineStyle: {
    //         normal: {
    //             color: '#fff',
    //             type: 'dotted',
    //             opacity: 0.2,
    //             width: 2
    //         }
    //     },
    //     data: [{
    //         type: 'max'
    //     }]
    // },
    z: 10
  }, {
    // full data
    type: 'pictorialBar',
    itemStyle: {
      normal: {
        opacity: 0.2
      }
    },
    label: {
      normal: {
        show: true,
        position: 'right',
        offset: [10, 0],
        textStyle: {
          color: 'rgba(201, 238, 255, 1)',
          fontSize: 12
        }
      }
    },
    animationDuration: 0,
    symbolRepeat: 'fixed',
    symbolMargin: '25%',
    symbol: spirit,
    symbolSize: 18,
    symbolBoundingData: maxData,
    data: [891, 1220, 660, 1670],
    z: 5
  }]
}
