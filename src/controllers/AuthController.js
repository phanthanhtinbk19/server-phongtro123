import * as authService from "../services/auth.js";
const register = async (req, res) => {
	const {phone, password, name} = req.body;

	try {
		if (!phone || !password || !name)
			return res.status(400).json({err: 1, message: "Missing required fields"});
		const result = await authService.registerService(req.body);
		return res.status(200).json(result);
	} catch (error) {
		return res.status(500).json({
			err: -1,
			message: error.message,
		});
	}
};
const login = async (req, res) => {
	const {phone, password} = req.body;
	try {
		if (!phone || !password)
			return res.status(400).json({err: 1, message: "Missing required fields"});
		const result = await authService.loginService(req.body);
		return res.status(200).json(result);
	} catch (error) {
		return res.status(500).json(error);
	}
};
const logout = async (req, res) => {
	try {
		const result = await authService.logoutService();
		return res.status(200).json(result);
	} catch (error) {
		return res.status(500).json(error);
	}
};
export {register, login, logout};
