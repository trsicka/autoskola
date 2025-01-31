import { goto } from '$app/navigation';
import { getAuthToken } from '$lib/domain/session';

/** @type {import('../$types').PageLoad} */
export async function load({ route }) {
	if (route.id === '/(app)' && !getAuthToken()) {
		goto('/home');
	}
}
