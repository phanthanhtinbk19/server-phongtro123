const scrapeCategory = (browser, url) =>
	new Promise(async (resolve, reject) => {
		try {
			let page = await browser.newPage();
			console.log(">) Mở tab mới ...");
			await page.goto(url);
			console.log(">>Truy cập vào " + url);
			await page.waitForSelector("#webpage");
			console.log(">) Website đã load xong...");

			const dataCategory = await page.$$eval("#navbar-menu > ul > li", (els) =>
				els.map((el) => ({
					category: el.querySelector("a").innerText,
					link: el.querySelector("a").href,
				}))
			);

			console.log(dataCategory);
			await page.close();
			console.log(">) Đóng tab ...");
			resolve();
		} catch (error) {
			console.log("lỗi ở scrape category: " + error);
			reject(error);
		}
	});

const getData = async () => {
	let data = await scrapeCategory();
};
const getData1 = () =>
	new Promise(async (resolve, reject) => {
		let data = await scrapeCategory();
	});
export default scrapeCategory;
