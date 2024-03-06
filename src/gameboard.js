import ship from "./ship.js";

function gameBoard() {
	const coordinates = []; //stores the cooordinates
	const ships = []; //stoers the created ship objects
	const placedShips = []; //stores the placed ship indexes
	const attackedCoordinates = [];
	function addCoordinates() {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				coordinates.push({ i, j, placed: undefined, attacked: false });
			}
		}
	}
	function createShips() {
		ships.push(ship(4));
		ships.push(ship(3));
		ships.push(ship(2));
		ships.push(ship(2));
		ships.push(ship(1));
		ships.push(ship(1));
		ships.push(ship(1));
	}
	const calculateCos = (coord, shipLength, alignment) => {
		let allCoordinates = [coord];

		if (alignment == "horizontal") {
			for (let i = 1; i < shipLength; i++) {
				allCoordinates.push([coord[0] + i, coord[1]]);
			}
		}
		if (alignment == "vertical") {
			for (let i = 1; i < shipLength; i++) {
				allCoordinates.push([coord[0], coord[1] + i]);
			}
		}
		return allCoordinates;
	};

	const findCoIndex = (coord) =>
		coordinates.findIndex((element) => {
			return element.i == coord[0] && element.j == coord[1];
		});
	const findShipIndex = (shipLength) => {
		// Stores the index of the ships that have the given ship length
		const indices = ships
			.map((element) => {
				if (element.length === shipLength) {
					return ships.indexOf(element);
				}
				return undefined; // Explicitly return undefined when condition is not met
			})
			.filter((index) => index !== undefined); // Filter out undefined values

		let finalIndex = undefined;
		for (let i = 0; i < indices.length; i++) {
			if (!placedShips.includes(indices[i])) {
				finalIndex = indices[i];
				break;
			}
		}
		// Loops through the array to check if that index (ship) is already placed
		return finalIndex;
	};

	function placeShip(coord, shipLength, alignment) {
		const shipIndex = findShipIndex(shipLength);
		const allCoordinates = calculateCos(coord, shipLength, alignment);
		const allCoIndexes = allCoordinates.map((element) => {
			return findCoIndex(element);
		});
		placedShips.push(shipIndex);
		allCoIndexes.forEach((element) => {
			coordinates[element].placed = shipIndex;
		});
	}

	function receiveAttack(co) {
		// attackedCoordinates.push(co);
		let coIndex = findCoIndex(co);
		if (!coordinates[coIndex].attacked) {
			coordinates[coIndex].attacked = true;
			if (typeof coordinates[coIndex].placed === "number") {
				let shipIndex = coordinates[coIndex].placed;
				ships[shipIndex].hit();
			}
		}
	}
	function allSunk() {
		let allsunk = false;
		ships.forEach((item) => {
			if (item.sunk === true) allSunk = true;
		});
		return allsunk;
	}
	return {
		coordinates,
		placedShips,
		createShips,
		addCoordinates,
		placeShip,
		receiveAttack,
		allSunk,
	};
}

export default gameBoard;
