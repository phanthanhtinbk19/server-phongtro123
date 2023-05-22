import * as areaService from "../services/area.js";
const getAreas = async (req, res) => {
	try {
		const result = await areaService.getAreasService();
		return res.status(200).json(result);
	} catch (error) {
		return res.status(500).json({error: error.message});
	}
};
export {getAreas};
