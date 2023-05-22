import db from "../models";

const getCurrentService = (id) =>
	new Promise(async (resolve, reject) => {
		try {
			const user = await db.User.findOne({
				where: {
					id,
				},
			});
			const {password, ...rest} = user;
			resolve({
				err: user ? 0 : 1,
				msg: user ? "Get user successfully" : "Failed to get user.",
				data: {
					user: rest,
				},
			});
		} catch (error) {
			reject(error);
		}
	});

const updateUserService = (id, data) =>
	new Promise(async (resolve, reject) => {
		try {
			const user = await db.User.findOne({
				where: {
					id,
				},
			});

			if (user) {
				await db.User.update(data, {
					where: {
						id,
					},
				});
			}
			resolve({
				err: user ? 0 : 1,
				msg: user ? "Update user successfully." : "Failed to update user.",
			});
		} catch (error) {
			reject(error);
		}
	});
export {getCurrentService, updateUserService};
