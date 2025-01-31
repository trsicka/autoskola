import { HTTP } from './http';
import { getRandomInt } from '$lib/utils.js/common.js';

let colors = [
	'#FFDA61',
	'#B20AB8',
	'#5CB611',
	'#50FCC6',
	'#F7A644',
	'#120CF3',
	'#BAC527'
];

// COLORS array mora sadrzavat vise ili jednako boja nego sto ima studenata
// inace se boje nece dodjeljivati nakon zadnje boje
function randomColor() {
	return colors.splice(getRandomInt(0, colors.length), 1)[0];
}

export function getStudentSessionColor(polaznik_email) {
	const colors = JSON.parse(sessionStorage.getItem('student-colors')) ?? {};

	if (colors[polaznik_email] !== undefined) {
		return colors[polaznik_email];
	}

	const color = randomColor();
	colors[polaznik_email] = color;
	sessionStorage.setItem('student-colors', JSON.stringify(colors));

	return color;
}

function createInitials(name) {
	return name
		.split(' ')
		.map((part) => part.slice(0, 1))
		.join('');
}

export async function getStudentsForInstructor() {
	return HTTP.request({
		path: `/instruktori/polaznici`,
		method: 'GET',
		auth: true
	})
		.then((data) =>
			data.map(
				({ id, polaznik_name, polaznik_email, prva_pomoc, odvozeni_sati }) => ({
					id,
					initials: createInitials(polaznik_name),
					name: polaznik_name,
					email: polaznik_email,
					firstAid: prva_pomoc !== 0,
					hoursDriven: odvozeni_sati,
					color: getStudentSessionColor(polaznik_email)
				})
			)
		)
		.catch((reason) => {
			console.error(reason);
			return undefined;
		});
}
