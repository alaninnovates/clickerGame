let score = 0;
let perClick = 1;
let prices = {};

const priceArray = ['price1', 'price2', 'price3', 'price4'];
const upgradeArray = ['upgrade1', 'upgrade2', 'upgrade3', 'upgrade4'];

const ruby = document.getElementById('ruby');
const scoreElem = document.getElementById('score');
const perClickElem = document.getElementById('perClick');

const getTextForPrice = (amt, price) => {
	return `Upgrade rubies per click (+${amt.toString()})<br>Costs: ${price} rubies`;
};

const updateRubiesPerClick = (perClick) => {
	return `Rubies per click: ${perClick.toLocaleString()}`;
};

if (localStorage.getItem('score') !== null) {
	score = Number(localStorage.score);
}

if (localStorage.getItem('perClick') !== null) {
	perClick = Number(localStorage.perClick);
}

priceArray.forEach((p, i) => {
	if (localStorage.getItem(p) === null) {
		prices[i] = Math.pow(10, i) * 50;
	} else {
		prices[i] = Number(localStorage[p]);
	}
});

scoreElem.innerHTML = `Total rubies: ${score.toLocaleString()}`;
perClickElem.innerHTML = `Rubies per click: ${perClick.toLocaleString()}`;

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

upgradeArray.forEach((element, i) => {
	const elem = document.getElementById(element);
	elem.innerHTML = getTextForPrice(Math.pow(10, i), prices[i]);
	elem.addEventListener('click', () => {
		handleUpgrade(i);
	});
});

const reset = () => {
	for (let i = 0; i < priceArray.length; i++) {
		localStorage.setItem(`price${i + 1}`, 0);
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
