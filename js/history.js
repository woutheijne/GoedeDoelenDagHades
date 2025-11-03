
var his = checkHistoryCookie()
function setCookie(hist) {
	str=""
	for (i in hist) {
		str += `${i}+${hist[i].time}+${hist[i].name}+${hist[i].loten.join(",")}!`
	}
	const tmrw = new Date()
	tmrw.setTime(tmrw.getTime() + 86400000)
	document.cookie = `history=${str}; expires=${tmrw.toUTCString()}; path=/`;
}

function checkHistoryCookie() {
	try {
		const cookies = document.cookie.split(';')
		var cookie = null
		for (let i = 0; i < cookies.length; i++) {
			let c = cookies[i].trim().split("=")
			if (c.length == 2) {
				if (c[0] == "history") {
					cookie = c[1];
				}
			}
		}
		if (cookie == null) {
			console.log("history cookie not detected")
			return null
		}
		hl = []
		cookie.split('!').forEach(h => {
			if (h != '') {
				parts = h.split("+")
				l = []
				parts[3].split(',').forEach(x => {l.push(parseInt(x))})
				hl[parseInt(parts[0])] = {time: parts[1], name: parts[2], loten: l}
			}
		})
		return hl.slice(-5)
	} catch (e) {
		console.log("Failed to parse cookie")
		console.log(e)
	}
}

function showHistory() {
	const hisDiv = document.getElementById('history-items')
	hisDiv.innerHTML = ''
	const p1 = document.createElement('p')
	const p2 = document.createElement('p')
	const p3 = document.createElement('p')
	p1.innerHTML = "Tijd"
	p2.innerHTML = "Naam"
	p3.innerHTML = "Lotnummers"
	hisDiv.append(p1)
	hisDiv.append(p2)
	hisDiv.append(p3)
	rev = [...his].reverse()
	for (h in rev) {
		const p1 = document.createElement('p')
		const p2 = document.createElement('p')
		const p3 = document.createElement('p')
		p1.innerHTML = rev[h].time
		p2.innerHTML = rev[h].name
		p3.innerHTML = rev[h].loten.join(', ')

		hisDiv.append(p1)
		hisDiv.append(p2)
		hisDiv.append(p3)
	}
	document.getElementById('history-container').style.display = 'flex'
}

function addHistory(name, data) {
	const now = new Date()
	his.push({ time: String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0'), name: name, loten: data })
	if (his.length > 5) {
		his = his.slice(-5)
	}
	setCookie(his)

}

function closeHistory() {
	document.getElementById('history-container').style.display = 'none'
}