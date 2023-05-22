import {v4 as uuidv4} from "uuid";
import bcrypt from "bcryptjs";
import db from "../models";
import {genrateToken} from "../utils/common";

const hashPassword = (password) => bcrypt.hashSync(password, 10);
const registerService = ({phone, password, name}) =>
	new Promise(async (resolve, reject) => {
		try {
			const response = await db.User.findOrCreate({
				where: {phone},
				defaults: {
					phone,
					name,
					password: hashPassword(password),
					id: uuidv4(),
				},
			});
			const token = response[1] && genrateToken(response[0]);
			resolve({
				err: token ? 0 : 2,
				msg: token
					? "Register is successfully !"
					: "Phone number has been aldready used !",
				data: {
					access_token: token || null,
				},
			});
		} catch (error) {
			reject(error);
		}
	});

const loginService = ({phone, password}) =>
	new Promise(async (resolve, reject) => {
		try {
			const user = await db.User.findOne({
				where: {
					phone,
				},
				raw: true,
			});

			const isCorrectPassword =
				user && bcrypt.compareSync(password, user.password);
			const token = isCorrectPassword && genrateToken(user);

			resolve({
				err: token ? 0 : 2,
				message: token
					? "Login is successfully"
					: "Phone or Password is not exist",
				data: {
					access_token: token || null,
				},
			});
		} catch (error) {
			reject(error);
		}
	});

const logoutService = () =>
	new Promise((resolve, reject) => {
		try {
			resolve({
				err: 0,
				message: "Logout is successfully",
			});
		} catch (error) {
			reject(error);
		}
	});
export {registerService, loginService, logoutService};
