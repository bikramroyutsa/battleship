import gameBoard from "./gameboard.js";
import helperFunction from "./helper-functions.js";
import ship from "./ship.js";
class Player {
	constructor(name) {
		this.name = name;
		this.gameBoard = gameBoard();
		this.gameBoard.addCoordinates();
	}

	attack() {}
}
class Ai extends Player {
	constructor(name) {
		super(name);
		this.shotCoordinates = [];
	}
	generateCoordinate() {
		while (true) {
			let x = helperFunction.getRandomInt(8);
			let y = helperFunction.getRandomInt(8);
			if (!helperFunction.includesArray(this.shotCoordinates, [x, y])) {
				this.shotCoordinates.push([x, y]);
				return [x, y];
			}
		}
	}
}

export { Player, Ai };
