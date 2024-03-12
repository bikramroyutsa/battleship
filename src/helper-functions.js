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

	return { getRandomInt, includesArray, generateCoord, randomDirection };
})();
export default helperFunction;
