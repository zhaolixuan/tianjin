/* eslint-disable */
// 基准大小
const baseSize = 100
// 设置 rem 函数
function setRem() {
  // 当前页面高度相对于 1080 高的缩放比例，可根据自己需要修改。
  const scale = document.documentElement.clientHeight / 1080
	// 设置页面根节点字体大小
	const baseFontSize = baseSize * Math.min(scale, 2)
  document.documentElement.style.fontSize = baseFontSize + 'px'
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.addEventListener('resize', function () {
  setRem()
})