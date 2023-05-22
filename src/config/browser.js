import puppeteer from "puppeteer";

const startBrowser = async () => {
	try {
		let browser = await puppeteer.launch({
			headless: false,
			args: ["--disable-setuid-sandbox"],
			ignoreHTTPSErrors: true,
		});
		return browser;
	} catch (error) {
		console.log("Could not create a browser instance => : ", error);
	}
};
export default startBrowser;
