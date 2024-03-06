import helperFunction from "../helper-functions.js";

test("test array includes array", () => {
	expect(helperFunction.includesArray([[1, 2]], [1, 2])).toBe(true);
});

test("test array includes array 2", () => {
	expect(
		helperFunction.includesArray(
			[
				[1, 2],
				[5, 4],
				[6, 3],
			],
			[5, 4]
		)
	).toBe(true);
});
