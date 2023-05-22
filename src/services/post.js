import {Op} from "sequelize";
import db from "../models";
import {v4 as uuidv4} from "uuid";
import generateCode from "../utils/generateCode";
import moment from "moment/moment";
import {generateCreatedDate, generateExpireDate} from "../utils/generateDate";
const getPostsService = ({
	page,
	order_by,
	priceTo,
	priceFrom,
	areaTo,
	areaFrom,
	categoryCode,
	...rest
}) =>
	new Promise(async (resolve, reject) => {
		console.log(order_by);
		try {
			const pageNumber = +page || 1;
			const limit = process.env.LIMIT;
			const queries = {...rest};
			if (priceTo) queries.priceNumber = {[Op.between]: [priceTo, priceFrom]};
			if (areaTo) queries.areaNumber = {[Op.between]: [areaTo, areaFrom]};
			if (categoryCode) queries.categoryCode = categoryCode;

			const posts = await db.Post.findAndCountAll({
				where: queries,
				raw: true,
				nest: true,
				limit: +limit,
				offset: (pageNumber - 1) * +limit,
				order: order_by === "newest" ? [["createdAt", "DESC"]] : [],

				include: [
					{
						model: db.Image,
						as: "images",
						attributes: ["image", "id"],
					},
					{
						model: db.Attribute,
						as: "attributes",
						attributes: ["price", "acreage", "published", "hashtag"],
					},
					{
						model: db.User,
						as: "user",
						attributes: ["name", "phone", "zalo"],
					},
				],
				attributes: [
					"id",
					"title",
					"star",
					"description",
					"address",
					"createdAt",
				],
			});

			resolve({
				err: posts ? 0 : 1,
				message: posts ? "Get posts successfully" : "Get posts failed",
				data: {
					posts: posts.rows,
					pagination: {
						page: pageNumber || 1,
						limit: +limit,
						page_size: Math.ceil(posts.count / +limit),
					},
				},
			});
		} catch (error) {
			reject(error);
		}
	});

const getPostService = (postId) =>
	new Promise(async (resolve, reject) => {
		try {
			const post = await db.Post.findOne({
				raw: true,
				nest: true,
				where: {id: postId},
				include: [
					{
						model: db.Image,
						as: "images",
						attributes: ["image"],
					},
					{
						model: db.Attribute,
						as: "attributes",
						attributes: ["price", "acreage", "published", "hashtag"],
					},
					{
						model: db.User,
						as: "user",
						attributes: ["name", "phone", "zalo"],
					},
					{
						model: db.Province,
						as: "province",
						attributes: ["code", "value"],
					},
					{
						model: db.Category,
						as: "category",
						attributes: ["code", "value"],
					},
					{
						model: db.Overview,
						as: "overviews",
					},
					{
						model: db.Label,
						as: "labels",
						attributes: ["code", "value"],
					},
				],
			});
			resolve({
				err: post ? 0 : 1,
				message: post ? "Get post successfully" : "Get post failed",
				data: {
					post: post,
				},
			});
		} catch (error) {
			reject(error);
		}
	});
const getNewPostsService = () =>
	new Promise(async (resolve, reject) => {
		try {
			const posts = await db.Post.findAll({
				raw: true,
				nest: true,
				offset: 0,
				order: [["createdAt", "DESC"]],
				limit: +process.env.LIMIT,
				include: [
					{model: db.Image, as: "images", attributes: ["image"]},
					{
						model: db.Attribute,
						as: "attributes",
						attributes: ["price", "acreage", "published", "hashtag"],
					},
				],
				attributes: ["id", "title", "star", "createdAt"],
			});
			resolve({
				err: posts ? 0 : 1,
				msg: posts ? "OK" : "Getting posts is failed.",
				data: {
					posts: posts,
				},
			});
		} catch (error) {
			reject(error);
		}
	});

