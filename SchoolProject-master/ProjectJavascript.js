var monpersec = 0 //Stores how much money the player makes per second
var totalmoney = 0 //Stores how much money the player has
var computerbutton = document.images["imgbutton"]; //The image of the computer that the player clicks on to gain money
var partamount = [] //Stores the amount of each part owned
var moneyonclick = 10 //Stores how much money the player gains on click
var globalmultiplier = 1 //Stores the global multiplier for money per second
var multiplier = [] //Stores the local multiplier for each part
var level = 0
var moneyonclickmultiplier = 0.01

var parts = [ //Holds data for all the different parts
	{
		"id": 0, //A unique integer used to identify the part
		"baseprice": 150, //The initial price of the part
		"price": 150, //The dynamic price of the part (changes based on amount)
		"name": "Wire", //The in-game name of the part
		"basevalue": 1, //The initial value of the part (how much it adds to money per second)
		"value": 1, //The dynamic value of the part (changes with upgrades)
	}, {
		"id": 1,
		"baseprice": 1000,
		"price": 1000,
		"name": "Battery",
		"basevalue": 10,
		"value": 10,
		
	}, {
		"id": 2,
		"baseprice": 11000,
		"price": 11000,
		"name": "Circuit Board",
		"basevalue": 80,
		"value": 80,
	}, {
		"id": 3,
		"baseprice": 120000,
		"price": 120000,
		"name": "Diode",
		"basevalue": 470,
		"value": 470,
	}, {
		"id": 4,
		"baseprice": 1300000,
		"price": 1300000,
		"name": "Transistor",
		"basevalue": 2600,
		"value": 2600,
	}, {
		"id": 5,
		"baseprice": 14000000,
		"price": 14000000,
		"name": "Register",
		"basevalue": 14000,
		"value": 14000,
	}, {
		"id": 6,
		"baseprice": 200000000,
		"price": 200000000,
		"name": "Storage Disk",
		"basevalue": 78000,
		"value": 78000,
	}, {
		"id": 7,
		"baseprice":3300000000,
		"price": 3300000000,
		"name": "Peripheral",
		"basevalue": 440000,
		"value": 440000,
	}
]

