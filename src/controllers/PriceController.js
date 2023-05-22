import * as priceService from "../services/price.js";
const getPrices = async (req, res) => {
	try {
		const result = await priceService.getPricesService();
		return res.status(200).json(result);
	} catch (error) {
		return res.status(500).json({error: error.message});
	}
};
export {getPrices};
