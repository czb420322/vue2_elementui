// 加载控制台
export const loadScript = (url, callback) => {
	const script = document.createElement('script')
	script.onload = () => callback()
	script.src = url
	document.body.appendChild(script)
}
if (process.env.VUE_APP_MODE != 'prd') {
	loadScript(
		'https://cdn.bootcss.com/vConsole/3.3.0/vconsole.min.js',
		() => {
			// eslint-disable-next-line
			new VConsole()
		})
}
