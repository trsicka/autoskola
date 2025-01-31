import { HTTP } from './http';
import { getStudentSessionColor } from './instructor';
import { replaceUTCWithTimezone } from '$lib/utils.js/common';

const MILISECONDS_IN_HOUR = 3600000;

const GET_EVENTS_USER_ROUTE_MAP = {
	instructor: 'instruktori',
	student: 'polaznici'
};

export async function getEvents(role) {
	return HTTP.request({
		path: `/${GET_EVENTS_USER_ROUTE_MAP[role]}/moje_voznje`,
		method: 'GET',
		auth: true
	})
		.then((data) =>
			data.map((event) => ({
				id: event.id,
				instructorEmail: event.instruktor_email,
				studentEmail: event.polaznik_email,
				pit: event.termin,
				duration: event.trajanje,
				location: event.lokacija,
				status: event.status
			}))
		)
		.catch((reason) => {
			console.error(reason);
			return undefined;
		});
}

function getEventEndPIT(start, duration) {
	const end =
		new Date(start).getTime() +
		Number.parseInt(duration.split(':')[0]) * MILISECONDS_IN_HOUR;

	return new Date(end).toISOString();
}

export function convertEventForCalendar(event, students) {
	const student = students.find(({ email }) => email === event.studentEmail);

	return {
		id: event.id,
		start: new Date(event.pit).toISOString(),
		end: getEventEndPIT(event.pit, event.duration),
		resourceId: event.studentEmail,
		color: getStudentSessionColor(event.studentEmail),
		title: '',
		status: event.status
	};
}

export function convertEventForTimeline(event, students) {
	const student = students.find(({ email }) => email === event.studentEmail);

	return {
		id: event.id,
		start: new Date(event.pit).toISOString(),
		end: getEventEndPIT(event.pit, event.duration),
		resourceId: event.studentEmail,
		color: getStudentSessionColor(event.studentEmail),
		title: `Vožnja - ${student.name}`,
		status: event.status
	};
}

export function convertEventForTimegrid(event) {
	return {
		id: event.id,
		start: new Date(event.pit).toISOString(),
		end: getEventEndPIT(event.pit, event.duration),
		resourceId: event.studentEmail,
		color: getStudentSessionColor(event.studentEmail),
		title: `Vožnja${event.status ? ' - ✅' : ''}`,
		status: event.status
	};
}

export async function createEvent({
	instructorEmail,
	studentEmail,
	pit,
	duration,
	location
}) {
	if (
		!(
			typeof instructorEmail === 'string' &&
			instructorEmail !== '' &&
			typeof studentEmail === 'string' &&
			studentEmail !== '' &&
			typeof location === 'string' &&
			location !== '' &&
			typeof pit === 'string' &&
			typeof duration === 'string'
		)
	) {
		console.error(reason);
		return undefined;
	}

	return HTTP.request({
		path: `/voznje`,
		method: 'POST',
		auth: true,
		body: {
			instruktor_email: instructorEmail,
			polaznik_email: studentEmail,
			termin: pit,
			trajanje: duration,
			lokacija: location,
			status: false
		}
	})
		.then((data) => data)
		.catch((reason) => {
			console.error(reason);
			return undefined;
		});
}

export function finishEvent(id) {
	return HTTP.request({
		path: `/voznje/${id}`,
		method: 'PUT',
		auth: true,
		body: {
			status: true
		}
	})
		.then((data) => data)
		.catch((reason) => {
			console.error(reason);
			return undefined;
		});
}

export function deleteEvent(id) {
	return HTTP.request({
		path: `/voznje/${id}`,
		method: 'DELETE',
		auth: true
	})
		.then((data) => data)
		.catch((reason) => {
			console.error(reason);
			return undefined;
		});
}
