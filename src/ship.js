const ship = (length) => {
	let hits = 0;
	let sunk = false;
	const hit = function () {
		if (hits < length) hits++;
		if (hits == length) sunk = true;
	};
	const showHits = () => hits;
	const isSunk = () => sunk;
	return { length, hit, showHits, isSunk };
};
export default ship;
