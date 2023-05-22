import * as userService from "../services/user.js";
const getCurrent = async (req, res) => {
	try {
		const result = await userService.getCurrentService(req.user.id);
		return res.status(200).json(result);
	} catch (error) {
		res.status(500).json({error: error.message});
	}
};
const updateUser = async (req, res) => {
	try {
		const result = await userService.updateUserService(req.user.id, req.body);
		return res.status(200).json(result);
	} catch (error) {
		res.status(500).json({error: error.message});
	}
};
export {getCurrent, updateUser};