const createNewPostsService = ({
	label,
	areaCode,
	priceCode,
	areaNumber,
	priceNumber,
	images,
	category,
	province,
	...rest
}) =>
	new Promise(async (resolve, reject) => {
		try {
			const attributesId = uuidv4();
			const postId = uuidv4();
			const imagesId = uuidv4();
			const overviewId = uuidv4();
			const star = Math.floor(Math.random() * 5) + 1;

			const labelCode = generateCode(label);
			const provinceCode = generateCode(province);
			const hashtag = `${Math.floor(Math.random() * Math.pow(10, 6))}`;

			const response = await db.Post.create({
				id: postId,
				labelCode,
				attributesId,
				imagesId,
				overviewId,
				areaCode,
				priceCode,
				areaNumber,
				priceNumber,
				star,
				provinceCode,
				...rest,
			});
			await db.Attribute.create({
				id: attributesId,
				price:
					priceNumber < 1
						? `${priceNumber * Math.pow(10, 6)} đồng/tháng`
						: `${priceNumber} triệu/tháng`,
				acreage: `${areaNumber}m2`,
				published: moment(new Date()).format("DD/MM/YYYY"),
				hashtag: `${hashtag}`,
			});
			await db.Image.create({
				id: imagesId,
				image: JSON.stringify(images),
			});
			await db.Overview.create({
				id: overviewId,
				code: `#${hashtag}`,
				area: label,
				type: category,
				target: "Tất cả",
				bonus: "Không có",
				created: generateCreatedDate(),
				expired: generateExpireDate(),
			});
			await db.Province.findOrCreate({
				where: {code: provinceCode},
				defaults: {
					code: provinceCode,
					value: province,
				},
			});
			await db.Label.findOrCreate({
				where: {code: labelCode},
				defaults: {
					code: labelCode,
					value: label,
				},
			});
			resolve({
				err: response ? 0 : 1,
				msg: response ? "OK" : "Create new post is failed.",
				data: {
					post: response,
				},
			});
		} catch (error) {
			reject(error);
		}
	});

const getPrivatePostsService = (userId) =>
	new Promise(async (resolve, reject) => {
		try {
			const posts = await db.Post.findAll({
				raw: true,
				nest: true,
				where: {userId},
				include: [
					{
						model: db.Image,
						as: "images",
						attributes: ["image"],
					},
					{
						model: db.Attribute,
						as: "attributes",
						attributes: ["price", "acreage", "published", "hashtag"],
					},

					{
						model: db.Overview,
						as: "overviews",
						attributes: ["created", "expired"],
					},
				],
				attributes: ["id", "title"],
			});
			resolve({
				err: posts ? 0 : 1,
				message: posts ? "Get post successfully" : "Get post failed",
				data: {
					posts: posts,
				},
			});
		} catch (error) {
			reject(error);
		}
	});

const updatePostService = ({
	postId,
	attributesId,
	overviewId,
	imagesId,
	...body
}) =>
	new Promise(async (resolve, reject) => {
		const provinceCode = generateCode(body.province);
		const labelCode = generateCode(body.label);
		try {
			const response = await db.Post.update(
				{
					title: body.title,
					labelCode,
					address: body.address,
					description: body.description,
					categoryCode: body.categoryCode,
					provinceCode,
					areaCode: body.areaCode,
					priceCode: body.priceCode,
					areaNumber: body.areaNumber,
					priceNumber: body.priceNumber,
				},
				{
					where: {id: postId},
				}
			);
			await db.Attribute.update(
				{
					price:
						body.priceNumber < 1
							? `${body.priceNumber * Math.pow(10, 6)} đồng/tháng`
							: `${body.priceNumber} triệu/tháng`,
					acreage: `${body.areaNumber}m2`,
				},
				{
					where: {id: attributesId},
				}
			);
			await db.Image.update(
				{
					image: JSON.stringify(body.images),
				},
				{
					where: {id: imagesId},
				}
			);
			await db.Overview.update(
				{
					area: body.label,
					type: body.category,
					target: "Tất cả",
				},
				{
					where: {id: overviewId},
				}
			);
			await db.Province.findOrCreate({
				where: {code: provinceCode},
				defaults: {
					code: provinceCode,
					value: body.province,
				},
			});
			await db.Label.findOrCreate({
				where: {code: labelCode},
				defaults: {
					code: labelCode,
					value: body.label,
				},
			});
			resolve({
				err: response > 0 ? 0 : 1,
				msg: response > 0 ? "Update post is success" : "Update post is failed.",
			});
		} catch (error) {
			reject(error);
		}
	});
const deletePostService = (postId) =>
	new Promise(async (resolve, reject) => {
		try {
			const response = await db.Post.destroy({
				where: {id: postId},
			});
			resolve({
				err: response ? 0 : 1,
				msg: response ? "Delete post is success" : "Delete post is failed.",
				data: {
					post: response,
				},
			});
		} catch (error) {
			reject(error);
		}
	});
export {
	getPostService,
	getPostsService,
	getNewPostsService,
	createNewPostsService,
	getPrivatePostsService,
	updatePostService,
	deletePostService,
};
