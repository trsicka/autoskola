export function getRandomInt(min, max) {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

export function replaceUTCWithTimezone(pit) {
	const zone = new Date().getTimezoneOffset() / 60;
	const sign = zone.toString().startsWith('-') ? '-' : '+';
	const timezone = `${sign}${Math.abs(zone).toString().padStart(2, '0')}:00`;
	return pit.replace('Z', timezone);
}