var upgrades = [ //Holds data for all the different upgrades
	{
		"id": 0, //A unique integer used to identify the upgrade
		"unlock": 0, //The expansion level that unlocks the upgrade when purchased
		"price": 1000, //The static price of the upgrade
		"name": "Lead Wires", //The in-game name of the upgrade
		"related": 0, //The part that the upgrade relates to
		"image": "lead wires.png", //The image that represents the upgrade on the button
		"text": "Your wires gain +1 money per second.", //The text that describes the upgrade
		"type": 0, //The type of increment(0 means an increase to the value of the part, 1 means an increase to the multiplier of the part, 2 means an increase to the global multiplier)
		"increment": 1, //The amount by which the upgrade affects the related variable
	}, {
		"id": 1,
		"unlock": 0,
		"price": 8000,
		"name": "Better Batteries",
		"related": 1,
		"image": "Better Batteries.png",
		"text": "Your batteries gain +10% money per second.",
		"type": 1,
		"increment": .1,
	}, {
		"id": 2,
		"unlock": 0,
		"price": 10000,
		"name": "Bindows NT 3.0",
		"related": 0,
		"image": "windows 1.png",
		"text": "A basic operating system to run on your compuuter. You gain +1% money per second.",
		"type": 2,
		"increment": .01,
	}, {
		"id": 3,
		"unlock": 0,
		"price": 10000,
		"name": "Tin Wires",
		"related": 0,
		"image": "tin wires.png",
		"text": "Your wires gain +10 money per second.",
		"type": 0,
		"increment": 10,
	}, {
		"id": 4,
		"unlock": 0,
		"price": 120000,
		"name": "Simple Circuits",
		"related": 2,
		"image": "simple circuit.png",
		"text": "Your circuit boards gain +8 money per second.",
		"type": 0,
		"increment": .01,
	}, {
		"id": 5,
		"unlock": 0,
		"price": 160000,
		"name": "Utility Software Package",
		"related": 0,
		"image": "utility software.png",
		"text": "You gain +1% money per second.",
		"type": 2,
		"increment": .01,
	}, {
		"id": 6,
		"unlock": 0,
		"price": 666000,
		"name": "Light-Emitting Diode",
		"related": 3,
		"image": "LED.png",
		"text": "Your diodes gain +47 money per second.",
		"type": 0,
		"increment": 47,
	}, {
		"id": 7,
		"unlock": 0,
		"price": 2052014,
		"name": "Perfect Transistors",
		"related": 4,
		"image": "transistor 1.png",
		"text": "Quite an upgrade indeed. Your transistors gain +1,010 money per second.",
		"type": 0,
		"increment": 1010,
	}, {
		"id": 8,
		"unlock": 1,
		"price": 100000,
		"name": "Iron Wires",
		"related": 0,
		"image": "iron wires.png",
		"text": "Your wires gain +100 money per second.",
		"type": 0,
		"increment": 100,
	}, {
		"id": 9,
		"unlock": 1,
		"price": 1600000,
		"name": "Even Better Batteries",
		"related": 1,
		"image": "betterer batteries.png",
		"text": "Your batteries gain +10% money per second.",
		"type": 1,
		"increment": .1,
	}, {
		"id": 10,
		"unlock": 1,
		"price": 2000000,
		"name": "Crap OSX 8",
		"related": 0,
		"image": "windows 2.png",
		"text": "You gain +1% money per second.",
		"type": 2,
		"increment": .01,
	}, {
		"id": 11,
		"unlock": 1,
		"price": 2000000,
		"name": "Constant Current Diode",
		"related": 1,
		"image": "LED 2.png",
		"text": "Your diodes gain +1% money per second.",
		"type": 1,
		"increment": .01,
	}, {
		"id": 12,
		"unlock": 1,
		"price": 7252017,
		"name": "Pyre Transistor",
		"related": 4,
		"image": "transistor 2.png",
		"text": "What is a pyre? Boogle it. Your transistors gain +1% money per second.",
		"type": 1,
		"increment": .01,
	}, {
		"id": 13,
		"unlock": 1,
		"price": 82000000,
		"name": "Arithmetic Logic Unit",
		"related": 5,
		"image": "register 1.png",
		"text": "Your registers gain +25,948 money per second.",
		"type": 0,
		"increment": 25948,
	}, {
		"id": 14,
		"unlock": 1,
		"price": 100000000,
		"name": "Application Software Package",
		"related": 0,
		"image": "application software.png",
		"text": "You gain +1% money per second.",
		"type": 2,
		"increment": .01,
	}, {
		"id": 15,
		"unlock": 1,
		"price": 2048000000,
		"name": "Hard Disk Drive",
		"related": 6,
		"image": "HDD.png",
		"text": "Your storage disks gain +32,768 money per second.",
		"type": 0,
		"increment": 32768,
	}, {
		"id": 16,
		"unlock": 2,
		"price": 1000000,
		"name": "Silver Wires",
		"related": 0,
		"image": "silver wires.png",
		"text": "Your wires gain +1,000 money per second.",
		"type": 0,
		"increment": 1000,
	}, {
		"id": 17,
		"unlock": 2,
		"price": 32000000,
		"name": "Best Batteries",
		"related": 1,
		"image": "best batteries.png",
		"text": "Hard to go up from here. Your batteries gain +10% money per second.",
		"type": 1,
		"increment": .1,
	}, {
		"id": 18,
		"unlock": 2,
		"price": 300000000,
		"name": "Bindows 10",
		"related": 0,
		"image": "windows 3.png",
		"text": "You gain +1% money per second.",
		"type": 2,
		"increment": .01,
	}, {
		"id": 19,
		"unlock": 2,
		"price": 410000000,
		"name": "Accumulator",
		"related": 5,
		"image": "register 1.png",
		"text": "Your registers gain +1% money per second.",
		"type": 1,
		"increment": .01,
	}, {
		"id": 20,
		"unlock": 2,
		"price": 4096000000,
		"name": "Solid State Drive",
		"related": 6,
		"image": "SSD.png",
		"text": "Your storage disks gain +1% money per second.",
		"type": 1,
		"increment": .01,
	}, {
		"id": 21,
		"unlock": 2,
		"price": 5000000000,
		"name": "Internet Connection",
		"related": 0,
		"image": "internet.png",
		"text": "You gain +1% money per second.",
		"type": 2,
		"increment": .01,
	}, {
		"id": 22,
		"unlock": 2,
		"price": 33300000000,
		"name": "4k monitor",
		"related": 7,
		"image": "monitor.png",
		"text": "You can *just* see the pixels on this. Your peripherals gain +333,333 money per second.",
		"type": 0,
		"increment": 333333,
	}, {
		"id": 23,
		"unlock": 2,
		"price": 66600000000,
		"name": "2 more 4k monitors",
		"related": 7,
		"image": "monitor.png",
		"text": "Now you can say: \"I have 3 screens\". Your peripherals gain +1% money per second.",
		"type": 1,
		"increment": .01,
	}, {
		"id": 24,
		"unlock": 3,
		"price": 10000000,
		"name": "Unobtainium Wires",
		"related": 0,
		"image": "meme wires.png",
		"text": "No-one knows where these came from. Your wires gain +10,000 money per second.",
		"type": 0,
		"increment": 10000,
	}, {
		"id": 25,
		"unlock": 3,
		"price": 640000000,
		"name": "4 Dimensional Batteries",
		"related": 1,
		"image": "meme batteries.png",
		"text": "Your batteries gain +10% money per second.",
		"type": 1,
		"increment": .1,
	}, {
		"id": 26,
		"unlock": 3,
		"price": 40000000000,
		"name": "Boogle",
		"related": 0,
		"image": "windows meme.png",
		"text": "Don't be mistaken, this isn't a search engine, it's an operating system. In the future this stuff gets *really* minimalistic. You gain +1% money per second.",
		"type": 2,
		"increment": .01,
	}, {
		"id": 27,
		"unlock": 3,
		"price": 48000000000,
		"name": "Downloadable RAM",
		"related": 0,
		"image": "RAM.png",
		"text": "You gain +1% money per second.",
		"type": 2,
		"increment": .01,
	}, {
		"id": 28,
		"unlock": 3,
		"price": 99900000000,
		"name": "Holographic Interface",
		"related": 7,
		"image": "meme monitor.png",
		"text": "Your peripherals gain +1% money per second.",
		"type": 1,
		"increment": .01,
	}, {
		"id": 29,
		"unlock": 3,
		"price": 99999999999,
		"name": "Mathematics Rewrite",
		"related": 0,
		"image": "maths.png",
		"text": "Turns out if you completely change the fundamentals of the universe, you can make your computer a little bit better. You gain +2% money per second.",
		"type": 2,
		"increment": .02,
	}, {
		"id": 30,
		"unlock": 3,
		"price": 100000000000,
		"name": "Ultimate Proof",
		"related": 0,
		"image": "wow.png",
		"text": "This will either prove or disprove the existence of god. You wont know until you buy it. You gain +2% money per second.",
		"type": 2,
		"increment": .02
	}, {
		"id": 31,
		"unlock": 3,
		"price": 1234000000000,
		"name": ":)",
		"related": 0,
		"image": "happy.png",
		"text": "We kinda ran out of ideas here. You gain +5% money per second.",
		"type": 2,
		"increment": .05,
	}, {
		"id": 32,
		"unlock": 4,
		"price": 6357567787807986,
		"name": "ELAINE",
		"related": 0,
		"image": "https://samepageteam.files.wordpress.com/2014/04/elaine-benes-picture.jpg?w=470",
		"text": "ITS ELAINE.",
		"type": 0,
		"increment": 666,
	}, {
		"id": 33,
		"unlock": 4,
		"price": 82345547568457583,
		"name": "JERY",
		"related": 0,
		"image": "https://upload.wikimedia.org/wikipedia/en/f/f6/Jerry_Seinfeld.jpg",
		"text": "JERY GET iPad",
		"type": 2,
		"increment": 237489583658897,
	}, {
		"id": 34,
		"unlock": 4,
		"price": 9986786452356425545646,
		"name": "GORG",
		"related": 7,
		"image": "https://upload.wikimedia.org/wikipedia/en/7/70/George_Costanza.jpg",
		"text": "there was this meme awhile back about the actor of george in the porn parody they made of seinfeld. they referred to him as \"porn gorg\"",
		"type": 1,
		"increment": 54858974578576,
	}, {
		"id": 35,
		"unlock": 4,
		"price": 8956765463453654765675867,
		"name": "Cosmo Kramer",
		"related": 4,
		"image": "https://upload.wikimedia.org/wikipedia/en/b/b7/Cosmo_Kramer.jpg",
		"text": "Holy CR*P is that COSMO KRAMER",
		"type": 1,
		"increment": 87967896876876577857646754367698978867578678998709,
	}, {
		"id": 36,
		"unlock": 4,
		"price": 987654321234567876787654321234567876565456567656,
		"name": "Zac coote",
		"related": 0,
		"image": "https://outlook.office.com/owa/service.svc/s/GetPersonaPhoto?email=47605@newington.nsw.edu.au&UA=0&size=HR96x96",
		"text": "the funny thing about this upgrade is that it does nothing",
		"type": 0,
		"increment": 0,
	}
]

