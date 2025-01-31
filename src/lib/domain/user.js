import { error } from '@sveltejs/kit';
import { HTTP } from './http';
import { clearAuthToken } from './session';

export async function getUser() {
	const [instructor, student] = await Promise.all(
		['/instruktori', '/polaznici'].map((entity) =>
			HTTP.request({ path: entity + '/me', method: 'GET', auth: true })
				.then((data) => data)
				.catch((reason) => {
					console.error(reason);
					return undefined;
				})
		)
	);

	if (instructor) {
		return {
			...instructor,
			role: 'instructor'
		};
	} else if (student) {
		return {
			...student,
			role: 'student'
		};
	} else {
		clearAuthToken();
		error(401, {
			message: 'Invalid auth token',
			code: 401
		});
	}
}
