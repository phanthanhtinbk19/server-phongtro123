import moment from "moment";
import "moment/locale/vi";

function customFormat(date) {
	const daysOfWeek = [
		"Chủ Nhật",
		"Thứ 2",
		"Thứ 3",
		"Thứ 4",
		"Thứ 5",
		"Thứ 6",
		"Thứ 7",
	];
	return daysOfWeek[date.day()];
}

// Set the custom format function for the Vietnamese locale
moment.updateLocale("vi", {
	weekdays: customFormat,
	weekdaysShort: customFormat,
});

const generateCreatedDate = () => {
	const date = new Date(); // Replace this with your Date object

	// Create a Moment.js object from the Date
	const momentDate = moment(date);

	// Format the Moment.js object to the desired format
	const formattedDate = momentDate.format("dddd, HH:mm DD/MM/YYYY");

	return formattedDate;
};
const generateExpireDate = () => {
	const randomDays = Math.floor(Math.random() * 30) + 1; // Generate a random number between 1 and 30
	const expiryDate = moment(generateCreatedDate(), "dddd, HH:mm DD/MM/YYYY")
		.add(randomDays, "days")
		.format("dddd, HH:mm DD/MM/YYYY");
	return expiryDate;
};

export {generateCreatedDate, generateExpireDate};