var expansions = [
	{
		"id": 0, //A unqiue integer used to identify the expansion
		"price": 2000000, //The static price of the expansion
		"name": "Crapple iCrap B3", //The in-game name of the expansion
		"image": "iMac.png",
	}, {
		"id": 1,
		"price": 4000000000,
		"name": "Bell Inspiron 18 3000",
		"image": "Inspiron.png",
	}, {
		"id": 2,
		"price": 8000000000000,
		"name": "Boogle Quantam-Grip Series 500",
		"image": "Google.png",
	}, {
		"id": 3,
		"price": 16000000000000000,
		"name": "??????",
		"image": "seinfeld.jpg",
	}
]

for (i=0; i<parts.length; i++) { //Sets all part amounts to 0
	partamount[i] = 0
}

for (i=0; i<parts.length; i++) { //Sets all multipliers to 1
	multiplier[i] = 1
}
	
for (i=0; i<parts.length; i++) { //Creates buttons for all the parts
	partfunc(parts[i].id, parts[i].price, parts[i].name)
}

for (i=0; i<expansions.length; i++) {
	expansionfunc(i, expansions[i].name)
}

for (i=0; i<upgrades.length; i++) {
	if (upgrades[i].unlock == level) {
		upgradefunc(upgrades[i].id, upgrades[i].image, upgrades[i].related, upgrades[i].type, upgrades[i].increment)	
	}
}

