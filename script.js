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

let ce1 = null;
let ce2 = null;
let moves = 0;

function handleClick(e) {
	e.target.textContent = e.target.dataset.face;
	if (ce1 && !ce2) ce2 = e.target;
	if (!ce1) ce1 = e.target;

	if (ce1 && ce2) {
		if (ce1.dataset.face == ce2.dataset.face) {
			console.log("mathced");
			removeFromArray(ce1, cards);
			removeFromArray(ce2, cards);
		} else {
			ce1.style.animationName = ce2.style.animationName = "shake";
			setTimeout(() => {
				whiteAll();
			}, 1000);
		}
		ce1 = ce2 = null;
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
