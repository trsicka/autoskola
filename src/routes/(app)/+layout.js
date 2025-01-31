import { page } from '$app/state';
import { error } from '@sveltejs/kit';
import { getUser } from '$lib/domain/user';

export const ssr = false;

/** @type {import('../$types').LayoutLoad} */
export async function load({ route }) {
	return {
		...(route.id.includes('/(app)/(user)') && { user: await getUser() })
	};
}
