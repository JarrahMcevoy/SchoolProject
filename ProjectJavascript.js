var monpersec = 1
var totalmoney = 0
var myimgobj = document.images["button"];
var upgrd2button = document.button["button2"];
var complvl = 0


document.getElementById('button2').style.opacity='0.7'

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
window.setInterval(getMoney, 1000);
function getMoney(){
totalmoney = totalmoney+monpersec
textarea1.value = totalmoney
textarea2.value = monpersec +"/sec"
}
myimgobj.onmousedown = function(){
totalmoney = totalmoney+3
textarea1.value = totalmoney
document.getElementById('myImg').style.opacity='0.7'
}
myimgobj.onmouseup = function(){
document.getElementById('myImg').style.opacity='1'
}
document.getElementById('button1').onclick = function () {
if(totalmoney >= 100 && complvl === 0){
document.getElementById('myImg').src = "http://longbeachplace.org.au/wp-content/uploads/2014/02/computer.png"
monpersec = 3
totalmoney = totalmoney -100
complvl = complvl + 1
textarea1.value = totalmoney
textarea2.value = monpersec +"/sec"
document.getElementById('button2').style.opacity='1'
}else{}
function buttonfunc(id, price, name, image, reward, text, flavourtext){
	document.createElement("button")
	button.innerHTML = "Do Something"
}
}