computerbutton.onmouseover = function(){ //Makes the image larger when the player hovers over it
   document.getElementById('myImg').width = 314
   document.getElementById('myImg').height = 238
};

computerbutton.onmouseout = function(){ //Makes the image smaller when the player is not hovering over it
	document.getElementById('myImg').width = 304
	document.getElementById('myImg').height = 228
};

window.setInterval(refreshMoney, 1); //This repeats the refreshMoney function every millisecond
window.setInterval(getMoney, 1000); //This repeats the getMoney function every second

function refreshMoney(){
	
	monpersec = 0 //Resets money per second
	for (i=0; i<parts.length; i++) { 
		monpersec += Math.floor(partamount[i]*parts[i].value*multiplier[i]) //Adds each parts total value to money per second
	}
	monpersec = Math.floor(monpersec*globalmultiplier) //Multiples the money per second by the global multiplier
	if (level > 0) {
		moneyonclick = Math.floor(monpersec*moneyonclickmultiplier)
	}
	moneypersecond.innerHTML = monpersec + "/sec" //Updates the money per second on the UI
	currentmoney.innerHTML = "$" + totalmoney
}

function getMoney(){
	
	totalmoney += monpersec //Adds the money per second variable to total money
	currentmoney.innerHTML = "$" + totalmoney //Updates the total money on the UI
	
}

computerbutton.onmousedown = function(){ //Runs the function when the image is clicked
	document.getElementById('myImg').style.opacity='0.7' //Makes the image slightly transperant
}

