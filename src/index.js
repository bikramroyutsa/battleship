import gameBoard from "./gameboard.js";
import { Player } from "./player.js";
import ship from "./ship.js";
import "./style.css";
const btnStartGame = document.querySelector(".start-game");
const domGameboards = document.querySelector(".gameboards");
const mainGameLoop = (() => {
	let player1 = undefined;
	let player2 = undefined;
	btnStartGame.addEventListener("click", (e) => {
		e.preventDefault();
		player1 = new Player(document.querySelector("#input-player-1-name").value);
		player2 = new Player(document.querySelector("#input-player-2-name").value);
		addPlayersToDOM(player1, player2);
		displayGameboards(player1, "1");
		displayGameboards(player2, "2");
		document.querySelectorAll(".cell").forEach((item) => {
			item.addEventListener("click", () => {
				console.log("attacked cell!!!!");
			});
		});
	});
})();

function addPlayersToDOM(p1, p2) {
	domGameboards.classList.add("started");
	for (let i = 1; i <= 2; i++) {
		const div = document.createElement("div");
		div.classList.add(`player${i}`);
		const h2 = document.createElement("h2");
		i === 1 ? (h2.textContent = p1.name) : (h2.textContent = p2.name);
		div.appendChild(h2);
		domGameboards.appendChild(div);
	}
}
function displayGameboards(player, num) {
	const playerInterface = document.querySelector(`.player${num}`);
	const gbInterface = document.createElement("div");
	gbInterface.classList.add("gameboard-interface");
	player.gameBoard.coordinates.forEach((item) => {
		const cell = document.createElement("div");
		cell.textContent = `${item.i}, ${item.j}`;
		cell.classList.add("cell");
		gbInterface.appendChild(cell);
	});
	playerInterface.appendChild(gbInterface);
}
