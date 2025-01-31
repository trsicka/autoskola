import { PUBLIC_SERVER_HOST } from '$env/static/public';
import { getAuthToken } from './session';

export class HTTP {
	static async request({ path, method, headers, body, auth = false }) {
		let authToken;

		if (auth) {
			authToken = getAuthToken(true);
		}

		let resp;

		try {
			resp = await fetch(PUBLIC_SERVER_HOST + path, {
				method,
				headers: {
					...((method === 'POST' || method === 'PUT') && {
						'Content-Type': 'application/json'
					}),
					...(authToken && { Authorization: `Bearer ${authToken}` }),
					...headers
				},
				...(body && { body: JSON.stringify(body) })
			});

			if (!resp.ok) {
				let body = undefined;

				try {
					body = await resp.text();
				} catch (error) {
					console.error('Failed to parse response body', e);
				}

				return Promise.reject({
					status: resp.status,
					statusText: resp.statusText,
					body
				});
			}

			let result;

			try {
				if (resp.status === 204) return null;

				const text = await resp.text();
				try {
					return JSON.parse(text);
				} catch (error) {
					return text;
				}
			} catch (error) {
				console.error('Fetch failed with error', error);

				return Promise.reject({
					status: resp.status,
					statusText: resp.statusText
				});
			}
		} catch (e) {
			console.error('Fetch failed with error', e);

			return Promise.reject(e);
		}
	}
}
