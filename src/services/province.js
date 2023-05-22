const db = require("../models");

const getProvincesService = () =>
	new Promise(async (resolve, reject) => {
		try {
			const provinces = await db.Province.findAll({
				attributes: ["code", "value"],
			});
			resolve({
				err: provinces ? 0 : 1,
				message: provinces
					? "Get provinces successfully"
					: "Get provinces failed",
				data: {
					provinces: provinces,
				},
			});
		} catch (error) {
			reject(error);
		}
	});

export {getProvincesService};
