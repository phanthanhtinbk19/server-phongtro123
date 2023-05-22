import db from "../models";

const getAreasService = async () =>
	new Promise(async (resolve, reject) => {
		try {
			const areas = await db.Area.findAll({
				raw: true,
			});
			resolve({
				err: areas ? 0 : 1,
				message: areas ? "Get areas successfully" : "Get areas failed",
				data: {
					areas: areas,
				},
			});
		} catch (error) {
			reject(error);
		}
	});
export {getAreasService};
