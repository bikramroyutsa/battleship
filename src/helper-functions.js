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
	return { getRandomInt, includesArray };
})();
export default helperFunction;
