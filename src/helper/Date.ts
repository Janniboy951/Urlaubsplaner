export function getDateString(date: Date): string {
	return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
}
export function getCurrentDateSting() {
	return getDateString(new Date());
}
export function getCurrentDateTimeSting() {
	const currentDate = new Date();
	return getDateString(currentDate) + " " + currentDate.toLocaleTimeString();
}
