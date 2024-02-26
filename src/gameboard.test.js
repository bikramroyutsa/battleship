import gameBoard from "./gameboard.js";
const board = gameBoard();
board.addCoordinates();
board.createShips();

test("testfindShipIndex", () => {
	expect(board.findShipIndex(2)).toBe(2);
});