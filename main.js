let test = document.getElementById("test");
let money = document.getElementById("money");
let displayInfo = document.getElementById("displayInfo");
let bills = document.querySelectorAll("img[src$='rub.jpg']");
let bill_acc = document.querySelector("img[src$='bill_acc.jpg']");
let balance = document.getElementById("balance");
let changeBox = document.getElementById("changeBox");

for (bill of bills) {
	bill.onmousedown = function (e) {
		bill = e.currentTarget;
		bill.style.position = "absolute";
		bill.style.zIndex = 100;
		bill.style.transform = "rotate(90deg)";
		document.addEventListener("mousemove", moveElement);

		bill.onmouseup = function () {
			bill.style.zIndex = 1;
			document.removeEventListener("mousemove", moveElement);
			// Коорд купюры
			let bill_top = bill.getBoundingClientRect().top;
			let bill_left = bill.getBoundingClientRect().left;
			let bill_right = bill.getBoundingClientRect().right;
			//Координаты купюроприемн
			let bill_acc_top = bill_acc.getBoundingClientRect().top;
			let bill_acc_left = bill_acc.getBoundingClientRect().left;
			let bill_acc_right = bill_acc.getBoundingClientRect().right;
			let bill_acc_bottom =
				bill_acc.getBoundingClientRect().bottom - (bill_acc.getBoundingClientRect().height / 3) * 2;

			if (
				bill_top > bill_acc_top &&
				bill_left > bill_acc_left &&
				bill_right < bill_acc_right &&
				bill_top < bill_acc_bottom
			) {
				bill.classList.add("animated");
				setTimeout(function () {
					bill.hidden = true;
				}, 245);
				//Зачисляем деньги
				money.value = +money.value + +bill.dataset.billValue;
				balance.innerHTML = `<i class="bi bi-piggy-bank"></i> Баланс: ${money.value} руб.`;
			}
		};
		function moveElement(event) {
			let x = event.clientX - 150;
			let y = event.clientY - 65;

			bill.style.top = y + "px";
			bill.style.left = x + "px";
			//console.log(event);
		}
	};
	bill.ondragstart = function () {
		return false;
	};
}

function getCoffee(price, name) {
	if (money.value >= price) {
		money.value = money.value - price;
		balance.innerHTML = `<i class="bi bi-piggy-bank"></i> Баланс: ${money.value} руб.`;
		startProgressBar(name);
	} else {
		displayInfo.innerHTML = `<i class="bi bi-emoji-frown"></i> На ${name} не хватает денег.`;
	}
}

function startProgressBar(coffeeName) {
	let i = 0;
	displayInfo.innerHTML = `<i class="bi bi-stopwatch"></i> ${coffeeName} готовится...`;
	function progress() {
		let progressBar = document.querySelector(".progress-bar");
		progressBar.parentElement.hidden = false;
		i++;
		progressBar.style.width = i + "%";
		if (i == 100) {
			clearInterval(timerId);
			progressBar.parentElement.hidden = true;
			displayInfo.innerHTML = `<i class="bi bi-cup-hot"></i> Ваш ${coffeeName} готов!`;
		} else if (i == 45) {
			displayInfo.innerHTML = `<i class="bi bi-stopwatch"></i> ${coffeeName} почти готов.`;
		}
	}
	let timerId = setInterval(progress, 100);
}

function getChange(num) {
	let coin;
	let top = getRandom(1, changeBox.getBoundingClientRect().height - 68);
	let left = getRandom(1, changeBox.getBoundingClientRect().width - 68);
	if (num >= 10) coin = 10;
	else if (num >= 5) coin = 5;
	else if (num >= 2) coin = 2;
	else if (num >= 1) coin = 1;
	console.log(coin);

	changeBox.innerHTML += `<img src="/img/${coin}rub.png" style="top:${top}px; left:${left}px">`;
	balance.innerHTML = `Баланс: 0 руб.`;

	if (balance.value > 0) {
		document.getElementById("MyButton").disabled = false;
	} else {
		document.getElementById("MyButton").disabled = true;
	}

	for (let coin of document.querySelectorAll("img[src$='rub.png']"))
		coin.addEventListener("click", (e) => (e.target.hidden = true));

	if (num - coin !== 0) {
		getChange(num - coin);
	}
}
function getRandom(min, max) {
	return Math.random() * (max - min) + min;
}
// function oldGetChange(num) {
// 	if (num >= 10) {
// 		console.log(10);
// 		oldGetChange(num - 10);
// 	} else if (num >= 5) {
// 		console.log(5);
// 		oldGetChange(num - 5);
// 	} else if (num >= 2) {
// 		console.log(2);
// 		oldGetChange(num - 2);
// 	} else if (num >= 1) {
// 		console.log(1);
// 		oldGetChange(num - 1);
// 	} else {
// 		console.log("Вся сдача выдана!");
// 	}
// }
///////////////////////////////////////////
// function ternGetChange(num) {
// 	let coin = num >= 10 ? 10 : num >= 5 ? 5 : num >= 2 ? 2 : num >= 1 ? 1 : "Вся сдача выдана";
// 	console.log(coin);
// 	if (num - coin !== 0) {
// 		ternGetChange(num - coin);
// 	}
// }

// 			window.innerWidth && document.documentElement.clientWidth
// ? Math.min(window.innerWidth, document.documentElement.clientWidth)
// : window.innerWidth ||
// document.documentElement.clientWidth ||
// document.getElementsByTagName("body")[0].clientWidth;
