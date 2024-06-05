const helperFunction = (() => {
	function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}
	function includesArray(mainArray, subArray) {
		for (let i = 0; i < mainArray.length; i++) {
			const currentSubArray = mainArray[i];
			if (arraysAreEqual(currentSubArray, subArray)) {
				return true;
			}
		}
		return false;
	}
	function arraysAreEqual(arr1, arr2) {
		if (arr1.length !== arr2.length) {
			return false;
		}
		if (arr1[0] === arr2[0] && arr1[1] === arr2[1]) return true;
		else return false;
	}
	function generateCoord() {
		while (true) {
			let x = getRandomInt(8);
			let y = getRandomInt(8);
			return [x, y];
		}
	}
	function randomDirection() {
		const randomNumber = Math.random();
		return randomNumber < 0.5 ? "horizontal" : "vertical";
	}
	function validateCo(co) {
		if (co[0] < 8 && co[0] >= 0 && co[1] < 8 && co[1] >= 0) return true;
		else return false;
	}
	function generateSmartCo(previousCo) {
		let newCo = [];
		let dir = randomDirection();
		if (dir == "horizontal") {
			newCo =
				Math.random() < 0.5
					? [previousCo[0], previousCo[1] + 1]
					: [previousCo[0], previousCo[1] - 1];
		} else {
			newCo =
				Math.random() < 0.5
					? [previousCo[0] + 1, previousCo[1]]
					: [previousCo[0] - 1, previousCo[1]];
		}
		if (validateCo(newCo)) return newCo;
		else return generateSmartCo(previousCo);
	}

	return {
		getRandomInt,
		includesArray,
		generateCoord,
		randomDirection,
		generateSmartCo,
	};
})();
export default helperFunction;
