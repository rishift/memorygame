const grid = document.getElementById("grid");

const matchSound = new Audio("match.mp3");
const mismatchSound = new Audio("mismatch.mp3");
mismatchSound.volume = 0.2;

const cards = [];

const flip = [
	{ transform: "translate(-3px, -3px) rotateY(0deg)", boxShadow: "5px 5px 0 0 #6b705c", color: "transparent" },
	{ transform: "translate(-3px, -3px) rotateY(90deg)", boxShadow: "0px 2px 0 0 #6b705c", color: "transparent" },
	{ transform: "translate(-3px, -3px) rotateY(180deg)", boxShadow: "-5px 5px 0 0 #6b705c", color: "inherit" },
];

const flipOpenOptions = { duration: 400, iterations: 1 };
const flipCloseOpts = { duration: 400, iterations: 1, delay: 1400, direction: "reverse" };

const shake = [
	{ transform: "translate(-3px, -3px)" },
	{ transform: "translate(0, 0)" },
	{ transform: "translate(3px, 3px)" },
	{ transform: "translate(3px, -3px)" },
	{ transform: "translate(0, 0)" },
	{ transform: "translate(-3px, 3px)" },
	{ transform: "translate(-3px, -3px)" },
];

const shakeOptions = { duration: 100, iterations: 2, delay: 500 };

let selected1 = null;
let selected2 = null;

let faces = shuffle(["😊", "😂", "😎", "😁", "🤑", "🤩", "😤", "😑", "😣", "🤬", "😵", "🥸", "🤓", "🙄", "🤗", "😵", "😇", "😍", "😮"]).slice(0, 8);
faces = faces.concat(faces);

for (let i = 0; i < 16; ++i) {
	let c = faces[Math.floor(Math.random() * faces.length)];
	generateCards(c);
	removeFromArray(c, faces);
}

function generateCards(t) {
	let card = document.createElement("div");
	card.classList.add("card");
	card.textContent = t;
	grid.appendChild(card);
	cards.push(card);
	card.onclick = handleClick;
}

function handleClick(e) {
	arm(false);
	setTimeout(() => {
		e.target.style.color = "inherit";
	}, 400);
	e.target.animate(flip, flipOpenOptions);
	e.target.onclick = null;

	if (selected1 && !selected2) selected2 = e.target;
	if (!selected1) selected1 = e.target;

	if (selected1 && selected2) {
		if (selected1.textContent == selected2.textContent) {
			removeFromArray(selected1, cards);
			removeFromArray(selected2, cards);
			setTimeout(() => {
				matchSound.play();
				selected1.style.animation = selected2.style.animation = "1s sink 0.7s forwards";
			}, 150);
		} else {
			selected1.animate(shake, shakeOptions);
			selected2.animate(shake, shakeOptions);

			setTimeout(() => {
				mismatchSound.play();
				setTimeout(() => {
					selected1.style.color = selected2.style.color = "transparent";
				}, 1300);
			}, 200);

			selected1.animate(flip, flipCloseOpts);
			selected2.animate(flip, flipCloseOpts);
		}

		setTimeout(() => {
			selected1.onclick = selected2.onclick = handleClick;
			selected1 = selected2 = null;
			arm(true);
		}, 2000);

		if (cards.length == 0)
			setTimeout(
				() =>
					Swal.fire({
						title: "Yayy",
						text: "You've won!!",
					}),
				2000
			);
	} else if (selected1 && !selected2)
		setTimeout(() => {
			arm(true);
		}, 600);
}

function arm(k) {
	cards.forEach((card) => {
		card.onclick = k ? handleClick : null;
	});
}

function removeFromArray(e, arr) {
	arr.splice(arr.indexOf(e), 1);
}

function shuffle(arr) {
	let m = arr.length;
	let t, i;
	while (m) {
		i = Math.floor(Math.random() * m--);
		t = arr[m];
		arr[m] = arr[i];
		arr[i] = t;
	}
	return arr;
}
