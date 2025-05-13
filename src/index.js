import gameBoard from "./gameboard.js";
import helperFunction from "./helper-functions.js";
import { Player } from "./player.js";
import "./style.css";
const btnStartGame = document.querySelector(".start-game");
const domGameboards = document.querySelector(".gameboards");
const turnDisplay = document.querySelector(".turn-display");
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
		//logic for attack button
		btnAttack.addEventListener("click", () => {
			player1.gameBoard.placedShips.length === 0
				? alert("place ships first")
				: (() => {
						document
							.querySelectorAll(".btn-place-ships-randomly")
							.forEach((item) => (item.disabled = true));
						playWithAi(player1, player2);
				  })();
		});
		//add logic to the place random buttons
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
function playWithAi(_player1, _player2) {
	document.querySelectorAll(".cell").forEach((item) => {
		if (item.dataset.player == 2)
			item.addEventListener("click", attackComputer);
	});
	function attackComputer(e) {
		let coordinate = [e.target.dataset.i, e.target.dataset.j];
		let status = attack(coordinate, _player2, e);
		checkSunkShips(_player1, _player2, attackComputer);
		if (status === "attacked ship") {
		} else if (status === "already attacked, attack somewhere else") {
			// turnDisplay.textContent = status;
		} else {
			computerAttacks(_player1, helperFunction.generateCoord(), [
				_player1,
				_player2,
				attackComputer,
			]);
		}
	}
}
function computerAttacks(humanPlayer, aiCoordinate, arr) {
	let status = attack(aiCoordinate, humanPlayer);
	const attackedCell = document.querySelector(
		`.cell[data-player="1"][data-i="${aiCoordinate[0]}"][data-j="${aiCoordinate[1]}"]`
	);
	attackedCell.classList.contains("placed")
		? (attackedCell.style.backgroundColor = "red")
		: (attackedCell.style.backgroundColor = "white");

	//logic
	if (status === "attacked ship") {
		let gameOver = checkSunkShips(arr[0], arr[1], arr[2]);
		if (gameOver != true)
			computerAttacks(
				humanPlayer,
				helperFunction.generateSmartCo(aiCoordinate),
				arr
			);
	} else if (status === "already attacked, attack somewhere else") {
		return computerAttacks(humanPlayer, helperFunction.generateCoord(), arr);
	} else return "computer attack over";
}
function handleWin(_player, func) {
	alert(`${_player.name} wins`);

	document.querySelectorAll(".cell").forEach((item) => {
		item.removeEventListener("click", func);
	});
}
function startTurn(_player1, _player2) {
	let turn = 1;
	const domTurnText = document.querySelector(".turn-display");
	domTurnText.textContent = `${_player1.name}'s turn`;
	document.querySelectorAll(".cell").forEach((item) => {
		item.addEventListener("click", handleAttack);
	});
	function updateTurn(i) {
		turn += 1;
		i === 1
			? (domTurnText.textContent = `${_player1.name}'s turn`)
			: (domTurnText.textContent = `${_player2.name}'s turn`);
	}

	function handleStatus(_status, n) {
		if (_status === "attacked ship") {
			setTimeout(() => {
				console.log("you can attack again");
			}, 200);
		} else if (_status === "already attacked, attack somewhere else") {
			console.log(_status);
		} else {
			updateTurn(n);
		}
		checkSunkShips(_player1, _player2, handleAttack);
	}
	function handleAttack(e) {
		let coordinate = [e.target.dataset.i, e.target.dataset.j];
		let dataPlayer = e.target.dataset.player;
		// if turn is odd, player 1 can atack player 2
		if (dataPlayer == 2 && turn % 2 !== 0) {
			let status = attack(coordinate, _player2, e);
			handleStatus(status, 2);
		}
		//player 2 attacks player 1
		if (dataPlayer == 1 && turn % 2 === 0) {
			let status = attack(coordinate, _player1, e);
			handleStatus(status, 1);
		}
	}
}
function checkSunkShips(p1, p2, func) {
	if (p1.gameBoard.allSunk()) {
		handleWin(p2, func);
		return true;
	}
	if (p2.gameBoard.allSunk()) {
		handleWin(p1, func);
		return true;
	}
}
function attack(_coordinate, _p, e) {
	let status = _p.gameBoard.receiveAttack(_coordinate);
	if (e) {
		e.target.classList.contains("placed")
			? (e.target.style.backgroundColor = "red")
			: (e.target.style.backgroundColor = "white");
	}
	return status;
}
function placeShipsRandomly(player, num) {
	player.gameBoard = gameBoard();
	player.gameBoard.addCoordinates();
	player.gameBoard.createShips();
	for (let i = 0; i < player.gameBoard.ships.length; i++) {
		let ship = player.gameBoard.ships[i];
		placeSingleShip(player, ship);
	}
	displayShipsOnGameboard(player, num);
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
			cell.classList.add("placed");
			if (num === 1) {
				cell.style.backgroundColor = "yellow";
				cell.textContent = `${item.placed}`;
			}
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
		ship.dataset.length = item.length;
		ship.dataset.direction = "horizontal";
		ship.setAttribute("draggable", "true");
		// ship.textContent = `${item.length}`;
		// ship.style.width = 50 * item.length + "px";
		for (let i = 1; i <= item.length; i++) {
			const shipPart = document.createElement("div");
			shipPart.classList.add("ship-part");
			shipPart.textContent = item.length;
			ship.appendChild(shipPart);
		}
		container.appendChild(ship);
	});
	playerInterface.appendChild(container);
	dragShips();
}
function dragShips() {
	const cells = document.querySelectorAll(".cell");
	const draggables = document.querySelectorAll(".ship");
	draggables.forEach((draggable) => {
		draggable.addEventListener("dragstart", () => {
			draggable.classList.add("dragging");
		});
		draggable.addEventListener("dragend", () => {
			draggable.classList.remove("dragging");
		});
	});
	cells.forEach((cell) => {
		cell.addEventListener("dragover", (e) => {
			e.preventDefault();
			const dragging = document.querySelector(".dragging");
			cell.classList.add(".placed");
			cell.appendChild(dragging);
		});
		cell.addEventListener("drop", (e) => {
			// const dragging = document.querySelector(".dragging");
			e.preventDefault();
			console.log("dropped");
			// if (dragging.dataset.length > 1) {
			// 	if (dragging.dataset.direction == "horizontal") {
			// 		cell.nextElementSibling.style.backgroundColor = "red";
			// 	}
			// }
		});
	});
}
function displayShipsOnGameboard(player, num) {
	const gameBoardInterface = document.querySelector(`.gi-${num}`);
	document.querySelector(`.player${num}`).removeChild(gameBoardInterface);
	displayGameboards(player, num);
}
