import * as provinceService from "../services/province.js";
const getProvinces = async (req, res) => {
	try {
		const provinces = await provinceService.getProvincesService();
		return res.status(200).json(provinces);
	} catch (error) {
		return res.status(500).json({error: error.message});
	}
};

export {getProvinces};
