import jwt from "jsonwebtoken";
const genrateToken = (user) => {
	return jwt.sign({id: user.id}, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "2d",
	});
};
const genrateRefreshToken = (user) => {
	return jwt.sign({id: user.id}, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: "17d",
	});
};
export const getNumberFromString = (string) => {
	let number = 0;
	if (string.search("đồng/tháng") !== -1) {
		number = +string.match(/\d+/)[0] / Math.pow(10, 3);
	} else if (string.search("triệu/tháng") !== -1) {
		number = +string.match(/\d+/)[0];
	} else if (string.search("m")) {
		number = +string.match(/\d+/)[0];
	}
	return number;
};
export const getNumberFromStringV2 = (string) => {
	let number = 0;
	if (string.search("đồng/tháng") !== -1) {
		number = +string.match(/\d+/)[0] / Math.pow(10, 3);
	} else if (string.search("triệu/tháng") !== -1) {
		number = +string.split(" ")[0];
	} else if (string.search("m")) {
		number = +string.match(/\d+/)[0];
	}
	return +number;
};
export {genrateToken, genrateRefreshToken};
