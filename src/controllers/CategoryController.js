import * as categoryService from "../services/category.js";
const getCategories = async (req, res) => {
	try {
		const categories = await categoryService.getCategoriesService();
		return res.status(200).json(categories);
	} catch (error) {
		return res.status(500).json({error: error.message});
	}
};

export {getCategories};
