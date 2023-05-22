import * as postService from "../services/post.js";
const getPosts = async (req, res) => {
	try {
		const result = await postService.getPostsService(req.query);
		return res.status(200).json(result);
	} catch (error) {
		return res.status(500).json(error);
	}
};
const getPost = async (req, res) => {
	const {id} = req.params;
	try {
		const result = await postService.getPostService(id);
		return res.status(200).json(result);
	} catch (error) {
		return res.status(500).json(error);
	}
};
const getNewPosts = async (req, res) => {
	try {
		const newPosts = await postService.getNewPostsService();
		return res.status(200).json(newPosts);
	} catch (error) {
		return res.status(500).json(error);
	}
};
const createNewPost = async (req, res) => {
	try {
		const newPosts = await postService.createNewPostsService(req.body);
		return res.status(200).json(newPosts);
	} catch (error) {
		return res.status(500).json(error);
	}
};
const getPrivatePosts = async (req, res) => {
	try {
		const newPosts = await postService.getPrivatePostsService(req.user.id);
		return res.status(200).json(newPosts);
	} catch (error) {
		return res.status(500).json(error);
	}
};

const updatePost = async (req, res) => {
	try {
		const {postId, attributesId, overviewId, imagesId} = req.body;
		if (!postId || !attributesId || !overviewId || !imagesId)
			return res.status(400).json({msg: "Missing required fields."});

		const result = await postService.updatePostService(req.body);
		return res.status(200).json(result);
	} catch (error) {
		return res.status(500).json(error);
	}
};
const deletePost = async (req, res) => {
	try {
		const result = await postService.deletePostService(req.params.id);
		return res.status(200).json(result);
	} catch (error) {
		return res.status(500).json(error);
	}
};

export {
	getPosts,
	getPost,
	getNewPosts,
	createNewPost,
	getPrivatePosts,
	updatePost,
	deletePost,
};
