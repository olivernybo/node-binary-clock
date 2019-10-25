const rl = require('readline')
let clock

function render() {
	rl.cursorTo(process.stdout, 0, 0)
	let w = ''
	for (let i = 0; i < clock[0].length; i++) {
		let e = ''
		for (let j = 0; j < clock.length; j++) {
			const p = clock[j][i]
			e += p + '     '
		}
		w += e + '\n'
	}
	process.stdout.write(w)
}

function getNums(num) {
	const binaries = []
	while (num > 1) {
		const half = num / 2
		const expTwo = Math.pow(2, Math.ceil(Math.log2(half)))
		const toPush = half == expTwo ? num : expTwo
		binaries.push(toPush)
		num = num - toPush
	}
	if (num == 1) {
		binaries.push(1)
	}
	let r = [0, 0, 0, 0, 0, 0]
	binaries.forEach(e => {
		let i
		switch (e) {
			case 1:
				i = 5
				break
			case 2:
				i = 4
				break
			case 4:
				i = 3
				break
			case 8:
				i = 2
				break
			case 16:
				i = 1
				break
			case 32:
				i = 0
				break
		}
		r[i] = 1
	})
	return r
}

function update() {
	clock = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]]
	const date = new Date
	let d = date.getHours()
	let t = getNums(d)
	let c = 0
	clock[c++] = t
	d = date.getMinutes()
	t = getNums(d)
	clock[c++] = t
	d = date.getSeconds()
	t = getNums(d)
	clock[c++] = t
}

setInterval(() => {
	update()
	render()
	process.stdout.write((new Date).toLocaleTimeString().replace(' PM', '').replace(' AM', ''))
}, 1000)

process.stdout.write('\033c')