computerbutton.onmouseup = function(){ //Runs the function when the image is no longer being clicked
	totalmoney += moneyonclick//Adds money on click to total money
	currentmoney.innerHTML = "$" + totalmoney //Updates the total money on the IU
	document.getElementById('myImg').style.opacity='1' //Makes the image opaque
}

function partfunc(id, price, name){ //The function that creates the part buttons

	var createdbutton = document.createElement("div") //Creates a div to act as the button
	document.getElementById('partdiv').appendChild(createdbutton); //Places the created button inside the part div (in the HTML)

	createdbutton.setAttribute("id", id + "part") //Sets the attributes of the created buttons (id)
	createdbutton.setAttribute("class", "partbutton") //(class)

	var buttontitle = document.createElement("div") //Creates a div to hold information (title)
	createdbutton.appendChild(buttontitle) //Places the div inside the button
	buttontitle.setAttribute("class", "partbuttontitle") //Sets the class of the div
	var buttonprice = document.createElement("div") //(price)
	createdbutton.appendChild(buttonprice)
	buttonprice.setAttribute("class", "partbuttonprice")
	var buttonamount = document.createElement("div") // (amount)
	createdbutton.appendChild(buttonamount)
	buttonamount.setAttribute("class", "partbuttonamount")
	
	buttontitle.innerHTML = name //Puts the relevant data in the div (name)
	buttonprice.innerHTML = "$" + moneyspace(price) //(price)
	buttonamount.innerHTML = partamount[id] //(amount)
	
	window.setInterval(transparency, 1) //Repeats the transparency function every millisecond
	
	function transparency() {
		
		if (parts[id].price <= totalmoney) { //Checks if a part is affordable. If so the button will become opaque, otherwise it will become transperant
			createdbutton.style.opacity = 1
		} else {
			createdbutton.style.opacity = 0.5
		}
		
	}
	
	document.getElementById(id + "part").onclick = function () { //Creates the functionality of the button when clicked

		if(totalmoney >= parts[id].price) { //Checks if the part is affordable before continuing
			partamount[id] += 1 //Increases the part amount by 1
			buttonamount.innerHTML = partamount[id] //Updates the part amount on the button
			totalmoney -= parts[id].price //Deducts the amount spent from total money
			parts[id].price = Math.floor(parts[id].baseprice * Math.pow(1.15, partamount[id])) //Increases the price of the part
			buttonprice.innerHTML = "$" + parts[id].price //Updates the price on the button

		}
	}
}

function upgradefunc(id, image, relpart, type, inc) { //The function that creates the upgrade buttons
	
	var createdbutton = document.createElement("div") //Creates a div to act as a button
	document.getElementById('upgradebuttondiv').appendChild(createdbutton) //Places the created button inside the upgrade div (in the HTML)
	
	createdbutton.setAttribute("id", id + "upgr") //Sets the attributes of the created buttons (id)
	createdbutton.setAttribute("class", "upgradebutton") //(class)
	
	var buttonimage = document.createElement("IMG"); buttonimage.setAttribute("src", image)	//Creates an icon to represent the upgrade
	createdbutton.appendChild(buttonimage) //Places the icon inside the button
	buttonimage.setAttribute("class", "upgradebuttonimage") //Sets the class of the image
	
	window.setInterval(transparency, 1) //Repeats the transparency function every millisecond
	
	function transparency() {
		if (upgrades[id].price <= totalmoney) { //Checks if a part is affordable. If so the button will become opaque, otherwise it will become transperant
			createdbutton.style.opacity = 1
		} else {
			createdbutton.style.opacity = 0.5
		}
	}
	
	document.getElementById(id + "upgr").onclick = function() { //This creates the functionality of the button when clicked
	
		if(totalmoney >= upgrades[id].price) { //Checks if the upgrade is affordable before continuing
			createdbutton.parentNode.removeChild(createdbutton) //Deletes the upgrade
			upgradeinfoname.innerHTML = "" //Removes the upgrade info
			upgradeinfocost.innerHTML = ""
			upgradeinfodesc.innerHTML = ""
			upgradeinfo.setAttribute("style", "background-color: ; outline-style: ; outline-color: ;")
			totalmoney -= upgrades[id].price //Deducts the amount spent from the total money
			if(type == 0) {
				parts[relpart].value += inc //Increases the value of the part
			}else if(type == 1) {
				multiplier[relpart] += inc //Increases the multiplier of the part
			}else if(type == 2) {
				globalmultiplier += inc //Increases the global multiplier
			}
		}
	}
	
	document.getElementById(id + "upgr").onmouseover = function() { //This displays info while the button is being hovered over
		upgradeinfoname.innerHTML = upgrades[id].name
		upgradeinfocost.innerHTML = "Price: $" + moneyspace(upgrades[id].price)
		upgradeinfodesc.innerHTML = upgrades[id].text
		upgradeinfo.setAttribute("style", "background-color: #d9dddd; outline-style: solid; outline-color: black;")
	}
	document.getElementById(id + "upgr").onmouseout = function() { //This removes info when the mouse is taken off
		upgradeinfoname.innerHTML = ""
		upgradeinfocost.innerHTML = ""
		upgradeinfodesc.innerHTML = ""
		upgradeinfo.setAttribute("style", "background-color: ; outline-style: ; outline-color: ;")
	}
}

