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
    },
    chartName: {
      type: String,
      default: ''
    },
    labels: {
      type: Array,
      default: () => {
        return []
      }
    },
    xName: {
      type: Array,
      default: () => {
        return []
      }
    },
    xData: {
      type: Array,
      default: () => {
        return []
      }
    },
    xColor: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  created() {
  },
  methods: {
    initChart() {
      const XName = this.xName
      const data1 = this.xData
      const Line = this.labels
      const color = this.xColor
      const datas = []
      Line.map((item, index) => {
        datas.push(
          {
            symbolSize: 5,
            symbol: 'circle',
            name: item,
            type: 'line',
            data: data1[index],
            itemStyle: {
              normal: {
                borderWidth: 5,
                color: color[index]
              }
            }
          }
        )
      })
      this.chart = echarts.init(document.getElementById(this.id))

      this.chart.setOption({
        // backgroundColor: '#394056',
        title: {
          top: 20,
          text: this.chartName,
          x: 'center',
          y: 'top',
          textAlign: 'center',
          textStyle: {
            fontWeight: 'bold',
            fontSize: 16,
            color: '#000'

          }
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
          data: [],
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: '#000'
          }
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          data: XName
        }],
        yAxis: [{
          type: 'value',
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
        series: datas
      })
    }
  }
}
</script>
