var spirit = 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAhtJREFUOBGlVD1rVUEQndnde32PBEKClYgBEeuAH2XUQhAhCoJgYZ00Qlr9AeIfCBbaiFolP0BBLARLoyJWGgVJoYj6kjp5Ozkzs/tyMbGJC5eZnTnn7Jld3mO+L6855tW8EBePLkv/Ow0vScxzlPIstXmSI31EfHTt3NjjFeYh7bNOiBxiWhKhVlZpPpwOT7fuSZLbECFKQtwISZMthpbfU0N3ts+OP69aIsK99V9zw5RvJSIQ0BF8GSlDl7TCiBpKN0ueQe9ZfLvxjRt6R43EtPb7FMSPBOE1CLmIxmC5ysKR6mHBk4vhAD0D+tMieVo3zNWCc0ekStVoIDOl4LK3zHbGwWhWwSRmoigXlJ2iuXoxJc8LyVHuRqEqFRAxDTsBBQyEjra0Vl353sdQgC87Bi33a0IK7C6/XlPqtHQMJZlLxIIymLL1fruq2AGqJGXhcy0fRXMXgOOKQU2XCdWDbTSFQsUmrA3U6sU6DY06kxeqI6+aqpmHg8ADKK4zh+3qa/QOIKszO2xXCIUygDsKr1ITzuQrval8uX9sgvqHITYP0R9KdOwuRy1o2U0U1TamJ/lGurB1tX1TSjS4yJvD82MPp2j8ZIh0F6I/rafThaCX9xLxJtFSFn6QR8Qq8K94XST2Pmwcbz4NZia//JmoOPuJ7Lm52t0nln+Ar9oadPrl1eDzP1fQp/7rJQ8kmfASL3Dpnw/E7pB2AGvK0BHViHVyAAAAAElFTkSuQmCC'

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
      margin: 105,
      align: 'right',
      textStyle: {
        color: 'rgba(79,208,255,0.78)',
        fontSize: 13,
        align: 'left'
      }
    }
  },
  grid: {
    top: 0,
    height: '100%',
    left: 120,
    right: '16%'
  },
  series: [{
    // current data
    type: 'pictorialBar',
    symbol: spirit,
    symbolRepeat: 'fixed',
    symbolMargin: '20%',
    symbolClip: true,
    symbolSize: 16,
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
          color: '#ffffff',
          fontSize: 13
        }
      }
    },
    animationDuration: 0,
    symbolRepeat: 'fixed',
    symbolMargin: '20%',
    symbol: spirit,
    symbolSize: 16,
    symbolBoundingData: maxData,
    data: [891, 1220, 660, 1670],
    z: 5
  }]
}