function expansionfunc(id, name) {
	
	var createdbutton = document.createElement("div") //Creates a div to act as a button
	document.getElementById('expansiondiv').appendChild(createdbutton) //Places the created button inside the upgrade div (in the HTML)
	createdbutton.setAttribute("id", (id + "xpac")) //Sets the attributes of the created button (id)
	createdbutton.setAttribute("class", "expansionbutton") //(class)
	
	var buttonname = document.createElement("div") // (name)
	createdbutton.appendChild(buttonname)
	buttonname.setAttribute("class", "expansionbuttonname")
	var buttonprice = document.createElement("div") //Creates a div to hold information (price)
	createdbutton.appendChild(buttonprice) //Places the div inside the button
	buttonprice.setAttribute("class", "expansionbuttonprice") //Sets the class of the div
	
	buttonname.innerHTML = name //Displays the name in the div 
	buttonprice.innerHTML = "$" + moneyspace(expansions[id].price) //Displays the price in the div
	
	window.setInterval(transparency, 1) //Repeats the transparency function every millisecond
	
	function transparency() {
		
		if (expansions[id].price <= totalmoney && level == id) { //Checks if a part is affordable. If so the button will become opaque, otherwise it will become transperant
			createdbutton.style.opacity = 1
		} else {
			createdbutton.style.opacity = 0.5
		}
	}
	
	document.getElementById(id + "xpac").onclick = function() { //This creates the functionality of the button when clicked
	
		if(totalmoney >= expansions[id].price && level == id) { //This checks if the expansion is affordable before continuing
			moneyonclickmultiplier *= 2
			imgbutton.setAttribute("src", expansions[level].image)
			level += 1
			createdbutton.parentNode.removeChild(createdbutton) //Deletes the expansion
			totalmoney -= expansions[id].price //Deducts the amount spent from the total money
			for (i=0; i<upgrades.length; i++) {
				if (upgrades[i].unlock == level) {
					upgradefunc(upgrades[i].id, upgrades[i].image, upgrades[i].related, upgrades[i].type, upgrades[i].increment)
					
				}
			}
		}
	}
}

function moneyspace(input) {
	input = input.toString()
	var j = 0
	for (index = input.length - 1; index >= 0; index--) {
		j += 1
		if (j % 3 == 0 && index != 0) {
			input = input.substring(0, index) + " " + input.substring(index)
		}
	}
	return input
}

document.getElementById('expansionbutton').onclick = function() {
	alert("When you buy an expansion, you unlock more upgrades to purchase and your money on click increases. You will also recieve a new computer to click on!")
}

document.getElementById('upgradebutton').onclick = function() {
	alert("Buying upgrades does one of three things: increasing the value of a part; increasing the multiplier of a part or; increasing the global multipler. Be careful though, you can only buy them once!")
}

document.getElementById('partbutton').onclick = function() {
	alert("Parts give you an increase to money per second when you buy them. They are the backbone of your computer.")
}