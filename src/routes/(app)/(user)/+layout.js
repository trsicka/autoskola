import { page } from '$app/state';
import { error } from '@sveltejs/kit';
import { getUser } from '$lib/domain/user';
import { getEvents } from '$lib/domain/event';
import { getStudentsForInstructor } from '$lib/domain/instructor';

export const ssr = false;

/** @type {import('../$types').LayoutLoad} */
export async function load({ route, parent, depends }) {
	depends('layout:user');

	const { user } = await parent();

	let students;
	if (user.role === 'instructor') {
		students = await getStudentsForInstructor();
	}

	// students need to be initialized before because of the session storage colors
	const events = await getEvents(user.role);

	return {
		events,
		...(students && { students })
	};
}
