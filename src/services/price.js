import db from "../models";

const getPricesService = async () =>
	new Promise(async (resolve, reject) => {
		try {
			const prices = await db.Price.findAll({
				raw: true,
			});
			resolve({
				err: prices ? 0 : 1,
				message: prices ? "Get prices successfully" : "Get prices failed",
				data: {
					prices: prices,
				},
			});
		} catch (error) {
			reject(error);
		}
	});
export {getPricesService};
