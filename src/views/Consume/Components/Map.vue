<template>
  <div id="map"></div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'

import CustomShader from './Shader'

import api from '@/api/api'

export default {
  name: 'Map',
  data () {
    return {
      config: {
        scanFactor: 1,
        scene: {},
        bloomIndex: 0,
        ENTIRE_SCENE: 0,
        BLOOM_SCENE: 1,
        materials: {},
        darkMaterial: new THREE.MeshBasicMaterial({ color: 'black' })
      },
      points: [],
      rectLight: null,
      goback: false,
      circleConfig: {
        uniforms: {
          time: { value: 1.0 },
          opacity: { value: 0.8 }
        }
      },
      lineConfig: {
        heightLimit: 3,
        linewidth: 0.05,
        uniforms: { // 配置着色器里面的uniform变量的值
          time: { type: 'f', value: 0.0 }, // 当前时间（s）
          linelen: { type: 'f', value: 0.06 }, // 亮线长度（总长度1.0）
          color: { type: 'vec3', value: new THREE.Vector3(1.0, 0.0, 0.0) },
          lightcolor: { type: 'vec3', value: new THREE.Vector3(1.0, 0.2, 0.2) },
          opacity: { type: 'f', value: 1.0 }
        }
      },
      roadConfig: {
        uniforms: {
          time: { type: 'f', value: 0.0 }, // 当前时间（s）
          linelen: { type: 'f', value: 0.06 }, // 亮线长度（总长度1.0）
          color: { type: 'vec3', value: new THREE.Vector3(1.0, 1.0, 1.0) },
          opacity: { type: 'f', value: 1.0 }
        }
      },
      verticalLineConfig: {
        lineHeight: 10,
        linewidth: 0.01,
        uniforms: {
          time: { type: 'f', value: 0.0 }, // 当前时间（s）
          linelen: { type: 'f', value: 0.08 }, // 亮线长度（总长度1.0）
          color: { type: 'vec3', value: new THREE.Vector3(1.0, 1.0, 1.0) },
          lightcolor: { type: 'vec3', value: new THREE.Vector3(1.0, 1.0, 1.0) },
          opacity: { type: 'f', value: 1.0 }
        }
      }
    }
  },
  mounted () {
    document.getElementById('map').innerHTML = ''

    api.getPoi().then(res => {
      this.poi = res
    }).catch(error => {
      console.log(error)
    })
    this.initBoom()
    this.initCity()
    this.animate()
  },
  // beforeDestroy(){
  //   document.getElementById("map").innerHTML = ''
  // },
  methods: {
    initBoom () {
      this.config.scene = new THREE.Scene()
      this.config.camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000)
      this.config.camera.position.set(0, 15, 35)

      let light = new THREE.AmbientLight(0xffffff, 5.0)
      this.config.scene.add(light)

      this.rectLight = new THREE.RectAreaLight(0xffffff, 300, 100, 1)
      this.rectLight.position.set(30, 0.01, 0)
      this.rectLight.rotateZ(-0.5 * Math.PI)
      this.rectLight.rotateY(0.5 * Math.PI)
      this.config.scene.add(this.rectLight)

      this.config.renderer = new THREE.WebGLRenderer()
      this.config.renderer.setSize(window.innerWidth, window.innerHeight)
      this.config.renderer.toneMapping = THREE.ReinhardToneMapping
      this.config.renderer.sortObjects = false
      document.getElementById('map').appendChild(this.config.renderer.domElement)

      this.config.labelRenderer = new CSS2DRenderer()
      this.config.labelRenderer.setSize(window.innerWidth, window.innerHeight)
      this.config.labelRenderer.domElement.style.position = 'absolute'
      this.config.labelRenderer.domElement.style.top = 0
      document.getElementById('map').appendChild(this.config.labelRenderer.domElement)

      this.config.controls = new OrbitControls(this.config.camera, this.config.renderer.domElement)
      this.config.controls.target.set(0, 0, 0)
      this.config.controls.enableZoom = true
      this.config.controls.enablePan = true
      this.config.controls.enableDamping = true

      this.config.bloomLayer = new THREE.Layers()
      this.config.bloomLayer.set(this.config.BLOOM_SCENE)

      let params = {
        exposure: 0.5,
        bloomStrength: 0.8,
        bloomThreshold: 0,
        bloomRadius: 0,
        scene: 'Scene with Glow'
      }

      var renderScene = new RenderPass(this.config.scene, this.config.camera)

      let bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85)
      bloomPass.threshold = params.bloomThreshold
      bloomPass.strength = params.bloomStrength
      bloomPass.radius = params.bloomRadius

      this.config.bloomComposer = new EffectComposer(this.config.renderer)
      this.config.bloomComposer.renderToScreen = false
      this.config.bloomComposer.addPass(renderScene)
      this.config.bloomComposer.addPass(bloomPass)

      let finalPass = new ShaderPass(
        new THREE.ShaderMaterial({
          uniforms: {
            baseTexture: { value: null },
            bloomTexture: { value: this.config.bloomComposer.renderTarget2.texture }
          },
          vertexShader: CustomShader.finalPass.vertexShader,
          fragmentShader: CustomShader.finalPass.fragmentShader,
          defines: {}
        }), 'baseTexture'
      )
      finalPass.needsSwap = true

      this.config.finalComposer = new EffectComposer(this.config.renderer)
      this.config.finalComposer.addPass(renderScene)
      this.config.finalComposer.addPass(finalPass)
    },
    initCity () {
      let scaleSize = 0.007 // 河西区配置 0.007
      let $this = this
      let loader = new GLTFLoader()
      var dracoLoader = new DRACOLoader()
      dracoLoader.setDecoderPath('../../../static/lib/draco/gltf/')
      loader.setDRACOLoader(dracoLoader)
      loader.setDDSLoader(new DDSLoader())
      loader.load('/static/model/tianjin_1.gltf', function (data) {
        /* 河西区模型配置 */
        data.scene.rotateY(Math.PI / 1.5)
        data.scene.translateX(10.0)
        data.scene.translateZ(-7.0)

        data.scene.scale.set(scaleSize, scaleSize, scaleSize)
        data.scene.traverse(function (child) {
          if (child.isMesh) {
            let opacity = 0.5
            if (child.name === 'lu') {
              opacity = 0.95
            }
            if (child.name === 'ding') {
              opacity = 0.95
            }
            child.material.transparent = true
            child.material.opacity = opacity
            child.material.emissive = child.material.color
            child.material.emissiveMap = child.material.map
          }
        })
        $this.config.scene.add(data.scene)
        $this.radar()
      })
      loader.load('/static/model/tianjin_lu.gltf', function (data) {
        /* 河西区模型配置 */
        data.scene.rotateY(Math.PI / 1.5)
        data.scene.translateX(10.0)
        data.scene.translateZ(-7.0)

        data.scene.translateY(0.05)
        data.scene.scale.set(scaleSize, scaleSize, scaleSize)
        data.scene.traverse(function (child) {
          if (child.isMesh) {
            child.material = new THREE.ShaderMaterial({
              uniforms: { ...$this.roadConfig.uniforms, random: { type: 'f', value: Math.random() * 1.0 } },
              // uniforms: $this.roadConfig.uniforms,
              vertexShader: CustomShader.road.vertexShader,
              fragmentShader: CustomShader.road.fragmentShader,
              transparent: true
              // color: new THREE.Vector3(0.1, 0.1, 0.1)
            })
            // child.layers.enable($this.config.BLOOM_SCENE)
          }
        })
        $this.config.scene.add(data.scene)
      })
    },
    initFlyLine () {
      this.points.map((item, index) => {
        if (index === this.points.length - 1) {
          this.createLine(item, this.points[0])
        } else {
          this.createLine(item, this.points[index + 1])
        }
      })
    },
    radar () {
      for (let i = 0; i < 15; i++) {
        let geometry = new THREE.CircleGeometry(2 * Math.random(), 36)
        let material = new THREE.ShaderMaterial({
          uniforms: { ...this.circleConfig.uniforms, color: { value: i % 2 ? new THREE.Vector3(0.87, 0.11, 0.14) : new THREE.Vector3(1, 0.56, 0.059) }, random: { value: Math.random() * 10 } },
          vertexShader: CustomShader.circle.vertexShader,
          fragmentShader: CustomShader.circle.fragmentShader,
          alphaTest: 0.1,
          opacity: 0.8,
          transparent: true
        })
        let mesh = new THREE.Mesh(geometry, material)
        let y = 1
        let x = 15 * Math.cos(Math.random() * 1000.0)
        let z = 15 * Math.sin(Math.random() * 1000.0)
        mesh.translateY(y)
        mesh.translateZ(z)
        mesh.translateX(x)
        mesh.rotateX(-1.5)
        // mesh.layers.enable(this.config.BLOOM_SCENE)
        this.config.scene.add(mesh)
        this.points.push({ x, y, z })
      }
      this.initFlyLine()
      this.initVerticalLine(10)
    },
    initVerticalLine (number) {
      let verticalLines = []
      for (let i = 0; i < number; i++) {
        let x = 20 * Math.cos(Math.random() * 1000.0)
        let y = 1
        let z = 20 * Math.sin(Math.random() * 1000.0)
        verticalLines.push({ 'name': '', 'position': { x, y, z } })
      }

      if (this.poi && this.poi.length > 0) {
        this.poi.map((item) => {
          verticalLines.push(item)
        })
      }

      verticalLines.map((item, index) => {
        let endPoint = { x: item.position.x, y: this.verticalLineConfig.lineHeight, z: item.position.z }
        this.createVerticalLine(item.position, endPoint, item)
      })
    },
    createVerticalLine (startPoint, endPoint, obj) {
      let random = { type: 'f', value: Math.random() }
      let material = new THREE.ShaderMaterial({
        uniforms: { ...this.verticalLineConfig.uniforms, random: random },
        vertexShader: CustomShader.verticalline.vertexShader,
        fragmentShader: CustomShader.verticalline.fragmentShader,
        transparent: true
      })
      var curveData = new THREE.CatmullRomCurve3([
        new THREE.Vector3(startPoint.x, startPoint.y, startPoint.z),
        new THREE.Vector3(endPoint.x, endPoint.y, endPoint.z)
      ])
      var curveGeometry = new THREE.TubeBufferGeometry(curveData, 100, this.verticalLineConfig.linewidth, 100, false)
      var curve = new THREE.Mesh(curveGeometry, material)

      if (obj && obj.name && obj.name.length > 0) {
        let labelDiv = document.createElement('div')
        labelDiv.className = 'label'
        labelDiv.textContent = obj.name
        let labelLabel = new CSS2DObject(labelDiv)
        labelLabel.position.set(startPoint.x, 3.0, startPoint.z)
        curve.add(labelLabel)
      }

      this.config.scene.add(curve)
    },
    animate () {
      let time = performance.now() * 0.00003
      if (this.rectLight.position.x >= 30) {
        this.goback = true
      }
      if (this.rectLight.position.x <= -45) {
        this.goback = false
      }
      if (this.goback) {
        this.rectLight.position.x -= 0.1
      } else {
        this.rectLight.position.x += 0.1
      }

      // this.light.position.y = 3 * Math.abs(Math.cos(time * 10))
      this.config.camera.position.x = 35 * Math.cos(time)
      this.config.camera.position.z = 35 * Math.sin(time)
      this.config.camera.lookAt(this.config.scene.position)
      this.config.controls.update()
      // 辉光
      /*
      this.config.scene.traverse(this.darkenNonBloomed)
      this.config.bloomComposer.render()
      this.config.scene.traverse(this.restoreMaterial)
      this.config.finalComposer.render()
*/
      this.circleConfig.uniforms.time.value = time * 50.0
      this.lineConfig.uniforms.time.value = time * 10.0
      this.roadConfig.uniforms.time.value = time * 1.4
      this.verticalLineConfig.uniforms.time.value = time * 20.0

      this.config.labelRenderer.render(this.config.scene, this.config.camera)
      this.config.renderer.render(this.config.scene, this.config.camera)
      requestAnimationFrame(this.animate)
    },
    darkenNonBloomed (obj) {
      if (obj.isMesh && this.config.bloomLayer.test(obj.layers) === false) {
        this.config.materials[ obj.uuid ] = obj.material
        obj.material = this.config.darkMaterial
      }
    },
    restoreMaterial (obj) {
      if (this.config.materials[ obj.uuid ]) {
        obj.material = this.config.materials[ obj.uuid ]
        delete this.config.materials[ obj.uuid ]
      }
    },
    // 创建飞线
    createLine (startPoint, endPoint) {
      var middleCurvePositionX = (startPoint.x + endPoint.x) / 2
      // var middleCurvePositionY = Math.sqrt(Math.pow((startPoint.x-endPoint.x),2)+Math.pow((startPoint.y-endPoint.y),2)) / 2;
      var middleCurvePositionY = this.lineConfig.heightLimit
      var middleCurvePositionZ = (startPoint.z + endPoint.z) / 2
      var curveData = new THREE.CatmullRomCurve3([
        new THREE.Vector3(startPoint.x, startPoint.y, startPoint.z),
        new THREE.Vector3(middleCurvePositionX, middleCurvePositionY, middleCurvePositionZ),
        new THREE.Vector3(endPoint.x, endPoint.y, endPoint.z)
      ])
      var curveGeometry = new THREE.TubeBufferGeometry(curveData, 100, this.lineConfig.linewidth, 100, false)
      var curveMaterial = this.createLineMaterial()
      var curve = new THREE.Mesh(curveGeometry, curveMaterial)
      this.config.scene.add(curve)
    },
    createLineMaterial () {
      var meshMaterial = new THREE.ShaderMaterial({
        uniforms: { ...this.lineConfig.uniforms, random: { type: 'f', value: Math.random() * 1.0 } },
        vertexShader: CustomShader.flyline.vertexShader,
        fragmentShader: CustomShader.flyline.fragmentShader,
        transparent: true
      })
      return meshMaterial
    },
    loadFont () {
      let $this = this
      this.font = {}
      var loader = new THREE.FontLoader()
      loader.load('static/3d/fonts/ZH_CN.json', function (response) {
        $this.font = response
      })
    },
    createFont (text) {
      var sphere = new THREE.TextGeometry(text, {
        font: this.font,
        size: 6,
        height: 2,
        curveSegments: 4,
        bevelThickness: 0.2,
        bevelSize: 0.5,
        bevelEnabled: false
      })
      sphere = new THREE.BufferGeometry().fromGeometry(sphere)
      let mesh = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xFF6E00 }))
      mesh.layers.enable(this.config.BLOOM_SCENE)
      mesh.scale.set(0.08, 0.08, 0.08)
      mesh.position.set(-21.5, 0.5, 0.5)
      mesh.translateZ(-1)
      this.config.scene.add(mesh)
    }
  },
  components: {
    THREE,
    CustomShader
  }
}
</script>
<style>
.label{
  font-size: .18rem;
  color: #a4f1ff;
  text-transform:uppercase;
  font-family:"微软雅黑", "Dosis", sans-serif;
  user-select: none;
  text-shadow:
    0px 0px 5px rgba(164, 241, 255, 0.6),
    0px 0px 10px rgba(164, 241, 255, 0.6),
    0px 0px 15px rgba(164, 241, 255, 0.6);
}
#map canvas{
  position: absolute;
  top: 0;
  left: 0;
  z-index: -2;
}
</style>
