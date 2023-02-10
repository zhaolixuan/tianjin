<template></template>

<script>
import * as THREE from 'three'

export default {
  name: 'FlyLine',
  props: {
    points: {
      type: Array,
      default: [{
        start: { x: -50, y: -10, z: 0 },
        end: { x: 50, y: -10, z: 0 }
      }]
    },
    random: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      renderer: null,
      camera: null,
      scene: null,
      heightLimit: 10,
      linewidth: 0.3,
      uniforms: { // 配置着色器里面的uniform变量的值
        time: {type: 'f', value: 0.0}, // 当前时间（s）
        flytime: {type: 'f', value: 4.0}, // 飞行时长（s）
        linelen: {type: 'f', value: 0.06}, // 亮线长度（总长度1.0）
        color: {type: 'vec3', value: new THREE.Vector3(0.4, 1.0, 0.0)},
        opacity: {type: 'f', value: 0.8}
      }
    }
  },
  mounted () {
    this.init()
    this.animate()
  },
  methods: {
    init () {
      this.createScene()
      if (!this.random) {
        this.points.map((item, index) => {
          this.createLine(item.start, item.end)
        })
      } else {
        this.points.map((item, index) => {
          if (index == this.points.length - 1) {
            this.createLine(item, this.points[0])
          } else {
            this.createLine(item, this.points[index + 1])
          }
        })
      }
    },
    createScene () {
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000)
      this.camera.position.set(0, 0, 55)
      this.camera.lookAt(new THREE.Vector3(0, 0, 0))
      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      document.body.appendChild(this.renderer.domElement)
      this.renderer.render(this.scene, this.camera)
    },
    createLine (startPoint, endPoint) {
      var middleCurvePositionX = (startPoint.x + endPoint.x) / 2
      // var middleCurvePositionY = Math.sqrt(Math.pow((startPoint.x-endPoint.x),2)+Math.pow((startPoint.y-endPoint.y),2)) / 2;
      var middleCurvePositionY = this.heightLimit
      var middleCurvePositionZ = (startPoint.z + endPoint.z) / 2
      var curveData = new THREE.CatmullRomCurve3([
        new THREE.Vector3(startPoint.x, startPoint.y, startPoint.z),
        new THREE.Vector3(middleCurvePositionX, middleCurvePositionY, middleCurvePositionZ),
        new THREE.Vector3(endPoint.x, endPoint.y, endPoint.z)
      ])
      var curveGeometry = new THREE.TubeBufferGeometry(curveData, 100, this.linewidth, 100, false)
      var curveMaterial = this.createMaterial()
      var curve = new THREE.Mesh(curveGeometry, curveMaterial)
      this.scene.add(curve)
    },

    createMaterial () {
      var meshMaterial = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: this.vertexShader(),
        fragmentShader: this.fragmentShader(),
        transparent: true
      })
      return meshMaterial
    },
    vertexShader () {
      let vertexShader = `
				varying vec2 vUv;
				void main(){
					vUv = uv;
					vec3 posChanged = position;
					gl_Position = projectionMatrix * modelViewMatrix * vec4(posChanged,1.0);
				}`
      return vertexShader
    },
    fragmentShader () {
      let fragmentShader = `
				uniform float time;
				uniform float flytime;
				uniform float linelen;
				uniform float opacity;
				uniform vec3 color;
				varying vec2 vUv;
				void main( void ) {
					float step = 1.0 / flytime;
					float dis = fract( time );
					float opa = opacity;
					if( abs(dis-vUv.x) >= linelen ){
						opa = 0.1;
					} else {
						if(dis > vUv.x){ //尾部渐变
							opa = opacity - (dis-vUv.x)/(linelen*1.2);
							if(opa < 0.1){
								opa = 0.1;
							}
						} else if(dis < vUv.x){ //前部隐藏
							opa = 0.1;
						}
					}
					gl_FragColor = vec4(color, opa);
				}`
      return fragmentShader
    },

    animate () {
      let time = performance.now() * 0.0003
      this.uniforms.time.value = time
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.animate)
    }
  },
  components: {
    THREE
  }
}
</script>
<style scoped>

</style>
