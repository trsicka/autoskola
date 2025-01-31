import { HTTP } from './http';

export function clearAuthToken() {
	const session = JSON.parse(localStorage.getItem('session')) ?? {};
	session.token = undefined;
	localStorage.setItem('session', JSON.stringify(session));
}

export function getAuthToken(strict = false) {
	const { token } = JSON.parse(localStorage.getItem('session')) ?? {};

	if (strict && !token) {
		throw new Error('Missing auth token!');
	}

	return token;
}

export async function createSession(email, password) {
	try {
		const { token } = await HTTP.request({
			path: '/auth/login',
			method: 'POST',
			body: {
				email,
				password
			}
		});

		localStorage.setItem('session', JSON.stringify({ token }));
	} catch (error) {
		throw new Error('Invalid user credentials');
	}
}
