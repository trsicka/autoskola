import { goto } from '$app/navigation';

/** @type {import('./$types').PageLoad} */
export function load({ route }) {
	goto('/login');

	// // user logged in
	// if (true) {
	// 	goto('/login');
	// } else {
	// 	goto('/home');
	// }
}
