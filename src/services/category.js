const db = require("../models");

const getCategoriesService = () =>
	new Promise(async (resolve, reject) => {
		try {
			const categories = await db.Category.findAll();
			resolve({
				err: categories ? 0 : 1,
				message: categories
					? "Get categories successfully"
					: "Get categories failed",
				data: {
					categories: categories,
				},
			});
		} catch (error) {
			reject(error);
		}
	});

export {getCategoriesService};
