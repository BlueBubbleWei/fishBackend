<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))

      this.chart.setOption({
        // backgroundColor: '#394056',
        title: {
          top: 20,
          text: '实时付费',
          x: 'center',
          y: 'top',
          textAlign: 'center',
          textStyle: {
            fontWeight: 'bold',
            fontSize: 16,
            color: '#000'

          }
        //   left: '1%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        legend: {
          top: 20,
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: ['今天', '昨天', '查询平均'],
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: '#000'
          }
        },
        // grid: {
        //   top: 100,
        //   left: '2%',
        //   right: '2%',
        //   bottom: '2%',
        //   containLabel: true
        // },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          data: ['0点', '1点', '2点', '3点', '4点', '5点', '6点', '7点', '8点', '9点', '10点', '11点', '12点',
            '13点', '14点', '15点', '16点', '17点', '18点', '19点', '20点', '21点', '22点', '23点']
        }],
        yAxis: [{
          type: 'value',
          //   name: '(%)',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          },
          splitLine: {
            lineStyle: {
              color: '#57617B'
            }
          }
        }],
        series: [
          {
            data: [123, 154, 234, 321, 120, 390, 634, 123, 154, 234, 321, 120, 390, 634, 123, 154, 234, 321, 120, 390, 634, 120, 390, 634],
            itemStyle: { normal: { borderWidth: 5, color: '#00f8ff' }},
            name: '云篆山水路线',
            symbol: 'circle',
            symbolSize: 15,
            type: 'line'
          },
          // {
          //   name: '今天',
          //   type: 'line',
          //   //   smooth: true,
          //   symbol: 'circle',
          //   symbolSize: 5,
          //   showSymbol: false,
          //   lineStyle: {
          //     normal: {
          //       width: 1
          //     }
          //   },
          //   // areaStyle: {
          //   //   normal: {
          //   //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          //   //       offset: 0,
          //   //       color: 'rgba(137, 189, 27, 0.3)'
          //   //     }, {
          //   //       offset: 0.8,
          //   //       color: 'rgba(137, 189, 27, 0)'
          //   //     }], false),
          //   //     shadowColor: 'rgba(0, 0, 0, 0.1)',
          //   //     shadowBlur: 10
          //   //   }
          //   // },
          //   itemStyle: {
          //     normal: {
          //       color: 'rgb(137,189,27)',
          //       borderColor: 'rgba(137,189,2,0.27)',
          //       borderWidth: 12

          //     }
          //   },
          //   data: [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122]
          // },
          {
            name: '昨天',
            type: 'line',
            //   smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1
              }
            },
            // areaStyle: {
            //   normal: {
            //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            //       offset: 0,
            //       color: 'rgba(0, 136, 212, 0.3)'
            //     }, {
            //       offset: 0.8,
            //       color: 'rgba(0, 136, 212, 0)'
            //     }], false),
            //     shadowColor: 'rgba(0, 0, 0, 0.1)',
            //     shadowBlur: 10
            //   }
            // },
            itemStyle: {
              normal: {
                color: 'rgb(0,136,212)',
                borderColor: 'rgba(0,136,212,0.2)',
                borderWidth: 12

              }
            },
            data: [120, 110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150]
          }, {
            name: '查询平均',
            type: 'line',
            //   smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            // lineStyle: {
            //   normal: {
            //     width: 1
            //   }
            // },
            // areaStyle: {
            //   normal: {
            //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            //       offset: 0,
            //       color: 'rgba(219, 50, 51, 0.3)'
            //     }, {
            //       offset: 0.8,
            //       color: 'rgba(219, 50, 51, 0)'
            //     }], false),
            //     shadowColor: 'rgba(0, 0, 0, 0.1)',
            //     shadowBlur: 10
            //   }
            // },
            itemStyle: {
              normal: {
                color: 'rgb(219,50,51)',
                borderColor: 'rgba(219,50,51,0.2)',
                borderWidth: 12
              }
            },
            data: [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122, 220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122]
          }]
      })
    }
  }
}
</script>
