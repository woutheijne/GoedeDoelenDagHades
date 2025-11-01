
var his = []

function showHistory(){
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
	his.push({time: String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0'), name:name, loten:data})
	if (his.length > 5) {
		his = his.slice(-5)
	}
}

function closeHistory() {
	document.getElementById('history-container').style.display = 'none'
}