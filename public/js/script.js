let score = 0;
let perClick = 1;
let auto = 0;
let prices = {};
let autoPrices = {};

const priceArray = ['price1', 'price2', 'price3', 'price4'];
const upgradeArray = ['upgrade1', 'upgrade2', 'upgrade3', 'upgrade4'];
const autoArray = ['auto1', 'auto2', 'auto3', 'auto4'];

const ruby = document.getElementById('ruby');
const scoreElem = document.getElementById('score');
const perClickElem = document.getElementById('perClick');
const autoElem = document.getElementById('autoScore');

const getTextForPrice = (amt, price) => {
	return `Upgrade rubies per click (+${amt.toString()})<br>Costs: ${price} rubies`;
};

const getTextForAutoPrice = (amt, price) => {
	return `Upgrade rubies per second (+${amt.toString()})<br>Costs: ${price} rubies`;
};

const updateRubiesPerClick = (perClick) => {
	return `Rubies per click: ${perClick.toLocaleString()}`;
};

const updateAutoRubiesPerClick = (perClick) => {
	return `Rubies per click: ${perClick.toLocaleString()}`;
};

if (localStorage.getItem('score') !== null) {
	score = Number(localStorage.score);
}

if (localStorage.getItem('perClick') !== null) {
	perClick = Number(localStorage.perClick);
}

if (localStorage.getItem('auto') !== null) {
	auto = Number(localStorage.auto);
}

priceArray.forEach((p, i) => {
	if (localStorage.getItem(p) === null) {
		prices[i] = Math.pow(10, i) * 50;
	} else {
		prices[i] = Number(localStorage[p]);
	}
});

autoArray.forEach((p, i) => {
	if (localStorage.getItem(p) === null) {
		autoPrices[i] = Math.pow(10, i) * 75;
	} else {
		autoPrices[i] = Number(localStorage[p]);
	}
});

scoreElem.innerHTML = `Total rubies: ${score.toLocaleString()}`;
perClickElem.innerHTML = `Rubies per click: ${perClick.toLocaleString()}`;
autoElem.innerHTML = `Rubies per second: ${auto.toLocaleString()}`;

const click = () => {
	score += perClick;
	scoreElem.innerHTML = `Total rubies: ${score.toLocaleString()}`;

	localStorage.setItem('score', score);

	ruby.style.transform = `scaleX(${
		ruby.style.transform.split('scaleX(')[1].split(')')[0] * -1
	})`;
};

const handleUpgrade = (i) => {
	if (score >= prices[i]) {
		perClick += Math.pow(10, i);
		score -= prices[i];
		prices[i] = Math.ceil(prices[i] * 1.3);
		scoreElem.innerHTML = `Total rubies: ${score.toLocaleString()}`;

		document.getElementById(`upgrade${i + 1}`).innerHTML = getTextForPrice(
			Math.pow(10, i),
			prices[i]
		);
		perClickElem.innerHTML = updateRubiesPerClick(perClick);

		localStorage.setItem(`price${i + 1}`, prices[i]);
		localStorage.setItem('score', score);
		localStorage.setItem('perClick', perClick);
	}
};

const handleAutoUpgrade = (i) => {
	if (score >= autoPrices[i]) {
		auto += Math.pow(10, i);
		score -= autoPrices[i];
		autoPrices[i] = Math.ceil(autoPrices[i] * 1.4);
		scoreElem.innerHTML = `Total rubies: ${score.toLocaleString()}`;

		document.getElementById(`auto${i + 1}`).innerHTML = getTextForAutoPrice(
			Math.pow(10, i),
			autoPrices[i]
		);
		autoElem.innerHTML = updateAutoRubiesPerClick(auto);

		localStorage.setItem(`auto${i + 1}`, autoPrices[i]);
		localStorage.setItem('score', score);
		localStorage.setItem('auto', auto);
	}
};

upgradeArray.forEach((element, i) => {
	const elem = document.getElementById(element);
	elem.innerHTML = getTextForPrice(Math.pow(10, i), prices[i]);
	elem.addEventListener('click', () => {
		handleUpgrade(i);
	});
});

autoArray.forEach((element, i) => {
	const elem = document.getElementById(element);
	elem.innerHTML = getTextForAutoPrice(Math.pow(10, i), autoPrices[i]);
	elem.addEventListener('click', () => {
		handleAutoUpgrade(i);
	});
});

const reset = () => {
	for (let i = 0; i < priceArray.length; i++) {
		localStorage.setItem(`price${i + 1}`, 0);
	}

	for (let i = 0; i < autoArray.length; i++) {
		localStorage.setItem(`auto${i + 1}`, 0);
	}
};

ruby.addEventListener('click', click);

document.getElementById('resetBtn').addEventListener('click', () => {
	if (
		confirm("Are you sure that you want to reset?\nIt can't be undone") ===
		true
	) {
		score = 0;
		perClick = 1;

		localStorage.setItem('score', 0);
		localStorage.setItem('perClick', 1);
		priceArray.forEach((p, i) => {
			localStorage.setItem(p, Math.pow(10, i) * 50);
		});
		window.location.reload();
	}
});

// TODO: setInterval for every second, and increment from autoscore
