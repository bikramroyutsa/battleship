import helperFunction from "./helper-functions.js";
import { Player } from "./player.js";
import gameBoard from "./gameboard.js";
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

		const btnAttack = document.createElement("button");
		btnAttack.textContent = "Start attacking";
		btnAttack.classList.add("start-attack");
		document.querySelector(".player1").appendChild(btnAttack);

		displayGameboards(player1, "1");
		displayGameboards(player2, "2");
		addShipsToContainer(player1, 1);
		addShipsToContainer(player2, 2);

		btnAttack.addEventListener("click", () => {
			player1.gameBoard.placedShips.length === 0
				? alert("place ships first")
				: (() => {
						document
							.querySelectorAll(".btn-place-ships-randomly")
							.forEach((item) => (item.disabled = true));
						startTurn(player1, player2);
				  })();
		});

		document.querySelectorAll(".btn-place-ships-randomly").forEach((btn) => {
			btn.addEventListener("click", (e) => {
				e.target.dataset.number == 1
					? placeShipsRandomly(player1, 1)
					: btn.dataset.number == 2
					? placeShipsRandomly(player2, 2)
					: null;
			});
		});
	});
})();
function startTurn(_player1, _player2) {
	let turn = 1;
	alert(`turn = ${turn}`);
	const player1Cells = document.querySelectorAll('[data-player="1"]');
	const player2Cells = document.querySelectorAll('[data-player="2"]');
	const domTurnText = document.querySelector(".turn");

	document.querySelectorAll(".cell").forEach((item) => {
		item.addEventListener("click", (e) => {
			handleAttack(e);
		});
	});
	function updateTurn(i) {
		turn += 1;
		i === 1
			? alert(`player 1 can attack player 2`)
			: alert(`player 2 can attack player 1`);
	}

	function handleAttack(e) {
		let coordinate = [e.target.dataset.i, e.target.dataset.j];
		let dataPlayer = e.target.dataset.player;
		// if turn is odd, player 1 can atack player 2
		if (dataPlayer == 2 && turn % 2 !== 0) {
			let status = attack(coordinate, _player2, e);
			status == "attacked now" ? updateTurn(2) : alert(status);
		}
		if (dataPlayer == 1 && turn % 2 === 0) {
			let status = attack(coordinate, _player1, e);
			status == "attacked now" ? updateTurn(1) : alert(status);
		}
	}
}

function attack(_coordinate, _p, e) {
	let status = _p.gameBoard.receiveAttack(_coordinate);
	e.target.style.backgroundColor = "white";
	return status;
}
function placeShipsRandomly(player, num) {
	player.gameBoard = gameBoard();
	player.gameBoard.addCoordinates();
	player.gameBoard.createShips();
	for (let i = 0; i < player.gameBoard.ships.length; i++) {
		let ship = player.gameBoard.ships[i];
		placeSingleShip(player, ship);
		displayShipsOnGameboard(player, num);
	}
}
function placeSingleShip(_player, _ship) {
	let tempCoord = helperFunction.generateCoord();
	let shipPlacement = _player.gameBoard.placeShip(
		tempCoord,
		_ship.length,
		helperFunction.randomDirection()
	);
	if (shipPlacement === undefined) placeSingleShip(_player, _ship);
}
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
	gbInterface.classList.add(`gi-${num}`);
	player.gameBoard.coordinates.forEach((item) => {
		const cell = document.createElement("div");
		// cell.textContent = `${item.i}, ${item.j}`;
		cell.classList.add("cell");
		cell.dataset.player = num;
		cell.dataset.i = item.i;
		cell.dataset.j = item.j;
		if (item.placed !== undefined) {
			cell.style.backgroundColor = "yellow";
			cell.textContent = `${item.placed}`;
		}
		gbInterface.appendChild(cell);
	});
	playerInterface.appendChild(gbInterface);
}
function addShipsToContainer(player, num) {
	const playerInterface = document.querySelector(`.player${num}`);

	const btnPlaceShipRandomly = document.createElement("button");
	btnPlaceShipRandomly.textContent = "Place ships randomly";
	btnPlaceShipRandomly.dataset.number = num;
	btnPlaceShipRandomly.classList.add("btn-place-ships-randomly");
	playerInterface.appendChild(btnPlaceShipRandomly);

	const container = document.createElement("div");
	container.classList.add("ships-container");
	player.gameBoard.ships.forEach((item) => {
		const ship = document.createElement("div");
		ship.classList.add("ship");
		ship.textContent = "ship";
		ship.style.width = 50 * item.length + "px";
		container.appendChild(ship);
	});
	playerInterface.appendChild(container);
}
function displayShipsOnGameboard(player, num) {
	const gameBoardInterface = document.querySelector(`.gi-${num}`);
	document.querySelector(`.player${num}`).removeChild(gameBoardInterface);
	displayGameboards(player, num);
}
