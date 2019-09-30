<template>
<div>
    <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
    <img id ="" src="../assets/user/user.png">
    <el-button @click="executeFile">改变图片</el-button>
</div>
</template>

<script>
// import Image from 'image-js'
const Jimp = require('jimp')
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: { text: 'fgecharts' },
        tooltip: {},
        xAxis: {
          data: ['ss', 'ssd', 'dddd', 'fff', 'ggg', 'ggh']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      })
    },
    // async executeFile () {
    //   let image = await Image.load('../assets/hamo.jpg')
    //   let grey = image
    //     .grey() // convert the image to greyscale.
    //     .resize({ width: 200 }) // resize the image, forcing a width of 200 pixels. The height is computed automatically to preserve the aspect ratio.
    //     .rotate(30) // rotate the image clockwise by 30 degrees.
    //   return grey.save('../assets/hamo.png')
    // },
    convertImgToBase64 (url, callback, outputFormat) {
      let canvas = document.createElement('CANVAS')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.onload = function () {
        canvas.height = img.height
        canvas.width = img.width
        ctx.drawImage(img, 0, 0)
        var dataURL = canvas.toDataURL(outputFormat || 'image/png')
        callback.call(this, dataURL)
        canvas = null
      }
      img.src = url
      console.log('---------', img)
    },
    async executeFile () {
      const url = '../assets/user/user.png'// 这是站内的一张图片资源，采用的相对路径
      let Img = null
      this.convertImgToBase64(url, function (base64Img) {
        // 转化后的base64
        console.lo('base64Img', base64Img)
        Img = base64Img
        alert(base64Img)
      })
      Jimp.read(Img, function (err, image) {
        if (err) {
          console.log(err)
        } else {
          image.write('../assets/hamo.png')
        }
      })
    }
  }
}
</script>

<style></style>
