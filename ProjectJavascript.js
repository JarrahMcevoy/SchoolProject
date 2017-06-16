var monpersec = 0
var totalmoney = 0
var myimgobj = document.images["imgbutton"];
var complvl = 0
var partamount = []
var moneyonclick = 1

var parts = [
	{
		"id": 0,
		"baseprice": 10,
		"price": 10,
		"name": "Transistor",
		"text": "A semiconductor device used to amplify or switch electronic signals.",
		"flavourtext": "You'll probably need a lot of these",
		"basevalue": 1,
		"value": 1,
	}
]

for (i=0; i<parts.length; i++) {
	partamount[i] = 0
}

for (i=0; i<parts.length; i++) {
	partfunc(parts[i].id, parts[i].price, parts[i].name, parts[i].text, parts[i].flavourtext)
}

//document.getElementById('button2').style.opacity='0.7'

myimgobj.onmouseover = function(){
   document.getElementById('myImg').width = 314
   document.getElementById('myImg').height = 238
};

myimgobj.onmouseout = function(){
	document.getElementById('myImg').width = 304
	document.getElementById('myImg').height = 228
};

textarea1.value = totalmoney
textarea2.value = monpersec +"/sec"

window.setInterval(refreshMoney, 1);
window.setInterval(getMoney, 1000);

function refreshMoney(){
	monpersec = 0
	textarea1.value = totalmoney
	for (i=0; i<parts.length; i++) {
		monpersec += partamount[i]*parts[i].value
	}
	textarea2.value = monpersec + "/sec"
}

function getMoney(){
	totalmoney += monpersec
	textarea1.value = totalmoney
	textarea2.value = monpersec +"/sec"
}

myimgobj.onmousedown = function(){
	totalmoney = totalmoney + moneyonclick
	textarea1.value = totalmoney
	document.getElementById('myImg').style.opacity='0.7'
}

myimgobj.onmouseup = function(){
	document.getElementById('myImg').style.opacity='1'
}

/*document.getElementById('button1').onclick = function () {
	if(totalmoney >= 100 && complvl === 0){
		document.getElementById('myImg').src = "http://longbeachplace.org.au/wp-content/uploads/2014/02/computer.png"
		monpersec = 3
		totalmoney = totalmoney -100
		complvl = complvl + 1
		document.getElementById('button2').style.opacity='1'
	}else{}
}*/

function partfunc(id, price, name, text, flavourtext){

	var createdbutton = document.createElement("div")
	document.getElementById('partdiv').appendChild(createdbutton);

 	createdbutton.setAttribute("frameborder", "400")
	createdbutton.setAttribute("id", id)
	createdbutton.setAttribute("class", "partbutton")

	var buttontitle = document.createElement("div")
	createdbutton.appendChild(buttontitle)
	buttontitle.setAttribute("class", "partbuttontitle")
	var buttontext = document.createElement("div")
	createdbutton.appendChild(buttontext)
	buttontext.setAttribute("class", "partbuttontext")
	var buttonflavour = document.createElement("div")
	createdbutton.appendChild(buttonflavour)
	buttonflavour.setAttribute("class", "partbuttonflavour")
	var buttonprice = document.createElement("div")
	createdbutton.appendChild(buttonprice)
	buttonprice.setAttribute("class", "partbuttonprice")
	
	buttontitle.value = name
	buttontext.value = text
	buttonflavour.value = flavourtext
	buttonprice.value = price

	document.getElementById(id).onclick = function () {

		if(totalmoney >= parts[id].price) {
			partamount[id] += 1
			totalmoney = totalmoney - parts[id].price
			parts[id].price = parts[id].baseprice * Math.floor(Math.pow(1.15, partamount))
			buttonprice.value = parts[id].price

		}
	}
}
