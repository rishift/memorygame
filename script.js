const grid = document.getElementById("grid");

let cards = [];

function genCard(t) {
	let outer = document.createElement("div");
	outer.classList.add("card-outer");
	let card = document.createElement("div");
	card.classList.add("card");
	let inner = document.createElement("span");
	inner.classList.add("card-inner");
	card.dataset.face = t;
	grid.appendChild(card);
	cards.push(card);
	card.onclick = handleClick;
}

let faces = shuffle([
	"😊",
	"😂",
	"😎",
	"😁",
	"🤑",
	"🥰",
	"🤩",
	"😴",
	"😤",
	"😒",
	"🤣",
	"😑",
	"🫡",
	"😣",
	"🤬",
	"😵",
	"🥸",
	"🥳",
	"🤒",
	"🤓",
]).slice(0, 8);
faces = faces.concat(faces);

for (let i = 0; i < 16; ++i) {
	let c = faces[Math.floor(Math.random() * faces.length)];
	genCard(c);
	removeFromArray(c, faces);
}

let selected1 = null;
let selected2 = null;
let moves = 0;

function handleClick(e) {
	e.target.textContent = e.target.dataset.face;
	if (selected1 && !selected2) selected2 = e.target;
	if (!selected1) selected1 = e.target;

	if (selected1 && selected2) {
		if (selected1.dataset.face == selected2.dataset.face) {
			console.log("mathced");
			removeFromArray(selected1, cards);
			removeFromArray(selected2, cards);
		} else {
			selected1.style.animationName = selected2.style.animationName = "shake";
			setTimeout(() => {
				whiteAll();
			}, 1000);
		}
		selected1 = selected2 = null;
		if (cards.length == 0)
			Swal.fire({
				title: "Yayy",
				text: "You've won!!",
			});
	}
}

function whiteAll() {
	cards.forEach((card) => {
		card.textContent = "";
		card.animationName = "";
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
